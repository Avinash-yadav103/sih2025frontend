import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Paper, Box, Grid, Chip, Button,
  CircularProgress, Divider, Breadcrumbs, Link as MuiLink,
  Dialog, DialogContent, Snackbar, Alert, IconButton
} from '@mui/material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FileDownload, Edit, Share, ArrowBack,
  AccessTime, LocationOn, Person, Category
} from '@mui/icons-material';
import Layout from '../components/Layout';
import EFIRForm from '../components/EFIRForm';
import eFIRService from '../services/eFIRService';
import { format } from 'date-fns';

const ReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    fetchReportData();
  }, [id]);

  const fetchReportData = async () => {
    setLoading(true);
    try {
      const data = await eFIRService.getEFIRById(id);
      setReport(data);
    } catch (error) {
      console.error('Error fetching report:', error);
      setError(error.message || 'Failed to load report data');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleUpdateEFIR = (updatedEFIR) => {
    setReport(updatedEFIR);
    setOpenEditDialog(false);
    showNotification('E-FIR updated successfully', 'success');
  };

  const handleGeneratePDF = async () => {
    try {
      setLoading(true);
      const pdfBlob = await eFIRService.generateEFIRPDF(report);
      
      // Create a URL for the blob
      const url = URL.createObjectURL(pdfBlob);
      
      // Create a link element
      const link = document.createElement('a');
      link.href = url;
      link.download = `EFIR-${report.id}-${format(new Date(), 'yyyy-MM-dd')}.pdf`;
      
      // Append to the document, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showNotification('PDF generated successfully', 'success');
    } catch (error) {
      console.error('Error generating PDF:', error);
      showNotification('Failed to generate PDF', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: report.title,
          text: `E-FIR: ${report.title}`,
          url: window.location.href
        })
        .then(() => showNotification('Shared successfully', 'success'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      showNotification('Link copied to clipboard', 'info');
    }
  };

  const showNotification = (message, severity) => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  const renderStatusChip = (status) => {
    let color;
    switch (status) {
      case 'open':
        color = 'primary';
        break;
      case 'in_progress':
        color = 'warning';
        break;
      case 'resolved':
        color = 'success';
        break;
      case 'closed':
        color = 'default';
        break;
      default:
        color = 'default';
    }
    
    return (
      <Chip 
        label={status.replace('_', ' ')} 
        color={color} 
        sx={{ textTransform: 'capitalize' }}
      />
    );
  };

  const renderPriorityChip = (priority) => {
    let color;
    switch (priority) {
      case 'low':
        color = 'info';
        break;
      case 'medium':
        color = 'success';
        break;
      case 'high':
        color = 'warning';
        break;
      case 'critical':
        color = 'error';
        break;
      default:
        color = 'default';
    }
    
    return (
      <Chip 
        label={priority} 
        color={color} 
        sx={{ textTransform: 'capitalize' }}
      />
    );
  };

  if (loading) {
    return (
      <Layout>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Container>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="error">
              {error}
            </Typography>
            <Button 
              startIcon={<ArrowBack />}
              component={Link}
              to="/reports"
              sx={{ mt: 2 }}
            >
              Back to Reports
            </Button>
          </Paper>
        </Container>
      </Layout>
    );
  }

  if (!report) {
    return (
      <Layout>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">
              Report not found
            </Typography>
            <Button 
              startIcon={<ArrowBack />}
              component={Link}
              to="/reports"
              sx={{ mt: 2 }}
            >
              Back to Reports
            </Button>
          </Paper>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <MuiLink component={Link} to="/dashboard" underline="hover" color="inherit">
            Dashboard
          </MuiLink>
          <MuiLink component={Link} to="/reports" underline="hover" color="inherit">
            Reports
          </MuiLink>
          <Typography color="text.primary">E-FIR #{id}</Typography>
        </Breadcrumbs>
        
        <Paper elevation={3} sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Typography variant="h4" gutterBottom>
                {report.title}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap', mb: 1 }}>
                <Chip 
                  icon={<Category fontSize="small" />} 
                  label={`Type: ${report.entity_type}`}
                  variant="outlined"
                  size="small"
                />
                
                <Chip 
                  icon={<AccessTime fontSize="small" />}
                  label={`Filed: ${format(new Date(report.created_at), 'PPpp')}`}
                  variant="outlined"
                  size="small"
                />
                
                {report.location && (
                  <Chip 
                    icon={<LocationOn fontSize="small" />}
                    label={`Location: ${report.location}`}
                    variant="outlined"
                    size="small"
                  />
                )}
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                startIcon={<FileDownload />}
                onClick={handleGeneratePDF}
              >
                Download
              </Button>
              <Button
                variant="outlined"
                startIcon={<Share />}
                onClick={handleShare}
              >
                Share
              </Button>
              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={handleEdit}
              >
                Edit
              </Button>
            </Box>
          </Box>
          
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Status
                </Typography>
                {renderStatusChip(report.status)}
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Priority
                </Typography>
                {renderPriorityChip(report.priority)}
              </Box>
            </Grid>
            
            {report.description && (
              <Grid item xs={12}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Description
                  </Typography>
                  <Typography variant="body1">
                    {report.description}
                  </Typography>
                </Box>
              </Grid>
            )}
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                {report.entity_type === 'tourist' ? 'Missing Person Details' : 'Incident Details'}
              </Typography>
            </Grid>
            
            {report.entity_type === 'tourist' && report.details?.tourist_data && (
              <>
                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Name
                    </Typography>
                    <Typography variant="body1">
                      {report.details.tourist_data.name || 'Not available'}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Nationality
                    </Typography>
                    <Typography variant="body1">
                      {report.details.tourist_data.nationality || 'Not available'}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Passport Number
                    </Typography>
                    <Typography variant="body1">
                      {report.details.tourist_data.passport_number || 'Not available'}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Age
                    </Typography>
                    <Typography variant="body1">
                      {report.details.tourist_data.age || 'Not available'}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Gender
                    </Typography>
                    <Typography variant="body1">
                      {report.details.tourist_data.gender || 'Not available'}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Last Seen
                    </Typography>
                    <Typography variant="body1">
                      {report.details.last_seen ? 
                        format(new Date(report.details.last_seen), 'PPpp') : 
                        'Not available'}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Last Known Location
                    </Typography>
                    <Typography variant="body1">
                      {report.details.last_known_location || report.location || 'Not available'}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Appearance
                    </Typography>
                    <Typography variant="body1">
                      {report.details.appearance || 'Not available'}
                    </Typography>
                  </Box>
                </Grid>
              </>
            )}
            
            {report.entity_type !== 'tourist' && report.details?.incident_data && (
              <>
                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Incident Type
                    </Typography>
                    <Typography variant="body1">
                      {report.details.incident_data.incident_type || 'Not available'}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Incident Date
                    </Typography>
                    <Typography variant="body1">
                      {report.details.incident_data.incident_date ? 
                        format(new Date(report.details.incident_data.incident_date), 'PPpp') : 
                        'Not available'}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Location of Incident
                    </Typography>
                    <Typography variant="body1">
                      {report.details.incident_data.location_of_incident || 'Not available'}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Description of Incident
                    </Typography>
                    <Typography variant="body1">
                      {report.details.incident_data.description_of_incident || 'Not available'}
                    </Typography>
                  </Box>
                </Grid>
              </>
            )}
          </Grid>
        </Paper>
        
        {/* Edit Dialog */}
        <Dialog 
          open={openEditDialog} 
          onClose={handleCloseEditDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogContent>
            <EFIRForm 
              onSubmitSuccess={handleUpdateEFIR} 
              isEditing={true} 
              existingReport={report}
            />
          </DialogContent>
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
    </Layout>
  );
};

export default ReportDetail;