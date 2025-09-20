import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import L from 'leaflet';
import osm from './osm-providers';
import IncidentDataImporter from '../../../components/IncidentDataImporter';

// Initialize heatmap layer
const HeatmapLayer = ({ points, radius = 25, blur = 15, maxZoom = 10 }) => {
  const map = useMap();
  
  useEffect(() => {
    if (!points || points.length === 0) return;
    
    const heatData = points.map(point => [point.latitude, point.longitude, point.intensity || 1]);
    const heatLayer = L.heatLayer(heatData, {
      radius,
      blur,
      maxZoom,
      gradient: {0.4: 'blue', 0.6: 'cyan', 0.8: 'yellow', 1.0: 'red'}
    });
    
    map.addLayer(heatLayer);
    
    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points, radius, blur, maxZoom]);
  
  return null;
};

// Custom icons for incident markers based on severity
const getIncidentIcon = (severity) => {
  const color = 
    severity === 'high' ? 'red' :
    severity === 'medium' ? 'orange' : 'green';
    
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

const IncidentHeatMap = () => {
  const [center] = useState({ lat: 13.0846, lng: 80.2483 }); // Chennai coordinates
  const [zoom] = useState(11);
  const [incidents, setIncidents] = useState([]);
  
  // Function to handle data import from the IncidentDataImporter component
  const handleIncidentDataImport = (data) => {
    // Process data for intensity values based on severity
    const processedData = data.map(incident => ({
      ...incident,
      intensity: incident.severity === 'high' ? 2 : 
                incident.severity === 'medium' ? 1.5 : 1
    }));
    
    setIncidents(processedData);
  };
  
  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '10px 20px' }}>
        <IncidentDataImporter 
          onDataImport={handleIncidentDataImport} 
          currentData={incidents}
        />
      </div>
      
      <div style={{ flex: 1 }}>
        <MapContainer 
          center={[center.lat, center.lng]} 
          zoom={zoom} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url={osm.maptiler.url}
            attribution={osm.maptiler.attribution}
          />
          
          {/* Heatmap Layer */}
          {incidents.length > 0 && <HeatmapLayer points={incidents} />}
          
          {/* Clustered Markers */}
          <MarkerClusterGroup chunkedLoading>
            {incidents.map((incident) => (
              <Marker 
                key={incident.id} 
                position={[incident.latitude, incident.longitude]}
                icon={getIncidentIcon(incident.severity)}
              >
                <Popup>
                  <div>
                    <h3>{incident.title}</h3>
                    <p><strong>Severity:</strong> {incident.severity}</p>
                    <p><strong>Timestamp:</strong> {new Date(incident.timestamp).toLocaleString()}</p>
                    {incident.description && <p><strong>Description:</strong> {incident.description}</p>}
                    {incident.reported_by && <p><strong>Reported By:</strong> {incident.reported_by}</p>}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </div>
  );
};

export default IncidentHeatMap;