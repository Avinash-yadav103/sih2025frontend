import { checkAndCreateAutomaticEFIRs } from './eFIRService.js';

/**
 * Service to run background tasks like checking for missing tourists
 */

let isRunning = false;
let missedCheckins = new Map();
const MAX_MISSED_CHECKINS = 3;

/**
 * Start the background monitoring service
 * @param {Function} onEFIRGenerated - Callback when an E-FIR is generated
 * @returns {Object} - Control methods for the service
 */
export const startBackgroundMonitoring = (onEFIRGenerated) => {
  if (isRunning) {
    console.log('Background monitoring is already running');
    return;
  }
  
  isRunning = true;
  console.log('Starting background monitoring service');
  
  // Create an interval to check for overdue tourists
  const checkOverdueInterval = setInterval(() => {
    checkOverdueTourists(onEFIRGenerated);
  }, 60000); // Check every minute (reduce interval for production)
  
  // Return methods to control the service
  return {
    stop: () => {
      clearInterval(checkOverdueInterval);
      isRunning = false;
      console.log('Background monitoring stopped');
    },
    isRunning: () => isRunning,
    checkNow: () => checkOverdueTourists(onEFIRGenerated)
  };
};

/**
 * Check for overdue tourists and generate E-FIRs if needed
 * @param {Function} onEFIRGenerated - Callback when an E-FIR is generated
 */
const checkOverdueTourists = async (onEFIRGenerated) => {
  console.log('Checking for overdue tourists...');
  
  try {
    // In a real app, fetch this from API
    // Here we'll simulate by checking any loaded tourists
    const loadedTourists = window.touristData || [];
    
    const now = new Date();
    const overdueThreshold = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
    
    for (const tourist of loadedTourists) {
      // Skip tourists who are already reported missing
      if (tourist.status === 'missing') continue;
      
      const lastSeen = tourist.last_seen ? new Date(tourist.last_seen) : null;
      
      // If we have a last_seen timestamp and it's old
      if (lastSeen && (now - lastSeen > overdueThreshold)) {
        // Get or initialize missed checkins count
        const missedCount = missedCheckins.get(tourist.id) || 0;
        
        // Increment missed checkins
        missedCheckins.set(tourist.id, missedCount + 1);
        
        console.log(`Tourist ${tourist.name} (ID: ${tourist.id}) missed check-in. Count: ${missedCount + 1}`);
        
        // If tourist has missed too many check-ins, generate an E-FIR
        if (missedCount + 1 >= MAX_MISSED_CHECKINS) {
          console.log(`Generating E-FIR for missing tourist: ${tourist.name}`);
          
          try {
            const efir = await generateMissingPersonEFIR(tourist);
            
            // Mark the tourist as missing in our local data
            tourist.status = 'missing';
            
            // Call the callback if provided
            if (onEFIRGenerated && typeof onEFIRGenerated === 'function') {
              onEFIRGenerated(efir, tourist);
            }
            
            // Clear from our tracking map
            missedCheckins.delete(tourist.id);
          } catch (error) {
            console.error('Failed to generate E-FIR:', error);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error in background monitoring:', error);
  }
};

/**
 * Process a tourist check-in
 * @param {Object} tourist - The tourist data
 */
export const processTouristCheckin = (tourist) => {
  if (!tourist || !tourist.id) return;
  
  // Update last seen time
  tourist.last_seen = new Date().toISOString();
  
  // Reset missed checkins if they had any
  if (missedCheckins.has(tourist.id)) {
    missedCheckins.delete(tourist.id);
    console.log(`Reset missed check-ins for tourist ${tourist.name} (ID: ${tourist.id})`);
  }
};

/**
 * Report a tourist as missing and generate E-FIR
 * @param {Object} tourist - The tourist data
 * @param {string} reportedBy - The person reporting
 * @returns {Promise<Object>} - The generated E-FIR
 */
export const reportTouristMissing = async (tourist, reportedBy = 'User') => {
  try {
    // Update status
    tourist.status = 'missing';
    
    // Generate E-FIR
    const efir = await generateMissingPersonEFIR(tourist, reportedBy);
    
    return efir;
  } catch (error) {
    console.error('Failed to report tourist as missing:', error);
    throw error;
  }
};

/**
 * Manually triggers checking for automatic eFIRs and other background tasks
 * @returns {Promise<Object>} Results of the manual check
 */
export const runManualCheck = async () => {
  try {
    console.log('Running manual background checks...');
    
    // Import any required functions
    const { checkAndCreateAutomaticEFIRs } = await import('./eFIRService.js');
    
    // Run the various background checks
    const efirResults = await checkAndCreateAutomaticEFIRs();
    
    // Add more background checks as needed
    
    return {
      success: true,
      efirResults,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error running manual background checks:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export default {
  startBackgroundMonitoring,
  processTouristCheckin,
  reportTouristMissing
};