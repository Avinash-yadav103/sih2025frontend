import React, { useState, useRef, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import './Layout.css';
import { 
  Box, Typography, IconButton, Badge, Container, Divider, 
  List, ListItem, ListItemText, ListItemIcon, ListItemAvatar,
  Avatar, Button
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MapIcon from '@mui/icons-material/Map';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PeopleIcon from '@mui/icons-material/People';
import WarningIcon from '@mui/icons-material/Warning';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import GroupsIcon from '@mui/icons-material/Groups';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DevicesIcon from '@mui/icons-material/Devices';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import SecurityIcon from '@mui/icons-material/Security';
import SearchIcon from '@mui/icons-material/Search';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import TranslateIcon from '@mui/icons-material/Translate';
import MenuIcon from '@mui/icons-material/Menu';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

// Import local images
import nav2Image from '../assets/images/nav2.jpg';
import nav3Image from '../assets/images/nav3.png';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const notificationRef = useRef(null);
  const navigate = useNavigate();

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      type: 'alert',
      title: 'High Alert: Tourist Area',
      message: 'Unusual crowd gathering detected at Gangtok Market',
      time: '10 minutes ago',
      read: false,
      path: '/police/alerts/1'
    },
    {
      id: 2,
      type: 'incident',
      title: 'New Incident Report',
      message: 'Theft reported at Hotel Himalaya, Darjeeling',
      time: '25 minutes ago',
      read: false,
      path: '/police/incidents/2'
    },
    {
      id: 3,
      type: 'tourist',
      title: 'Tourist Registration',
      message: 'New international tourist group registered from Japan',
      time: '1 hour ago',
      read: true,
      path: '/police/tourists/3'
    },
    {
      id: 4,
      type: 'alert',
      title: 'Weather Warning',
      message: 'Heavy rainfall expected in Gangtok region',
      time: '2 hours ago',
      read: true,
      path: '/police/alerts/4'
    }
  ];

  const unreadCount = notifications.filter(notif => !notif.read).length;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleNotifications = () => {
    setNotificationOpen(!notificationOpen);
  };

  const handleNotificationClick = (path) => {
    setNotificationOpen(false);
    navigate(path);
  };

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

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch(type) {
      case 'alert':
        return <ErrorOutlineIcon color="error" />;
      case 'incident':
        return <WarningIcon color="warning" />;
      case 'tourist':
        return <PersonOutlineIcon color="primary" />;
      default:
        return <NotificationsNoneIcon />;
    }
  };

  return (
    <div className="layout-container">
      {/* Top Government header */}
      <div className="gov-top-bar">
        <Container maxWidth={false}>
          <div className="gov-top-content">
            <div className="gov-top-left">
              <span>भारत सरकार</span>
              <Divider orientation="vertical" flexItem sx={{ mx: 1, borderColor: 'rgba(0,0,0,0.2)' }} />
              <span>GOVERNMENT OF INDIA</span>
            </div>
            <div className="gov-top-right">
              <a href="#main-content" className="gov-top-link">SKIP TO MAIN CONTENT</a>
              <div className="gov-top-actions">
                <IconButton size="small" color="inherit" aria-label="search">
                  <SearchIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" color="inherit" aria-label="accessibility">
                  <AccessibilityNewIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" color="inherit" aria-label="language">
                  <TranslateIcon fontSize="small" />
                </IconButton>
                <a href="#" className="language-button">हिन्दी</a>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* White navbar */}
      <div className="white-navbar">
        <Container maxWidth={false}>
          <div className="navbar-content">
            <div className="navbar-left">
              <IconButton
                color="inherit"
                aria-label="toggle sidebar"
                onClick={toggleSidebar}
                edge="start"
                className={`nav-menu-button ${sidebarOpen ? 'open' : ''}`}
              >
                <MenuIcon />
              </IconButton>
              
              <div className="ministry-branding">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
                  alt="National Emblem of India" 
                  className="national-emblem" 
                />
                <div className="ministry-title">
                  <h1>पूर्वोत्तर पुलिस विभाग मंत्रालय</h1>
                  <h2>Ministry of North East Police Department</h2>
                </div>
              </div>
            </div>
            
            <div className="navbar-center">
              <Typography variant="h6" className="dashboard-title">
                Police Dashboard — Smart Tourist Safety Monitoring
              </Typography>
            </div>
            
            <div className="navbar-right">
              <div className="notification-wrapper" ref={notificationRef}>
                <IconButton 
                  color="inherit" 
                  className="notification-button"
                  onClick={toggleNotifications}
                >
                  <Badge badgeContent={unreadCount} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                
                {notificationOpen && (
                  <div className="notification-dropdown">
                    <div className="notification-header">
                      <Typography variant="h6">Notifications</Typography>
                      <Typography variant="caption">{unreadCount} unread</Typography>
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
                        onClick={() => navigate('/police/alerts')}
                      >
                        View All Alerts
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="logo-container">
                <img 
                  src={nav2Image} 
                  alt="Tourism Initiative" 
                  className="navbar-logo"
                />
                <img 
                  src={nav3Image} 
                  alt="Tourism Logo" 
                  className="navbar-logo"
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
      
      {/* Main content area with sidebar */}
      <div className="main-container">
        <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-content">
            <nav>
              <ul>
                <li>
                  <NavLink to="/police/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
                    <DashboardIcon className="nav-icon" />
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/police/map" className={({ isActive }) => isActive ? 'active' : ''}>
                    <MapIcon className="nav-icon" />
                    Map
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/police/alerts" className={({ isActive }) => isActive ? 'active' : ''}>
                    <NotificationsActiveIcon className="nav-icon" />
                    Alerts
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/police/tourists" className={({ isActive }) => isActive ? 'active' : ''}>
                    <PeopleIcon className="nav-icon" />
                    Tourists
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/police/incidents" className={({ isActive }) => isActive ? 'active' : ''}>
                    <WarningIcon className="nav-icon" />
                    Incidents
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/police/dispatch" className={({ isActive }) => isActive ? 'active' : ''}>
                    <LocalShippingIcon className="nav-icon" />
                    Dispatch
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/police/units" className={({ isActive }) => isActive ? 'active' : ''}>
                    <GroupsIcon className="nav-icon" />
                    Units
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/police/geofences" className={({ isActive }) => isActive ? 'active' : ''}>
                    <LocationOnIcon className="nav-icon" />
                    Geofences
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/police/iot" className={({ isActive }) => isActive ? 'active' : ''}>
                    <DevicesIcon className="nav-icon" />
                    IoT Devices
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/police/reports" className={({ isActive }) => isActive ? 'active' : ''}>
                    <AssessmentIcon className="nav-icon" />
                    Reports
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/police/settings" className={({ isActive }) => isActive ? 'active' : ''}>
                    <SettingsIcon className="nav-icon" />
                    Settings
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/police/audit" className={({ isActive }) => isActive ? 'active' : ''}>
                    <SecurityIcon className="nav-icon" />
                    Audit
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        
        <main id="main-content" className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <div className="page-container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;