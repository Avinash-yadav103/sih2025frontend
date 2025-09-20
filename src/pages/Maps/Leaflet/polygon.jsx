import React, { useState, useRef } from "react";
import Header from "../components/Header";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import osm from "./osm-providers";
import "leaflet/dist/leaflet.css";

const PolygonMap = () => {
  const [center] = useState({ lat: 24.4539, lng: 54.3773 });
  const ZOOM_LEVEL = 12;
  const mapRef = useRef();
  
  // Example polygon coordinates
  const purpleOptions = { color: 'purple' };
  const polygon = [
    [24.4539, 54.3773],
    [24.4539, 54.4],
    [24.47, 54.4],
    [24.47, 54.3773],
  ];

  return (
    <>
      <Header title="React Leaflet - Polygon" />

      <div className="row">
        <div className="col text-center">
          <h2>React-leaflet - Simple Polygon Example</h2>
          <p>(Note: Edit functionality disabled - install @react-leaflet/react-leaflet-draw for full features)</p>

          <div className="col">
            <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
              <TileLayer
                url={osm.maptiler.url}
                attribution={osm.maptiler.attribution}
              />
              <Polygon pathOptions={purpleOptions} positions={polygon} />
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default PolygonMap;