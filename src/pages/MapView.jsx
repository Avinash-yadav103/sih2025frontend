import React, { useState, useEffect, useRef } from 'react'
import { Box, Button, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import ZoomOutIcon from '@mui/icons-material/ZoomOut'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import LayersIcon from '@mui/icons-material/Layers'
import CloseIcon from '@mui/icons-material/Close'
import './MapView.css'

// Import search components
import SearchBar from '../components/search/SearchBar'
import SearchCategoryFilters from '../components/search/SearchCategoryFilters'
import useSearch from '../hooks/useSearch'
import useGeoLocation from './Maps/hooks/useGeoLocation'

// Import Leaflet components
import BasicMap from './Maps/Leaflet/basic'
import MarkersMap from './Maps/Leaflet/markers'
import CurrentLocation from './Maps/Leaflet/currentLocation'
import GeofenceMap from './Maps/Leaflet/geofences'
import DrawMap from './Maps/Leaflet/draw'
import TouristHeatMap from './Maps/Leaflet/touristHeatMap'

function MapView() {
  const [activeMap, setActiveMap] = useState('markers')
  const [selectedMarker, setSelectedMarker] = useState(null)
  const [mapRef, setMapRef] = useState(null)
  
  // Layers menu state
  const [layersMenuAnchor, setLayersMenuAnchor] = useState(null)
  const [selectedBaseLayer, setSelectedBaseLayer] = useState('osm')
  
  // Get user's current location
  const { position: currentPosition, getPosition } = useGeoLocation()
  
  // Use our custom search hook
  const { 
    query, 
    setQuery, 
    results, 
    loading, 
    selectedResult, 
    setSelectedResult,
    activeCategories,
    toggleCategory,
    clearSearch
  } = useSearch()

  // Handle marker click from map
  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker)
    setSelectedResult(null) // Clear search result when clicking a map marker
  }

  // Handle search result selection
  const handleSearchResultSelect = (result) => {
    setSelectedMarker(result) // Use the result as the selected marker
    
    // Center map on the selected result
    if (mapRef && result.position) {
      mapRef.setView(result.position, 15) // Set zoom level to 15
      
      // If we're not already in markers view, switch to it
      if (activeMap !== 'markers') {
        setActiveMap('markers')
      }
    }
  }

  // Set up map reference from child components
  const handleMapReference = (map) => {
    setMapRef(map)
  }

  // Close info card
  const closeInfoCard = () => {
    setSelectedMarker(null)
  }
  
  // Handle zoom in
  const handleZoomIn = () => {
    if (mapRef) {
      mapRef.zoomIn()
    }
  }
  
  // Handle zoom out
  const handleZoomOut = () => {
    if (mapRef) {
      mapRef.zoomOut()
    }
  }
  
  // Handle my location click
  const handleMyLocation = () => {
    getPosition()
    
    if (mapRef && currentPosition) {
      mapRef.setView([currentPosition.lat, currentPosition.lng], 15)
    } else if (mapRef) {
      // If position is not yet available, try to get it from browser
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          mapRef.setView([latitude, longitude], 15)
        },
        (error) => {
          console.error("Error getting location:", error)
          alert("Could not get your current location. Please check your browser permissions.")
        }
      )
    }
  }
  
  // Handle layers menu
  const handleLayersMenuOpen = (event) => {
    setLayersMenuAnchor(event.currentTarget)
  }
  
  const handleLayersMenuClose = () => {
    setLayersMenuAnchor(null)
  }
  
  const handleBaseLayerChange = (layer) => {
    setSelectedBaseLayer(layer)
    handleLayersMenuClose()
  }

  // Render the appropriate map based on activeMap state
  const renderMap = () => {
    const mapProps = {
      onMapReady: handleMapReference,
      baseLayer: selectedBaseLayer
    }
    
    switch (activeMap) {
      case 'standard':
        return <BasicMap {...mapProps} />
      case 'markers':
        return <MarkersMap {...mapProps} onMarkerClick={handleMarkerClick} />
      case 'location':
        return <CurrentLocation {...mapProps} />
      case 'geofences':
        return <GeofenceMap {...mapProps} />
      case 'touristHeatMap':
        return <TouristHeatMap {...mapProps} />
      case 'draw':
        return <DrawMap {...mapProps} />
      default:
        return <MarkersMap {...mapProps} onMarkerClick={handleMarkerClick} />
    }
  }

  // Update map when selectedResult changes
  useEffect(() => {
    if (selectedResult && mapRef && selectedResult.position) {
      mapRef.setView(selectedResult.position, 15)
    }
  }, [selectedResult, mapRef])
  
  // Update map when current position changes
  useEffect(() => {
    if (currentPosition && mapRef && activeMap === 'location') {
      mapRef.setView([currentPosition.lat, currentPosition.lng], 15)
    }
  }, [currentPosition, mapRef, activeMap])

  return (
    <div className="full-map-container">
      {/* Search Bar */}
      <div className="search-container">
        <SearchBar 
          query={query}
          setQuery={setQuery}
          results={results}
          loading={loading}
          selectedResult={selectedResult}
          setSelectedResult={setSelectedResult}
          clearSearch={clearSearch}
          onResultSelect={handleSearchResultSelect}
        />
      </div>

      {/* Search Filters - Only show if there are results */}
      {results.length > 0 && (
        <SearchCategoryFilters 
          activeCategories={activeCategories}
          toggleCategory={toggleCategory}
        />
      )}

      {/* Map Controls Container */}
      <div className="map-controls-container">
        {/* Map Type Buttons */}
        <div className="map-type-controls">
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
            className={activeMap === 'touristHeatMap' ? 'active' : ''} 
            onClick={() => setActiveMap('touristHeatMap')}
          >
            Tourist HeatMap 
          </Button>
          <Button 
            className={activeMap === 'geofences' ? 'active' : ''} 
            onClick={() => setActiveMap('geofences')}
          >
            Geofence
          </Button>
        </div>
      </div>

      {/* Map Controls - Floating */}
      <div className="floating-controls">
        <div className="map-control-group">
          <Tooltip title="Zoom In" placement="left">
            <button className="map-control-button" onClick={handleZoomIn} aria-label="Zoom in">
              <ZoomInIcon />
            </button>
          </Tooltip>
          <Tooltip title="Zoom Out" placement="left">
            <button className="map-control-button" onClick={handleZoomOut} aria-label="Zoom out">
              <ZoomOutIcon />
            </button>
          </Tooltip>
        </div>
        <Tooltip title="My Location" placement="left">
          <button className="map-control-button" onClick={handleMyLocation} aria-label="Show my location">
            <MyLocationIcon />
          </button>
        </Tooltip>
        <Tooltip title="Map Layers" placement="left">
          <button className="map-control-button" onClick={handleLayersMenuOpen} aria-label="Change map layers">
            <LayersIcon />
          </button>
        </Tooltip>
        
        {/* Layers Menu */}
        <Menu
          anchorEl={layersMenuAnchor}
          open={Boolean(layersMenuAnchor)}
          onClose={handleLayersMenuClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem 
            onClick={() => handleBaseLayerChange('osm')}
            selected={selectedBaseLayer === 'osm'}
          >
            OpenStreetMap
          </MenuItem>
          <MenuItem 
            onClick={() => handleBaseLayerChange('satellite')}
            selected={selectedBaseLayer === 'satellite'}
          >
            Satellite
          </MenuItem>
          <MenuItem 
            onClick={() => handleBaseLayerChange('terrain')}
            selected={selectedBaseLayer === 'terrain'}
          >
            Terrain
          </MenuItem>
          <MenuItem 
            onClick={() => handleBaseLayerChange('dark')}
            selected={selectedBaseLayer === 'dark'}
          >
            Dark Mode
          </MenuItem>
        </Menu>
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
            
            {selectedMarker.category === 'incident' && (
              <>
                <div className={`incident-severity ${selectedMarker.severity?.toLowerCase()}`}>
                  {selectedMarker.severity}
                </div>
                <p>Reported: {selectedMarker.reportTime}</p>
                <p>Description: {selectedMarker.description}</p>
              </>
            )}
            
            {selectedMarker.category === 'tourist' && (
              <>
                <p>Status: {selectedMarker.status}</p>
                <p>Nationality: {selectedMarker.nationality}</p>
                <p>Contact: {selectedMarker.contact}</p>
                <p>Last Check-in: {selectedMarker.lastCheckIn}</p>
              </>
            )}
            
            {selectedMarker.category === 'unit' && (
              <>
                <p>Status: {selectedMarker.status}</p>
                <p>Officers: {selectedMarker.officers}</p>
                <p>Vehicle: {selectedMarker.vehicle}</p>
              </>
            )}
            
            {selectedMarker.category === 'iot' && (
              <>
                <p>Type: {selectedMarker.type}</p>
                <p>Status: {selectedMarker.status}</p>
                <p>Last Ping: {selectedMarker.lastPing}</p>
              </>
            )}
            
            <div className="action-buttons">
              <button 
                className="primary-action"
                onClick={() => {
                  if (mapRef && selectedMarker.position) {
                    mapRef.setView(selectedMarker.position, 18)
                  }
                }}
              >
                Get Directions
              </button>
              <button className="secondary-action">
                {selectedMarker.category === 'incident' ? 'Dispatch Unit' : 'View Details'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MapView