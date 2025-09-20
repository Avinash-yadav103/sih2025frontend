import { useState } from 'react'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import './Leaflet/index.css'

// Import Leaflet components
import BasicMap from './Leaflet/basic'
import MarkersMap from './Leaflet/markers'
import CurrentLocation from './Leaflet/currentLocation'

function MapWrapper() {
  return (
    <div className="map-container" style={{ 
      height: 'calc(100vh - 60px)', 
      width: '100%', 
      position: 'relative',
      overflow: 'hidden' 
    }}>
      <BasicMap />
    </div>
  );
}

export default MapWrapper