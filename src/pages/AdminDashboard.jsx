import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminDashboard.css';
import {
  Grid, Card, CardContent, Typography, Paper, Stepper, Step, StepLabel,
  IconButton, Badge, Divider, Avatar, CircularProgress, Chip, List, ListItem,
  ListItemText, ListItemIcon, Container, Fade, Slide, Zoom, Tooltip, AppBar,
  Toolbar, Select, MenuItem, FormControl, InputLabel, TextField, Button, Drawer, Box
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

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
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SecurityIcon from '@mui/icons-material/Security';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

// Keyframes
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const slideIn = keyframes`
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const fadeInUp = keyframes`
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

// Styled Components
const ModernCard = styled(Card)(({ theme, variant = 'default', elevation = 'medium' }) => ({
  background: variant === 'gradient'
    ? 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)'
    : variant === 'glass'
      ? 'rgba(255, 255, 255, 0.25)'
      : '#ffffff',
  backdropFilter: variant === 'glass' ? 'blur(20px)' : 'none',
  borderRadius: elevation === 'high' ? '20px' : '16px',
  boxShadow: elevation === 'high'
    ? '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)'
    : '0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)',
  border: variant === 'glass'
    ? '1px solid rgba(255, 255, 255, 0.3)'
    : '1px solid rgba(226, 232, 240, 0.8)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  overflow: 'hidden',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
    transition: 'left 0.5s',
  },
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1)',
    '&::before': {
      left: '100%',
    }
  },
  '&.stat-card': {
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)',
    },
    '&.alert::after': {
      background: 'linear-gradient(90deg, #ef4444, #f97316)',
    },
    '&.success::after': {
      background: 'linear-gradient(90deg, #10b981, #059669)',
    }
  }
}));

const StyledPaper = styled(Paper)(({ theme, variant = 'default' }) => ({
  background: variant === 'glass'
    ? 'rgba(255, 255, 255, 0.9)'
    : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
  backdropFilter: variant === 'glass' ? 'blur(20px)' : 'none',
  borderRadius: '20px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.05)',
  border: '1px solid rgba(226, 232, 240, 0.8)',
  overflow: 'hidden',
  transition: 'all 0.4s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08)',
  },
}));

const GradientButton = styled(Button)(({ theme, variant = 'primary', size = 'medium' }) => ({
  background: variant === 'primary'
    ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
    : variant === 'success'
      ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
      : variant === 'warning'
        ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
        : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  color: '#ffffff',
  borderRadius: size === 'large' ? '16px' : '12px',
  padding: size === 'large' ? '14px 32px' : size === 'small' ? '8px 16px' : '10px 24px',
  fontWeight: 600,
  textTransform: 'none',
  letterSpacing: '0.5px',
  boxShadow: '0 4px 16px rgba(59, 130, 246, 0.4)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
    transition: 'left 0.6s',
  },
  '&:hover': {
    transform: 'translateY(-3px) scale(1.02)',
    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.6)',
    '&::before': {
      left: '100%',
    }
  },
  '&:active': {
    transform: 'translateY(-1px) scale(0.98)',
  }
}));

const ModernStepper = styled(Stepper)(({ theme }) => ({
  '& .MuiStepLabel-root .Mui-completed': {
    color: '#10b981',
  },
  '& .MuiStepLabel-root .Mui-active': {
    color: '#3b82f6',
  },
  '& .MuiStepLabel-label': {
    fontWeight: 600,
  },
  '& .MuiStepConnector-line': {
    borderColor: '#e5e7eb',
    borderTopWidth: 3,
    borderRadius: '2px',
  },
  '& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line': {
    borderColor: '#10b981',
  },
  '& .MuiStepConnector-root.Mui-active .MuiStepConnector-line': {
    borderColor: '#3b82f6',
  },
  '& .MuiStepIcon-root': {
    fontSize: '2rem',
    '&.Mui-completed': {
      color: '#10b981',
    },
    '&.Mui-active': {
      color: '#3b82f6',
    }
  }
}));

