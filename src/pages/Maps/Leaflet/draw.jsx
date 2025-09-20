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

// HeatMap and MarkerCluster components
const HeatMapLayer = ({ points }) => {
  const map = useMap();
  
  useEffect(() => {
    if (!points || points.length === 0) return;
    
    // Create and add heat layer
    const heatLayer = L.heatLayer(
      points.map(p => [p.latitude, p.longitude, p.intensity || 0.5]),
      { radius: 25, blur: 15, maxZoom: 17 }
    ).addTo(map);
    
    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points]);
  
  return null;
};

const MarkerClusterLayer = ({ points }) => {
  const map = useMap();
  
  useEffect(() => {
    if (!points || points.length === 0) return;
    
    // Create a marker cluster group
    const markers = L.markerClusterGroup();
    
    // Add markers to the cluster
    points.forEach(point => {
      const marker = L.marker([point.latitude, point.longitude]);
      marker.bindPopup(`
        <div>
          <h4>${point.name || 'Tourist'}</h4>
          <p>ID: ${point.id || 'N/A'}</p>
          <p>Nationality: ${point.nationality || 'Unknown'}</p>
          <p>Last seen: ${point.timestamp || 'N/A'}</p>
        </div>
      `);
      markers.addLayer(marker);
    });
    
    map.addLayer(markers);
    
    return () => {
      map.removeLayer(markers);
    };
  }, [map, points]);
  
  return null;
};

const DrawMap = () => {
  const [center] = useState({ lat: 24.4539, lng: 54.3773 });
  const ZOOM_LEVEL = 12;
  const mapRef = useRef();
  const [touristData, setTouristData] = useState([]);
  const [previewData, setPreviewData] = useState({ count: 0, samples: [] });
  const fileInputRef = useRef();
  
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
        
        // Update state with new data
        setTouristData(jsonData);
        
        // Update preview data
        setPreviewData({
          count: jsonData.length,
          samples: jsonData.slice(0, 5)
        });
        
        toast.success(`Successfully imported ${jsonData.length} tourist records`);
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
            setTouristData(jsonData);
            setPreviewData({
              count: jsonData.length,
              samples: jsonData.slice(0, 5)
            });
            toast.success(`Successfully imported ${jsonData.length} tourist records`);
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

  return (
    <div className="tourist-heatmap-container" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ToastContainer position="top-right" />
      
      <div className="controls" style={{ padding: '10px', background: '#f8f9fa', borderBottom: '1px solid #ddd' }}>
        <h3>Tourist Heatmap & Cluster Analysis</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
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
            style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Import JSON
          </button>
          <button 
            onClick={handleExport} 
            className="btn btn-success"
            style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Export Data
          </button>
        </div>
        
        <div className="data-preview" style={{ marginBottom: '10px' }}>
          <h4>Data Preview ({previewData.count} records)</h4>
          {previewData.count > 0 ? (
            <div style={{ overflowX: 'auto', maxHeight: '150px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>ID</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Nationality</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Latitude</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Longitude</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {previewData.samples.map((item) => (
                    <tr key={item.id}>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.id}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.name || 'N/A'}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.nationality || 'Unknown'}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.latitude}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.longitude}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.timestamp || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No data loaded. Import a JSON file to see tourist data.</p>
          )}
        </div>
      </div>
      
      <div 
        className="map-container" 
        style={{ flex: '1', position: 'relative' }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          zIndex: 1000, 
          backgroundColor: 'rgba(255,255,255,0.7)', 
          padding: '20px', 
          borderRadius: '8px',
          display: touristData.length > 0 ? 'none' : 'block',
          textAlign: 'center'
        }}>
          <p>Drag & drop your JSON tourist data file here</p>
        </div>
        
        <MapContainer 
          center={center} 
          zoom={ZOOM_LEVEL} 
          ref={mapRef}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url={osm.maptiler.url}
            attribution={osm.maptiler.attribution}
          />
          
          {touristData.length > 0 && (
            <>
              <HeatMapLayer points={touristData} />
              <MarkerClusterLayer points={touristData} />
            </>
          )}
          
          <Marker position={center}>
            <Popup>
              City Center
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default DrawMap;
