import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

/**
 * Generate a PDF document for an E-FIR
 * @param {Object} efir - The E-FIR data
 * @returns {jsPDF} - The PDF document object
 */
export const generateEFIRPdf = (efir) => {
  // Create a new PDF document
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.text('ELECTRONIC FIRST INFORMATION REPORT', 105, 20, { align: 'center' });
  
  // Add FIR Number
  doc.setFontSize(16);
  doc.text(`FIR Number: ${efir.fir_number}`, 105, 30, { align: 'center' });
  
  // Add horizontal line
  doc.setLineWidth(0.5);
  doc.line(20, 35, 190, 35);
  
  // Add reported date
  doc.setFontSize(12);
  doc.text(`Date: ${new Date(efir.reported_date).toLocaleDateString()}`, 20, 45);
  doc.text(`Time: ${new Date(efir.reported_date).toLocaleTimeString()}`, 20, 52);
  
  // Add status info
  doc.setFontSize(12);
  doc.text(`Status: ${efir.status}`, 150, 45);
  doc.text(`Priority: ${efir.priority}`, 150, 52);
  
  // Add incident type
  doc.setFontSize(14);
  doc.text(`Incident Type: ${efir.incident_type.replace(/_/g, ' ')}`, 20, 65);
  
  // Add subject
  doc.setFontSize(14);
  doc.text('Subject:', 20, 75);
  doc.setFontSize(12);
  
  // Handle multi-line subject text
  const splitSubject = doc.splitTextToSize(efir.subject, 170);
  doc.text(splitSubject, 20, 82);
  
  let yPos = 82 + (splitSubject.length * 7);
  
  // Add description
  doc.setFontSize(14);
  doc.text('Description:', 20, yPos);
  doc.setFontSize(12);
  
  // Handle multi-line description text
  const splitDescription = doc.splitTextToSize(efir.description, 170);
  doc.text(splitDescription, 20, yPos + 7);
  
  yPos = yPos + 7 + (splitDescription.length * 7) + 10;
  
  // Add location information
  doc.setFontSize(14);
  doc.text('Location Information:', 20, yPos);
  doc.setFontSize(12);
  doc.text(`Latitude: ${efir.location_lat}`, 20, yPos + 7);
  doc.text(`Longitude: ${efir.location_lng}`, 20, yPos + 14);
  
  yPos += 25;
  
  // Add person information if available
  if (efir.victim_name) {
    doc.setFontSize(14);
    doc.text('Person Information:', 20, yPos);
    doc.setFontSize(12);
    doc.text(`Name: ${efir.victim_name}`, 20, yPos + 7);
    
    // Parse victim details if available
    if (efir.victim_details) {
      try {
        const victimDetails = JSON.parse(efir.victim_details);
        
        const detailsTable = [];
        
        if (victimDetails.id) detailsTable.push(['ID', victimDetails.id]);
        if (victimDetails.phone) detailsTable.push(['Phone', victimDetails.phone]);
        if (victimDetails.nationality) detailsTable.push(['Nationality', victimDetails.nationality]);
        if (victimDetails.gender) detailsTable.push(['Gender', victimDetails.gender]);
        if (victimDetails.age) detailsTable.push(['Age', victimDetails.age]);
        if (victimDetails.last_seen) detailsTable.push(['Last Seen', new Date(victimDetails.last_seen).toLocaleString()]);
        
        if (detailsTable.length > 0) {
          doc.autoTable({
            startY: yPos + 10,
            head: [['Detail', 'Value']],
            body: detailsTable,
            theme: 'grid',
            styles: { fontSize: 10 },
            headStyles: { fillColor: [66, 66, 66] },
            margin: { left: 20, right: 20 }
          });
          
          yPos = doc.lastAutoTable.finalY + 10;
        } else {
          yPos += 15;
        }
      } catch (e) {
        console.error('Error parsing victim details:', e);
        yPos += 15;
      }
    } else {
      yPos += 15;
    }
  }
  
  // Add additional details
  doc.setFontSize(14);
  doc.text('Report Information:', 20, yPos);
  doc.setFontSize(12);
  doc.text(`Reported By: ${efir.reported_by}`, 20, yPos + 7);
  doc.text(`Generated On: ${new Date().toLocaleString()}`, 20, yPos + 14);
  
  // Add footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(`Page ${i} of ${pageCount}`, 105, 285, { align: 'center' });
    doc.text('This is an electronically generated document and does not require signature.', 105, 292, { align: 'center' });
  }
  
  return doc;
};

/**
 * Download an E-FIR as a PDF file
 * @param {Object} efir - The E-FIR data
 */
export const downloadEFIRPdf = (efir) => {
  const doc = generateEFIRPdf(efir);
  doc.save(`E-FIR_${efir.fir_number}.pdf`);
};

/**
 * Generate and open an E-FIR PDF in a new window
 * @param {Object} efir - The E-FIR data
 */
export const openEFIRPdf = (efir) => {
  const doc = generateEFIRPdf(efir);
  window.open(URL.createObjectURL(doc.output('blob')));
};

/**
 * Generate a data URL for an E-FIR PDF
 * @param {Object} efir - The E-FIR data
 * @returns {string} - The data URL
 */
export const getEFIRPdfDataUrl = (efir) => {
  const doc = generateEFIRPdf(efir);
  return URL.createObjectURL(doc.output('blob'));
};

export default {
  generateEFIRPdf,
  downloadEFIRPdf,
  openEFIRPdf,
  getEFIRPdfDataUrl
};