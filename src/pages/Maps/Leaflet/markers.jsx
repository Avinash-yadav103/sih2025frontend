import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import osm from "./osm-providers";
import cities from "./cities.json";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MarkersMap = () => {
  const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
  const ZOOM_LEVEL = 9;
  const mapRef = useRef();

  return (
    <MapContainer
      center={center}
      zoom={ZOOM_LEVEL}
      ref={mapRef}
      style={{ height: "100%", width: "100%" }} // Explicitly set height and width
    >
      <TileLayer
        url={osm.maptiler.url}
        attribution={osm.maptiler.attribution}
      />

      {cities.map((city, idx) => (
        <Marker
          position={[city.lat, city.lng]}
          icon={markerIcon}
          key={idx}
        >
          <Popup>
            <b>
              {city.city}, {city.country}
            </b>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MarkersMap;