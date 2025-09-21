import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Circle, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import osm from "./osm-providers";
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Snackbar, Alert, CircularProgress } from "@mui/material";
import { fetchAllZones, createZone, updateZone, deleteZone, convertZoneToGeofence, convertGeofenceToZone } from "../../../services/zoneService";
import { useDatabase } from '../../../context/DatabaseContext';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

// Geofence types with their properties
const geofenceTypes = [
  { value: "geofenced", label: "Geofenced Area", color: "#3388ff" },
  { value: "highRisk", label: "High Risk Area", color: "#ff4444" },
  { value: "mediumRisk", label: "Medium Risk Area", color: "#ffbb33" },
  { value: "lowRisk", label: "Low Risk Area", color: "#00C851" },
  { value: "bonusArea", label: "Bonus Area", color: "#aa66cc" },
];

// Helper function to get tile layer based on selected style
const getTileLayerSource = (style = 'osm') => {
  switch (style) {
    case 'satellite':
      return osm.satellite || {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: '&copy; <a href="https://www.esri.com/">Esri</a>, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      };
    case 'terrain':
      return osm.terrain || {
        url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png',
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      };
    case 'dark':
      return osm.dark || {
        url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}{r}.png',
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
      };
    case 'osm':
    default:
      return osm.osm || {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      };
  }
};

// Component to handle map click events
const LocationMarker = ({ setSelectedLocation }) => {
  useMapEvents({
    click(e) {
      setSelectedLocation({
        lat: e.latlng.lat,
        lng: e.latlng.lng
      });
    }
  });

  return null;
};