const IconContainer = styled(Box)(({ color = '#3b82f6', size = 'medium' }) => ({
  width: size === 'large' ? '64px' : size === 'small' ? '48px' : '56px',
  height: size === 'large' ? '64px' : size === 'small' ? '48px' : '56px',
  borderRadius: '16px',
  background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '16px',
  border: `2px solid ${color}20`,
  transition: 'all 0.3s ease',
  animation: `${float} 6s ease-in-out infinite`,
  animationDelay: `${Math.random() * 2}s`,
  '&:hover': {
    transform: 'scale(1.1)',
    background: `linear-gradient(135deg, ${color}25 0%, ${color}15 100%)`,
    border: `2px solid ${color}40`,
  },
  '& .MuiSvgIcon-root': {
    color: color,
    fontSize: size === 'large' ? '32px' : size === 'small' ? '24px' : '28px',
    transition: 'all 0.3s ease',
  },
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #0f172a 100%)',
  borderRadius: '24px',
  padding: '32px 40px',
  marginBottom: '40px',
  color: 'white',
  boxShadow: '0 20px 60px rgba(30, 41, 59, 0.4), 0 8px 16px rgba(0, 0, 0, 0.2)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '400px',
    height: '100%',
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
    borderRadius: '0 24px 24px 0',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    right: '-50%',
    width: '200px',
    height: '200px',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: `${float} 8s ease-in-out infinite`,
  }
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  background: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '16px',
  padding: '8px 16px',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(226, 232, 240, 0.8)',
  transition: 'all 0.3s ease',
  '&:hover, &:focus-within': {
    background: 'rgba(255, 255, 255, 1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
    transform: 'translateY(-2px)',
  },
  '& .MuiTextField-root': {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none',
      },
    },
  },
}));

const NotificationDropdown = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  right: 0,
  width: '380px',
  maxHeight: '500px',
  overflowY: 'auto',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  borderRadius: '20px',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 20px rgba(0, 0, 0, 0.08)',
  border: '1px solid rgba(226, 232, 240, 0.8)',
  zIndex: 1300,
  animation: `${fadeInUp} 0.3s ease-out`,
}));

const AnimatedChip = styled(Chip)(({ theme }) => ({
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  }
}));

