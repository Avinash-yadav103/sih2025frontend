import React, { useState, useRef } from "react";
import { Map, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import osm from "./osm-providers";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const DrawMap = () => {
  const [center, setCenter] = useState({ lat: 27.3314, lng: 88.6134 });
  const ZOOM_LEVEL = 12;
  const mapRef = useRef();

  const _created = (e) => console.log(e);

  return (
    <div className="map-container">
      <Map center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={_created}
          />
        </FeatureGroup>
        <TileLayer
          url={osm.maptiler.url}
          attribution={osm.maptiler.attribution}
        />
      </Map>
    </div>
  );
};

export default DrawMap;