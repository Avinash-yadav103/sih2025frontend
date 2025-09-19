import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import './App.css'
import { Box } from '@mui/material';

// Import pages
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
import MapWrapper from './pages/Maps/MapWrapper'
import LandingPage from './pages/LandingPage'
import AdminLogin from './pages/AdminLogin'
import PoliceLogin from './pages/PoliceLogin'
import AdminDashboard from './pages/AdminDashboard'

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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Login routes */}
          <Route path="/police/login" element={<PoliceLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Admin Dashboard */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
          {/* Fix for /mapi route - use the MapWrapper */}
          <Route path="/mapi" element={<MapWrapper />} />
          
          {/* All routes are now inside the Layout without authentication check */}
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
          
          {/* Redirect non-matching paths to landing page instead */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
