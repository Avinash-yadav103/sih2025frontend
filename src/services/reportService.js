import supabase from '../utils/supabase';
import { fetchData, insertData, updateData } from './api';

const REPORTS_TABLE = 'Reports';
const TOURISTS_TABLE = 'Tourists';
const INCIDENTS_TABLE = 'Incidents';

/**
 * Fetch all reports with optional filtering
 * @param {Object} filters - Optional filters
 * @returns {Promise<Array>} - Promise resolving to array of reports
 */
export const fetchReports = async (filters = {}) => {
  const options = {
    select: '*, tourist:touristId(*), incident:incidentId(*)',
    filters: []
  };
  
  // Add filters if provided
  if (filters.status) {
    options.filters.push({ column: 'status', operator: 'eq', value: filters.status });
  }
  
  if (filters.reportType) {
    options.filters.push({ column: 'reportType', operator: 'eq', value: filters.reportType });
  }
  
  if (filters.dateFrom) {
    options.filters.push({ column: 'createdAt', operator: 'gte', value: filters.dateFrom });
  }
  
  if (filters.dateTo) {
    options.filters.push({ column: 'createdAt', operator: 'lte', value: filters.dateTo });
  }
  
  // Order by creation date, newest first
  options.orderBy = { column: 'createdAt', ascending: false };
  
  return await fetchData(REPORTS_TABLE, options);
};

/**
 * Fetch a report by ID
 * @param {string|number} id - The report ID
 * @returns {Promise<Object>} - Promise resolving to the report
 */
export const fetchReportById = async (id) => {
  const options = {
    select: '*, tourist:touristId(*), incident:incidentId(*)',
    filters: [{ column: 'id', operator: 'eq', value: id }]
  };
  
  const data = await fetchData(REPORTS_TABLE, options);
  return data[0];
};

/**
 * Create a new report
 * @param {Object} reportData - The report data
 * @returns {Promise<Object>} - Promise resolving to the created report
 */
