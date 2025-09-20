import { supabase } from '../utils/supabase.js';

/**
 * Service for managing E-FIRs (Electronic First Information Reports)
 */

/**
 * Generate an E-FIR for a missing tourist
 * @param {Object} tourist - The tourist data
 * @param {string} reportedBy - The user reporting the missing tourist
 * @returns {Promise<Object>} - The created E-FIR
 */
export const generateMissingPersonEFIR = async (tourist, reportedBy = 'System') => {
  try {
    const now = new Date();
    
    // Create a unique FIR number
    const firNumber = `FIR-${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Create E-FIR data
    const firData = {
      fir_number: firNumber,
      incident_type: 'MISSING_PERSON',
      status: 'OPEN',
      reported_date: now.toISOString(),
      reported_by: reportedBy,
      subject: `Missing Person Report: ${tourist.name}`,
      description: `Automated E-FIR generated for missing tourist ${tourist.name}. Last known location: Latitude ${tourist.latitude}, Longitude ${tourist.longitude}. Tourist ID: ${tourist.id}.`,
      location_lat: tourist.latitude,
      location_lng: tourist.longitude,
      victim_name: tourist.name,
      victim_details: JSON.stringify({
        id: tourist.id,
        phone: tourist.phone || 'Not available',
        nationality: tourist.nationality || 'Not available',
        last_seen: tourist.last_seen || now.toISOString(),
        gender: tourist.gender || 'Not specified',
        age: tourist.age || 'Not specified'
      }),
      priority: 'HIGH'
    };
    
    // Save to database
    const { data, error } = await supabase
      .from('e_firs')
      .insert(firData)
      .select();
      
    if (error) throw error;
    
    console.log('E-FIR generated successfully:', data);
    return data[0];
  } catch (error) {
    console.error('Error generating E-FIR:', error);
    throw error;
  }
};

/**
 * Generate an E-FIR for an incident
 * @param {Object} incident - The incident data
 * @param {string} reportedBy - The user reporting the incident
 * @returns {Promise<Object>} - The created E-FIR
 */
export const generateIncidentEFIR = async (incident, reportedBy = 'System') => {
  try {
    const now = new Date();
    
    // Create a unique FIR number
    const firNumber = `FIR-${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Map incident severity to priority
    const priorityMap = {
      'high': 'HIGH',
      'medium': 'MEDIUM',
      'low': 'LOW'
    };
    
    // Create E-FIR data
    const firData = {
      fir_number: firNumber,
      incident_type: incident.type || 'GENERAL_INCIDENT',
      status: 'OPEN',
      reported_date: now.toISOString(),
      reported_by: reportedBy,
      subject: incident.title,
      description: incident.description || `Automated E-FIR generated for incident: ${incident.title}. Location: Latitude ${incident.latitude}, Longitude ${incident.longitude}.`,
      location_lat: incident.latitude,
      location_lng: incident.longitude,
      priority: priorityMap[incident.severity] || 'MEDIUM',
      incident_details: JSON.stringify(incident)
    };
    
    // Save to database
    const { data, error } = await supabase
      .from('e_firs')
      .insert(firData)
      .select();
      
    if (error) throw error;
    
    console.log('E-FIR generated successfully:', data);
    return data[0];
  } catch (error) {
    console.error('Error generating E-FIR:', error);
    throw error;
  }
};

/**
 * Get E-FIRs list
 * @param {Object} options - Query options
 * @returns {Promise<Array>} - List of E-FIRs
 */
export const getEFIRs = async (options = {}) => {
  try {
    let query = supabase.from('e_firs').select('*');
    
    if (options.status) {
      query = query.eq('status', options.status);
    }
    
    if (options.priority) {
      query = query.eq('priority', options.priority);
    }
    
    if (options.from && options.to) {
      query = query.gte('reported_date', options.from).lte('reported_date', options.to);
    }
    
    if (options.orderBy) {
      query = query.order(options.orderBy, { ascending: options.ascending !== false });
    } else {
      query = query.order('reported_date', { ascending: false });
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching E-FIRs:', error);
    throw error;
  }
};

/**
 * Get a single E-FIR by ID
 * @param {number} id - The E-FIR ID
 * @returns {Promise<Object>} - The E-FIR data
 */
export const getEFIRById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('e_firs')
      .select('*')
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
 * @param {number} id - The E-FIR ID
 * @param {string} status - The new status
 * @returns {Promise<Object>} - The updated E-FIR
 */
export const updateEFIRStatus = async (id, status) => {
  try {
    const { data, error } = await supabase
      .from('e_firs')
      .update({ status })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    
    return data[0];
  } catch (error) {
    console.error(`Error updating E-FIR ${id} status:`, error);
    throw error;
  }
};

/**
 * Creates a new electronic FIR in the system
 * @param {Object} efirData - The data for the new eFIR
 * @returns {Promise<Object>} The created eFIR record
 */
export const createEFIR = async (efirData) => {
  try {
    const { data, error } = await supabase
      .from('efirs')
      .insert([efirData])
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error creating eFIR:', error);
    throw error;
  }
};

/**
 * Retrieves all eFIR records from the system
 * @param {Object} filters - Optional filters to apply to the query
 * @returns {Promise<Array>} Array of eFIR records
 */
export const getAllEFIRs = async (filters = {}) => {
  try {
    let query = supabase.from('efirs').select('*');
    
    // Apply filters if any
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    
    if (filters.fromDate) {
      query = query.gte('created_at', filters.fromDate);
    }
    
    if (filters.toDate) {
      query = query.lte('created_at', filters.toDate);
    }
    
    // Order by creation date, newest first
    query = query.order('created_at', { ascending: false });
    
    const { data, error } = await query;
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching eFIRs:', error);
    throw error;
  }
};

/**
 * Updates an existing eFIR record
 * @param {string} id - The ID of the eFIR to update
 * @param {Object} updates - The fields to update
 * @returns {Promise<Object>} The updated eFIR record
 */
export const updateEFIR = async (id, updates) => {
  try {
    const { data, error } = await supabase
      .from('efirs')
      .update(updates)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error(`Error updating eFIR with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Generates a PDF document for an eFIR record
 * @param {Object} efirData - The eFIR data to generate PDF from
 * @returns {Promise<Blob>} PDF file as blob
 */
export const generateEFIRPDF = async (efirData) => {
  try {
    const { generatePDF } = await import('../utils/pdfGenerator.js');
    
    return await generatePDF({
      title: `eFIR #${efirData.caseNumber || efirData.id}`,
      content: [
        { text: 'Electronic First Information Report', style: 'header' },
        { text: `Case Number: ${efirData.caseNumber || 'N/A'}` },
        { text: `Date: ${new Date(efirData.createdAt || Date.now()).toLocaleDateString()}` },
        { text: `Location: ${efirData.location || 'N/A'}` },
        { text: `Incident Type: ${efirData.incidentType || 'N/A'}` },
        { text: 'Description:', style: 'subheader' },
        { text: efirData.description || 'No description provided.' },
        // Additional fields as needed
      ]
    });
  } catch (error) {
    console.error('Error generating eFIR PDF:', error);
    throw error;
  }
};

/**
 * Check for incidents that should automatically create eFIRs
 * @returns {Promise<Object>}
 */
export const checkAndCreateAutomaticEFIRs = async () => {
  try {
    // Get recent incidents that might need automatic eFIRs
    const { data: incidents, error } = await supabase
      .from('incidents')
      .select('*')
      .eq('efir_created', false)
      .gte('severity', 3) // Example: Auto-create for high severity incidents
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    const results = {
      processed: 0,
      created: 0,
      incidents: []
    };
    
    // Process each incident
    for (const incident of incidents) {
      results.processed++;
      
      try {
        // Create an eFIR for the incident
        const efirData = {
          incidentId: incident.id,
          caseNumber: `AUTO-${Date.now().toString().slice(-6)}`,
          description: `Auto-generated from incident: ${incident.description}`,
          location: incident.location,
          incidentType: incident.type,
          status: 'Open',
          autoCreated: true
        };
        
        const newEfir = await createEFIR(efirData);
        
        // Update the incident to mark it as having an eFIR
        await supabase
          .from('incidents')
          .update({ efir_created: true, efir_id: newEfir.id })
          .eq('id', incident.id);
        
        results.created++;
        results.incidents.push({
          incidentId: incident.id,
          efirId: newEfir.id,
          success: true
        });
      } catch (err) {
        results.incidents.push({
          incidentId: incident.id,
          success: false,
          error: err.message
        });
      }
    }
    
    return results;
  } catch (error) {
    console.error('Error checking for automatic eFIRs:', error);
    throw error;
  }
};

/**
 * Delete an eFIR record
 * @param {string} id - The ID of the eFIR to delete
 * @returns {Promise<boolean>} Success status
 */
export const deleteEFIR = async (id) => {
  try {
    const { error } = await supabase
      .from('efirs')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error(`Error deleting eFIR with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Shares an eFIR report via email
 * @param {Object} efirData - The eFIR data to share
 * @param {string} recipientEmail - Email address to send the report to
 * @returns {Promise<Object>} Result of the sharing operation
 */
export const shareEFIRViaEmail = async (efirData, recipientEmail) => {
  try {
    // Generate PDF first (if needed)
    const pdfBlob = await generateEFIRPDF(efirData);
    
    // Create FormData for the API request
    const formData = new FormData();
    formData.append('recipient', recipientEmail);
    formData.append('subject', `eFIR Report: ${efirData.caseNumber || efirData.id}`);
    formData.append('message', `Please find attached the eFIR report for case ${efirData.caseNumber || efirData.id}.`);
    formData.append('attachment', pdfBlob, `eFIR_${efirData.caseNumber || efirData.id}.pdf`);
    
    // Send to your backend email service
    const response = await fetch('/api/email/send', {
      method: 'POST',
      body: formData,
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to send email');
    }
    
    return {
      success: true,
      message: `eFIR successfully shared with ${recipientEmail}`,
      ...result
    };
  } catch (error) {
    console.error('Error sharing eFIR via email:', error);
    return {
      success: false,
      message: `Failed to share eFIR: ${error.message}`,
      error: error.toString()
    };
  }
};

export default {
  generateMissingPersonEFIR,
  generateIncidentEFIR,
  getEFIRs,
  getEFIRById,
  updateEFIRStatus,
  createEFIR,
  checkAndCreateAutomaticEFIRs,
  generateEFIRPDF,
  getAllEFIRs,
};