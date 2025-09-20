import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Button, 
  Box, 
  Chip, 
  Divider, 
  CircularProgress,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowBack, 
  PictureAsPdf, 
  Share, 
  History,
  Edit,
  Send,
  AccessTime,
  Person,
  LocationOn,
  ErrorOutline,
  Label
} from '@mui/icons-material';
import { 
  getEFIRById, 
  updateEFIRStatus, 
  generateEFIRPDF,
  shareEFIRViaEmail 
} from '../services/eFIRService.js';

// Status color mapping
const getStatusColor = (status) => {
  switch (status) {
    case 'PENDING':
      return 'warning';
    case 'IN_PROGRESS':
      return 'info';
    case 'RESOLVED':
      return 'success';
    case 'REJECTED':
      return 'error';
    default:
      return 'default';
  }
};

// Severity color mapping
const getSeverityColor = (severity) => {
  switch (severity) {
    case 'LOW':
      return '#66bb6a';
    case 'MEDIUM':
      return '#ffa726';
    case 'HIGH':
      return '#f44336';
    case 'CRITICAL':
      return '#b71c1c';
    default:
      return '#9e9e9e';
  }
};

const STATUS_OPTIONS = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'RESOLVED', label: 'Resolved' },
  { value: 'REJECTED', label: 'Rejected' }
];

const ReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editStatus, setEditStatus] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [openShareDialog, setOpenShareDialog] = useState(false);
  const [email, setEmail] = useState('');
  const [sharingLoading, setSharingLoading] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // Fetch report details
  useEffect(() => {
    const fetchReportDetails = async () => {
      setLoading(true);
      try {
        const data = await getEFIRById(id);
        setReport(data);
        setNewStatus(data.status);
      } catch (err) {
        console.error('Error fetching report details:', err);
        setError(err.message || 'Failed to load report details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchReportDetails();
  }, [id]);
  
  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };
  
  const handleUpdateStatus = async () => {
    if (newStatus === report.status) {
      setEditStatus(false);
      return;
    }
    
    setUpdateLoading(true);
    try {
      const updatedReport = await updateEFIRStatus(id, newStatus);
      setReport({ ...report, status: newStatus });
      setEditStatus(false);
      
      setNotification({
        open: true,
        message: 'Report status updated successfully',
        severity: 'success'
      });
    } catch (err) {
      console.error('Error updating report status:', err);
      setNotification({
        open: true,
        message: 'Failed to update report status',
        severity: 'error'
      });
    } finally {
      setUpdateLoading(false);
    }
  };
  
  const handleGeneratePDF = async () => {
    try {
      const pdfBlob = await generateEFIRPDF(id);
      
      // Create a URL for the blob
      const blobUrl = URL.createObjectURL(pdfBlob);
      
      // Create a link element
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `E-FIR-${id}.pdf`;
      
      // Append to the document, click and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Revoke the object URL to free up memory
      URL.revokeObjectURL(blobUrl);
      
      setNotification({
        open: true,
        message: 'PDF generated and downloaded successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      setNotification({
        open: true,
        message: 'Failed to generate PDF. Please try again.',
        severity: 'error'
      });
    }
  };
  
  const handleOpenShareDialog = () => {
    setOpenShareDialog(true);
  };
  
  const handleCloseShareDialog = () => {
    setOpenShareDialog(false);
    setEmail('');
  };
  
  const handleShareReport = async () => {
    if (!email) return;
    
    setSharingLoading(true);
    try {
      await shareEFIRViaEmail(id, email);
      
      setNotification({
        open: true,
        message: `Report shared successfully with ${email}`,
        severity: 'success'
      });
      
      handleCloseShareDialog();
    } catch (error) {
      console.error('Error sharing report:', error);
      setNotification({
        open: true,
        message: 'Failed to share report. Please try again.',
        severity: 'error'
      });
    } finally {
      setSharingLoading(false);
    }
  };
  
  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };
  
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h5" color="error" gutterBottom>
            Error loading report details
          </Typography>
          <Typography variant="body1">{error}</Typography>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<ArrowBack />}
            onClick={() => navigate('/reports')}
            sx={{ mt: 3 }}
          >
            Back to Reports
          </Button>
        </Paper>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button 
        variant="outlined" 
        startIcon={<ArrowBack />} 
        onClick={() => navigate('/reports')}
        sx={{ mb: 3 }}
      >
        Back to Reports
      </Button>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h4">
                E-FIR Report #{id}
                {report?.is_automatic && (
                  <Chip 
                    size="small" 
                    label="Auto Generated" 
                    color="warning" 
                    sx={{ ml: 2 }} 
                  />
                )}
              </Typography>
              
              <Box>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<PictureAsPdf />}
                  onClick={handleGeneratePDF}
                  sx={{ mr: 1 }}
                >
                  Download PDF
                </Button>
                
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<Share />}
                  onClick={handleOpenShareDialog}
                >
                  Share
                </Button>
              </Box>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            {/* Status and Created Date */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Box display="flex" alignItems="center">
                <Typography variant="subtitle1" component="span" sx={{ mr: 1 }}>
                  Status:
                </Typography>
                
                {editStatus ? (
                  <Box display="flex" alignItems="center">
                    <TextField
                      select
                      size="small"
                      value={newStatus}
                      onChange={handleStatusChange}
                      sx={{ minWidth: 150, mr: 1 }}
                    >
                      {STATUS_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    
                    <Button 
                      variant="contained" 
                      size="small" 
                      onClick={handleUpdateStatus}
                      disabled={updateLoading}
                      startIcon={updateLoading ? <CircularProgress size={20} /> : <Send />}
                    >
                      Update
                    </Button>
                  </Box>
                ) : (
                  <Box display="flex" alignItems="center">
                    <Chip 
                      label={report?.status} 
                      color={getStatusColor(report?.status)} 
                    />
                    <IconButton size="small" onClick={() => setEditStatus(true)}>
                      <Edit fontSize="small" />
                    </IconButton>
                  </Box>
                )}
              </Box>
              
              <Typography variant="subtitle1" component="span">
                Created: {new Date(report?.created_at).toLocaleString()}
              </Typography>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            {/* Report Details */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                  Reported By
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {report?.reporter_name || 'N/A'}
                </Typography>
                
                <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                  Contact
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {report?.reporter_contact || 'N/A'}
                </Typography>
                
                <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                  Email
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {report?.reporter_email || 'N/A'}
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                  Assigned To
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {report?.assigned_to || 'Unassigned'}
                </Typography>
                
                <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                  Severity
                </Typography>
                <Chip 
                  label={report?.severity} 
                  sx={{ 
                    backgroundColor: getSeverityColor(report?.severity), 
                    color: '#fff',
                    fontWeight: 'medium'
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="h6" gutterBottom>
                  Description
                </Typography>
                <Typography variant="body1" paragraph>
                  {report?.description || 'No description provided.'}
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="h6" gutterBottom>
                  Evidence
                </Typography>
                
                {report?.evidence?.length > 0 ? (
                  <List>
                    {report.evidence.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          {item.type === 'image' ? (
                            <PictureAsPdf color="action" />
                          ) : item.type === 'video' ? (
                            <VideoCamera color="action" />
                          ) : (
                            <AttachFile color="action" />
                          )}
                        </ListItemIcon>
                        <ListItemText 
                          primary={item.name} 
                          secondary={item.uploaded_at ? new Date(item.uploaded_at).toLocaleString() : 'Uploaded at unknown time'}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No evidence uploaded.
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Share Dialog */}
      <Dialog 
        open={openShareDialog} 
        onClose={handleCloseShareDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Share Report
        </DialogTitle>
        
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Share this report via email:
          </Typography>
          
          <TextField
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleCloseShareDialog} color="primary">
            Cancel
          </Button>
          
          <Button 
            onClick={handleShareReport} 
            color="secondary"
            disabled={sharingLoading}
            startIcon={sharingLoading ? <CircularProgress size={20} /> : <Send />}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Notification Snackbar */}
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity} 
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ReportDetail;