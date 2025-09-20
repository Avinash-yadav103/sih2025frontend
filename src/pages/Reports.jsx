import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Button, 
  Box, 
  Tabs, 
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Badge,
  Tooltip,
  Snackbar,
  Alert
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { 
  PictureAsPdf, 
  Visibility, 
  Share, 
  Add,
  Refresh,
  Download
} from '@mui/icons-material';
import EFIRForm from '../components/EFIRForm';
import { 
  getAllEFIRs, 
  generateEFIRPDF 
} from '../services/eFIRService.js';
import { runManualCheck } from '../services/backgroundService.js';

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

const Reports = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openShareDialog, setOpenShareDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [email, setEmail] = useState('');
  const [sharingLoading, setSharingLoading] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [generatingAutomaticReports, setGeneratingAutomaticReports] = useState(false);
  const [newAutomaticReportsCount, setNewAutomaticReportsCount] = useState(0);
  const [filters, setFilters] = useState({
    status: '',
    dateFrom: '',
    dateTo: ''
  });
  
  // Fetch reports on component mount and when filters change
  useEffect(() => {
    fetchReports();
  }, [filters]);
  
  // Listen for new automatic E-FIRs
  useEffect(() => {
    const handleNewAutomaticEFIR = () => {
      setNewAutomaticReportsCount(prev => prev + 1);
    };
    
    window.addEventListener('new-automatic-efir', handleNewAutomaticEFIR);
    
    return () => {
      window.removeEventListener('new-automatic-efir', handleNewAutomaticEFIR);
    };
  }, []);
  
  const fetchReports = async () => {
    setLoading(true);
    try {
      const data = await getAllEFIRs(filters);
      setReports(data);
      setNewAutomaticReportsCount(0); // Reset counter after fetching
    } catch (error) {
      console.error('Error fetching reports:', error);
      setNotification({
        open: true,
        message: 'Failed to fetch reports. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleViewReport = (reportId) => {
    navigate(`/reports/${reportId}`);
  };
  
  const handleGeneratePDF = async (reportId) => {
    try {
      const pdfBlob = await generateEFIRPDF(reportId);
      
      // Create a URL for the blob
      const blobUrl = URL.createObjectURL(pdfBlob);
      
      // Create a link element
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `E-FIR-${reportId}.pdf`;
      
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
  
  const handleOpenShareDialog = (report) => {
    setSelectedReport(report);
    setOpenShareDialog(true);
  };
  
  const handleCloseShareDialog = () => {
    setOpenShareDialog(false);
    setSelectedReport(null);
    setEmail('');
  };
  
  const handleShareReport = async () => {
    if (!email || !selectedReport) return;
    
    setSharingLoading(true);
    try {
      await shareEFIRViaEmail(selectedReport.id, email);
      
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
  
  const handleRunAutomaticReportCheck = async () => {
    setGeneratingAutomaticReports(true);
    try {
      const newReports = await runManualCheck();
      
      if (newReports.length > 0) {
        fetchReports(); // Refresh the list
        setNotification({
          open: true,
          message: `${newReports.length} new automatic E-FIR(s) generated`,
          severity: 'success'
        });
      } else {
        setNotification({
          open: true,
          message: 'No new automatic E-FIRs were needed at this time',
          severity: 'info'
        });
      }
    } catch (error) {
      console.error('Error generating automatic reports:', error);
      setNotification({
        open: true,
        message: 'Failed to generate automatic reports. Please try again.',
        severity: 'error'
      });
    } finally {
      setGeneratingAutomaticReports(false);
    }
  };
  
  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };
  
  const handleSubmitSuccess = (newReport) => {
    fetchReports(); // Refresh the list
    setActiveTab(0); // Switch back to the list tab
  };
  
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h4" gutterBottom>
              E-FIR Reports
              {newAutomaticReportsCount > 0 && (
                <Badge 
                  badgeContent={newAutomaticReportsCount} 
                  color="error" 
                  sx={{ ml: 2 }}
                />
              )}
            </Typography>
            
            <Box>
              <Tooltip title="Generate automatic reports">
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={generatingAutomaticReports ? <CircularProgress size={20} /> : <Refresh />}
                  onClick={handleRunAutomaticReportCheck}
                  disabled={generatingAutomaticReports}
                  sx={{ mr: 2 }}
                >
                  Run Auto Check
                </Button>
              </Tooltip>
              
              <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={() => setActiveTab(1)}
              >
                Create New E-FIR
              </Button>
            </Box>
          </Box>
          
          <Paper sx={{ width: '100%', mb: 2 }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="E-FIR List" />
              <Tab label="Create New E-FIR" />
            </Tabs>
            
            {/* E-FIR List Tab */}
            {activeTab === 0 && (
              <Box p={3}>
                {/* Filters */}
                <Grid container spacing={2} mb={3}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      select
                      fullWidth
                      label="Status"
                      name="status"
                      value={filters.status}
                      onChange={handleFilterChange}
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="">All Statuses</option>
                      <option value="PENDING">Pending</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="RESOLVED">Resolved</option>
                      <option value="REJECTED">Rejected</option>
                    </TextField>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="From Date"
                      name="dateFrom"
                      type="date"
                      value={filters.dateFrom}
                      onChange={handleFilterChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="To Date"
                      name="dateTo"
                      type="date"
                      value={filters.dateTo}
                      onChange={handleFilterChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
                
                {loading ? (
                  <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                    <CircularProgress />
                  </Box>
                ) : (
                  <TableContainer>
                    <Table aria-label="E-FIR reports table">
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>Type</TableCell>
                          <TableCell>Description</TableCell>
                          <TableCell>Location</TableCell>
                          <TableCell>Created</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Severity</TableCell>
                          <TableCell align="center">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {reports.length > 0 ? (
                          reports.map((report) => (
                            <TableRow 
                              key={report.id}
                              sx={{ 
                                backgroundColor: report.is_automatic ? 'rgba(255, 152, 0, 0.1)' : 'inherit',
                                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                              }}
                            >
                              <TableCell>{report.id}</TableCell>
                              <TableCell>
                                {report.incident_type.replace(/_/g, ' ')}
                                {report.is_automatic && (
                                  <Chip 
                                    size="small" 
                                    label="Auto" 
                                    color="warning" 
                                    variant="outlined" 
                                    sx={{ ml: 1 }} 
                                  />
                                )}
                              </TableCell>
                              <TableCell>
                                {report.description.length > 50 
                                  ? `${report.description.substring(0, 50)}...` 
                                  : report.description}
                              </TableCell>
                              <TableCell>{report.location}</TableCell>
                              <TableCell>{new Date(report.created_at).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <Chip 
                                  label={report.status} 
                                  color={getStatusColor(report.status)} 
                                  size="small" 
                                />
                              </TableCell>
                              <TableCell>
                                <Chip 
                                  label={report.severity} 
                                  size="small" 
                                  style={{ 
                                    backgroundColor: getSeverityColor(report.severity),
                                    color: 'white'
                                  }} 
                                />
                              </TableCell>
                              <TableCell align="center">
                                <Tooltip title="View Details">
                                  <IconButton 
                                    size="small" 
                                    onClick={() => handleViewReport(report.id)}
                                    color="primary"
                                  >
                                    <Visibility />
                                  </IconButton>
                                </Tooltip>
                                
                                <Tooltip title="Download PDF">
                                  <IconButton 
                                    size="small" 
                                    onClick={() => handleGeneratePDF(report.id)}
                                    color="secondary"
                                  >
                                    <PictureAsPdf />
                                  </IconButton>
                                </Tooltip>
                                
                                <Tooltip title="Share E-FIR">
                                  <IconButton 
                                    size="small" 
                                    onClick={() => handleOpenShareDialog(report)}
                                    color="info"
                                  >
                                    <Share />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={8} align="center">
                              No reports found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>
            )}
            
            {/* Create New E-FIR Tab */}
            {activeTab === 1 && (
              <Box p={3}>
                <EFIRForm onSubmitSuccess={handleSubmitSuccess} />
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
      
      {/* Share Dialog */}
      <Dialog open={openShareDialog} onClose={handleCloseShareDialog}>
        <DialogTitle>Share E-FIR Report</DialogTitle>
        <DialogContent>
          <Box mt={2}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseShareDialog}>Cancel</Button>
          <Button 
            onClick={handleShareReport} 
            color="primary" 
            disabled={!email || sharingLoading}
            startIcon={sharingLoading ? <CircularProgress size={20} /> : null}
          >
            Share
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Reports;