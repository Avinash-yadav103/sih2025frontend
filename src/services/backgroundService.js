import { checkAndGenerateAutomaticEFIRs } from './reportService';

let checkInterval = null;

/**
 * Start the background service that periodically checks for tourists meeting E-FIR criteria
 * @param {number} intervalMinutes - How often to check (in minutes)
 */
export const startAutomaticEFIRChecks = (intervalMinutes = 15) => {
    // Stop any existing interval
    if (checkInterval) {
        clearInterval(checkInterval);
    }
    
    // Convert minutes to milliseconds
    const interval = intervalMinutes * 60 * 1000;
    
    // Run immediately on startup
    checkAndGenerateAutomaticEFIRs()
        .then((newReports) => {
            if (newReports && newReports.length > 0) {
                console.log(`Generated ${newReports.length} automatic E-FIRs`);
            }
        })
        .catch((error) => {
            console.error('Error generating automatic E-FIRs:', error);
        });
    
    // Set up interval to run checks periodically
    checkInterval = setInterval(() => {
        checkAndGenerateAutomaticEFIRs()
            .then((newReports) => {
                if (newReports && newReports.length > 0) {
                    console.log(`Generated ${newReports.length} automatic E-FIRs`);
                }
            })
            .catch((error) => {
                console.error('Error generating automatic E-FIRs:', error);
            });
    }, interval);
    
    console.log(`Automatic E-FIR checks scheduled every ${intervalMinutes} minutes`);
    
    return checkInterval;
};

/**
 * Stop the automatic E-FIR check service
 */
export const stopAutomaticEFIRChecks = () => {
    if (checkInterval) {
        clearInterval(checkInterval);
        checkInterval = null;
        console.log('Automatic E-FIR checks stopped');
        return true;
    }
    return false;
};