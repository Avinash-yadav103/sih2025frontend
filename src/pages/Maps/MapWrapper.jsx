import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import MapView from '../MapView';
import './styles.css';

const MapWrapper = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    // Force a resize event after component mounts to ensure map renders
    if (containerRef.current) {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 300);
    }
  }, []);

  return (
    <Box 
      ref={containerRef}
      sx={{ 
        height: "100vh", 
        width: "100%", 
        position: "relative",
        "& .leaflet-container": {
          height: "100%",
          width: "100%"
        }
      }}
    >
      <MapView />
    </Box>
  );
};

export default MapWrapper;