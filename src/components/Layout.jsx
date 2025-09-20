import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import './Layout.css';
import { Box, AppBar, Toolbar, Typography, IconButton, Badge, Container, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
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

// Import local images
import nav2Image from '../assets/images/nav2.jpg';
import nav3Image from '../assets/images/nav3.png';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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

      {/* Ministry header with logos */}
      <div className="ministry-header">
        <Container maxWidth={false}>
          <div className="ministry-header-content">
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
            <div className="ministry-logos">
              {/* Using the provided local images */}
              <img 
                src={nav2Image} 
                alt="Tourism Initiative" 
                className="ministry-logo"
              />
              <img 
                src={nav3Image} 
                alt="Tourism Logo" 
                className="ministry-logo"
              />
            </div>
          </div>
        </Container>
      </div>
      
      {/* Main navigation bar */}
      <AppBar position="sticky" className="main-navbar">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle sidebar"
            onClick={toggleSidebar}
            edge="start"
            className={`nav-menu-button ${sidebarOpen ? 'open' : ''}`}
          >
            <div className="nav-menu-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </IconButton>
          <Typography variant="h6" component="div" className="nav-title">
            Police Dashboard — Smart Tourist Safety Monitoring
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      
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