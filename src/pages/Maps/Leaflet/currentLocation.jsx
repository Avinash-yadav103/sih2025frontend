import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import osm from "./osm-providers";

import Header from "../components/Header";
import useGeoLocation from "../hooks/useGeoLocation";
import ExternalInfo from "../components/ExternalInfo";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// A helper component to access the map instance
function FlyToOnClick() {
  const map = useMap();
  
  // Store the map reference when the component mounts
  React.useEffect(() => {
    if (map) {
      mapRef.current = map;
    }
  }, []);
  
  return null;
}

const CurrentLocation = () => {
  const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
  const ZOOM_LEVEL = 9;
  const mapRef = useRef();

  const location = useGeoLocation();

  const showMyLocation = () => {
    if (location.loaded && !location.error) {
      if (mapRef.current) {
        const map = mapRef.current;
        map.flyTo(
          [location.coordinates.lat, location.coordinates.lng],
          ZOOM_LEVEL,
          { animate: true }
        );
      }
    } else if (location.error) {
      alert(location.error.message);
    }
  };

  return (
    <>
      <Header title="React Leaflet Map Example" />

      <ExternalInfo page="leafletCurrentLocation" />

      <div className="row">
        <div className="col text-center">
          <h2>React-leaflet - Get user location</h2>
          <p>Get user location and highlight it with a marker</p>
          <div className="col">
            <MapContainer center={center} zoom={ZOOM_LEVEL}>
              <FlyToOnClick />
              <TileLayer
                url={osm.maptiler.url}
                attribution={osm.maptiler.attribution}
              />

              {location.loaded && !location.error && (
                <Marker
                  icon={markerIcon}
                  position={[
                    location.coordinates.lat,
                    location.coordinates.lng,
                  ]}
                ></Marker>
              )}
            </MapContainer>
          </div>
        </div>
      </div>

      <div className="row my-4">
        <div className="col d-flex justify-content-center">
          <button className="btn btn-primary" onClick={showMyLocation}>
            Locate Me 🌎
          </button>
        </div>
      </div>
    </>
  );
};

export default CurrentLocation;