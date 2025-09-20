import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import osm from "./osm-providers";
import cities from "./cities.json";

// Define different marker icons
const touristIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const incidentIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const unitIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Sample data with enriched information
const enrichedData = cities.map((city, idx) => ({
  ...city,
  id: idx,
  type: idx % 3 === 0 ? 'tourist' : idx % 3 === 1 ? 'incident' : 'unit',
  title: `${city.city}, ${city.country}`,
  address: `${city.city}, ${city.country}`,
  status: idx % 3 === 0 ? 'Active' : 'Inactive',
  nationality: idx % 3 === 0 ? 'Indian' : 'Foreign',
  contact: '+91 9876543210',
  lastCheckIn: '2 hours ago',
  severity: idx % 3 === 1 ? (idx % 2 === 0 ? 'High' : 'Medium') : 'Low',
  reportTime: '30 minutes ago',
  description: 'Tourist reported suspicious activity in the area.'
}));

const MarkersMap = ({ onMarkerClick }) => {
  const [center] = useState({ lat: 13.084622, lng: 80.248357 });
  const ZOOM_LEVEL = 9;
  const mapRef = useRef();

  const handleMarkerClick = (marker) => {
    if (onMarkerClick) {
      onMarkerClick(marker);
    }
  };

  const getMarkerIcon = (type) => {
    switch(type) {
      case 'tourist':
        return touristIcon;
      case 'incident':
        return incidentIcon;
      case 'unit':
        return unitIcon;
      default:
        return touristIcon;
    }
  };

  return (
    <MapContainer
      center={center}
      zoom={ZOOM_LEVEL}
      ref={mapRef}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url={osm.maptiler.url}
        attribution={osm.maptiler.attribution}
      />

      {enrichedData.map((marker) => (
        <Marker
          key={marker.id}
          position={[marker.lat, marker.lng]}
          icon={getMarkerIcon(marker.type)}
          eventHandlers={{
            click: () => handleMarkerClick(marker),
          }}
        >
          <Popup>
            <b>{marker.title}</b>
            <p>{marker.type === 'tourist' ? 'Tourist' : marker.type === 'incident' ? 'Incident' : 'Unit'}</p>
            <button onClick={() => handleMarkerClick(marker)}>View Details</button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MarkersMap;