export const createReport = async (reportData) => {
  // Add creation timestamp
  const dataWithTimestamp = {
    ...reportData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  return await insertData(REPORTS_TABLE, dataWithTimestamp);
};

/**
 * Update an existing report
 * @param {string|number} id - The report ID
 * @param {Object} reportData - The updated report data
 * @returns {Promise<Object>} - Promise resolving to the updated report
 */
export const updateReport = async (id, reportData) => {
  // Add update timestamp
  const dataWithTimestamp = {
    ...reportData,
    updatedAt: new Date().toISOString()
  };
  
  return await updateData(REPORTS_TABLE, dataWithTimestamp, { id });
};

/**
 * Check for tourists that meet criteria for automatic E-FIR
 * This function should be called periodically to check for new incidents
 * @returns {Promise<Array>} - Promise resolving to array of created reports
 */
export const checkAndGenerateAutomaticEFIRs = async () => {
  try {
    // Criteria for automatic E-FIR generation:
    // 1. Tourist is missing (last location update > 24h)
    // 2. Tourist has entered a high-risk zone and hasn't left in 2h
    // 3. Tourist has sent an SOS signal
    // 4. Tourist has missed a scheduled check-in
    
    // Get current timestamp
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000); // 2 hours ago
    
    // Query 1: Tourists with no location update in 24h
    const { data: missingTourists, error: missingError } = await supabase
      .from(TOURISTS_TABLE)
      .select('*')
      .lt('lastLocationUpdate', twentyFourHoursAgo.toISOString())
      .eq('status', 'active');
    
    if (missingError) throw missingError;
    
    // Query 2: Tourists with active SOS signals
    const { data: sosTourists, error: sosError } = await supabase
      .from(TOURISTS_TABLE)
      .select('*')
      .eq('sosActive', true)
      .eq('status', 'active');
    
    if (sosError) throw sosError;
    
    // Query 3: Tourists in high-risk zones for > 2h
    const { data: highRiskTourists, error: highRiskError } = await supabase
      .from(TOURISTS_TABLE)
      .select('*, incidents(*)')
      .eq('inHighRiskZone', true)
      .lt('enteredHighRiskZoneAt', twoHoursAgo.toISOString())
      .eq('status', 'active');
    
    if (highRiskError) throw highRiskError;
    
    // Query 4: Tourists who missed scheduled check-ins
    const { data: missedCheckInTourists, error: checkInError } = await supabase
      .from(TOURISTS_TABLE)
      .select('*')
      .lt('nextScheduledCheckIn', now.toISOString())
      .eq('lastCheckInStatus', 'missed')
      .eq('status', 'active');
    
    if (checkInError) throw checkInError;
    
    // Combine all tourists that meet criteria
    const allCriticalTourists = [
      ...missingTourists.map(t => ({ ...t, reason: 'missing' })),
      ...sosTourists.map(t => ({ ...t, reason: 'sos' })),
      ...highRiskTourists.map(t => ({ ...t, reason: 'highRiskZone' })),
      ...missedCheckInTourists.map(t => ({ ...t, reason: 'missedCheckIn' }))
    ];
    
    // Remove duplicates
    const uniqueTourists = Array.from(
      new Map(allCriticalTourists.map(item => [item.id, item])).values()
    );
    
    const createdReports = [];
    
    // Generate E-FIR for each tourist
    for (const tourist of uniqueTourists) {
      // Check if an open E-FIR already exists for this tourist
      const { data: existingReports } = await supabase
        .from(REPORTS_TABLE)
        .select('*')
        .eq('touristId', tourist.id)
        .in('status', ['open', 'in-progress'])
        .limit(1);
      
      if (existingReports && existingReports.length > 0) {
        console.log(`E-FIR already exists for tourist ${tourist.id}`);
        continue; // Skip if E-FIR already exists
      }
      
      // Create a new incident entry
      let incidentType;
      let description;
      
      switch (tourist.reason) {
        case 'missing':
          incidentType = 'missing_person';
          description = `Tourist ${tourist.name} has not updated location in over 24 hours.`;
          break;
        case 'sos':
          incidentType = 'sos_signal';
          description = `Tourist ${tourist.name} has activated an emergency SOS signal.`;
          break;
        case 'highRiskZone':
          incidentType = 'high_risk_zone';
          description = `Tourist ${tourist.name} has been in a high-risk zone for over 2 hours.`;
          break;
        case 'missedCheckIn':
          incidentType = 'missed_check_in';
          description = `Tourist ${tourist.name} has missed a scheduled check-in.`;
          break;
        default:
          incidentType = 'other';
          description = 'Automatic E-FIR generated due to system alert.';
      }
      
      // Create incident
      const { data: newIncident, error: incidentError } = await supabase
        .from(INCIDENTS_TABLE)
        .insert({
          type: incidentType,
          description,
          status: 'open',
          severity: 'high',
          location: tourist.lastLocation,
          latitude: tourist.lastLatitude,
          longitude: tourist.lastLongitude,
          reportedBy: 'system',
          timestamp: new Date().toISOString()
        })
        .select();
      
      if (incidentError) {
        console.error('Error creating incident:', incidentError);
        continue;
      }
      
      // Generate unique E-FIR number
      const firNumber = `EFIR-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
      
      // Create E-FIR report
      const newReport = {
        firNumber,
        reportType: 'e-fir',
        touristId: tourist.id,
        incidentId: newIncident[0].id,
        status: 'open',
        priority: 'high',
        summary: `Automatic E-FIR generated for ${tourist.name} due to ${tourist.reason}`,
        details: description,
        generatedBy: 'system',
        assignedTo: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isAutomaticallyGenerated: true
      };
      
      const { data: createdReport, error: reportError } = await supabase
        .from(REPORTS_TABLE)
        .insert(newReport)
        .select();
      
      if (reportError) {
        console.error('Error creating report:', reportError);
        continue;
      }
      
      createdReports.push(createdReport[0]);
    }
    
    return createdReports;
  } catch (error) {
    console.error('Error generating automatic E-FIRs:', error);
    throw error;
  }
};

/**
 * Generate a PDF report from E-FIR data
 * @param {Object} report - The report data
 * @returns {Promise<Blob>} - Promise resolving to PDF blob
 */
export const generatePDFReport = async (report) => {
  // This is a placeholder for actual PDF generation
  // In a real implementation, you would use a library like jsPDF or pdfmake
  // For now, we'll just simulate the behavior
  
  return new Promise((resolve) => {
    // Simulate PDF generation delay
    setTimeout(() => {
      // This would be the actual PDF blob in a real implementation
      const pdfBlob = new Blob(['PDF content would be here'], { type: 'application/pdf' });
      resolve(pdfBlob);
    }, 1000);
  });
};

/**
 * Share a report via email
 * @param {string|number} reportId - The report ID
 * @param {string} email - Email address to share with
 * @returns {Promise<Object>} - Promise resolving to the result
 */
export const shareReportViaEmail = async (reportId, email) => {
  try {
    // This would call a server-side function to send an email
    // For now, we'll just simulate the behavior
    console.log(`Sharing report ${reportId} with ${email}`);
    
    return { success: true };
  } catch (error) {
    console.error('Error sharing report:', error);
    throw error;
  }
};