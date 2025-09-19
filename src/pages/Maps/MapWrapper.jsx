import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './styles.css';
import osm from './osm-providers';

const MapWrapper = () => {
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Debug message to confirm component mounting
    console.log('MapWrapper mounted, initializing map...');
    
    // Create map only if it doesn't exist yet and the container is available
    if (!mapRef.current && containerRef.current) {
      try {
        console.log('Creating map instance...');
        
        // Create the map instance
        const map = L.map(containerRef.current, {
          center: [27.3314, 88.6134],
          zoom: 13,
          zoomControl: false
        });
        
        // Store map reference
        mapRef.current = map;
        
        // Add tile layer
        L.tileLayer(osm.maptiler.url, {
          attribution: osm.maptiler.attribution,
          maxZoom: 18
        }).addTo(map);
        
        // Add zoom control in a specific position
        L.control.zoom({
          position: 'bottomleft'
        }).addTo(map);
        
        // Add scale control
        L.control.scale({
          position: 'bottomleft'
        }).addTo(map);
        
        // Add a marker for demonstration
        const marker = L.marker([27.3314, 88.6134])
          .addTo(map)
          .bindPopup('This is Sikkim, India')
          .openPopup();
        
        // Force resize after a short delay
        setTimeout(() => {
          console.log('Resizing map...');
          map.invalidateSize();
          setMapLoaded(true);
        }, 300);
        
        // Handle resize events
        const handleResize = () => {
          if (mapRef.current) {
            mapRef.current.invalidateSize();
          }
        };
        
        window.addEventListener('resize', handleResize);
        
        return () => {
          window.removeEventListener('resize', handleResize);
          if (mapRef.current) {
            console.log('Removing map instance...');
            mapRef.current.remove();
            mapRef.current = null;
          }
        };
      } catch (err) {
        console.error('Error initializing map:', err);
        setError(err.message);
      }
    }
  }, []);
  
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100%'
    }}>
      {/* Map container with explicit styling */}
      <Box
        ref={containerRef}
        sx={{
          height: '100%',
          width: '100%',
          position: 'relative',
          '& .leaflet-container': {
            height: '100%',
            width: '100%',
          }
        }}
        className="map-container"
      >
        {/* Loading indicator */}
        {!mapLoaded && !error && (
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            textAlign: 'center'
          }}>
            <CircularProgress />
            <Typography variant="body1" sx={{ mt: 2 }}>Loading map...</Typography>
          </Box>
        )}
        
        {/* Error display */}
        {error && (
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            textAlign: 'center',
            color: 'error.main'
          }}>
            <Typography variant="h6">Error loading map</Typography>
            <Typography variant="body1">{error}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MapWrapper;