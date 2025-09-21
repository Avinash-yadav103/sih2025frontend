import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import "leaflet.markercluster/dist/leaflet.markercluster.js";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import osm from "./osm-providers";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

// Custom icons for tourist markers
const touristIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const missingTouristIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Create a MapController component to access the map instance
function MapController({ onMapReady }) {
  const map = useMap();
  
  useEffect(() => {
    if (map && onMapReady) {
      console.log("Map reference available in heatmap:", map);
      onMapReady(map);
    }
  }, [map, onMapReady]);
  
  return null;
}

// HeatMap and MarkerCluster components
const HeatMapLayer = ({ points }) => {
  const map = useMap();
  const heatLayerRef = useRef(null);
  
  useEffect(() => {
    if (!points || points.length === 0) return;
    
    if (heatLayerRef.current) {
      map.removeLayer(heatLayerRef.current);
    }
    
    // Create and add heat layer
    heatLayerRef.current = L.heatLayer(
      points.map(p => [p.latitude, p.longitude, p.intensity || 0.5]),
      { radius: 25, blur: 15, maxZoom: 17, gradient: {0.4: 'blue', 0.6: 'lime', 0.8: 'yellow', 1.0: 'red'} }
    ).addTo(map);
    
    return () => {
      if (heatLayerRef.current) {
        map.removeLayer(heatLayerRef.current);
      }
    };
  }, [map, points]);
  
  return null;
};

const MarkerClusterLayer = ({ points }) => {
  const map = useMap();
  const clusterRef = useRef(null);
  
  useEffect(() => {
    if (!points || points.length === 0) return;
    
    if (clusterRef.current) {
      map.removeLayer(clusterRef.current);
    }
    
    // Create a marker cluster group
    const markers = L.markerClusterGroup();
    clusterRef.current = markers;
    
    // Add markers to the cluster
    points.forEach(point => {
      const icon = point.status === 'missing' ? missingTouristIcon : touristIcon;
      const marker = L.marker([point.latitude, point.longitude], { icon });
      marker.bindPopup(`
        <div>
          <h4>${point.name || 'Tourist'}</h4>
          <p>ID: ${point.id || 'N/A'}</p>
          <p>Status: ${point.status || 'Unknown'}</p>
          <p>Nationality: ${point.nationality || 'Unknown'}</p>
          <p>Last seen: ${point.timestamp || point.last_seen || 'N/A'}</p>
          ${point.phone ? `<p>Phone: ${point.phone}</p>` : ''}
        </div>
      `);
      markers.addLayer(marker);
    });
    
    map.addLayer(markers);
    
    return () => {
      if (clusterRef.current) {
        map.removeLayer(clusterRef.current);
      }
    };
  }, [map, points]);
  
  return null;
};

