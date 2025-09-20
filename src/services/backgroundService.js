import { checkAndCreateAutomaticEFIRs } from './eFIRService';

// Interval for checking in milliseconds (e.g., every 5 minutes)
const CHECK_INTERVAL = 5 * 60 * 1000;

let intervalId = null;

/**
 * Start the background service for automatic E-FIR generation
 * @returns {void}
 */
export const startAutomaticEFIRService = () => {
  if (intervalId) {
    console.log('Automatic E-FIR service is already running');
    return;
  }
  
  console.log('Starting automatic E-FIR service...');
  
  // Run once immediately
  checkForAutomaticEFIRs();
  
  // Then set up interval
  intervalId = setInterval(checkForAutomaticEFIRs, CHECK_INTERVAL);
  
  console.log(`Automatic E-FIR service started with interval: ${CHECK_INTERVAL}ms`);
};

/**
 * Stop the background service
 * @returns {void}
 */
export const stopAutomaticEFIRService = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    console.log('Automatic E-FIR service stopped');
  }
};

/**
 * Check for situations requiring automatic E-FIRs
 * @returns {Promise<void>}
 */
const checkForAutomaticEFIRs = async () => {
  console.log('Checking for situations requiring automatic E-FIRs...');
  try {
    const createdFIRs = await checkAndCreateAutomaticEFIRs();
    
    if (createdFIRs.length > 0) {
      console.log(`Created ${createdFIRs.length} automatic E-FIRs`);
      
      // If you want to show notifications for each created FIR
      createdFIRs.forEach(fir => {
        // This would typically use a notification system
        console.log(`New automatic E-FIR created: ${fir.incident_type} for tourist ID ${fir.tourist_id}`);
        
        // In a real application, you might dispatch events or show notifications
        const event = new CustomEvent('new-automatic-efir', { detail: fir });
        window.dispatchEvent(event);
      });
    } else {
      console.log('No automatic E-FIRs needed at this time');
    }
  } catch (error) {
    console.error('Error in automatic E-FIR check:', error);
  }
};

/**
 * Run a manual check for automatic E-FIRs
 * @returns {Promise<Array>} - Array of created E-FIRs
 */
export const runManualCheck = async () => {
  console.log('Running manual check for automatic E-FIRs...');
  try {
    return await checkAndCreateAutomaticEFIRs();
  } catch (error) {
    console.error('Error in manual E-FIR check:', error);
    throw error;
  }
};

export default {
  startAutomaticEFIRService,
  stopAutomaticEFIRService,
  runManualCheck
};