import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import './Layout.css';
import { Box, AppBar, Toolbar, Typography, IconButton } from '@mui/material';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="layout-container">
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
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
          <Typography variant="h6" noWrap component="div">
            Police Dashboard — Smart Tourist Safety Monitoring
          </Typography>
        </Toolbar>
      </AppBar>
      
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-content">
          <nav>
            <ul>
              <li>
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/map" className={({ isActive }) => isActive ? 'active' : ''}>
                  Map
                </NavLink>
              </li>
              <li>
                <NavLink to="/alerts" className={({ isActive }) => isActive ? 'active' : ''}>
                  Alerts
                </NavLink>
              </li>
              <li>
                <NavLink to="/tourists" className={({ isActive }) => isActive ? 'active' : ''}>
                  Tourists
                </NavLink>
              </li>
              <li>
                <NavLink to="/incidents" className={({ isActive }) => isActive ? 'active' : ''}>
                  Incidents
                </NavLink>
              </li>
              <li>
                <NavLink to="/dispatch" className={({ isActive }) => isActive ? 'active' : ''}>
                  Dispatch
                </NavLink>
              </li>
              <li>
                <NavLink to="/units" className={({ isActive }) => isActive ? 'active' : ''}>
                  Units
                </NavLink>
              </li>
              <li>
                <NavLink to="/geofences" className={({ isActive }) => isActive ? 'active' : ''}>
                  Geofences
                </NavLink>
              </li>
              <li>
                <NavLink to="/iot" className={({ isActive }) => isActive ? 'active' : ''}>
                  IoT Devices
                </NavLink>
              </li>
              <li>
                <NavLink to="/reports" className={({ isActive }) => isActive ? 'active' : ''}>
                  Reports
                </NavLink>
              </li>
              <li>
                <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>
                  Settings
                </NavLink>
              </li>
              <li>
                <NavLink to="/audit" className={({ isActive }) => isActive ? 'active' : ''}>
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