const TouristHeatMap = ({ onMapReady, baseLayer = 'osm' }) => {
  const [center] = useState({ lat: 27.3389, lng: 88.6138 }); // Gangtok coordinates
  const ZOOM_LEVEL = 12;
  const mapRef = useRef();
  const [touristData, setTouristData] = useState([]);
  const [previewData, setPreviewData] = useState({ count: 0, samples: [] });
  const fileInputRef = useRef();
  const [showPreview, setShowPreview] = useState(false);
  const tileLayerRef = useRef();
  
  // Sample schema for validation
  const requiredFields = ['id', 'latitude', 'longitude'];
  
  const validateData = (data) => {
    if (!Array.isArray(data)) {
      throw new Error('Data must be an array');
    }
    
    if (data.length === 0) {
      throw new Error('Data array is empty');
    }
    
    // Check first item for schema
    const sample = data[0];
    const missingFields = requiredFields.filter(field => !sample.hasOwnProperty(field));
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
    
    // Validate coordinates for all items
    data.forEach((item, index) => {
      const lat = parseFloat(item.latitude);
      const lng = parseFloat(item.longitude);
      
      if (isNaN(lat) || lat < -90 || lat > 90) {
        throw new Error(`Invalid latitude at index ${index}: ${item.latitude}`);
      }
      
      if (isNaN(lng) || lng < -180 || lng > 180) {
        throw new Error(`Invalid longitude at index ${index}: ${item.longitude}`);
      }
    });
    
    return true;
  };
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        
        // Validate data
        validateData(jsonData);
        
        // Process data for intensity values based on status
        const processedData = jsonData.map(tourist => ({
          ...tourist,
          intensity: tourist.status === 'missing' ? 2 : 
                    tourist.status === 'overdue' ? 1.5 : 
                    tourist.intensity || 0.5
        }));
        
        // Update state with new data
        setTouristData(processedData);
        
        // Update preview data
        setPreviewData({
          count: processedData.length,
          samples: processedData.slice(0, 5)
        });
        
        toast.success(`Successfully imported ${processedData.length} tourist records`);
      } catch (error) {
        toast.error(`Import failed: ${error.message}`);
        console.error('Error parsing JSON:', error);
      }
    };
    reader.readAsText(file);
  };
  
  const handleExport = () => {
    if (touristData.length === 0) {
      toast.warning('No data to export');
      return;
    }
    
    // Create a timestamp for the filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `tourist-data-${timestamp}.json`;
    
    // Create a Blob with the JSON data
    const jsonBlob = new Blob([JSON.stringify(touristData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(jsonBlob);
    
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.info(`Exported ${touristData.length} records to ${filename}`);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    
    if (e.dataTransfer.files.length) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/json") {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const jsonData = JSON.parse(e.target.result);
            validateData(jsonData);
            
            // Process data for intensity values
            const processedData = jsonData.map(tourist => ({
              ...tourist,
              intensity: tourist.status === 'missing' ? 2 : 
                        tourist.status === 'overdue' ? 1.5 : 
                        tourist.intensity || 0.5
            }));
            
            setTouristData(processedData);
            setPreviewData({
              count: processedData.length,
              samples: processedData.slice(0, 5)
            });
            toast.success(`Successfully imported ${processedData.length} tourist records`);
          } catch (error) {
            toast.error(`Import failed: ${error.message}`);
          }
        };
        reader.readAsText(file);
      } else {
        toast.error('Please upload a JSON file');
      }
    }
  };

  // Reset data function
  const resetData = () => {
    setTouristData([]);
    setPreviewData({ count: 0, samples: [] });
    toast.info('Tourist data cleared');
  };

  // Toggle data preview
  const togglePreview = () => {
    setShowPreview(!showPreview);
  };
  
  // Get the appropriate layer provider based on selected baseLayer
  const getLayerProvider = (layer) => {
    switch (layer) {
      case 'satellite':
        return osm.satellite;
      case 'terrain':
        return osm.terrain;
      case 'dark':
        return osm.dark;
      case 'streets':
      case 'maptiler':
        return osm.osm; // Use OSM instead of MapTiler to avoid "Invalid key" error
      default:
        return osm.osm;
    }
  };
  
  const initialProvider = getLayerProvider(baseLayer);

  return (
    <div className="tourist-heatmap-container" style={{ height: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="controls" style={{ 
        padding: '10px', 
        background: '#f8f9fa', 
        borderBottom: '1px solid #ddd',
        zIndex: 1000,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h3 style={{ margin: '0' }}>Tourist Heatmap & Cluster Analysis</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="file" 
              accept=".json" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              style={{ display: 'none' }} 
            />
            <button 
              onClick={() => fileInputRef.current.click()} 
              className="btn btn-primary"
              style={{ 
                padding: '8px 16px', 
                backgroundColor: '#007bff', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
              </svg>
              Import Data
            </button>
            <button 
              onClick={handleExport} 
              className="btn btn-success"
              disabled={touristData.length === 0}
              style={{ 
                padding: '8px 16px', 
                backgroundColor: touristData.length === 0 ? '#6c757d' : '#28a745', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
              </svg>
              Export
            </button>
            {touristData.length > 0 && (
              <button 
                onClick={resetData} 
                className="btn btn-danger"
                style={{ 
                  padding: '8px 16px', 
                  backgroundColor: '#dc3545', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Statistics row */}
        {touristData.length > 0 && (
          <div style={{ 
            display: 'flex', 
            gap: '15px', 
            marginBottom: '10px',
            background: '#e9ecef', 
            padding: '8px', 
            borderRadius: '4px' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#007bff" viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
              </svg>
              <span><strong>Tourists:</strong> {touristData.length}</span>
            </div>
            
            <button 
              onClick={togglePreview} 
              style={{ 
                display: 'flex',
                alignItems: 'center',
                background: 'none',
                border: 'none',
                color: '#0d6efd',
                cursor: 'pointer',
                gap: '5px'
              }}
            >
              {showPreview ? 'Hide Details' : 'Show Details'}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d={showPreview ? 
                  "M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6a.5.5 0 0 1 .708 0z" : 
                  "M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"} 
                />
              </svg>
            </button>
          </div>
        )}
        
        {/* Data preview section - collapsible */}
        {showPreview && touristData.length > 0 && (
          <div className="data-preview" style={{ marginBottom: '10px' }}>
            <div style={{ overflowX: 'auto', maxHeight: '150px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', position: 'sticky', top: 0, background: '#f2f2f2' }}>ID</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', position: 'sticky', top: 0, background: '#f2f2f2' }}>Name</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', position: 'sticky', top: 0, background: '#f2f2f2' }}>Status</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', position: 'sticky', top: 0, background: '#f2f2f2' }}>Nationality</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', position: 'sticky', top: 0, background: '#f2f2f2' }}>Latitude</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', position: 'sticky', top: 0, background: '#f2f2f2' }}>Longitude</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', position: 'sticky', top: 0, background: '#f2f2f2' }}>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {previewData.samples.map((item) => (
                    <tr key={item.id} style={{ backgroundColor: '#ffffff' }}>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.id}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.name || 'N/A'}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.status || 'Normal'}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.nationality || 'Unknown'}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.latitude}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.longitude}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.timestamp || item.last_seen || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {previewData.count > 5 && (
              <div style={{ textAlign: 'right', fontSize: '12px', color: '#6c757d', marginTop: '5px' }}>
                Showing 5 of {previewData.count} records
              </div>
            )}
          </div>
        )}
      </div>
      
      <div 
        className="map-container" 
        style={{ flex: '1', position: 'relative' }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {touristData.length === 0 && (
          <div style={{ 
            position: 'absolute', 
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000, 
            backgroundColor: 'rgba(255,255,255,0.7)',
            borderRadius: '8px',
            padding: '20px',
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              border: '3px dashed #007bff',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#007bff" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"/>
                <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/>
              </svg>
            </div>
            <h3 style={{ marginBottom: '8px', color: '#212529' }}>No Tourist Data Available</h3>
            <p style={{ marginBottom: '16px', color: '#6c757d', textAlign: 'center' }}>
              Drag & drop a JSON file here or use the Import button above
            </p>
            <button 
              onClick={() => fileInputRef.current.click()}
              style={{
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
              </svg>
              Import Tourist Data
            </button>
          </div>
        )}
        
        <MapContainer 
          center={[center.lat, center.lng]} 
          zoom={ZOOM_LEVEL} 
          ref={mapRef}
          style={{ height: '100%', width: '100%' }}
        >
          <MapController onMapReady={onMapReady} />
          
          <TileLayer
            url={initialProvider.url}
            attribution={initialProvider.attribution}
            ref={tileLayerRef}
          />
          
          {touristData.length > 0 && (
            <>
              <HeatMapLayer points={touristData} />
              <MarkerClusterLayer points={touristData} />
            </>
          )}
        </MapContainer>
        
        {/* Legend - only show when data is loaded */}
        {touristData.length > 0 && (
          <div style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            backgroundColor: 'white',
            padding: '10px',
            borderRadius: '4px',
            boxShadow: '0 0 10px rgba(0,0,0,0.2)',
            zIndex: 1000
          }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Legend</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
              <div style={{ 
                width: '20px', 
                height: '20px', 
                background: 'linear-gradient(to right, rgba(0,0,255,0.5), rgba(0,255,0,0.5), rgba(255,255,0,0.5), rgba(255,0,0,0.5))',
                borderRadius: '3px'
              }}></div>
              <span style={{ fontSize: '12px' }}>Heat Intensity</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
              <div style={{ 
                width: '20px', 
                height: '20px', 
                backgroundColor: '#28a745',
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '10px',
                fontWeight: 'bold'
              }}>5</div>
              <span style={{ fontSize: '12px' }}>Tourist Clusters</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
              <img 
                src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png" 
                alt="Normal Tourist" 
                style={{ width: '12px', height: '20px' }}
              />
              <span style={{ fontSize: '12px' }}>Normal Tourist</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img 
                src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png" 
                alt="Missing Tourist" 
                style={{ width: '12px', height: '20px' }}
              />
              <span style={{ fontSize: '12px' }}>Missing Tourist</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TouristHeatMap;