import React, { useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  ZoomControl,
  useMap,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "./styles.css";
import L from "leaflet";
import osm from "./osm-providers";

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
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

const PolygonMap = () => {
  const mapCenter = [27.3314, 88.6134];
  const zoom = 13;
  const [mapLayers, setMapLayers] = useState([]);
  const mapRef = useRef();

  const _onCreate = (e) => {
    const { layerType, layer } = e;
    if (layerType === "polygon") {
      const { _leaflet_id } = layer;
      setMapLayers((layers) => [
        ...layers,
        { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
      ]);
    }
  };

  const _onEdited = (e) => {
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).forEach(({ _leaflet_id, editing }) => {
      setMapLayers((layers) =>
        layers.map((l) =>
          l.id === _leaflet_id
            ? { ...l, latlngs: editing.latlngs[0] }
            : l
        )
      );
    });
  };

  const _onDeleted = (e) => {
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).forEach(({ _leaflet_id }) => {
      setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
    });
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

        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={_onCreate}
            onEdited={_onEdited}
            onDeleted={_onDeleted}
            draw={{
              rectangle: false,
              polyline: false,
              circle: false,
              circlemarker: false,
              marker: false,
              polygon: true,
            }}
          />
        </FeatureGroup>

        <ZoomControl position="bottomleft" />
      </MapContainer>

      {/* Display saved polygon data */}
      <div style={{ padding: "10px" }}>
        <h4>Saved Polygons</h4>
        <pre>{JSON.stringify(mapLayers, null, 2)}</pre>
      </div>
    </div>
  );
};

export default PolygonMap;