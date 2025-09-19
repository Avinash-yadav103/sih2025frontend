import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer, ZoomControl, ScaleControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import osm from "./osm-providers";
import "./styles.css";
import L from "leaflet";

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Map resize handler component to ensure proper rendering
const MapResizeHandler = ({ map }) => {
    useEffect(() => {
        if (!map) return;

        // Force resize after component fully mounts
        const timer = setTimeout(() => {
            map.invalidateSize();
        }, 300);

        const handleResize = () => {
            map.invalidateSize();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(timer);
        };
    }, [map]);

    return null;
};

const BasicMap = ({ center = [27.3314, 88.6134], zoom = 13, children }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        // Force invalidateSize after the component mounts
        if (mapRef.current) {
            setTimeout(() => {
                mapRef.current.invalidateSize();
            }, 300);
        }
    }, []);

    return (
        <div className="map-container">
            <MapContainer
                center={center}
                zoom={zoom}
                zoomControl={false}
                ref={mapRef}
                whenCreated={(map) => {
                    mapRef.current = map;
                }}
            >
                <TileLayer
                    url={osm.maptiler.url}
                    attribution={osm.maptiler.attribution}
                />
                <ZoomControl position="bottomleft" />
                <ScaleControl position="bottomleft" />

                {/* Add the resize handler */}
                {mapRef.current && <MapResizeHandler map={mapRef.current} />}

                {/* Render any children components passed */}
                {children}
            </MapContainer>
        </div>
    );
};

export default BasicMap;