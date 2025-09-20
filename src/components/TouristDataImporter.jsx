import React, { useState, useRef } from 'react';
import { 
  Button, 
  Card, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography, 
  Box, 
  Alert, 
  Snackbar, 
  IconButton
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteIcon from '@mui/icons-material/Delete';

const TouristDataImporter = ({ onDataImport, currentData }) => {
  const [previewData, setPreviewData] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  const fileInputRef = useRef(null);
  
  // Expected schema for tourist data validation
  const requiredFields = ['id', 'name', 'latitude', 'longitude', 'status'];
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/json') {
        processFile(file);
      } else {
        showNotification('Please drop a JSON file', 'error');
      }
    }
  };
  
  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };
  
  const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        // Validate data structure
        if (!Array.isArray(data)) {
          throw new Error('Data must be an array of tourist records');
        }
        
        // Validate schema for each record
        for (const record of data.slice(0, 5)) { // Check first 5 records
          for (const field of requiredFields) {
            if (!(field in record)) {
              throw new Error(`Required field "${field}" missing in some records`);
            }
          }
          
          // Validate coordinates
          if (typeof record.latitude !== 'number' || typeof record.longitude !== 'number') {
            throw new Error('Latitude and longitude must be numbers');
          }
        }
        
        // Set preview data
        setPreviewData(data);
        
        // Send data to parent component
        onDataImport(data);
        
        showNotification(`Successfully imported ${data.length} tourist records`, 'success');
      } catch (error) {
        console.error('Error processing file:', error);
        showNotification(`Error: ${error.message}`, 'error');
      }
    };
    
    reader.onerror = () => {
      showNotification('Error reading file', 'error');
    };
    
    reader.readAsText(file);
  };
  
  const handleExport = () => {
    if (!currentData || currentData.length === 0) {
      showNotification('No data to export', 'warning');
      return;
    }
    
    const dataStr = JSON.stringify(currentData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const exportFileDefaultName = `tourists_export_${timestamp}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showNotification('Data exported successfully', 'success');
  };
  
  const handleClearData = () => {
    setPreviewData(null);
    onDataImport([]);
    showNotification('Tourist data cleared', 'info');
  };
  
  const showNotification = (message, severity) => {
    setNotification({
      open: true,
      message,
      severity
    });
  };
  
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };
  
  return (
    <Card sx={{ mb: 3, p: 2 }}>
      <Typography variant="h6" gutterBottom>Tourist Data Import/Export</Typography>
      
      <Box 
        sx={{ 
          border: '2px dashed #ccc', 
          borderRadius: 2, 
          p: 3, 
          mb: 2, 
          textAlign: 'center',
          bgcolor: '#f9f9f9',
          cursor: 'pointer'
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
      >
        <input
          type="file"
          accept=".json"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileSelect}
        />
        <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
        <Typography variant="body1">
          Drag and drop a JSON file here, or click to select a file
        </Typography>
        <Typography variant="caption" color="textSecondary">
          File should contain an array of tourist records with id, name, latitude, longitude, and status fields
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button 
          variant="contained" 
          startIcon={<FileDownloadIcon />}
          onClick={handleExport}
          disabled={!currentData || currentData.length === 0}
        >
          Export Data
        </Button>
        <Button 
          variant="outlined" 
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleClearData}
          disabled={!currentData || currentData.length === 0}
        >
          Clear Data
        </Button>
      </Box>
      
      {previewData && previewData.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Data Preview ({previewData.length} records):
          </Typography>
          <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Latitude</TableCell>
                  <TableCell>Longitude</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {previewData.slice(0, 10).map((record, index) => (
                  <TableRow key={record.id || index}>
                    <TableCell>{record.id}</TableCell>
                    <TableCell>{record.name}</TableCell>
                    <TableCell>{record.latitude}</TableCell>
                    <TableCell>{record.longitude}</TableCell>
                    <TableCell>
                      <Box 
                        component="span" 
                        sx={{ 
                          bgcolor: record.status === 'active' ? 'success.light' : 
                                  record.status === 'missing' ? 'error.light' : 
                                  record.status === 'overdue' ? 'warning.light' : 'info.light',
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: '0.75rem'
                        }}
                      >
                        {record.status}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {previewData.length > 10 && (
            <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1 }}>
              Showing 10 of {previewData.length} records
            </Typography>
          )}
        </Box>
      )}
      
      <Snackbar 
        open={notification.open} 
        autoHideDuration={5000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default TouristDataImporter;