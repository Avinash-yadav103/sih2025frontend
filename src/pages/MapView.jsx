import React, { useState, useEffect } from 'react'
import { Box, Button, IconButton } from '@mui/material'
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

// Import Leaflet components
import BasicMap from './Maps/Leaflet/basic'
import MarkersMap from './Maps/Leaflet/markers'
import CurrentLocation from './Maps/Leaflet/currentLocation'
import GeofenceMap from './Maps/Leaflet/geofences'
import DrawMap from './Maps/Leaflet/draw'

function MapView() {
  const [activeMap, setActiveMap] = useState('markers')
  const [selectedMarker, setSelectedMarker] = useState(null)
  const [mapRef, setMapRef] = useState(null)
  
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
  } = useSearch();

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

  // Render the appropriate map based on activeMap state
  const renderMap = () => {
    switch (activeMap) {
      case 'standard':
        return <BasicMap onMapReady={handleMapReference} />
      case 'markers':
        return <MarkersMap onMapReady={handleMapReference} onMarkerClick={handleMarkerClick} />
      case 'location':
        return <CurrentLocation onMapReady={handleMapReference} />
      case 'geofences':
        return <GeofenceMap onMapReady={handleMapReference} />
      case 'draw':
        return <DrawMap onMapReady={handleMapReference} />
      default:
        return <MarkersMap onMapReady={handleMapReference} onMarkerClick={handleMarkerClick} />
    }
  }

  // Update map when selectedResult changes
  useEffect(() => {
    if (selectedResult && mapRef && selectedResult.position) {
      mapRef.setView(selectedResult.position, 15)
    }
  }, [selectedResult, mapRef])

  return (
    <div className="full-map-container">
      {/* Search Bar - Positioned for better visibility */}
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

      {/* Map Controls Container - Positioned below search */}
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
            className={activeMap === 'draw' ? 'active' : ''} 
            onClick={() => setActiveMap('draw')}
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
      
      {/* Only render category filters if we have search results */}
      {results.length > 0 && (
        <SearchCategoryFilters 
          activeCategories={activeCategories}
          toggleCategory={toggleCategory}
        />
      )}

      {/* Map Controls - Floating */}
      <div className="floating-controls">
        <div className="map-control-group">
          <button className="map-control-button" onClick={() => mapRef && mapRef.zoomIn()}>
            <ZoomInIcon />
          </button>
          <button className="map-control-button" onClick={() => mapRef && mapRef.zoomOut()}>
            <ZoomOutIcon />
          </button>
        </div>
        <button 
          className="map-control-button" 
          onClick={() => {
            if (mapRef && navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords
                mapRef.setView([latitude, longitude], 15)
              })
            }
          }}
        >
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