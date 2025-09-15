import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useState } from 'react'
import './App.css'

// Import pages
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import MapView from './pages/MapView'
import Alerts from './pages/Alerts'
import AlertDetail from './pages/AlertDetail'
import TouristList from './pages/TouristList'
import TouristDetail from './pages/TouristDetail'
import IncidentList from './pages/IncidentList'
import IncidentDetail from './pages/IncidentDetail'
import Dispatch from './pages/Dispatch'
import UnitsList from './pages/UnitsList'
import GeofenceManager from './pages/GeofenceManager'
import IoTDashboard from './pages/IoTDashboard'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import Audit from './pages/Audit'
import Layout from './components/Layout'

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/police/login" element={<Login onLogin={handleLogin} />} />
          
          {isAuthenticated ? (
            <Route element={<Layout />}>
              <Route path="/police" element={<Navigate to="/police/map" replace />} />
              <Route path="/police/map" element={<MapView />} />
              <Route path="/police/alerts" element={<Alerts />} />
              <Route path="/police/alerts/:alertId" element={<AlertDetail />} />
              <Route path="/police/tourists" element={<TouristList />} />
              <Route path="/police/tourists/:touristId" element={<TouristDetail />} />
              <Route path="/police/incidents" element={<IncidentList />} />
              <Route path="/police/incidents/:incidentId" element={<IncidentDetail />} />
              <Route path="/police/dispatch" element={<Dispatch />} />
              <Route path="/police/units" element={<UnitsList />} />
              <Route path="/police/geofences" element={<GeofenceManager />} />
              <Route path="/police/iot" element={<IoTDashboard />} />
              <Route path="/police/reports" element={<Reports />} />
              <Route path="/police/settings" element={<Settings />} />
              <Route path="/police/audit" element={<Audit />} />
            </Route>
          ) : (
            <Route path="/police/*" element={<Navigate to="/police/login" replace />} />
          )}
          
          <Route path="*" element={<Navigate to="/police/login" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
