import { useState, useEffect, useRef } from 'react';
import { Box, Paper, Typography, Grid, Tabs, Tab, FormControl, InputLabel, Select, MenuItem, Slider, TextField, Button, IconButton } from '@mui/material';
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup, 
  Circle, 
  ZoomControl, 
  LayersControl, 
  ScaleControl, 
  useMap 
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import SearchIcon from '@mui/icons-material/Search';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

// MapTiler API key
const MAPTILER_API_KEY = 'qqMpAwPMo3sB0wwh5VrD';
const MAPTILER_ATTRIBUTION = '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>';

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
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

// Map Resize Handler - Important for map display
const MapResizeHandler = () => {
  const map = useMap();
  
  useEffect(() => {
    // Critical: This ensures map loads correctly after component is fully mounted
    setTimeout(() => {
      map.invalidateSize();
    }, 300); // Longer timeout to ensure DOM is ready
    
    // Handle window resize events
    const handleResize = () => {
      map.invalidateSize();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [map]);
  
  return null;
};

// Location Search Component
const LocationSearch = ({ onLocationFound }) => {
  const [searchValue, setSearchValue] = useState('');
  const map = useMap();

  const handleSearch = async () => {
    if (!searchValue) return;
    
    try {
      // Using Nominatim for geocoding (OpenStreetMap's geocoding service)
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchValue)}`);
      const data = await response.json();
      
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        map.flyTo([lat, lon], 13);
        onLocationFound && onLocationFound([lat, lon]);
      } else {
        alert('Location not found');
      }
    } catch (error) {
      console.error('Error searching location:', error);
      alert('Error searching for location');
    }
  };

  return (
    <Box sx={{ 
      position: 'absolute', 
      top: 10, 
      left: 10, 
      zIndex: 1000, 
      backgroundColor: 'white', 
      borderRadius: 1,
      boxShadow: 2,
      display: 'flex',
      p: 1
    }}>
      <TextField 
        size="small" 
        placeholder="Search location..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        sx={{ width: 200 }}
      />
      <IconButton onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

// Controls component for custom map controls
const MapControls = () => {
  const map = useMap();
  
  const handleFullscreen = () => {
    // Find the map container element
    const container = map.getContainer();
    
    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };
  
  const handleLocateMe = () => {
    map.locate({ setView: true, maxZoom: 16 });
  };
  
  return (
    <Box sx={{ 
      position: 'absolute', 
      bottom: 35, 
      right: 10, 
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      gap: 1
    }}>
      <IconButton 
        onClick={handleFullscreen}
        sx={{ backgroundColor: 'white', boxShadow: 1 }}
      >
        <FullscreenIcon />
      </IconButton>
      <IconButton 
        onClick={handleLocateMe}
        sx={{ backgroundColor: 'white', boxShadow: 1 }}
      >
        <MyLocationIcon />
      </IconButton>
    </Box>
  );
};

const MapView = () => {
  const [selectedTourist, setSelectedTourist] = useState(null);
  const [riskFilter, setRiskFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapCenter, setMapCenter] = useState([27.3314, 88.6134]);
  const [searchedLocation, setSearchedLocation] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const mapContainerRef = useRef(null);

  // Create a ref to store the map instance
  const mapRef = useRef(null);

  // Make sure the map re-renders properly when the component mounts
  useEffect(() => {
    // Important: Force resize after component fully mounts
    const timer = setTimeout(() => {
      if (mapContainerRef.current) {
        // Dispatch resize event to ensure container is measured correctly
        window.dispatchEvent(new Event('resize'));
        setMapReady(true);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

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

  const handleLocationFound = (location) => {
    setSearchedLocation(location);
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
        {/* More explicit styling for map container */}
        <Paper 
          sx={{ 
            height: '70vh', 
            minHeight: '500px', // Ensure minimum height
            width: '100%',
            position: 'relative',
            overflow: 'hidden', 
          }}
          ref={mapContainerRef}
        >
          {/* MapContainer with improved settings */}
          <div style={{ 
            height: '100%', 
            width: '100%', 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}>
            <MapContainer 
              center={mapCenter} 
              zoom={13} 
              style={{ height: '100%', width: '100%' }}
              zoomControl={false}
              ref={mapRef}
            >
              {/* Add map resize handler */}
              <MapResizeHandler />
              
              <LayersControl position="topright">
                {/* MapTiler Layers - Using correct format for MapTiler */}
                <LayersControl.BaseLayer checked name="Streets">
                  <TileLayer
                    attribution={MAPTILER_ATTRIBUTION}
                    url={`https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=${MAPTILER_API_KEY}`}
                  />
                </LayersControl.BaseLayer>
                
                <LayersControl.BaseLayer name="Satellite">
                  <TileLayer
                    attribution={MAPTILER_ATTRIBUTION}
                    url={`https://api.maptiler.com/maps/hybrid/256/{z}/{x}/{y}.jpg?key=${MAPTILER_API_KEY}`}
                  />
                </LayersControl.BaseLayer>
                
                <LayersControl.BaseLayer name="Outdoor">
                  <TileLayer
                    attribution={MAPTILER_ATTRIBUTION}
                    url={`https://api.maptiler.com/maps/outdoor/256/{z}/{x}/{y}.png?key=${MAPTILER_API_KEY}`}
                  />
                </LayersControl.BaseLayer>
                
                <LayersControl.BaseLayer name="Topo">
                  <TileLayer
                    attribution={MAPTILER_ATTRIBUTION}
                    url={`https://api.maptiler.com/maps/topo/256/{z}/{x}/{y}.png?key=${MAPTILER_API_KEY}`}
                  />
                </LayersControl.BaseLayer>
                
                <LayersControl.BaseLayer name="Dark">
                  <TileLayer
                    attribution={MAPTILER_ATTRIBUTION}
                    url={`https://api.maptiler.com/maps/darkmatter/256/{z}/{x}/{y}.png?key=${MAPTILER_API_KEY}`}
                  />
                </LayersControl.BaseLayer>

                {/* Fallback to OpenStreetMap if MapTiler has issues */}
                <LayersControl.BaseLayer name="OSM Fallback">
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                </LayersControl.BaseLayer>
              </LayersControl>
              
              <ZoomControl position="bottomleft" />
              <ScaleControl position="bottomleft" />
              
              {/* Custom Controls */}
              <LocationSearch onLocationFound={handleLocationFound} />
              <MapControls />
              
              {/* Tourist markers */}
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
              
              {/* Display searched location marker if any */}
              {searchedLocation && (
                <Marker position={searchedLocation}>
                  <Popup>Searched Location</Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
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