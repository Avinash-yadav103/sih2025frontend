import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminDashboard.css';
import { 
  Grid, Card, CardContent, Typography, Paper, Tabs, Tab, Box, 
  TextField, Button, Select, MenuItem, FormControl, InputLabel,
  Stepper, Step, StepLabel, IconButton, Badge, Divider,
  Avatar, CircularProgress, Chip, List, ListItem, ListItemText, ListItemIcon
} from '@mui/material';

// Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EventIcon from '@mui/icons-material/Event';
import EditNoteIcon from '@mui/icons-material/EditNote';

function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "Admin User" });
  const [activeTab, setActiveTab] = useState('overview');
  // Form state management
  const [formStep, setFormStep] = useState(0);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState('');
  const [notificationCount, setNotificationCount] = useState(3);
  
  // Add popup state
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  
  // Add notification dropdown state
  const [notificationOpen, setNotificationOpen] = useState(false);
  const notificationRef = useRef(null);

  // Sample notifications data for admin
  const notifications = [
    {
      id: 1,
      type: 'alert',
      title: 'Emergency Request',
      message: 'Tourist from Japan requested medical assistance',
      time: '5 minutes ago',
      read: false,
      path: '/admin/alerts/1'
    },
    {
      id: 2,
      type: 'tourist',
      title: 'New Registration',
      message: 'Tourist group of 5 registered from Germany',
      time: '15 minutes ago',
      read: false,
      path: '/admin/tourists/2'
    },
    {
      id: 3,
      type: 'info',
      title: 'System Update',
      message: 'Database maintenance scheduled for tonight',
      time: '2 hours ago',
      read: true,
      path: '/admin/settings'
    }
  ];
  
  const [formData, setFormData] = useState({
    // Personal details
    fullName: '',
    email: '',
    phone: '',
    nationality: '',
    password: '',
    // Document details
    idType: '',
    idNumber: '',
    kycId: '',
    emergencyContact: '',
    // Itinerary details
    tripName: '',
    startDate: '',
    endDate: '',
    itineraryDays: [
      { day: 1, plan: '' }
    ]
  });

  // Sample tourist data for Manage Tourists section
  const [tourists, setTourists] = useState([
    {
      id: 'T001',
      name: 'John Smith',
      nationality: 'American',
      phone: '+1-555-123456',
      tripName: 'Assam Wildlife Tour',
      startDate: '2025-09-20',
      endDate: '2025-09-25',
      status: 'Active'
    },
    {
      id: 'T002',
      name: 'Priya Sharma',
      nationality: 'Indian',
      phone: '+91-9876543210',
      tripName: 'Meghalaya Village Visit',
      startDate: '2025-09-18',
      endDate: '2025-09-22',
      status: 'Active'
    },
    {
      id: 'T003',
      name: 'Takashi Yamamoto',
      nationality: 'Japanese',
      phone: '+81-90-1234-5678',
      tripName: 'Nagaland Festival',
      startDate: '2025-09-15',
      endDate: '2025-09-21',
      status: 'Completed'
    }
  ]);

  useEffect(() => {
    // Check if user is authenticated, redirect if not
    const authToken = localStorage.getItem('authToken');
    if (!authToken || authToken !== 'admin-token') {
      navigate('/admin/login');
      return;
    }
  }, [navigate]);

  // Auto-close popup after 3 seconds
  useEffect(() => {
    if (showSuccessPopup) {
      const timer = setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showSuccessPopup]);
  
  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [notificationRef]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/admin/login');
  };

  const toggleNotifications = () => {
    setNotificationOpen(!notificationOpen);
  };

  const handleNotificationClick = (path) => {
    setNotificationOpen(false);
    // Navigate to the specific notification details
    console.log(`Navigating to: ${path}`);
    // Implement actual navigation if paths are valid
    // navigate(path);
  };

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch(type) {
      case 'alert':
        return <ErrorOutlineIcon color="error" />;
      case 'tourist':
        return <PersonOutlineIcon color="primary" />;
      case 'info':
        return <InfoIcon color="info" />;
      default:
        return <NotificationsNoneIcon />;
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      // Create and set file preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  // Handle itinerary day changes
  const handleDayPlanChange = (index, value) => {
    const updatedDays = [...formData.itineraryDays];
    updatedDays[index].plan = value;
    setFormData({
      ...formData,
      itineraryDays: updatedDays
    });
  };

  // Add a new day to the itinerary
  const addItineraryDay = () => {
    const newDay = {
      day: formData.itineraryDays.length + 1,
      plan: ''
    };
    
    setFormData({
      ...formData,
      itineraryDays: [...formData.itineraryDays, newDay]
    });
  };

  // Remove a day from the itinerary
  const removeItineraryDay = (index) => {
    if (formData.itineraryDays.length > 1) {
      const updatedDays = formData.itineraryDays.filter((_, i) => i !== index);
      // Update day numbers
      const renumberedDays = updatedDays.map((day, i) => ({
        ...day,
        day: i + 1
      }));
      
      setFormData({
        ...formData,
        itineraryDays: renumberedDays
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    
    try {
      // Reset form after submission
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        nationality: '',
        password: '',
        idType: '',
        idNumber: '',
        kycId: '',
        emergencyContact: '',
        tripName: '',
        startDate: '',
        endDate: '',
        itineraryDays: [
          { day: 1, plan: '' }
        ]
      });
      setSelectedFile(null);
      setFilePreview('');
      setFormStep(0);
      
      // Show success popup
      setShowSuccessPopup(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to register tourist. Please try again.');
    }
  };

  const handleNext = () => {
    setFormStep(formStep + 1);
  };

  const handleBack = () => {
    setFormStep(formStep - 1);
  };

  const renderSidebar = () => {
    const menuItems = [
      { id: 'overview', label: 'Overview', icon: <DashboardIcon /> },
      { id: 'tourists', label: 'Register Tourist', icon: <PersonAddIcon /> },
      { id: 'manage', label: 'Manage Tourists', icon: <PeopleIcon /> },
      // Removed Emergency Alerts and Reports
      { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
    ];

    return (
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
            alt="Emblem" 
            className="sidebar-logo" 
          />
          <Typography variant="h6">Tourism Admin</Typography>
        </div>
        <Divider />
        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <div
              key={item.id}
              className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <div className="sidebar-icon">{item.icon}</div>
              <div className="sidebar-label">{item.label}</div>
            </div>
          ))}
        </nav>
      </div>
    );
  };

  const renderOverviewTab = () => (
    <>
      <div className="tab-header">
        <Typography variant="h5" component="h2">Dashboard Overview</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Welcome back, {user.name}. Here's your dashboard summary.
        </Typography>
      </div>
      
      <Grid container spacing={3} className="stats-container">
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card active">
            <CardContent>
              <Typography variant="h6" className="stat-title">Active Tourists</Typography>
              <Typography variant="h3" className="stat-value">127</Typography>
              <Typography variant="body2" className="stat-trend positive">
                +12% from last week
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card">
            <CardContent>
              <Typography variant="h6" className="stat-title">Registered Today</Typography>
              <Typography variant="h3" className="stat-value">24</Typography>
              <Typography variant="body2" className="stat-trend positive">
                +8% from yesterday
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card alert">
            <CardContent>
              <Typography variant="h6" className="stat-title">Emergency Alerts</Typography>
              <Typography variant="h3" className="stat-value">3</Typography>
              <Typography variant="body2" className="stat-trend negative">
                2 new since yesterday
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card">
            <CardContent>
              <Typography variant="h6" className="stat-title">Total Registrations</Typography>
              <Typography variant="h3" className="stat-value">1,453</Typography>
              <Typography variant="body2" className="stat-trend positive">
                +126 this month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Grid container spacing={3} className="charts-container">
        <Grid item xs={12} lg={8}>
          <Paper className="chart-paper">
            <Typography variant="h6">Tourist Registration Trends</Typography>
            <div className="chart-container">
              <div className="chart-placeholder">
                <div className="chart-bars">
                  {[30, 45, 35, 50, 60, 48, 72, 68, 55, 63, 75, 80].map((height, index) => (
                    <div key={index} className="chart-bar" style={{ height: `${height}%` }}>
                      <span className="bar-value">{Math.floor(height * 10)}</span>
                    </div>
                  ))}
                </div>
                <div className="chart-labels">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
                    <div key={index} className="chart-label">{month}</div>
                  ))}
                </div>
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Paper className="chart-paper">
            <Typography variant="h6">Tourist Demographics</Typography>
            <div className="chart-container">
              <div className="donut-chart">
                <div className="donut-segment segment-1"></div>
                <div className="donut-segment segment-2"></div>
                <div className="donut-segment segment-3"></div>
                <div className="donut-center"></div>
              </div>
              <div className="chart-legend">
                <div className="legend-item">
                  <div className="legend-color color-1"></div>
                  <Typography variant="body2">Domestic (58%)</Typography>
                </div>
                <div className="legend-item">
                  <div className="legend-color color-2"></div>
                  <Typography variant="body2">Foreign (32%)</Typography>
                </div>
                <div className="legend-item">
                  <div className="legend-color color-3"></div>
                  <Typography variant="body2">NRI (10%)</Typography>
                </div>
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className="recent-activities">
            <Typography variant="h6">Recent Activities</Typography>
            <div className="activity-list">
              {[
                { time: '10:45 AM', action: 'Tourist registration completed', user: 'John Smith', status: 'success' },
                { time: '09:30 AM', action: 'Emergency alert resolved', user: 'Tourist ID #T-7842', status: 'warning' },
                { time: '08:15 AM', action: 'New itinerary added', user: 'Sarah Wilson', status: 'info' },
                { time: 'Yesterday', action: 'System maintenance completed', user: 'Admin', status: 'success' },
              ].map((activity, index) => (
                <div key={index} className={`activity-item ${activity.status}`}>
                  <div className="activity-time">{activity.time}</div>
                  <div className="activity-content">
                    <Typography variant="body1">{activity.action}</Typography>
                    <Typography variant="body2" color="textSecondary">{activity.user}</Typography>
                  </div>
                </div>
              ))}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  );

  const renderRegistrationForm = () => {
    const steps = ['Personal Details', 'Document Details', 'Itinerary'];

    // Icon mapping for personal details
    const personalIcons = {
      fullName: <PersonOutlineIcon sx={{ color: '#b0b0b0', mr: 2 }} />,
      email: <LocalOfferIcon sx={{ color: '#b0b0b0', mr: 2 }} />,
      phone: <BusinessCenterIcon sx={{ color: '#b0b0b0', mr: 2 }} />,
      nationality: <EventIcon sx={{ color: '#b0b0b0', mr: 2 }} />,
      emergencyContact: <EditNoteIcon sx={{ color: '#b0b0b0', mr: 2 }} />
    };

    return (
      <>
        <div className="tab-header">
          <Typography variant="h5" component="h2">Register New Tourist</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Register a new tourist after completing physical KYC verification.
          </Typography>
        </div>
        
        <Paper className="form-container" sx={{
          maxWidth: 700,
          mx: 'auto',
          mt: 3,
          borderRadius: 3,
          bgcolor: '#f8f9fb',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          p: 3,
          border: '1px solid #eaeaea'
        }}>
          <Stepper activeStep={formStep} className="form-stepper" sx={{ mb: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          <form onSubmit={handleSubmit} className="registration-form">
            {formStep === 0 && (
              <div className="form-step">
                <Typography variant="h6" className="form-section-title" sx={{ mb: 2 }}>Personal Details</Typography>
                <Box>
                  {/* Full Name */}
                  <Box sx={{ display: 'flex', alignItems: 'center', py: 2, borderBottom: '1px solid #ececec' }}>
                    {personalIcons.fullName}
                    <TextField
                      variant="standard"
                      placeholder="Full Name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      InputProps={{
                        disableUnderline: true,
                        sx: { bgcolor: 'transparent', fontSize: 18, color: '#003380', fontWeight: 500 }
                      }}
                      fullWidth
                      required
                    />
                  </Box>
                  {/* Email */}
                  <Box sx={{ display: 'flex', alignItems: 'center', py: 2, borderBottom: '1px solid #ececec' }}>
                    {personalIcons.email}
                    <TextField
                      variant="standard"
                      placeholder="Email Address"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      type="email"
                      InputProps={{
                        disableUnderline: true,
                        sx: { bgcolor: 'transparent', fontSize: 18, color: '#003380', fontWeight: 500 }
                      }}
                      fullWidth
                      required
                    />
                  </Box>
                  {/* Phone */}
                  <Box sx={{ display: 'flex', alignItems: 'center', py: 2, borderBottom: '1px solid #ececec' }}>
                    {personalIcons.phone}
                    <TextField
                      variant="standard"
                      placeholder="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      InputProps={{
                        disableUnderline: true,
                        sx: { bgcolor: 'transparent', fontSize: 18, color: '#003380', fontWeight: 500 }
                      }}
                      fullWidth
                      required
                    />
                  </Box>
                  {/* Nationality */}
                  <Box sx={{ display: 'flex', alignItems: 'center', py: 2, borderBottom: '1px solid #ececec' }}>
                    {personalIcons.nationality}
                    <FormControl variant="standard" fullWidth>
                      <Select
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleInputChange}
                        disableUnderline
                        displayEmpty
                        sx={{ fontSize: 18, color: '#003380', fontWeight: 500, bgcolor: 'transparent' }}
                        required
                      >
                        <MenuItem value=""><em>Select Nationality</em></MenuItem>
                        <MenuItem value="indian">Indian</MenuItem>
                        <MenuItem value="foreigner">Foreigner</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  {/* Emergency Contact */}
                  <Box sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
                    {personalIcons.emergencyContact}
                    <TextField
                      variant="standard"
                      placeholder="Emergency Contact"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      InputProps={{
                        disableUnderline: true,
                        sx: { bgcolor: 'transparent', fontSize: 18, color: '#003380', fontWeight: 500 }
                      }}
                      fullWidth
                      required
                    />
                  </Box>
                </Box>
              </div>
            )}
            
            {formStep === 1 && (
              <div className="form-step">
                <Typography variant="h6" className="form-section-title" sx={{ mb: 2 }}>Document Details</Typography>
                <Box>
                  {/* ID Type */}
                  <Box sx={{ display: 'flex', alignItems: 'center', py: 2, borderBottom: '1px solid #ececec' }}>
                    <LocalOfferIcon sx={{ color: '#b0b0b0', mr: 2 }} />
                    <FormControl variant="standard" fullWidth>
                      <Select
                        name="idType"
                        value={formData.idType}
                        onChange={handleInputChange}
                        disableUnderline
                        displayEmpty
                        sx={{ fontSize: 18, color: '#003380', fontWeight: 500, bgcolor: 'transparent' }}
                        required
                      >
                        <MenuItem value=""><em>Select ID Type</em></MenuItem>
                        <MenuItem value="aadhar">Aadhar Card</MenuItem>
                        <MenuItem value="passport">Passport</MenuItem>
                        <MenuItem value="driving">Driving License</MenuItem>
                        <MenuItem value="voter">Voter ID</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  {/* ID Number */}
                  <Box sx={{ display: 'flex', alignItems: 'center', py: 2, borderBottom: '1px solid #ececec' }}>
                    <BusinessCenterIcon sx={{ color: '#b0b0b0', mr: 2 }} />
                    <TextField
                      variant="standard"
                      placeholder="ID Number"
                      name="idNumber"
                      value={formData.idNumber}
                      onChange={handleInputChange}
                      InputProps={{
                        disableUnderline: true,
                        sx: { bgcolor: 'transparent', fontSize: 18, color: '#003380', fontWeight: 500 }
                      }}
                      fullWidth
                      required
                    />
                  </Box>
                  {/* KYC ID */}
                  <Box sx={{ display: 'flex', alignItems: 'center', py: 2, borderBottom: '1px solid #ececec' }}>
                    <EventIcon sx={{ color: '#b0b0b0', mr: 2 }} />
                    <TextField
                      variant="standard"
                      placeholder="KYC ID (optional)"
                      name="kycId"
                      value={formData.kycId}
                      onChange={handleInputChange}
                      InputProps={{
                        disableUnderline: true,
                        sx: { bgcolor: 'transparent', fontSize: 18, color: '#003380', fontWeight: 500 }
                      }}
                      fullWidth
                    />
                  </Box>
                  {/* Document Upload */}
                  <Box sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
                    <EditNoteIcon sx={{ color: '#b0b0b0', mr: 2 }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*,.pdf"
                        style={{ display: 'none' }}
                      />
                      <Button 
                        variant="outlined" 
                        onClick={handleChooseFile}
                        startIcon={<AddIcon />}
                        sx={{ fontWeight: 'bold', color: '#003380', borderColor: '#003380', bgcolor: '#f8f9fb', '&:hover': { borderColor: '#ffcc00', color: '#ffcc00' } }}
                      >
                        Choose File
                      </Button>
                      <Typography variant="body2" sx={{ mt: 1, color: '#888' }}>
                        {selectedFile ? selectedFile.name : 'No file chosen'}
                      </Typography>
                      {filePreview && (
                        <Box sx={{ mt: 2 }}>
                          <img 
                            src={filePreview} 
                            alt="Document preview" 
                            style={{ maxWidth: '100%', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}
                          />
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </div>
            )}
            
            {formStep === 2 && (
              <div className="form-step">
                <Typography variant="h6" className="form-section-title" sx={{ mb: 2 }}>Itinerary Details</Typography>
                <Box>
                  {/* Trip Name */}
                  <Box sx={{ display: 'flex', alignItems: 'center', py: 2, borderBottom: '1px solid #ececec' }}>
                    <LocalOfferIcon sx={{ color: '#b0b0b0', mr: 2 }} />
                    <TextField
                      variant="standard"
                      placeholder="Trip Name"
                      name="tripName"
                      value={formData.tripName}
                      onChange={handleInputChange}
                      InputProps={{
                        disableUnderline: true,
                        sx: { bgcolor: 'transparent', fontSize: 18, color: '#003380', fontWeight: 500 }
                      }}
                      fullWidth
                      required
                    />
                  </Box>
                  {/* Start Date */}
                  <Box sx={{ display: 'flex', alignItems: 'center', py: 2, borderBottom: '1px solid #ececec' }}>
                    <EventIcon sx={{ color: '#b0b0b0', mr: 2 }} />
                    <TextField
                      variant="standard"
                      placeholder="Start Date"
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      InputProps={{
                        disableUnderline: true,
                        sx: { bgcolor: 'transparent', fontSize: 18, color: '#003380', fontWeight: 500 }
                      }}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      required
                    />
                  </Box>
                  {/* End Date */}
                  <Box sx={{ display: 'flex', alignItems: 'center', py: 2, borderBottom: '1px solid #ececec' }}>
                    <EventIcon sx={{ color: '#b0b0b0', mr: 2 }} />
                    <TextField
                      variant="standard"
                      placeholder="End Date"
                      name="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      InputProps={{
                        disableUnderline: true,
                        sx: { bgcolor: 'transparent', fontSize: 18, color: '#003380', fontWeight: 500 }
                      }}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      required
                    />
                  </Box>
                  {/* Daily Itinerary */}
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" className="itinerary-title" sx={{ mb: 2 }}>
                      Daily Itinerary
                    </Typography>
                    {formData.itineraryDays.map((dayData, index) => (
                      <Paper key={index} sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        p: 2,
                        mb: 2,
                        bgcolor: '#f0f6ff',
                        borderRadius: 2,
                        boxShadow: '0 2px 8px rgba(0,70,166,0.07)'
                      }}>
                        <Box sx={{ mr: 2, mt: 1 }}>
                          <EditNoteIcon sx={{ color: '#b0b0b0' }} />
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="subtitle1" sx={{ mb: 1 }}>Day {dayData.day}</Typography>
                          <TextField
                            variant="standard"
                            placeholder={`Plan for Day ${dayData.day}`}
                            value={dayData.plan}
                            onChange={(e) => handleDayPlanChange(index, e.target.value)}
                            InputProps={{
                              disableUnderline: true,
                              sx: { bgcolor: 'transparent', fontSize: 16, color: '#003380', fontWeight: 500 }
                            }}
                            fullWidth
                            multiline
                            rows={2}
                            required
                          />
                        </Box>
                        {formData.itineraryDays.length > 1 && (
                          <IconButton 
                            size="small" 
                            onClick={() => removeItineraryDay(index)}
                            sx={{ ml: 2, mt: 1, color: '#ff3333' }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        )}
                      </Paper>
                    ))}
                    <Button 
                      variant="outlined" 
                      startIcon={<AddIcon />}
                      onClick={addItineraryDay}
                      sx={{ fontWeight: 'bold', color: '#003380', borderColor: '#003380', bgcolor: '#f8f9fb', '&:hover': { borderColor: '#ffcc00', color: '#ffcc00' } }}
                    >
                      Add Another Day
                    </Button>
                  </Box>
                </Box>
              </div>
            )}
            
            <div className="form-actions" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
              <div>
                {formStep > 0 && (
                  <Button 
                    onClick={handleBack}
                    startIcon={<ArrowBackIcon />}
                    variant="outlined"
                  >
                    Back
                  </Button>
                )}
              </div>
              <div>
                {formStep < 2 ? (
                  <Button
                    onClick={handleNext}
                    variant="contained"
                    color="primary"
                    endIcon={<ArrowForwardIcon />}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="submit-button"
                  >
                    Register Tourist
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Paper>
      </>
    );
  };

  const renderPlaceholderTab = (title) => (
    <>
      <div className="tab-header">
        <Typography variant="h5" component="h2">{title}</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          This section is under development.
        </Typography>
      </div>
      <Paper className="placeholder-container">
        <div className="placeholder-content">
          <Typography variant="h6" align="center" color="textSecondary">
            {title} features will be available soon
          </Typography>
          <CircularProgress className="placeholder-loader" />
        </div>
      </Paper>
    </>
  );

  // Success Popup Component
  const SuccessPopup = () => {
    if (!showSuccessPopup) return null;
    
    return (
      <div className="success-popup-overlay">
        <div className="success-popup">
          <CheckCircleIcon className="success-icon" />
          <Typography variant="h6">Success!</Typography>
          <Typography variant="body1">Tourist registered successfully!</Typography>
        </div>
      </div>
    );
  };

  const handleRemoveTourist = (id) => {
    // Implement tourist removal logic
    console.log('Remove tourist with ID:', id);
  };

  const renderManageTouristsTab = () => (
    <>
      <div className="tab-header">
        <Typography variant="h5" component="h2">Manage Tourists</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          View, search, and manage registered tourists.
        </Typography>
      </div>
      <Paper className="manage-tourists-container" sx={{ p: 2 }}>
        {tourists.length === 0 ? (
          <Typography variant="body1" align="center" sx={{ my: 4 }}>
            No tourists registered yet.
          </Typography>
        ) : (
          <List>
            {tourists.map(tourist => (
              <ListItem
                key={tourist.id}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveTourist(tourist.id)}>
                    <DeleteIcon />
                  </IconButton>
                }
                sx={{ borderBottom: '1px solid #eee' }}
              >
                <ListItemIcon>
                  <PersonOutlineIcon color={tourist.status === 'Active' ? 'primary' : 'disabled'} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#003380' }}>
                      {tourist.name} ({tourist.nationality})
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2">
                        <strong>Trip:</strong> {tourist.tripName}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Dates:</strong> {tourist.startDate} to {tourist.endDate}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Phone:</strong> {tourist.phone}
                      </Typography>
                      <Chip
                        label={tourist.status}
                        color={tourist.status === 'Active' ? 'success' : 'default'}
                        size="small"
                        sx={{ mt: 0.5 }}
                      />
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </>
  );

  // Settings tab content
  const renderSettingsTab = () => (
    <>
      <div className="tab-header">
        <Typography variant="h5" component="h2">Settings</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Manage your dashboard preferences and account settings.
        </Typography>
      </div>
      <Paper className="settings-container" sx={{ p: 3, maxWidth: 500, mx: 'auto' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Preferences</Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Theme</InputLabel>
          <Select defaultValue="light" label="Theme">
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
            <MenuItem value="system">System Default</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Language</InputLabel>
          <Select defaultValue="en" label="Language">
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="hi">Hindi</MenuItem>
          </Select>
        </FormControl>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" sx={{ mb: 2 }}>Account</Typography>
        <TextField
          fullWidth
          label="Change Password"
          type="password"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" sx={{ mb: 2 }}>
          Save Changes
        </Button>
        <Button variant="outlined" color="error">
          Logout
        </Button>
      </Paper>
    </>
  );

  return (
    <div className="admin-dashboard">
      {/* Success popup */}
      <SuccessPopup />
      {/* Header */}
      <header className="admin-header">
        <div className="header-title">
          <Typography variant="h6">Tourism Administration System</Typography>
        </div>
        <div className="header-actions">
          {/* Notification dropdown */}
          <div className="notification-wrapper" ref={notificationRef}>
            <IconButton 
              className="notification-button"
              onClick={toggleNotifications}
            >
              <Badge badgeContent={notificationCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            
            {notificationOpen && (
              <div className="notification-dropdown">
                <div className="notification-header">
                  <Typography variant="h6">Notifications</Typography>
                  <Typography variant="caption">{notificationCount} unread</Typography>
                </div>
                <Divider />
                <List className="notification-list">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <ListItem 
                        key={notification.id}
                        className={`notification-item ${!notification.read ? 'unread' : ''}`}
                        onClick={() => handleNotificationClick(notification.path)}
                      >
                        <ListItemIcon className="notification-icon">
                          {getNotificationIcon(notification.type)}
                        </ListItemIcon>
                        <ListItemText 
                          primary={notification.title}
                          secondary={notification.message}
                          className="notification-text"
                        />
                        <Typography variant="caption" className="notification-time">
                          {notification.time}
                        </Typography>
                      </ListItem>
                    ))
                  ) : (
                    <ListItem className="no-notifications">
                      <ListItemText primary="No new notifications" />
                    </ListItem>
                  )}
                </List>
                <Divider />
                <div className="notification-footer">
                  <Button 
                    variant="text" 
                    size="small" 
                    onClick={() => setActiveTab('alerts')}
                  >
                    View All Alerts
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <div className="user-profile">
            <Avatar className="user-avatar">
              <AccountCircleIcon />
            </Avatar>
            <div className="user-info">
              <Typography variant="subtitle2">{user.name}</Typography>
              <Typography variant="caption" color="textSecondary">Admin</Typography>
            </div>
            <IconButton size="small" onClick={handleLogout} className="logout-button">
              <LogoutIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
      </header>
      <div className="admin-content">
        {/* Sidebar */}
        {renderSidebar()}
        {/* Main content */}
        <main className="admin-main">
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'tourists' && renderRegistrationForm()}
          {activeTab === 'manage' && renderManageTouristsTab()}
          {activeTab === 'alerts' && renderPlaceholderTab('Emergency Alerts')}
          {activeTab === 'reports' && renderPlaceholderTab('Reports')}
          {activeTab === 'settings' && renderSettingsTab()}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;