import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Circle, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import osm from "./osm-providers";
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem } from "@mui/material";

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

const GeofenceMap = () => {
  const [center] = useState({ lat: 13.084622, lng: 80.248357 });
  const ZOOM_LEVEL = 9;
  const mapRef = useRef();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [geofences, setGeofences] = useState([]);
  const [newGeofence, setNewGeofence] = useState({
    name: "",
    radius: 1.0,
    type: "geofenced",
    penalty_bonus: 0
  });

  // Load saved geofences on component mount
  useEffect(() => {
    const savedGeofences = localStorage.getItem("geofences");
    if (savedGeofences) {
      try {
        setGeofences(JSON.parse(savedGeofences));
      } catch (err) {
        console.error("Error loading geofences:", err);
      }
    }
  }, []);

  // Save geofences when they change
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

  const handleAddGeofence = () => {
    if (!selectedLocation || !newGeofence.name) return;

    const geofenceData = {
      id: Date.now().toString(),
      name: newGeofence.name,
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
      radius: newGeofence.radius,
      type: newGeofence.type,
      penalty_bonus: newGeofence.penalty_bonus
    };

    setGeofences([...geofences, geofenceData]);
    setNewGeofence({
      name: "",
      radius: 1.0,
      type: "geofenced",
      penalty_bonus: 0
    });
    setOpenDialog(false);
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
  };

  return (
    <>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={ZOOM_LEVEL}
        ref={mapRef}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url={osm.maptiler.url}
          attribution={osm.maptiler.attribution}
        />

        {/* Map click handler */}
        <LocationMarker setSelectedLocation={setSelectedLocation} />

        {/* Show marker at selected location */}
        {selectedLocation && (
          <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
            <Popup>
              <div>
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

      {/* Controls for export functionality */}
      <div style={{ position: "absolute", top: "180px", right: "10px", zIndex: 1000 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleExportGeofences}
          disabled={geofences.length === 0}
        >
          Export Geofences
        </Button>
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
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleAddGeofence}
            color="primary"
            disabled={!newGeofence.name}
          >
            Add Geofence
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GeofenceMap;