import { useState } from 'react'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import './Maps/Leaflet/index.css'
import './MapView.css'

// Import Leaflet components
import BasicMap from './Maps/Leaflet/basic'
import MarkersMap from './Maps/Leaflet/markers'
import CurrentLocation from './Maps/Leaflet/currentLocation'
import DrawMap from './Maps/Leaflet/draw'
import PolygonMap from './Maps/Leaflet/polygon'
import StaticMap from './Maps/Leaflet/StaticMap'
import PrintMap from './Maps/Leaflet/Print'

// Import Material UI icons
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import LayersIcon from '@mui/icons-material/Layers'
import MyLocationIcon from '@mui/icons-material/MyLocation'

function MapView() {
  const [activeMap, setActiveMap] = useState('markers')
  const [activeCategory, setActiveCategory] = useState(null)
  const [selectedMarker, setSelectedMarker] = useState(null)

  const renderMap = () => {
    switch(activeMap) {
      case 'basic':
        return <BasicMap onMarkerClick={handleMarkerClick} />
      case 'markers':
        return <MarkersMap onMarkerClick={handleMarkerClick} />
      case 'location':
        return <CurrentLocation onMarkerClick={handleMarkerClick} />
      case 'draw':
        return <DrawMap onMarkerClick={handleMarkerClick} />
      case 'polygon':
        return <PolygonMap onMarkerClick={handleMarkerClick} />
      case 'static':
        return <StaticMap onMarkerClick={handleMarkerClick} />
      case 'print':
        return <PrintMap onMarkerClick={handleMarkerClick} />
      default:
        return <BasicMap onMarkerClick={handleMarkerClick} />
    }
  }

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  }

  const closeInfoCard = () => {
    setSelectedMarker(null);
  }

  return (
    <div className="map-view-container">
      {/* Full-width map container */}
      <div className="full-map-container">
        {renderMap()}
      </div>

      {/* Google Maps style search bar */}
      <div className="search-container">
        <div className="search-bar google-style">
          <SearchIcon className="search-icon" />
          <input type="text" placeholder="Search tourists, incidents, locations" />
        </div>
      </div>

      {/* Category buttons like in Google Maps */}
      <div className="category-buttons google-style">
        <button 
          type="button"
          className={activeMap === 'basic' ? 'active' : ''} 
          onClick={() => setActiveMap('basic')}
        >
          Standard
        </button>
        <button 
          type="button"
          className={activeMap === 'markers' ? 'active' : ''} 
          onClick={() => setActiveMap('markers')}
        >
          With Markers
        </button>
        <button 
          type="button"
          className={activeMap === 'location' ? 'active' : ''} 
          onClick={() => setActiveMap('location')}
        >
          Current Location
        </button>
        <button 
          type="button"
          className={activeMap === 'draw' ? 'active' : ''} 
          onClick={() => setActiveMap('draw')}
        >
          Draw Tools
        </button>
        <button 
          type="button"
          className={activeMap === 'polygon' ? 'active' : ''} 
          onClick={() => setActiveMap('polygon')}
        >
          Geofence
        </button>
        <button 
          type="button"
          className={activeMap === 'static' ? 'active' : ''} 
          onClick={() => setActiveMap('static')}
        >
          Static Map
        </button>
      </div>

      {/* Filter chips below search bar */}
      <div className="filter-chips">
        <button 
          className={activeCategory === 'tourists' ? 'active' : ''} 
          onClick={() => setActiveCategory('tourists')}
        >
          <span className="icon">👤</span>Tourists
        </button>
        <button 
          className={activeCategory === 'incidents' ? 'active' : ''} 
          onClick={() => setActiveCategory('incidents')}
        >
          <span className="icon">🚨</span>Incidents
        </button>
        <button 
          className={activeCategory === 'units' ? 'active' : ''} 
          onClick={() => setActiveCategory('units')}
        >
          <span className="icon">🚓</span>Units
        </button>
        <button 
          className={activeCategory === 'geofences' ? 'active' : ''} 
          onClick={() => setActiveCategory('geofences')}
        >
          <span className="icon">🔷</span>Geofences
        </button>
        <button 
          className={activeCategory === 'iot' ? 'active' : ''} 
          onClick={() => setActiveCategory('iot')}
        >
          <span className="icon">📡</span>IoT Devices
        </button>
      </div>

      {/* Floating map controls - Google Maps style */}
      <div className="floating-controls">
        <button className="map-control-button my-location">
          <MyLocationIcon />
        </button>
        <div className="map-control-group">
          <button className="map-control-button">
            <AddIcon />
          </button>
          <button className="map-control-button">
            <RemoveIcon />
          </button>
        </div>
        <button className="map-control-button layers">
          <LayersIcon />
        </button>
      </div>

      {/* Information card that appears when marker is clicked */}
      {selectedMarker && (
        <div className="info-card">
          <button className="close-button" onClick={closeInfoCard}>✕</button>
          <h3>{selectedMarker.title}</h3>
          <div className="info-content">
            <p className="info-address">{selectedMarker.address}</p>
            {selectedMarker.type === 'tourist' && (
              <div className="tourist-details">
                <p><strong>Status:</strong> {selectedMarker.status}</p>
                <p><strong>Nationality:</strong> {selectedMarker.nationality}</p>
                <p><strong>Contact:</strong> {selectedMarker.contact}</p>
                <p><strong>Last Check-in:</strong> {selectedMarker.lastCheckIn}</p>
              </div>
            )}
            {selectedMarker.type === 'incident' && (
              <div className="incident-details">
                <p className="incident-severity">{selectedMarker.severity}</p>
                <p><strong>Reported:</strong> {selectedMarker.reportTime}</p>
                <p><strong>Description:</strong> {selectedMarker.description}</p>
              </div>
            )}
          </div>
          <div className="action-buttons">
            <button className="primary-action">Get Directions</button>
            <button className="secondary-action">Dispatch Unit</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MapView