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

function MapView() {
  const [activeMap, setActiveMap] = useState('markers')
  const [activeCategory, setActiveCategory] = useState(null)

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
      {/* Full-width map container - Moving this up so map is rendered first as background */}
      <div className="full-map-container">
        {renderMap()}
      </div>

      {/* Google Maps style search bar */}
      <div className="search-container">
        <div className="search-bar google-style">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#5F6368" className="search-icon" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
          <input type="text" placeholder="Search Google Maps" />
        </div>
      </div>

      {/* Category buttons like in Google Maps */}
      <div className="category-buttons google-style">
        <button 
          type="button"
          className={activeCategory === 'restaurants' ? 'active' : ''} 
          onClick={() => setActiveCategory('restaurants')}
        >
          <span className="icon">🍽️</span>Restaurants
        </button>
        <button 
          type="button"
          className={activeCategory === 'hotels' ? 'active' : ''} 
          onClick={() => setActiveCategory('hotels')}
        >
          <span className="icon">🏨</span>Hotels
        </button>
        <button 
          type="button"
          className={activeCategory === 'attractions' ? 'active' : ''} 
          onClick={() => setActiveCategory('attractions')}
        >
          <span className="icon">🎭</span>Things to do
        </button>
        <button 
          type="button"
          className={activeCategory === 'museums' ? 'active' : ''} 
          onClick={() => setActiveCategory('museums')}
        >
          <span className="icon">🏛️</span>Museums
        </button>
        <button 
          type="button"
          className={activeCategory === 'transit' ? 'active' : ''} 
          onClick={() => setActiveCategory('transit')}
        >
          <span className="icon">🚇</span>Transit
        </button>
        <button 
          type="button"
          className={activeCategory === 'pharmacies' ? 'active' : ''} 
          onClick={() => setActiveCategory('pharmacies')}
        >
          <span className="icon">💊</span>Pharmacies
        </button>
      </div>

      {/* Map control buttons */}
      <div className="map-controls">
        {/* Map type tabs - Updated to match Google Maps style */}
        <div className="map-types-tabs">
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
        
        {/* Map layers button - Positioned in bottom right like Google Maps */}
        <div className="map-options google-style">
          <button type="button" className="map-layers-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
            </svg>
          </button>
        </div>

        {/* Zoom controls - Positioned in bottom right like Google Maps */}
        <div className="map-zoom-controls">
          <button type="button" className="zoom-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
            </svg>
          </button>
          <button type="button" className="zoom-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MapView