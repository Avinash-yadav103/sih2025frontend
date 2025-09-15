import { useState, useEffect } from 'react';
import { Box, Paper, Typography, Grid, Tabs, Tab, FormControl, InputLabel, Select, MenuItem, Slider, TextField } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Mock data for tourists
const mockTourists = [
  { id: 'T-1001', name: 'John Doe', lat: 27.3314, lon: 88.6134, risk: 'medium', status: 'moving', device: 'smartwatch' },
  { id: 'T-1002', name: 'Jane Smith', lat: 27.3414, lon: 88.6234, risk: 'high', status: 'idle', device: 'smartphone' },
  { id: 'T-1003', name: 'Bob Johnson', lat: 27.3214, lon: 88.6034, risk: 'low', status: 'moving', device: 'smartwatch' },
];

// Risk colors
const riskColors = {
  low: '#4caf50',
  medium: '#ff9800',
  high: '#f44336',
};

const MapView = () => {
  const [selectedTourist, setSelectedTourist] = useState(null);
  const [riskFilter, setRiskFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredTourists = mockTourists.filter(tourist => {
    if (riskFilter !== 'all' && tourist.risk !== riskFilter) return false;
    if (statusFilter !== 'all' && tourist.status !== statusFilter) return false;
    if (searchQuery && !tourist.name.toLowerCase().includes(searchQuery.toLowerCase()) && !tourist.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleMarkerClick = (tourist) => {
    setSelectedTourist(tourist);
  };

  // Mock panel components
  const ProfilePanel = () => (
    <Box sx={{ p: 2 }}>
      {selectedTourist ? (
        <>
          <Typography variant="h6">{selectedTourist.name}</Typography>
          <Typography variant="body1">ID: {selectedTourist.id}</Typography>
          <Typography variant="body2">Risk Level: {selectedTourist.risk}</Typography>
          <Typography variant="body2">Status: {selectedTourist.status}</Typography>
          <Typography variant="body2">Device: {selectedTourist.device}</Typography>
        </>
      ) : (
        <Typography>Select a tourist to view their profile</Typography>
      )}
    </Box>
  );

  const LiveTrackPanel = () => (
    <Box sx={{ p: 2 }}>
      <Typography>Live tracking data would appear here</Typography>
    </Box>
  );

  const TimelinePanel = () => (
    <Box sx={{ p: 2 }}>
      <Typography>Tourist activity timeline would appear here</Typography>
    </Box>
  );

  const EvidencePanel = () => (
    <Box sx={{ p: 2 }}>
      <Typography>Evidence collection would appear here</Typography>
    </Box>
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <TextField
                label="Search Tourist"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Name, ID, or Phone"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Risk Level</InputLabel>
                <Select
                  value={riskFilter}
                  label="Risk Level"
                  onChange={(e) => setRiskFilter(e.target.value)}
                >
                  <MenuItem value="all">All Risks</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="moving">Moving</MenuItem>
                  <MenuItem value="idle">Idle</MenuItem>
                  <MenuItem value="sos">SOS</MenuItem>
                  <MenuItem value="offline">Offline</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography gutterBottom>Safety Score Range</Typography>
              <Slider
                defaultValue={[0, 100]}
                valueLabelDisplay="auto"
                step={10}
                marks
                min={0}
                max={100}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={8}>
        <Paper sx={{ height: '70vh', overflow: 'hidden' }}>
          <MapContainer center={[27.3314, 88.6134]} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredTourists.map(tourist => (
              <Marker 
                key={tourist.id} 
                position={[tourist.lat, tourist.lon]}
                eventHandlers={{
                  click: () => handleMarkerClick(tourist),
                }}
              >
                <Popup>
                  <Typography variant="body1">{tourist.name}</Typography>
                  <Typography variant="body2">ID: {tourist.id}</Typography>
                  <Typography variant="body2">Risk: {tourist.risk}</Typography>
                </Popup>
                <Circle 
                  center={[tourist.lat, tourist.lon]} 
                  radius={100} 
                  pathOptions={{ fillColor: riskColors[tourist.risk], color: riskColors[tourist.risk] }} 
                />
              </Marker>
            ))}
          </MapContainer>
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={4}>
        <Paper sx={{ height: '70vh', overflow: 'auto' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="tourist details tabs">
              <Tab label="Profile" />
              <Tab label="Live Track" />
              <Tab label="Timeline" />
              <Tab label="Evidence" />
            </Tabs>
          </Box>
          <Box sx={{ p: 2 }}>
            {tabValue === 0 && <ProfilePanel />}
            {tabValue === 1 && <LiveTrackPanel />}
            {tabValue === 2 && <TimelinePanel />}
            {tabValue === 3 && <EvidencePanel />}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MapView;