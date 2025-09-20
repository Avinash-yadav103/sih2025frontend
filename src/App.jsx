import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ThemeProvider from './theme/ThemeProvider';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import MapView from './pages/MapView';
import Alerts from './pages/Alerts';
import AlertDetail from './pages/AlertDetail'
import TouristList from './pages/TouristList';
import TouristDetail from './pages/TouristDetail'
import IncidentList from './pages/IncidentList';
import IncidentDetail from './pages/IncidentDetail'
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
import { DatabaseProvider } from './context/DatabaseContext';

import './App.css';

function App() {
  return (
    <ThemeProvider>
      <DatabaseProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/police/login" element={<PoliceLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/" element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="map" element={<MapView />} />
              <Route path="alerts" element={<Alerts />} />
              <Route path="alerts/:alertId" element={<AlertDetail />} />
              <Route path="tourists" element={<TouristList />} />
              <Route path="tourists/:touristId" element={<TouristDetail />} />
              <Route path="incidents" element={<IncidentList />} />
              <Route path="incidents/:incidentId" element={<IncidentDetail />} />
              <Route path="dispatch" element={<Dispatch />} />
              <Route path="units" element={<UnitsList />} />
              <Route path="geofences" element={<GeofenceManager />} />
              <Route path="iot" element={<IoTDashboard />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
              <Route path="audit" element={<Audit />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DatabaseProvider>
    </ThemeProvider>
  );
}

export default App;
