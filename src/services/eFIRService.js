import supabase from '../utils/supabase';
import { generatePDF } from '../utils/pdfGenerator';

/**
 * Service for handling E-FIR operations including automatic generation
 */
export const eFIRService = {
  // Fetch all E-FIRs
  getAllEFIRs: async () => {
    try {
      const { data, error } = await supabase
        .from('efirs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching E-FIRs:', error);
      throw error;
    }
  },

  // Get E-FIR by ID
  getEFIRById: async (id) => {
    try {
      const { data, error } = await supabase
        .from('efirs')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error fetching E-FIR with ID ${id}:`, error);
      throw error;
    }
  },

  // Create a new E-FIR
  createEFIR: async (eFIRData) => {
    try {
      const { data, error } = await supabase
        .from('efirs')
        .insert([eFIRData])
        .select();
      
      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('Error creating E-FIR:', error);
      throw error;
    }
  },

  // Update an existing E-FIR
  updateEFIR: async (id, eFIRData) => {
    try {
      const { data, error } = await supabase
        .from('efirs')
        .update(eFIRData)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error(`Error updating E-FIR with ID ${id}:`, error);
      throw error;
    }
  },

  // Check for missing tourists or incidents that require E-FIR
  checkForAutomaticEFIR: async () => {
    try {
      // Check for tourists who are reported missing
      const { data: missingTourists, error: touristError } = await supabase
        .from('tourists')
        .select('*')
        .eq('status', 'missing');
      
      if (touristError) throw touristError;
      
      // Check for critical incidents that need E-FIR
      const { data: criticalIncidents, error: incidentError } = await supabase
        .from('incidents')
        .select('*')
        .in('severity', ['high', 'critical'])
        .eq('efir_generated', false);
      
      if (incidentError) throw incidentError;
      
      // Generate E-FIRs for missing tourists
      for (const tourist of missingTourists || []) {
        // Check if E-FIR already exists
        const { data: existingEFIR } = await supabase
          .from('efirs')
          .select('id')
          .eq('related_entity_id', tourist.id)
          .eq('entity_type', 'tourist')
          .single();
        
        if (!existingEFIR) {
          await eFIRService.generateTouristEFIR(tourist);
        }
      }
      
      // Generate E-FIRs for critical incidents
      for (const incident of criticalIncidents || []) {
        await eFIRService.generateIncidentEFIR(incident);
        
        // Update incident to mark E-FIR as generated
        await supabase
          .from('incidents')
          .update({ efir_generated: true })
          .eq('id', incident.id);
      }
      
      return {
        missingTourists: missingTourists || [],
        criticalIncidents: criticalIncidents || []
      };
    } catch (error) {
      console.error('Error checking for automatic E-FIR generation:', error);
      throw error;
    }
  },

  // Generate E-FIR for a missing tourist
  generateTouristEFIR: async (tourist) => {
    try {
      const eFIRData = {
        title: `Missing Tourist Report - ${tourist.name}`,
        description: `Automatic E-FIR generated for missing tourist: ${tourist.name}`,
        status: 'open',
        priority: 'high',
        location: tourist.last_known_location || 'Unknown',
        entity_type: 'tourist',
        related_entity_id: tourist.id,
        details: {
          tourist_data: tourist,
          fir_type: 'missing_person',
          reported_time: new Date().toISOString(),
          passport_number: tourist.passport_number || 'Not available',
          nationality: tourist.nationality || 'Not available',
          age: tourist.age || 'Not available',
          gender: tourist.gender || 'Not available',
          appearance: tourist.appearance || 'Not available',
          last_seen: tourist.last_seen_time || tourist.last_updated || new Date().toISOString(),
          last_known_location: tourist.last_known_location || 'Unknown'
        }
      };
      
      // Create the E-FIR
      const createdEFIR = await eFIRService.createEFIR(eFIRData);
      
      return createdEFIR;
    } catch (error) {
      console.error('Error generating tourist E-FIR:', error);
      throw error;
    }
  },

  // Generate E-FIR for a critical incident
  generateIncidentEFIR: async (incident) => {
    try {
      const eFIRData = {
        title: `Incident Report - ${incident.title || incident.type}`,
        description: `Automatic E-FIR generated for ${incident.severity} incident`,
        status: 'open',
        priority: incident.severity === 'critical' ? 'critical' : 'high',
        location: incident.location || 'Unknown',
        entity_type: 'incident',
        related_entity_id: incident.id,
        details: {
          incident_data: incident,
          fir_type: 'incident_report',
          reported_time: new Date().toISOString(),
          incident_type: incident.type || 'General',
          incident_time: incident.timestamp || new Date().toISOString(),
          incident_description: incident.description || 'No description available',
          involved_parties: incident.involved_parties || []
        }
      };
      
      // Create the E-FIR
      const createdEFIR = await eFIRService.createEFIR(eFIRData);
      
      return createdEFIR;
    } catch (error) {
      console.error('Error generating incident E-FIR:', error);
      throw error;
    }
  },

  // Generate PDF for an E-FIR
  generateEFIRPDF: async (eFIR) => {
    try {
      // Get expanded data if needed
      let expandedEFIR = eFIR;
      if (eFIR.related_entity_id && eFIR.entity_type) {
        const { data, error } = await supabase
          .from(eFIR.entity_type === 'tourist' ? 'tourists' : 'incidents')
          .select('*')
          .eq('id', eFIR.related_entity_id)
          .single();
          
        if (!error && data) {
          expandedEFIR = {
            ...eFIR,
            related_entity: data
          };
        }
      }
      
      // Generate PDF using the utility function
      const pdfBlob = await generatePDF({
        title: eFIR.title,
        type: 'E-FIR',
        reportNumber: `EFIR-${eFIR.id}`,
        date: new Date(eFIR.created_at || Date.now()).toLocaleDateString(),
        content: expandedEFIR,
        template: 'efir'
      });
      
      return pdfBlob;
    } catch (error) {
      console.error('Error generating E-FIR PDF:', error);
      throw error;
    }
  }
};

export default eFIRService;