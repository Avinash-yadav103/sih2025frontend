import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import osm from './osm-providers';

// Fix for default marker icon issue in leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Create custom icons for different types of markers
const createCustomIcon = (type) => {
  let iconUrl, iconSize;
  
  switch(type) {
    case 'tourist':
      iconUrl = 'https://cdn-icons-png.flaticon.com/512/3789/3789806.png';
      iconSize = [32, 32];
      break;
    case 'incident':
      iconUrl = 'https://cdn-icons-png.flaticon.com/512/5605/5605866.png';
      iconSize = [32, 32];
      break;
    case 'unit':
      iconUrl = 'https://cdn-icons-png.flaticon.com/512/1350/1350675.png';
      iconSize = [32, 32];
      break;
    case 'iot':
      iconUrl = 'https://cdn-icons-png.flaticon.com/512/2885/2885417.png';
      iconSize = [24, 24];
      break;
    default:
      iconUrl = 'https://cdn-icons-png.flaticon.com/512/447/447031.png';
      iconSize = [32, 32];
  }

  return new L.Icon({
    iconUrl,
    iconSize,
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const MarkersMap = ({ onMarkerClick, onMapReady, baseLayer = 'streets' }) => {
  const [mapInstance, setMapInstance] = useState(null);
  const tileLayerRef = useRef();
  
  // Sample markers data - in a real app, this would come from an API
  const markers = [
    {
      id: 1,
      position: [27.3389, 88.6138],
      title: 'Tourist Group 1',
      address: 'MG Road, Gangtok, Sikkim',
      type: 'tourist',
      status: 'Active',
      nationality: 'Japanese',
      contact: '+81-555-123-4567',
      lastCheckIn: '2 hours ago',
      category: 'tourist'
    },
    {
      id: 2,
      position: [27.3380, 88.6145],
      title: 'Missing Tourist Report',
      address: 'Gangtok Market, Sikkim',
      type: 'incident',
      severity: 'High',
      reportTime: '1 hour ago',
      description: 'Tourist not reported back from trekking',
      category: 'incident'
    },
    {
      id: 3,
      position: [27.3400, 88.6100],
      title: 'Patrol Unit 3',
      address: 'Central Gangtok',
      type: 'unit',
      status: 'On duty',
      officers: '3 officers',
      vehicle: 'Jeep #4221',
      category: 'unit'
    },
    {
      id: 4,
      position: [27.3395, 88.6130],
      title: 'CCTV Camera #5',
      address: 'MG Road Junction',
      type: 'iot',
      status: 'Active',
      lastPing: '5 minutes ago',
      category: 'iot'
    }
  ];

  // Pass map reference to parent when it's available
  useEffect(() => {
    if (mapInstance && onMapReady) {
      onMapReady(mapInstance);
    }
  }, [mapInstance, onMapReady]);
  
  // Update tile layer when baseLayer changes
  useEffect(() => {
    if (tileLayerRef.current) {
      const provider = getLayerProvider(baseLayer);
      tileLayerRef.current.setUrl(provider.url);
    }
  }, [baseLayer]);
  
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
        // Use OSM instead of MapTiler to avoid the "Invalid key" error
        return osm.osm;
      default:
        return osm.osm; // Change default from maptiler to osm
    }
  };
  
  const initialProvider = getLayerProvider(baseLayer);

  return (
    <MapContainer
      center={[27.3389, 88.6138]}
      zoom={14}
      style={{ height: '100%', width: '100%' }}
      whenCreated={setMapInstance}
    >
      <TileLayer
        url={initialProvider.url}
        attribution={initialProvider.attribution}
        ref={tileLayerRef}
      />
      
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={marker.position}
          icon={createCustomIcon(marker.type)}
          eventHandlers={{
            click: () => onMarkerClick(marker),
          }}
        >
          <Popup>
            <div>
              <h3>{marker.title}</h3>
              <p>{marker.address}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MarkersMap;