function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "Admin User" });
  const [activeTab, setActiveTab] = useState('overview');
  const [formStep, setFormStep] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // <-- Add this line
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState('');
  const [notificationCount, setNotificationCount] = useState(3);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const notificationRef = useRef(null);

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
    fullName: '',
    email: '',
    phone: '',
    nationality: '',
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
    const authToken = localStorage.getItem('authToken');
    if (!authToken || authToken !== 'admin-token') {
      navigate('/admin/login');
      return;
    }
  }, [navigate]);

  useEffect(() => {
    if (showSuccessPopup) {
      const timer = setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessPopup]);

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
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/admin/login');
  };

  const toggleNotifications = () => {
    setNotificationOpen(!notificationOpen);
  };

  const handleNotificationClick = (path) => {
    setNotificationOpen(false);
    // navigate(path);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  const handleDayPlanChange = (index, value) => {
    const updatedDays = [...formData.itineraryDays];
    updatedDays[index].plan = value;
    setFormData({
      ...formData,
      itineraryDays: updatedDays
    });
  };

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

  const removeItineraryDay = (index) => {
    if (formData.itineraryDays.length > 1) {
      const updatedDays = formData.itineraryDays.filter((_, i) => i !== index);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add tourist to list (simulate backend)
    setTourists([
      ...tourists,
      {
        id: `T${tourists.length + 1}`,
        name: formData.fullName,
        nationality: formData.nationality,
        phone: formData.phone,
        tripName: formData.tripName,
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: 'Active'
      }
    ]);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      nationality: '',
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
    setShowSuccessPopup(true);
  };

  const handleNext = () => {
    setFormStep(formStep + 1);
  };

  const handleBack = () => {
    setFormStep(formStep - 1);
  };

  const handleRemoveTourist = (id) => {
    setTourists(tourists.filter(t => t.id !== id));
  };

  // Registration Form with Steps
  const renderRegistrationForm = () => {
    const steps = ['Personal Details', 'Document Details', 'Itinerary'];
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
                        <MenuItem value="Indian">Indian</MenuItem>
                        <MenuItem value="Foreigner">Foreigner</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
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
                        <MenuItem value="Aadhar">Aadhar Card</MenuItem>
                        <MenuItem value="Passport">Passport</MenuItem>
                        <MenuItem value="Driving">Driving License</MenuItem>
                        <MenuItem value="Voter">Voter ID</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
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
                      sx={{ 
                        fontWeight: 'bold', 
                        color: '#003380', 
                        borderColor: '#003380', 
                        bgcolor: '#f8f9fb', 
                        '&:hover': { borderColor: '#ffcc00', color: '#ffcc00' } 
                      }}
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

  // --- UI Render Functions ---

  const renderTopBar = () => (
    <AppBar position="static" sx={{
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
      border: '1px solid rgba(226, 232, 240, 0.8)',
      borderRadius: '20px',
      mb: 3
    }}>
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={() => setSidebarOpen(!sidebarOpen)}
            sx={{
              color: '#64748b',
              '&:hover': {
                background: 'rgba(59, 130, 246, 0.1)',
                color: '#3b82f6'
              }
            }}
          >
            <MenuIcon />
          </IconButton>
          <SearchContainer>
            <SearchIcon sx={{ color: '#64748b', mr: 1 }} />
            <TextField
              placeholder="Search tourists, locations, alerts..."
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ minWidth: '300px' }}
            />
            <IconButton size="small" sx={{ ml: 1 }}>
              <FilterListIcon sx={{ color: '#64748b' }} />
            </IconButton>
          </SearchContainer>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box ref={notificationRef} sx={{ position: 'relative' }}>
            <Tooltip title="Notifications">
              <IconButton
                onClick={toggleNotifications}
                sx={{
                  color: '#64748b',
                  '&:hover': {
                    background: 'rgba(59, 130, 246, 0.1)',
                    color: '#3b82f6'
                  }
                }}
              >
                <Badge badgeContent={notificationCount} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            {notificationOpen && (
              <NotificationDropdown>
                <Box sx={{ p: 3, borderBottom: '1px solid rgba(226, 232, 240, 0.8)' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
                    Notifications
                  </Typography>
                </Box>
                <List sx={{ py: 0 }}>
                  {notifications.map((notif, index) => (
                    <ListItem
                      key={notif.id}
                      onClick={() => handleNotificationClick(notif.path)}
                      sx={{
                        cursor: 'pointer',
                        borderBottom: index < notifications.length - 1 ? '1px solid rgba(226, 232, 240, 0.5)' : 'none',
                        '&:hover': {
                          background: 'rgba(59, 130, 246, 0.05)',
                        },
                        opacity: notif.read ? 0.7 : 1
                      }}
                    >
                      <ListItemIcon>
                        {getNotificationIcon(notif.type)}
                      </ListItemIcon>
                      <ListItemText
                        primary={notif.title}
                        secondary={
                          <>
                            <Typography variant="body2" sx={{ color: '#64748b' }}>
                              {notif.message}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#94a3b8', mt: 0.5 }}>
                              {notif.time}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </NotificationDropdown>
            )}
          </Box>
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                border: '2px solid rgba(59, 130, 246, 0.3)'
              }}
            >
              {user.name.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                {user.name}
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b' }}>
                Administrator
              </Typography>
            </Box>
            <Tooltip title="Logout">
              <IconButton
                onClick={handleLogout}
                sx={{
                  color: '#64748b',
                  '&:hover': {
                    background: 'rgba(239, 68, 68, 0.1)',
                    color: '#ef4444'
                  }
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );

  const renderSidebar = () => {
    const menuItems = [
      { id: 'overview', label: 'Overview', icon: <DashboardIcon />, color: '#3b82f6', description: 'Dashboard insights' },
      { id: 'tourists', label: 'Register Tourist', icon: <PersonAddIcon />, color: '#10b981', description: 'New registrations' },
      { id: 'manage', label: 'Manage Tourists', icon: <PeopleIcon />, color: '#f59e0b', description: 'Tourist management' },
      { id: 'settings', label: 'Settings', icon: <SettingsIcon />, color: '#8b5cf6', description: 'System configuration' },
    ];
    return (
      <Drawer
        variant="persistent"
        anchor="left"
        open={sidebarOpen}
        sx={{
          width: sidebarOpen ? 320 : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 320,
            boxSizing: 'border-box',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(226, 232, 240, 0.8)',
            borderRadius: '0 20px 20px 0',
            boxShadow: '8px 0 32px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 4,
            pb: 3,
            borderBottom: '2px solid rgba(226, 232, 240, 0.8)',
            position: 'relative'
          }}>
            <Box sx={{
              p: 1.5,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)'
            }}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                alt="Emblem"
                style={{ width: '32px', height: '32px', filter: 'brightness(0) invert(1)' }}
              />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e293b' }}>
                Tourism Portal
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                Administrative Dashboard
              </Typography>
            </Box>
          </Box>
          <Box sx={{ flex: 1, overflow: 'auto' }}>
            {menuItems.map((item, index) => (
              <Zoom in={true} key={item.id} style={{ transitionDelay: `${index * 150}ms` }}>
                <Box
                  onClick={() => setActiveTab(item.id)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 3,
                    mb: 2,
                    borderRadius: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    background: activeTab === item.id
                      ? `linear-gradient(135deg, ${item.color}15 0%, ${item.color}08 100%)`
                      : 'transparent',
                    border: activeTab === item.id
                      ? `2px solid ${item.color}40`
                      : '2px solid transparent',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: `linear-gradient(90deg, transparent, ${item.color}20, transparent)`,
                      transition: 'left 0.6s',
                    },
                    '&:hover': {
                      background: `linear-gradient(135deg, ${item.color}20 0%, ${item.color}10 100%)`,
                      transform: 'translateX(8px) scale(1.02)',
                      boxShadow: `0 8px 24px ${item.color}30`,
                      '&::before': {
                        left: '100%',
                      }
                    }
                  }}
                >
                  <Box sx={{
                    color: activeTab === item.id ? item.color : '#64748b',
                    transition: 'all 0.3s ease',
                    transform: activeTab === item.id ? 'scale(1.1)' : 'scale(1)',
                  }}>
                    {item.icon}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{
                      fontWeight: activeTab === item.id ? 700 : 600,
                      color: activeTab === item.id ? item.color : '#475569',
                      transition: 'all 0.3s ease',
                      fontSize: '16px'
                    }}>
                      {item.label}
                    </Typography>
                    <Typography sx={{
                      fontSize: '12px',
                      color: '#94a3b8',
                      fontWeight: 500
                    }}>
                      {item.description}
                    </Typography>
                  </Box>
                  {activeTab === item.id && (
                    <Box sx={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: item.color,
                      boxShadow: `0 0 12px ${item.color}`,
                      animation: `${pulse} 2s infinite`
                    }} />
                  )}
                </Box>
              </Zoom>
            ))}
          </Box>
          <Box sx={{
            mt: 'auto',
            p: 3,
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
            border: '1px solid rgba(226, 232, 240, 0.8)'
          }}>
            <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600, mb: 1 }}>
              Quick Stats
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>Active Users</Typography>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#3b82f6' }}>127</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>Alerts</Typography>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#ef4444' }}>3</Typography>
            </Box>
          </Box>
        </Box>
      </Drawer>
    );
  };

  // --- Content Tabs ---
  const renderOverviewTab = () => (
    <Fade in={true} timeout={600}>
      <Box>
        <HeaderContainer>
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="h3" sx={{
              fontWeight: 800,
              mb: 2,
              background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Tourism Command Center
            </Typography>
            <Typography sx={{
              color: '#cbd5e1',
              fontSize: '18px',
              fontWeight: 500,
              lineHeight: 1.6
            }}>
              Welcome back, <strong>{user.name}</strong>. Monitor, manage, and optimize tourist experiences across all regions.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <AnimatedChip
                label="Real-time Monitoring"
                sx={{
                  bgcolor: 'rgba(16, 185, 129, 0.2)',
                  color: '#10b981',
                  fontWeight: 600
                }}
                icon={<CheckCircleIcon />}
              />
              <AnimatedChip
                label="Emergency Ready"
                sx={{
                  bgcolor: 'rgba(59, 130, 246, 0.2)',
                  color: '#3b82f6',
                  fontWeight: 600
                }}
                icon={<SecurityIcon />}
              />
            </Box>
          </Box>
        </HeaderContainer>
        <Grid container spacing={4} sx={{ mb: 5 }}>
          {[
            { title: 'Active Tourists', value: '127', change: '+12%', trend: 'up', period: 'from last week', color: '#3b82f6', icon: PeopleIcon, progress: 85 },
            { title: 'Registered Today', value: '24', change: '+8%', trend: 'up', period: 'from yesterday', color: '#10b981', icon: PersonAddIcon, progress: 65 },
            { title: 'Emergency Alerts', value: '3', change: '+2', trend: 'up', period: 'new since yesterday', color: '#ef4444', icon: WarningIcon, progress: 25 },
            { title: 'Total Registrations', value: '1,453', change: '+126', trend: 'up', period: 'this month', color: '#8b5cf6', icon: AssessmentIcon, progress: 92 }
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Grid item xs={12} sm={6} lg={3} key={index}>
                <Slide in={true} direction="up" timeout={600 + index * 200}>
                  <ModernCard
                    variant="gradient"
                    elevation="high"
                    className={`stat-card ${stat.title === 'Emergency Alerts' ? 'alert' : stat.title === 'Registered Today' ? 'success' : ''}`}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <IconContainer color={stat.color} size="medium">
                          <IconComponent />
                        </IconContainer>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography sx={{
                            color: '#64748b',
                            fontSize: '12px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                          }}>
                            {stat.title}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="h2" sx={{
                        color: '#1e293b',
                        fontWeight: 900,
                        mb: 2,
                        fontSize: '3rem',
                        lineHeight: 1
                      }}>
                        {stat.value}
                      </Typography>
                      <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography sx={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>
                            Progress
                          </Typography>
                          <Typography sx={{ fontSize: '12px', color: stat.color, fontWeight: 700 }}>
                            {stat.progress}%
                          </Typography>
                        </Box>
                        <Box sx={{
                          width: '100%',
                          height: '6px',
                          bgcolor: '#f1f5f9',
                          borderRadius: '3px',
                          overflow: 'hidden'
                        }}>
                          <Box sx={{
                            width: `${stat.progress}%`,
                            height: '100%',
                            background: `linear-gradient(90deg, ${stat.color} 0%, ${stat.color}80 100%)`,
                            borderRadius: '3px',
                            transition: 'width 1s ease-out',
                            animation: `${shimmer} 2s infinite linear`
                          }} />
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <AnimatedChip
                          icon={stat.trend === 'up' ? <TrendingUpIcon /> : <TrendingDownIcon />}
                          label={stat.change}
                          sx={{
                            bgcolor: stat.trend === 'up' ? '#dcfce7' : '#fef2f2',
                            color: stat.trend === 'up' ? '#166534' : '#991b1b',
                            fontWeight: 800,
                            fontSize: '11px',
                            height: '28px',
                          }}
                          size="small"
                        />
                        <Typography sx={{
                          color: '#64748b',
                          fontSize: '11px',
                          fontWeight: 500,
                          lineHeight: 1.2
                        }}>
                          {stat.period}
                        </Typography>
                      </Box>
                    </CardContent>
                  </ModernCard>
                </Slide>
              </Grid>
            );
          })}
        </Grid>
        {/* ... rest of overview tab ... */}
      </Box>
    </Fade>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab();
      case 'tourists':
        return (
          <Fade in={true} timeout={500}>
            <Box>
              {renderRegistrationForm()}
            </Box>
          </Fade>
        );
      case 'manage':
        return (
          <Fade in={true} timeout={500}>
            <Box>
              <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: '#1e293b' }}>
                Manage Tourists
              </Typography>
              <ModernCard elevation="high">
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Registered Tourists
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {tourists.map((tourist, index) => (
                      <Box key={tourist.id} sx={{
                        p: 3,
                        borderRadius: '12px',
                        border: '1px solid rgba(226, 232, 240, 0.8)',
                        background: 'linear-gradient(135deg, #f9fafb 0%, #ffffff 100%)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
                        }
                      }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
                              {tourist.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#64748b' }}>
                              {tourist.nationality} • {tourist.phone}
                            </Typography>
                          </Box>
                          <AnimatedChip
                            label={tourist.status}
                            sx={{
                              bgcolor: tourist.status === 'Active' ? '#dcfce7' : '#f3f4f6',
                              color: tourist.status === 'Active' ? '#166534' : '#6b7280',
                              fontWeight: 700
                            }}
                          />
                          <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveTourist(tourist.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </ModernCard>
            </Box>
          </Fade>
        );
      case 'settings':
        return (
          <Fade in={true} timeout={500}>
            <Box>
              <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: '#1e293b' }}>
                System Settings
              </Typography>
              <ModernCard elevation="high">
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Application Configuration
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#64748b' }}>
                    System settings and configuration options will be displayed here.
                  </Typography>
                </CardContent>
              </ModernCard>
            </Box>
          </Fade>
        );
      default:
        return renderOverviewTab();
    }
  };

  // --- Main Render ---
  return (
    <Box sx={{
      display: 'flex',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)',
        pointerEvents: 'none',
        zIndex: 0,
      }
    }}>
      {renderSidebar()}
      <Box sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        marginLeft: sidebarOpen ? 0 : '-320px',
        transition: 'margin-left 0.3s ease',
        position: 'relative',
        zIndex: 1
      }}>
        <Container maxWidth="xl" sx={{ py: 3, flex: 1 }}>
          {renderTopBar()}
          {renderContent()}
        </Container>
        {showSuccessPopup && (
          <Box sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            bgcolor: 'rgba(0,0,0,0.2)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Box sx={{
              bgcolor: '#fff',
              borderRadius: 3,
              boxShadow: 3,
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <CheckCircleIcon color="success" sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6">Success!</Typography>
              <Typography variant="body1">Tourist registered successfully!</Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default AdminDashboard;
