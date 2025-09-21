import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ThemeProvider from './theme/ThemeProvider';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import MapView from './pages/MapView';
import Alerts from './pages/Alerts';
import TouristList from './pages/TouristList';
import IncidentList from './pages/IncidentList';
import Dispatch from './pages/Dispatch';
import UnitsList from './pages/UnitsList';
import GeofenceManager from './pages/GeofenceManager';
import IoTDashboard from './pages/IoTDashboard';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Audit from './pages/Audit';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import PoliceLogin from './pages/PoliceLogin';
import AdminLogin from './pages/AdminLogin';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Tourism from './pages/Tourism';
import Schemes from './pages/Schemes';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import { DatabaseProvider } from './context/DatabaseContext';

import './App.css';

function App() {
  return (
    <ThemeProvider>
      <DatabaseProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/police/login" element={<PoliceLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/tourism" element={<Tourism />} />
            <Route path="/schemes" element={<Schemes />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Admin routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            
            {/* Police routes with Layout */}
            <Route element={<Layout />}>
              <Route path="/police/dashboard" element={<Dashboard />} />
              <Route path="/police/map" element={<MapView />} />
              <Route path="/police/alerts" element={<Alerts />} />
              <Route path="/police/tourists" element={<TouristList />} />
              <Route path="/police/incidents" element={<IncidentList />} />
              <Route path="/police/dispatch" element={<Dispatch />} />
              <Route path="/police/units" element={<UnitsList />} />
              <Route path="/police/geofences" element={<GeofenceManager />} />
              <Route path="/police/iot" element={<IoTDashboard />} />
              <Route path="/police/reports" element={<Reports />} />
              <Route path="/police/settings" element={<Settings />} />
              <Route path="/police/audit" element={<Audit />} />
            </Route>
            
            {/* Redirects */}
            <Route path="/dashboard" element={<Navigate to="/police/dashboard" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </DatabaseProvider>
    </ThemeProvider>
  );
}

export default App;
