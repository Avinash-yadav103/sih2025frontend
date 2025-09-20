import supabase from '../utils/supabase';
import { generatePDF } from '../utils/pdfGenerator';

// Constants for incident criteria that trigger automatic E-FIR
const AUTO_FIR_CRITERIA = {
  MISSING_HOURS: 24, // Tourist missing for 24 hours
  CRIME_SEVERITY: ['HIGH', 'CRITICAL'],
  DISTRESS_SIGNAL: true,
};

/**
 * Create a new E-FIR
 * @param {Object} firData - The FIR data
 * @returns {Promise<Object>} - The created FIR
 */
export const createEFIR = async (firData) => {
  try {
    const { data, error } = await supabase
      .from('e_firs')
      .insert([
        {
          ...firData,
          status: firData.status || 'PENDING',
          created_at: new Date().toISOString(),
          is_automatic: firData.is_automatic || false,
        },
      ])
      .select();

    if (error) throw error;
    console.log('E-FIR created successfully', data);
    return data[0];
  } catch (error) {
    console.error('Error creating E-FIR:', error);
    throw error;
  }
};

/**
 * Get all E-FIRs
 * @param {Object} filters - Optional filters
 * @returns {Promise<Array>} - Array of E-FIRs
 */
export const getAllEFIRs = async (filters = {}) => {
  try {
    let query = supabase.from('e_firs').select('*');

    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    if (filters.dateFrom && filters.dateTo) {
      query = query.gte('created_at', filters.dateFrom).lte('created_at', filters.dateTo);
    }

    if (filters.touristId) {
      query = query.eq('tourist_id', filters.touristId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching E-FIRs:', error);
    throw error;
  }
};

/**
 * Get E-FIR by ID
 * @param {string} id - The E-FIR ID
 * @returns {Promise<Object>} - The E-FIR
 */
export const getEFIRById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('e_firs')
      .select('*, tourist:tourist_id(*), incidents(*)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching E-FIR with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Update E-FIR status
 * @param {string} id - The E-FIR ID
 * @param {string} status - The new status
 * @returns {Promise<Object>} - The updated E-FIR
 */
export const updateEFIRStatus = async (id, status) => {
  try {
    const { data, error } = await supabase
      .from('e_firs')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error(`Error updating E-FIR status for ID ${id}:`, error);
    throw error;
  }
};

/**
 * Generate PDF for an E-FIR
 * @param {string} id - The E-FIR ID
 * @returns {Promise<Blob>} - PDF blob
 */
export const generateEFIRPDF = async (id) => {
  try {
    const efir = await getEFIRById(id);
    if (!efir) throw new Error(`E-FIR with ID ${id} not found`);

    // Generate PDF using the pdfGenerator utility
    const pdfBlob = await generatePDF(efir);
    return pdfBlob;
  } catch (error) {
    console.error(`Error generating PDF for E-FIR ${id}:`, error);
    throw error;
  }
};

/**
 * Check for incidents that meet criteria for automatic E-FIR
 * @returns {Promise<Array>} - Array of created E-FIRs
 */
export const checkAndCreateAutomaticEFIRs = async () => {
  try {
    const createdFIRs = [];

    // 1. Check for tourists missing for more than 24 hours
    const missingTimeThreshold = new Date();
    missingTimeThreshold.setHours(missingTimeThreshold.getHours() - AUTO_FIR_CRITERIA.MISSING_HOURS);

    const { data: missingTourists, error: missingError } = await supabase
      .from('tourists')
      .select('*, last_locations(*)')
      .eq('status', 'MISSING')
      .lt('last_seen_at', missingTimeThreshold.toISOString());

    if (missingError) throw missingError;

    // 2. Check for high severity incidents
    const { data: severeIncidents, error: incidentsError } = await supabase
      .from('incidents')
      .select('*, tourist:tourist_id(*)')
      .in('severity', AUTO_FIR_CRITERIA.CRIME_SEVERITY)
      .is('e_fir_id', null); // No E-FIR generated yet

    if (incidentsError) throw incidentsError;

    // 3. Check for distress signals
    const { data: distressSignals, error: distressError } = await supabase
      .from('incidents')
      .select('*, tourist:tourist_id(*)')
      .eq('type', 'DISTRESS_SIGNAL')
      .eq('is_active', true)
      .is('e_fir_id', null); // No E-FIR generated yet

    if (distressError) throw distressError;

    // Process missing tourists
    for (const tourist of missingTourists) {
      // Check if an E-FIR already exists for this tourist
      const { data: existingFIRs } = await supabase
        .from('e_firs')
        .select('id')
        .eq('tourist_id', tourist.id)
        .eq('status', 'PENDING');

      if (existingFIRs && existingFIRs.length > 0) {
        console.log(`E-FIR already exists for missing tourist ${tourist.id}`);
        continue;
      }

      // Create automatic E-FIR
      const firData = {
        tourist_id: tourist.id,
        incident_type: 'MISSING_PERSON',
        description: `Automatic E-FIR generated for tourist missing for more than ${AUTO_FIR_CRITERIA.MISSING_HOURS} hours. Last seen at ${tourist.last_seen_at}.`,
        location: tourist.last_locations?.[0]?.location || 'Unknown',
        status: 'PENDING',
        is_automatic: true,
        severity: 'HIGH',
        reporter_details: {
          name: 'System Generated',
          contact: 'N/A',
          relation: 'N/A',
        },
      };

      const createdFIR = await createEFIR(firData);
      createdFIRs.push(createdFIR);
    }

    // Process severe incidents
    for (const incident of severeIncidents) {
      // Create automatic E-FIR
      const firData = {
        tourist_id: incident.tourist_id,
        incident_id: incident.id,
        incident_type: incident.type,
        description: `Automatic E-FIR generated for ${incident.type} incident with ${incident.severity} severity. ${incident.description}`,
        location: incident.location,
        status: 'PENDING',
        is_automatic: true,
        severity: incident.severity,
        reporter_details: {
          name: 'System Generated',
          contact: 'N/A',
          relation: 'N/A',
        },
      };

      const createdFIR = await createEFIR(firData);
      
      // Update incident with E-FIR ID
      await supabase
        .from('incidents')
        .update({ e_fir_id: createdFIR.id })
        .eq('id', incident.id);
        
      createdFIRs.push(createdFIR);
    }

    // Process distress signals
    for (const incident of distressSignals) {
      // Create automatic E-FIR
      const firData = {
        tourist_id: incident.tourist_id,
        incident_id: incident.id,
        incident_type: 'DISTRESS_SIGNAL',
        description: `Automatic E-FIR generated for tourist in distress. ${incident.description}`,
        location: incident.location,
        status: 'PENDING',
        is_automatic: true,
        severity: 'HIGH',
        reporter_details: {
          name: 'System Generated',
          contact: 'N/A',
          relation: 'N/A',
        },
      };

      const createdFIR = await createEFIR(firData);
      
      // Update incident with E-FIR ID
      await supabase
        .from('incidents')
        .update({ e_fir_id: createdFIR.id })
        .eq('id', incident.id);
        
      createdFIRs.push(createdFIR);
    }

    return createdFIRs;
  } catch (error) {
    console.error('Error creating automatic E-FIRs:', error);
    throw error;
  }
};

/**
 * Share E-FIR via email
 * @param {string} id - The E-FIR ID
 * @param {string} email - Email address to share with
 * @returns {Promise<Object>} - Result
 */
export const shareEFIRViaEmail = async (id, email) => {
  try {
    // This is a placeholder. In a real application, you would:
    // 1. Generate the PDF
    const pdfBlob = await generateEFIRPDF(id);
    
    // 2. Send an API request to your backend to email the PDF
    // For now, we'll simulate success
    console.log(`Sharing E-FIR ${id} with ${email}`);
    
    // Record the share action
    const { data, error } = await supabase
      .from('e_fir_shares')
      .insert([
        {
          e_fir_id: id,
          shared_with: email,
          shared_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw error;
    
    return { success: true, message: `E-FIR shared successfully with ${email}` };
  } catch (error) {
    console.error(`Error sharing E-FIR ${id}:`, error);
    throw error;
  }
};

export default {
  createEFIR,
  getAllEFIRs,
  getEFIRById,
  updateEFIRStatus,
  generateEFIRPDF,
  checkAndCreateAutomaticEFIRs,
  shareEFIRViaEmail
};