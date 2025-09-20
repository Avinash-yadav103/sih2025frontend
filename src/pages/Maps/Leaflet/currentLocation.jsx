import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import osm from "./osm-providers";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

// Create a custom marker for the current location
const currentLocationIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to handle location detection
function LocationMarker() {
  const [position, setPosition] = useState(null);
  const [locationFound, setLocationFound] = useState(false);
  const [error, setError] = useState(null);
  const map = useMap();

  useEffect(() => {
    map.locate({
      setView: true,
      maxZoom: 16,
      enableHighAccuracy: true
    }).on('locationfound', function(e) {
      setPosition(e.latlng);
      setLocationFound(true);
    }).on('locationerror', function(e) {
      setError(e.message);
      console.error("Location error:", e);
    });
  }, [map]);

  return (
    <>
      {error && 
        <div className="location-error" style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          zIndex: 999,
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
        }}>
          {error}
        </div>
      }
      
      {position && 
        <Marker position={position} icon={currentLocationIcon}>
          <Popup>
            <div>
              <h4>Your Current Location</h4>
              <p>Latitude: {position.lat.toFixed(6)}</p>
              <p>Longitude: {position.lng.toFixed(6)}</p>
            </div>
          </Popup>
        </Marker>
      }
    </>
  );
}

const CurrentLocationMap = () => {
  const [center] = useState({ lat: 13.084622, lng: 80.248357 });
  const ZOOM_LEVEL = 13;
  const mapRef = useRef();

  const handleLocateClick = () => {
    if (mapRef.current) {
      const leafletMap = mapRef.current;
      leafletMap.locate({
        setView: true,
        maxZoom: 16,
        enableHighAccuracy: true
      });
    }
  };

  return (
    <>
      <div className="row">
        <div className="col text-center">
          <div className="col" style={{ height: "calc(100vh - 80px)" }}>
            <MapContainer
              center={[center.lat, center.lng]}
              zoom={ZOOM_LEVEL}
              ref={mapRef}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url={osm.maptiler.url}
                attribution={osm.maptiler.attribution}
              />
              <LocationMarker />
            </MapContainer>
          </div>
        </div>
      </div>

      <div className="location-button" style={{
        position: "absolute",
        bottom: "80px",
        right: "20px",
        zIndex: 999,
      }}>
        <button
          className="btn btn-primary"
          style={{
            padding: "10px 15px",
            backgroundColor: "#1a73e8",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
          }}
          onClick={handleLocateClick}
        >
          Locate Me
        </button>
      </div>
    </>
  );
};

export default CurrentLocationMap;