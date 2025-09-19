import React, { useRef } from "react";
import { MapContainer, TileLayer, FeatureGroup, ZoomControl, useMap } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "./styles.css";
import L from "leaflet";
import osm from "./osm-providers";

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Map resize handler component
const MapResizeHandler = () => {
  const map = useMap();

  React.useEffect(() => {
    // Critical: This ensures map loads correctly after component is fully mounted
    setTimeout(() => {
      map.invalidateSize();
    }, 300);

    // Handle window resize events
    const handleResize = () => {
      map.invalidateSize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [map]);

  return null;
};

const DrawMap = () => {
  const mapCenter = [27.3314, 88.6134];
  const zoom = 13;
  const mapRef = useRef();
  const featureGroupRef = useRef();

  const _onCreate = (e) => {
    const { layerType, layer } = e;
    if (layerType === "polygon") {
      console.log("Polygon created:", layer.getLatLngs());
    }
  };

  const _onEdited = (e) => {
    console.log("Edited layer:", e);
  };

  const _onDeleted = (e) => {
    console.log("Deleted layer:", e);
  };

  return (
    <div className="map-container">
      <MapContainer
        center={mapCenter}
        zoom={zoom}
        zoomControl={false}
        ref={mapRef}
      >
        <MapResizeHandler />

        <TileLayer
          url={osm.maptiler.url}
          attribution={osm.maptiler.attribution}
        />

        <FeatureGroup ref={featureGroupRef}>
          <EditControl
            position="topright"
            onCreated={_onCreate}
            onEdited={_onEdited}
            onDeleted={_onDeleted}
            draw={{
              rectangle: true,
              polygon: true,
              circle: true,
              circlemarker: false,
              marker: true,
              polyline: true,
            }}
          />
        </FeatureGroup>

        <ZoomControl position="bottomleft" />
      </MapContainer>
    </div>
  );
};

export default DrawMap;