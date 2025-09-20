import { useState } from 'react'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import './Maps/Leaflet/index.css'
import './MapView.css' // Import the new CSS file

// Import Leaflet components
import BasicMap from './Maps/Leaflet/basic'
import MarkersMap from './Maps/Leaflet/markers'
import CurrentLocation from './Maps/Leaflet/currentLocation'
import DrawMap from './Maps/Leaflet/draw'
import PolygonMap from './Maps/Leaflet/polygon'
import StaticMap from './Maps/Leaflet/StaticMap'
import PrintMap from './Maps/Leaflet/Print'

function MapView() {
  const [activeMap, setActiveMap] = useState('markers')
  const [showControls, setShowControls] = useState(false)

  const renderMap = () => {
    switch(activeMap) {
      case 'basic':
        return <BasicMap />
      case 'markers':
        return <MarkersMap />
      case 'location':
        return <CurrentLocation />
      case 'draw':
        return <DrawMap />
      case 'polygon':
        return <PolygonMap />
      case 'static':
        return <StaticMap />
      case 'print':
        return <PrintMap />
      default:
        return <BasicMap />
    }
  }

  return (
    <div className="map-view-container">
      {/* Map controls as a floating panel that can be toggled */}
      <div className="map-options">
        <button 
          className="controls-toggle"
          onClick={() => setShowControls(!showControls)}
        >
          {showControls ? '✕' : '≡'}
        </button>
        
        {showControls && (
          <div className="controls-panel">
            <button onClick={() => setActiveMap('basic')} className={activeMap === 'basic' ? 'active' : ''}>Basic Map</button>
            <button onClick={() => setActiveMap('markers')} className={activeMap === 'markers' ? 'active' : ''}>Markers Map</button>
            <button onClick={() => setActiveMap('location')} className={activeMap === 'location' ? 'active' : ''}>Current Location</button>
            <button onClick={() => setActiveMap('draw')} className={activeMap === 'draw' ? 'active' : ''}>Draw Map</button>
            <button onClick={() => setActiveMap('polygon')} className={activeMap === 'polygon' ? 'active' : ''}>Polygon Map</button>
            <button onClick={() => setActiveMap('static')} className={activeMap === 'static' ? 'active' : ''}>Static Map</button>
            <button onClick={() => setActiveMap('print')} className={activeMap === 'print' ? 'active' : ''}>Print Map</button>
          </div>
        )}
      </div>
      
      {/* Full-width map container */}
      <div className="full-map-container">
        {renderMap()}
      </div>
    </div>
  )
}

export default MapView