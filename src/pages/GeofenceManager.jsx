import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, Paper, Button, TextField, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { MapContainer, TileLayer, CircleMarker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import osm from "./Maps/Leaflet/osm-providers";

const geofenceTypes = [
  { value: "geofenced", label: "Geofenced Area", color: "#3388ff" },
  { value: "highRisk", label: "High Risk Area", color: "#ff4444" },
  { value: "mediumRisk", label: "Medium Risk Area", color: "#ffbb33" },
  { value: "lowRisk", label: "Low Risk Area", color: "#00C851" },
  { value: "bonusArea", label: "Bonus Area", color: "#aa66cc" },
];

const GeofenceManager = () => {
  const [geofences, setGeofences] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter] = useState({ lat: 13.084622, lng: 80.248357 });
  const [openDialog, setOpenDialog] = useState(false);
  const [newGeofence, setNewGeofence] = useState({
    name: "",
    radius: 1.0,
    type: "geofenced",
    penalty_bonus: 0
  });
  const [mapMode, setMapMode] = useState("view"); // "view" or "add"
  const mapRef = useRef();

  // Load saved geofences from localStorage on component mount
  useEffect(() => {
    const savedGeofences = localStorage.getItem("geofences");
    if (savedGeofences) {
      setGeofences(JSON.parse(savedGeofences));
    }
  }, []);

  // Save geofences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("geofences", JSON.stringify(geofences));
  }, [geofences]);

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleAddGeofence = () => {
    const newGeofenceData = {
      ...newGeofence,
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
      id: Date.now().toString(),
    };

    setGeofences([...geofences, newGeofenceData]);
    setOpenDialog(false);
    setNewGeofence({
      name: "",
      radius: 1.0,
      type: "geofenced",
      penalty_bonus: 0
    });
  };

  const handleGeofenceDelete = (id) => {
    setGeofences(geofences.filter(geofence => geofence.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGeofence({
      ...newGeofence,
      [name]: name === "radius" || name === "penalty_bonus" ? parseFloat(value) : value
    });
  };

  const getGeofenceColor = (type) => {
    const geofenceType = geofenceTypes.find(t => t.value === type);
    return geofenceType ? geofenceType.color : "#3388ff";
  };

  // MapClickHandler component to handle clicks on the map
  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        if (mapMode === "add") {
          setSelectedLocation({
            lat: e.latlng.lat,
            lng: e.latlng.lng
          });
          setOpenDialog(true);
        }
      }
    });
    return null;
  };

  const exportGeofences = () => {
    const dataStr = JSON.stringify(geofences, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'geofences.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importGeofences = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedGeofences = JSON.parse(e.target.result);
          if (Array.isArray(importedGeofences)) {
            setGeofences(importedGeofences);
          }
        } catch (error) {
          console.error("Error parsing JSON file:", error);
          alert("Error importing geofences. Please check the file format.");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h5">Geofence Manager</Typography>
        <Box>
          <Button 
            variant="contained" 
            color={mapMode === "add" ? "secondary" : "primary"} 
            onClick={() => setMapMode(mapMode === "view" ? "add" : "view")}
            sx={{ mr: 1 }}
          >
            {mapMode === "view" ? "Add Geofence" : "Cancel Adding"}
          </Button>
          <Button variant="outlined" onClick={exportGeofences} sx={{ mr: 1 }}>
            Export Geofences
          </Button>
          <Button variant="outlined" component="label">
            Import Geofences
            <input
              type="file"
              accept=".json"
              hidden
              onChange={importGeofences}
            />
          </Button>
        </Box>
      </Box>

      <Box sx={{ p: 2, flexGrow: 1 }}>
        <Paper sx={{ height: "100%", position: "relative" }}>
          {mapMode === "add" && (
            <Box sx={{ 
              position: "absolute", 
              top: 10, 
              left: 0, 
              right: 0, 
              zIndex: 1000, 
              display: "flex", 
              justifyContent: "center" 
            }}>
              <Paper sx={{ p: 2, bgcolor: "rgba(255,255,255,0.9)" }}>
                <Typography variant="body2">
                  Click anywhere on the map to add a geofence
                </Typography>
              </Paper>
            </Box>
          )}

          <MapContainer
            center={[mapCenter.lat, mapCenter.lng]}
            zoom={12}
            ref={mapRef}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url={osm.maptiler.url}
              attribution={osm.maptiler.attribution}
            />

            <MapClickHandler />

            {/* Render existing geofences */}
            {geofences.map((geofence) => (
              <CircleMarker
                key={geofence.id}
                center={[geofence.lat, geofence.lng]}
                radius={10}
                pathOptions={{ color: getGeofenceColor(geofence.type), fillOpacity: 0.6 }}
              >
                <Popup>
                  <div>
                    <Typography variant="h6">{geofence.name}</Typography>
                    <Typography variant="body2">Type: {
                      geofenceTypes.find(t => t.value === geofence.type)?.label || geofence.type
                    }</Typography>
                    <Typography variant="body2">Radius: {geofence.radius} km</Typography>
                    <Typography variant="body2">
                      {geofence.penalty_bonus >= 0 ? "Bonus" : "Penalty"}: {Math.abs(geofence.penalty_bonus)}
                    </Typography>
                    <Typography variant="body2">
                      Location: [{geofence.lat.toFixed(6)}, {geofence.lng.toFixed(6)}]
                    </Typography>
                    <Button 
                      variant="outlined" 
                      color="error" 
                      size="small"
                      sx={{ mt: 1 }}
                      onClick={() => handleGeofenceDelete(geofence.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </Paper>
      </Box>

      {/* Dialog for adding a new geofence */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add New Geofence</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Location: {selectedLocation ? `[${selectedLocation.lat.toFixed(6)}, ${selectedLocation.lng.toFixed(6)}]` : ''}
          </Typography>
          <TextField
            fullWidth
            label="Geofence Name"
            name="name"
            value={newGeofence.name}
            onChange={handleInputChange}
            margin="dense"
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
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button 
            onClick={handleAddGeofence} 
            variant="contained"
            disabled={!newGeofence.name}
          >
            Add Geofence
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GeofenceManager;