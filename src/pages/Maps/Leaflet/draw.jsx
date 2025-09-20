import React, { useState, useRef } from "react";
import Header from "../components/Header";
import { MapContainer, TileLayer, Marker, Circle, Polygon } from "react-leaflet";
import L from "leaflet";
import osm from "./osm-providers";
import "leaflet/dist/leaflet.css";
import ExternalInfo from "../components/ExternalInfo";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const DrawMap = () => {
  const [center] = useState({ lat: 24.4539, lng: 54.3773 });
  const ZOOM_LEVEL = 12;
  const mapRef = useRef();

  const redOptions = { color: "red" };
  const purpleOptions = { color: "purple" };

  // Example shapes
  const circle = [24.4539, 54.3773];
  const polygon = [
    [24.46, 54.39],
    [24.46, 54.4],
    [24.47, 54.4],
    [24.47, 54.39],
  ];

  return (
    <>
      <Header title="React Leaflet - Draw Examples" />

      <ExternalInfo page="leafletDraw" />

      <div className="row">
        <div className="col text-center">
          <h2>React-leaflet - Sample Shapes</h2>
          <p>
            (Note: Drawing tools disabled - install{" "}
            <a href="https://www.npmjs.com/package/@react-leaflet/react-leaflet-draw">
              @react-leaflet/react-leaflet-draw
            </a>{" "}
            for full features)
          </p>

          <div className="col">
            <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
              <TileLayer
                url={osm.maptiler.url}
                attribution={osm.maptiler.attribution}
              />
              <Marker position={center}></Marker>
              <Circle
                center={circle}
                pathOptions={redOptions}
                radius={500}
              />
              <Polygon
                pathOptions={purpleOptions}
                positions={polygon}
              />
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default DrawMap;