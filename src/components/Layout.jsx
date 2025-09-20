import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import './Layout.css';
import { Box, AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material';
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

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="layout-container">
      <AppBar position="fixed" sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: '#FFFFFF',
        color: '#1F1F1F',
        boxShadow: '0 1px 0 0 #E6E9EE',
      }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle sidebar"
            onClick={toggleSidebar}
            edge="start"
            className={`hamburger-button ${sidebarOpen ? 'open' : ''}`}
            sx={{ mr: 2 }}
          >
            <div className="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
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
      
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-content">
          <nav>
            <ul>
              <li>
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
                  <DashboardIcon sx={{ marginRight: 1 }} fontSize="small" />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/map" className={({ isActive }) => isActive ? 'active' : ''}>
                  <MapIcon sx={{ marginRight: 1 }} fontSize="small" />
                  Map
                </NavLink>
              </li>
              <li>
                <NavLink to="/alerts" className={({ isActive }) => isActive ? 'active' : ''}>
                  <NotificationsActiveIcon sx={{ marginRight: 1 }} fontSize="small" />
                  Alerts
                </NavLink>
              </li>
              <li>
                <NavLink to="/tourists" className={({ isActive }) => isActive ? 'active' : ''}>
                  <PeopleIcon sx={{ marginRight: 1 }} fontSize="small" />
                  Tourists
                </NavLink>
              </li>
              <li>
                <NavLink to="/incidents" className={({ isActive }) => isActive ? 'active' : ''}>
                  <WarningIcon sx={{ marginRight: 1 }} fontSize="small" />
                  Incidents
                </NavLink>
              </li>
              <li>
                <NavLink to="/dispatch" className={({ isActive }) => isActive ? 'active' : ''}>
                  <LocalShippingIcon sx={{ marginRight: 1 }} fontSize="small" />
                  Dispatch
                </NavLink>
              </li>
              <li>
                <NavLink to="/units" className={({ isActive }) => isActive ? 'active' : ''}>
                  <GroupsIcon sx={{ marginRight: 1 }} fontSize="small" />
                  Units
                </NavLink>
              </li>
              <li>
                <NavLink to="/geofences" className={({ isActive }) => isActive ? 'active' : ''}>
                  <LocationOnIcon sx={{ marginRight: 1 }} fontSize="small" />
                  Geofences
                </NavLink>
              </li>
              <li>
                <NavLink to="/iot" className={({ isActive }) => isActive ? 'active' : ''}>
                  <DevicesIcon sx={{ marginRight: 1 }} fontSize="small" />
                  IoT Devices
                </NavLink>
              </li>
              <li>
                <NavLink to="/reports" className={({ isActive }) => isActive ? 'active' : ''}>
                  <AssessmentIcon sx={{ marginRight: 1 }} fontSize="small" />
                  Reports
                </NavLink>
              </li>
              <li>
                <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>
                  <SettingsIcon sx={{ marginRight: 1 }} fontSize="small" />
                  Settings
                </NavLink>
              </li>
              <li>
                <NavLink to="/audit" className={({ isActive }) => isActive ? 'active' : ''}>
                  <SecurityIcon sx={{ marginRight: 1 }} fontSize="small" />
                  Audit
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      
      <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Toolbar /> {/* This creates space below the AppBar */}
        <div className="page-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;