import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Button, Box, IconButton,
  Dialog, DialogActions, DialogContent, DialogTitle, 
  TextField, CircularProgress, Tabs, Tab, Snackbar, Alert,
  Chip, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FileDownload, Delete, Edit, Add, Share, VisibilityOutlined } from '@mui/icons-material';
import Layout from '../components/Layout';
import eFIRService from '../services/eFIRService';
import { generatePDF } from '../utils/pdfGenerator';
import EFIRForm from '../components/EFIRForm';
import { format } from 'date-fns';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [eFIRs, setEFIRs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  const navigate = useNavigate();

  // Fetch reports and E-FIRs on component mount
  useEffect(() => {
    fetchReports();
    fetchEFIRs();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      // Example data structure - replace with actual API call
      const dummyReports = [
        { id: 1, title: 'Monthly Security Report', type: 'security', created_at: '2023-09-15T10:30:00Z' },
        { id: 2, title: 'Tourist Flow Analysis', type: 'analytics', created_at: '2023-09-10T14:45:00Z' },
        { id: 3, title: 'Incident Summary Q3', type: 'incident', created_at: '2023-09-05T09:15:00Z' },
      ];
      setReports(dummyReports);
    } catch (error) {
      console.error('Error fetching reports:', error);
      showNotification('Failed to fetch reports', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchEFIRs = async () => {
    setLoading(true);
    try {
      const data = await eFIRService.getAllEFIRs();
      setEFIRs(data || []);
    } catch (error) {
      console.error('Error fetching E-FIRs:', error);
      showNotification('Failed to fetch E-FIRs', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    setSearchQuery('');
    setStatusFilter('all');
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const filteredEFIRs = eFIRs.filter(efir => {
    const matchesSearch = searchQuery === '' || 
      efir.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      efir.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || efir.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCreateEFIR = (newEFIR) => {
    setEFIRs([newEFIR, ...eFIRs]);
    handleCloseDialog();
  };

  const handleViewEFIR = (id) => {
    navigate(`/reports/${id}`);
  };

  const handleGeneratePDF = async (efir) => {
    try {
      setLoading(true);
      const pdfBlob = await eFIRService.generateEFIRPDF(efir);
      
      // Create a URL for the blob
      const url = URL.createObjectURL(pdfBlob);
      
      // Create a link element
      const link = document.createElement('a');
      link.href = url;
      link.download = `EFIR-${efir.id}-${format(new Date(), 'yyyy-MM-dd')}.pdf`;
      
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

  const handleShareEFIR = (efir) => {
    if (navigator.share) {
      navigator
        .share({
          title: efir.title,
          text: `E-FIR: ${efir.title}`,
          url: `${window.location.origin}/reports/${efir.id}`
        })
        .then(() => showNotification('Shared successfully', 'success'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(`${window.location.origin}/reports/${efir.id}`);
      showNotification('Link copied to clipboard', 'info');
    }
  };

  const handleDeleteEFIR = async (id) => {
    if (window.confirm('Are you sure you want to delete this E-FIR?')) {
      try {
        setLoading(true);
        await eFIRService.deleteEFIR(id);
        setEFIRs(eFIRs.filter(efir => efir.id !== id));
        showNotification('E-FIR deleted successfully', 'success');
      } catch (error) {
        console.error('Error deleting E-FIR:', error);
        showNotification('Failed to delete E-FIR', 'error');
      } finally {
        setLoading(false);
      }
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
    
    return <Chip label={status.replace('_', ' ')} color={color} size="small" />;
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
    
    return <Chip label={priority} color={color} size="small" />;
  };

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Reports & E-FIRs
        </Typography>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={currentTab} onChange={handleTabChange} aria-label="report tabs">
            <Tab label="E-FIRs" />
            <Tab label="Reports" />
          </Tabs>
        </Box>
        
        {currentTab === 0 && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flex: 1 }}>
                <TextField
                  label="Search E-FIRs"
                  variant="outlined"
                  size="small"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  sx={{ width: 250 }}
                />
                
                <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={statusFilter}
                    onChange={handleStatusFilterChange}
                    label="Status"
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="open">Open</MenuItem>
                    <MenuItem value="in_progress">In Progress</MenuItem>
                    <MenuItem value="resolved">Resolved</MenuItem>
                    <MenuItem value="closed">Closed</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              
              <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={handleOpenDialog}
              >
                New E-FIR
              </Button>
            </Box>
            
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  ) : filteredEFIRs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                        <Typography variant="body1" color="textSecondary">
                          No E-FIRs found
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredEFIRs.map((efir) => (
                      <TableRow key={efir.id} hover>
                        <TableCell>{efir.title}</TableCell>
                        <TableCell>{renderStatusChip(efir.status)}</TableCell>
                        <TableCell>{renderPriorityChip(efir.priority)}</TableCell>
                        <TableCell>
                          <Chip 
                            label={efir.entity_type} 
                            size="small"
                            color={efir.entity_type === 'tourist' ? 'secondary' : 'primary'}
                          />
                        </TableCell>
                        <TableCell>
                          {efir.created_at ? format(new Date(efir.created_at), 'dd MMM yyyy, HH:mm') : 'N/A'}
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <IconButton 
                              size="small" 
                              color="primary" 
                              onClick={() => handleViewEFIR(efir.id)}
                              title="View"
                            >
                              <VisibilityOutlined fontSize="small" />
                            </IconButton>
                            
                            <IconButton 
                              size="small" 
                              color="secondary" 
                              onClick={() => handleGeneratePDF(efir)}
                              title="Download PDF"
                            >
                              <FileDownload fontSize="small" />
                            </IconButton>
                            
                            <IconButton 
                              size="small" 
                              color="info" 
                              onClick={() => handleShareEFIR(efir)}
                              title="Share"
                            >
                              <Share fontSize="small" />
                            </IconButton>
                            
                            <IconButton 
                              size="small" 
                              color="error" 
                              onClick={() => handleDeleteEFIR(efir.id)}
                              title="Delete"
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
        
        {currentTab === 1 && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <TextField
                label="Search Reports"
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{ width: 250 }}
              />
              
              <Button variant="contained" color="primary" startIcon={<Add />}>
                Generate Report
              </Button>
            </Box>
            
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  ) : reports.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                        <Typography variant="body1" color="textSecondary">
                          No reports found
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    reports
                      .filter(report => 
                        searchQuery === '' || 
                        report.title.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((report) => (
                      <TableRow key={report.id} hover>
                        <TableCell>{report.title}</TableCell>
                        <TableCell>
                          <Chip 
                            label={report.type} 
                            size="small"
                            color={
                              report.type === 'security' ? 'error' : 
                              report.type === 'analytics' ? 'info' : 'default'
                            }
                          />
                        </TableCell>
                        <TableCell>
                          {format(new Date(report.created_at), 'dd MMM yyyy, HH:mm')}
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <IconButton size="small" color="primary">
                              <VisibilityOutlined fontSize="small" />
                            </IconButton>
                            
                            <IconButton size="small" color="secondary">
                              <FileDownload fontSize="small" />
                            </IconButton>
                            
                            <IconButton size="small" color="info">
                              <Share fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
        
        {/* E-FIR Creation Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>Create New E-FIR</DialogTitle>
          <DialogContent>
            <EFIRForm onSubmit={handleCreateEFIR} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
          </DialogActions>
        </Dialog>
        
        {/* Notification Snackbar */}
        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
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

export default Reports;