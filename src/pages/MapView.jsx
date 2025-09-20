import React, { useState } from 'react'
import { Box, Button, IconButton, InputAdornment, TextField, Typography, Chip } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import ZoomOutIcon from '@mui/icons-material/ZoomOut'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import LayersIcon from '@mui/icons-material/Layers'
import CloseIcon from '@mui/icons-material/Close'
import './MapView.css'

// Import Leaflet components
import BasicMap from './Maps/Leaflet/basic'
import MarkersMap from './Maps/Leaflet/markers'
import CurrentLocation from './Maps/Leaflet/currentLocation'
import GeofenceMap from './Maps/Leaflet/geofences'
import DrawMap from './Maps/Leaflet/draw'

function MapView() {
  const [activeMap, setActiveMap] = useState('markers')
  const [activeCategory, setActiveCategory] = useState(null)
  const [selectedMarker, setSelectedMarker] = useState(null)

  const renderMap = () => {
    switch (activeMap) {
      case 'standard':
        return <BasicMap />
      case 'markers':
        return <MarkersMap onMarkerClick={handleMarkerClick} />
      case 'location':
        return <CurrentLocation />
      case 'geofences':
        return <GeofenceMap />
      case 'draw':
        return <DrawMap />
      default:
        return <MarkersMap onMarkerClick={handleMarkerClick} />
    }
  }

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker)
  }

  const closeInfoCard = () => {
    setSelectedMarker(null)
  }

  return (
    <div className="full-map-container">
      {/* Search Bar */}
      <div className="search-container">
        <div className="search-bar google-style">
          <SearchIcon className="search-icon" />
          <TextField 
            fullWidth
            variant="standard"
            placeholder="Search tourists, incidents, locations"
            InputProps={{
              disableUnderline: true,
            }}
          />
        </div>
      </div>

      {/* Map Type Buttons */}
      <div className="category-buttons google-style">
        <Button 
          className={activeMap === 'standard' ? 'active' : ''} 
          onClick={() => setActiveMap('standard')}
        >
          Standard
        </Button>
        <Button 
          className={activeMap === 'markers' ? 'active' : ''} 
          onClick={() => setActiveMap('markers')}
        >
          With Markers
        </Button>
        <Button 
          className={activeMap === 'location' ? 'active' : ''} 
          onClick={() => setActiveMap('location')}
        >
          Current Location
        </Button>
        <Button 
          className={activeMap === 'draw' ? 'active' : ''} 
          onClick={() => setActiveMap('draw')}
        >
          Draw Tools
        </Button>
        <Button 
          className={activeMap === 'geofences' ? 'active' : ''} 
          onClick={() => setActiveMap('geofences')}
        >
          Geofence
        </Button>
      </div>

      {/* Filter Chips */}
      <div className="filter-chips">
        <Button 
          className={activeCategory === 'tourists' ? 'active' : ''}
          onClick={() => setActiveCategory(activeCategory === 'tourists' ? null : 'tourists')}
        >
          <span className="icon">👤</span> Tourists
        </Button>
        <Button 
          className={activeCategory === 'incidents' ? 'active' : ''}
          onClick={() => setActiveCategory(activeCategory === 'incidents' ? null : 'incidents')}
        >
          <span className="icon">🚨</span> Incidents
        </Button>
        <Button 
          className={activeCategory === 'units' ? 'active' : ''}
          onClick={() => setActiveCategory(activeCategory === 'units' ? null : 'units')}
        >
          <span className="icon">🚔</span> Units
        </Button>
        <Button 
          className={activeCategory === 'geofences' ? 'active' : ''}
          onClick={() => setActiveCategory(activeCategory === 'geofences' ? null : 'geofences')}
        >
          <span className="icon">🔶</span> Geofences
        </Button>
        <Button 
          className={activeCategory === 'iot' ? 'active' : ''}
          onClick={() => setActiveCategory(activeCategory === 'iot' ? null : 'iot')}
        >
          <span className="icon">📱</span> IoT Devices
        </Button>
      </div>

      {/* Map Controls */}
      <div className="floating-controls">
        <div className="map-control-group">
          <button className="map-control-button">
            <ZoomInIcon />
          </button>
          <button className="map-control-button">
            <ZoomOutIcon />
          </button>
        </div>
        <button className="map-control-button">
          <MyLocationIcon />
        </button>
        <button className="map-control-button">
          <LayersIcon />
        </button>
      </div>

      {/* Render Active Map */}
      {renderMap()}

      {/* Info Card */}
      {selectedMarker && (
        <div className="info-card">
          <button className="close-button" onClick={closeInfoCard}>
            <CloseIcon />
          </button>
          <h3>{selectedMarker.title}</h3>
          <div className="info-content">
            <p className="info-address">{selectedMarker.address}</p>
            
            {selectedMarker.type === 'incident' && (
              <>
                <div className={`incident-severity ${selectedMarker.severity.toLowerCase()}`}>
                  {selectedMarker.severity}
                </div>
                <p>Reported: {selectedMarker.reportTime}</p>
                <p>Description: {selectedMarker.description}</p>
              </>
            )}
            
            {selectedMarker.type === 'tourist' && (
              <>
                <p>Status: {selectedMarker.status}</p>
                <p>Nationality: {selectedMarker.nationality}</p>
                <p>Contact: {selectedMarker.contact}</p>
                <p>Last Check-in: {selectedMarker.lastCheckIn}</p>
              </>
            )}
            
            <div className="action-buttons">
              <button className="primary-action">
                Get Directions
              </button>
              <button className="secondary-action">
                {selectedMarker.type === 'incident' ? 'Dispatch Unit' : 'View Details'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MapView