const GeofenceMap = ({ onMapReady }) => {
  const [center] = useState({ lat: 13.084622, lng: 80.248357 });
  const ZOOM_LEVEL = 9;
  const mapRef = useRef();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [geofences, setGeofences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newGeofence, setNewGeofence] = useState({
    name: "",
    radius: 1.0,
    type: "geofenced",
    penalty_bonus: 0
  });
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success"
  });
  const [mapStyle, setMapStyle] = useState('osm'); // Add state for map style
  const fileInputRef = useRef(null);
  const { isConnected, error: dbError } = useDatabase();
  
  // Load zones from database on component mount
  useEffect(() => {
    const loadZones = async () => {
      setLoading(true);
      try {
        const zonesData = await fetchAllZones();
        // Convert database zones to frontend geofence format
        const mappedGeofences = zonesData.map(convertZoneToGeofence);
        setGeofences(mappedGeofences);
        
        if (zonesData.length > 0) {
          showNotification(`Successfully loaded ${zonesData.length} geofences from database`, "success");
        }
      } catch (error) {
        console.error("Failed to load zones:", error);
        showNotification(
          `Database error: ${error.message || "Failed to load geofence zones"}. Using local data instead.`, 
          "warning"
        );
        
        // Fallback to localStorage if database fetch fails
        const savedGeofences = localStorage.getItem("geofences");
        if (savedGeofences) {
          try {
            const localGeofences = JSON.parse(savedGeofences);
            setGeofences(localGeofences);
            showNotification(`Loaded ${localGeofences.length} geofences from local storage`, "info");
          } catch (err) {
            console.error("Error loading geofences from localStorage:", err);
          }
        }
      } finally {
        setLoading(false);
      }
    };
    
    // Only try to load from database if we have a connection
    if (isConnected) {
      loadZones();
    } else {
      // If not connected, load from localStorage
      const savedGeofences = localStorage.getItem("geofences");
      if (savedGeofences) {
        try {
          const localGeofences = JSON.parse(savedGeofences);
          setGeofences(localGeofences);
          showNotification("Using locally saved geofences (offline mode)", "info");
        } catch (err) {
          console.error("Error loading geofences from localStorage:", err);
        }
      }
      
      if (dbError) {
        showNotification(`Database connection error: ${dbError.message || 'Unknown error'}. Using local storage.`, "warning");
      }
    }
  }, [isConnected, dbError]);

  // Pass map reference to parent when available
  useEffect(() => {
    if (mapRef.current && onMapReady) {
      onMapReady(mapRef.current);
    }
  }, [mapRef, onMapReady]);

  // Save geofences to localStorage as backup
  useEffect(() => {
    if (geofences.length > 0) {
      localStorage.setItem("geofences", JSON.stringify(geofences));
    }
  }, [geofences]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGeofence({
      ...newGeofence,
      [name]: name === "radius" || name === "penalty_bonus" ? parseFloat(value) : value,
    });
  };

  const handleAddGeofence = async () => {
    if (!selectedLocation || !newGeofence.name) return;

    const geofenceData = {
      name: newGeofence.name,
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
      radius: newGeofence.radius,
      type: newGeofence.type,
      penalty_bonus: newGeofence.penalty_bonus
    };

    setLoading(true);
    
    // Local ID to use whether online or offline
    const localId = `geofence-${Date.now()}`;
    const localGeofence = { ...geofenceData, id: localId };
    
    try {
      if (isConnected) {
        // Try to save to database if connected
        const zoneData = convertGeofenceToZone(geofenceData);
        const result = await createZone(zoneData);
        
        if (result && result.length > 0) {
          // Use the returned ID from the database
          const savedGeofence = convertZoneToGeofence(result[0]);
          setGeofences([...geofences, savedGeofence]);
          showNotification("Geofence created successfully in database", "success");
        } else {
          // Fallback to local storage if database save fails
          setGeofences([...geofences, localGeofence]);
          showNotification("Could not save to database. Geofence saved locally.", "warning");
        }
      } else {
        // Offline mode - save locally only
        setGeofences([...geofences, localGeofence]);
        showNotification("Offline mode: Geofence saved locally", "info");
      }
    } catch (error) {
      console.error("Failed to create geofence:", error);
      // Fallback to local storage
      setGeofences([...geofences, localGeofence]);
      showNotification("Error saving to database. Geofence saved locally.", "error");
    } finally {
      setLoading(false);
      setNewGeofence({
        name: "",
        radius: 1.0,
        type: "geofenced",
        penalty_bonus: 0
      });
      setOpenDialog(false);
    }
  };

  const getGeofenceColor = (type) => {
    const geofenceType = geofenceTypes.find(t => t.value === type);
    return geofenceType ? geofenceType.color : "#3388ff";
  };

  const handleExportGeofences = () => {
    const dataStr = JSON.stringify(geofences, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'geofences.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showNotification("Geofences exported successfully", "success");
  };
  
  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleImportGeofences = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        
        // Validate imported data
        if (!Array.isArray(importedData)) {
          throw new Error("Imported data is not an array");
        }
        
        setLoading(true);
        
        // Process each geofence
        const importPromises = importedData.map(async (geofence) => {
          // Validate required fields
          if (!geofence.name || !geofence.lat || !geofence.lng || !geofence.radius || !geofence.type) {
            throw new Error("One or more geofences are missing required fields");
          }
          
          try {
            // Try to save to database
            const zoneData = convertGeofenceToZone(geofence);
            const result = await createZone(zoneData);
            if (result && result.length > 0) {
              return convertZoneToGeofence(result[0]);
            } else {
              // Fallback with local ID if needed
              return {
                ...geofence,
                id: geofence.id || `imported-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
              };
            }
          } catch (error) {
            console.error("Error saving imported geofence to database:", error);
            // Return with local ID for fallback
            return {
              ...geofence,
              id: geofence.id || `imported-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
            };
          }
        });
        
        // Wait for all imports to finish
        const importedGeofences = await Promise.all(importPromises);
        
        // Merge with existing geofences (preserving existing ones)
        const mergedGeofences = [...geofences, ...importedGeofences];
        setGeofences(mergedGeofences);
        
        // Find map bounds to fit all geofences
        if (importedGeofences.length > 0 && mapRef.current) {
          const bounds = L.latLngBounds(importedGeofences.map(g => [g.lat, g.lng]));
          mapRef.current.fitBounds(bounds, { padding: [50, 50] });
        }
        
        showNotification(`Successfully imported ${importedGeofences.length} geofences`, "success");
      } catch (error) {
        console.error("Error importing geofences:", error);
        showNotification(`Error importing geofences: ${error.message}`, "error");
      } finally {
        setLoading(false);
        // Reset file input
        event.target.value = null;
      }
    };
    
    reader.onerror = () => {
      showNotification("Error reading file", "error");
    };
    
    reader.readAsText(file);
  };
  
  const handleDeleteGeofence = async (id) => {
    setLoading(true);
    try {
      // Check if it's a database ID or local ID
      if (typeof id === 'number' || id.toString().indexOf('db-') === 0) {
        // Remove 'db-' prefix if present
        const dbId = id.toString().replace('db-', '');
        await deleteZone(dbId);
      }
      
      // Always remove from local state
      setGeofences(geofences.filter(g => g.id !== id));
      showNotification("Geofence deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting geofence:", error);
      // Still remove from local state even if database delete fails
      setGeofences(geofences.filter(g => g.id !== id));
      showNotification("Error deleting from database, but removed locally", "warning");
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteAllGeofences = async () => {
    if (window.confirm("Are you sure you want to delete all geofences? This action cannot be undone.")) {
      setLoading(true);
      try {
        // For a production app, you would implement a batch delete in your API
        // Here we're just clearing the local state
        setGeofences([]);
        localStorage.removeItem("geofences");
        showNotification("All geofences deleted", "info");
      } catch (error) {
        console.error("Error deleting all geofences:", error);
        showNotification("Error deleting all geofences", "error");
      } finally {
        setLoading(false);
      }
    }
  };
  
  const showNotification = (message, severity) => {
    setNotification({
      open: true,
      message,
      severity
    });
  };
  
  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };
  
  // Map style selector - add these methods
  const handleMapStyleChange = (style) => {
    setMapStyle(style);
  };

  // Get the appropriate tile source
  const tileSource = getTileLayerSource(mapStyle);

  return (
    <>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={ZOOM_LEVEL}
        ref={mapRef}
        style={{ height: "100%", width: "100%" }}
      >
        {/* FIXED: Use OpenStreetMap by default to avoid the MapTiler "Invalid key" error */}
        <TileLayer
          url={tileSource.url}
          attribution={tileSource.attribution}
        />

        {/* Map click handler */}
        <LocationMarker setSelectedLocation={setSelectedLocation} />

        {/* Show marker at selected location */}
        {selectedLocation && (
          <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
            <Popup>
              <div>
                <h4>Selected Location</h4>
                <p>Latitude: {selectedLocation.lat.toFixed(6)}</p>
                <p>Longitude: {selectedLocation.lng.toFixed(6)}</p>
                <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                  Create Geofence
                </Button>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Display existing geofences */}
        {geofences.map((geofence) => (
          <React.Fragment key={geofence.id}>
            <Marker position={[geofence.lat, geofence.lng]}>
              <Popup>
                <div>
                  <h4>{geofence.name}</h4>
                  <p>Type: {geofence.type}</p>
                  <p>Radius: {geofence.radius} km</p>
                  <p>Penalty/Bonus: {geofence.penalty_bonus}</p>
                  <p>Latitude: {geofence.lat.toFixed(6)}</p>
                  <p>Longitude: {geofence.lng.toFixed(6)}</p>
                  <Button 
                    variant="outlined" 
                    color="error" 
                    size="small"
                    onClick={() => handleDeleteGeofence(geofence.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Popup>
            </Marker>
            <Circle
              center={[geofence.lat, geofence.lng]}
              radius={geofence.radius * 1000} // Convert km to meters
              pathOptions={{
                color: getGeofenceColor(geofence.type),
                fillColor: getGeofenceColor(geofence.type),
                fillOpacity: 0.2
              }}
            >
              <Popup>
                <div>
                  <h4>{geofence.name}</h4>
                  <p>Type: {geofence.type}</p>
                  <p>Radius: {geofence.radius} km</p>
                  <p>Penalty/Bonus: {geofence.penalty_bonus}</p>
                </div>
              </Popup>
            </Circle>
          </React.Fragment>
        ))}
      </MapContainer>

      {/* Map Style Controls */}
      <div style={{ 
        position: "absolute", 
        top: "80px", 
        right: "10px", 
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        backgroundColor: "white",
        padding: "5px",
        borderRadius: "4px",
        boxShadow: "0 1px 5px rgba(0,0,0,0.2)"
      }}>
        <Button 
          variant={mapStyle === 'osm' ? "contained" : "outlined"} 
          size="small"
          onClick={() => handleMapStyleChange('osm')}
        >
          Standard
        </Button>
        <Button 
          variant={mapStyle === 'satellite' ? "contained" : "outlined"} 
          size="small"
          onClick={() => handleMapStyleChange('satellite')}
        >
          Satellite
        </Button>
        <Button 
          variant={mapStyle === 'terrain' ? "contained" : "outlined"} 
          size="small"
          onClick={() => handleMapStyleChange('terrain')}
        >
          Terrain
        </Button>
        <Button 
          variant={mapStyle === 'dark' ? "contained" : "outlined"} 
          size="small"
          onClick={() => handleMapStyleChange('dark')}
        >
          Dark
        </Button>
      </div>

      {/* Controls for import/export functionality */}
      <div style={{ 
        position: "absolute", 
        top: "260px", 
        right: "10px", 
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        gap: "10px"
      }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleImportClick}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Import Geofences"}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          style={{ display: 'none' }}
          onChange={handleImportGeofences}
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleExportGeofences}
          disabled={loading || geofences.length === 0}
        >
          Export Geofences
        </Button>
        {geofences.length > 0 && (
          <Button 
            variant="outlined" 
            color="error" 
            onClick={handleDeleteAllGeofences}
            disabled={loading}
          >
            Delete All
          </Button>
        )}
      </div>

      {/* Dialog for adding a new geofence */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Geofence</DialogTitle>
        <DialogContent>
          {selectedLocation && (
            <div style={{ marginBottom: "15px" }}>
              <p>Latitude: {selectedLocation.lat.toFixed(6)}</p>
              <p>Longitude: {selectedLocation.lng.toFixed(6)}</p>
            </div>
          )}
          
          <TextField
            fullWidth
            label="Geofence Name"
            name="name"
            value={newGeofence.name}
            onChange={handleInputChange}
            margin="dense"
            required
          />
          
          <TextField
            fullWidth
            label="Radius (km)"
            type="number"
            name="radius"
            value={newGeofence.radius}
            onChange={handleInputChange}
            InputProps={{ inputProps: { min: 0.1, step: 0.1 } }}
            margin="dense"
          />
          
          <TextField
            fullWidth
            select
            label="Type"
            name="type"
            value={newGeofence.type}
            onChange={handleInputChange}
            margin="dense"
          >
            {geofenceTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          
          <TextField
            fullWidth
            label="Penalty/Bonus Value"
            type="number"
            name="penalty_bonus"
            value={newGeofence.penalty_bonus}
            onChange={handleInputChange}
            helperText="Negative for penalty, positive for bonus"
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={loading}>Cancel</Button>
          <Button 
            onClick={handleAddGeofence}
            color="primary"
            disabled={loading || !newGeofence.name}
          >
            {loading ? <CircularProgress size={24} /> : "Add Geofence"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Loading overlay */}
      {loading && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1500
        }}>
          <CircularProgress />
        </div>
      )}

      {/* Notification snackbar */}
      <Snackbar 
        open={notification.open} 
        autoHideDuration={4000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default GeofenceMap;