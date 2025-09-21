import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import L from 'leaflet';
import osm from './osm-providers';
import TouristDataImporter from '../../../components/TouristDataImporter';

// Create a MapController component to access the map instance
function MapController({ onMapReady }) {
  const map = useMap();
  
  useEffect(() => {
    if (map && onMapReady) {
      console.log("Map reference available in heatmap:", map);
      onMapReady(map);
    }
  }, [map, onMapReady]);
  
  return null;
}

// Initialize heatmap layer
const HeatmapLayer = ({ points, radius = 25, blur = 15, maxZoom = 10 }) => {
  const map = useMap();
  const heatLayerRef = useRef(null);
  
  useEffect(() => {
    if (!map) return;
    
    if (heatLayerRef.current) {
      map.removeLayer(heatLayerRef.current);
    }
    
    const heatData = points.map(point => [point.latitude, point.longitude, point.intensity || 1]);
    heatLayerRef.current = L.heatLayer(heatData, {
      radius,
      blur,
      maxZoom,
      gradient: {0.4: 'blue', 0.6: 'lime', 0.8: 'yellow', 1.0: 'red'}
    }).addTo(map);
    
    return () => {
      if (heatLayerRef.current) {
        map.removeLayer(heatLayerRef.current);
      }
    };
  }, [map, points, radius, blur, maxZoom]);
  
  return null;
};

// Custom icon for tourist markers
const touristIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const missingTouristIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const TouristHeatMap = ({ onMapReady, baseLayer = 'osm' }) => {
  const [center] = useState({ lat: 13.0846, lng: 80.2483 }); // Chennai coordinates
  const [zoom] = useState(11);
  const [tourists, setTourists] = useState([]);
  const tileLayerRef = useRef();
  
  // Function to handle data import from the TouristDataImporter component
  const handleTouristDataImport = (data) => {
    // Process data for intensity values based on status
    const processedData = data.map(tourist => ({
      ...tourist,
      intensity: tourist.status === 'missing' ? 2 : 
                tourist.status === 'overdue' ? 1.5 : 1
    }));
    
    setTourists(processedData);
  };
  
  // Get icon based on tourist status
  const getTouristIcon = (status) => {
    switch(status) {
      case 'missing':
        return missingTouristIcon;
      default:
        return touristIcon;
    }
  };
  
  // Get the appropriate layer provider based on selected baseLayer
  const getLayerProvider = (layer) => {
    switch (layer) {
      case 'satellite':
        return osm.satellite;
      case 'terrain':
        return osm.terrain;
      case 'dark':
        return osm.dark;
      case 'streets':
      case 'maptiler':
        return osm.osm; // Use OSM instead of MapTiler
      default:
        return osm.osm;
    }
  };
  
  const initialProvider = getLayerProvider(baseLayer);

  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '10px 20px' }}>
        <TouristDataImporter 
          onDataImport={handleTouristDataImport} 
          currentData={tourists}
        />
      </div>
      
      <div style={{ flex: 1 }}>
        <MapContainer 
          center={[center.lat, center.lng]} 
          zoom={zoom} 
          style={{ height: '100%', width: '100%' }}
        >
          {/* This component will provide the map reference to parent */}
          <MapController onMapReady={onMapReady} />
          
          <TileLayer
            url={initialProvider.url}
            attribution={initialProvider.attribution}
            ref={tileLayerRef}
          />
          
          {/* Heatmap Layer */}
          {tourists.length > 0 && <HeatmapLayer points={tourists} />}
          
          {/* Clustered Markers */}
          <MarkerClusterGroup chunkedLoading>
            {tourists.map((tourist) => (
              <Marker 
                key={tourist.id} 
                position={[tourist.latitude, tourist.longitude]}
                icon={getTouristIcon(tourist.status)}
              >
                <Popup>
                  <div>
                    <h3>{tourist.name}</h3>
                    <p><strong>Status:</strong> {tourist.status}</p>
                    <p><strong>ID:</strong> {tourist.id}</p>
                    {tourist.phone && <p><strong>Phone:</strong> {tourist.phone}</p>}
                    {tourist.nationality && <p><strong>Nationality:</strong> {tourist.nationality}</p>}
                    {tourist.last_seen && <p><strong>Last Seen:</strong> {new Date(tourist.last_seen).toLocaleString()}</p>}
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

export default TouristHeatMap;