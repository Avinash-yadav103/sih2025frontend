import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useRef } from "react";
import "leaflet/dist/leaflet.css";
import ExternalInfo from "../components/ExternalInfo";

const BasicMap = () => {
    const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
    const ZOOM_LEVEL = 9;
    const mapRef = useRef();

    // Define a proper OSM tile provider
    const osmProvider = {
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    };

    return (
        <>
            <ExternalInfo page="leafletBasic" />
            <div className="row">
                <div className="col text-center">
                    <div className="col" style={{ height: "calc(100vh - 80px)" }}>
                        <MapContainer
                            center={[center.lat, center.lng]}
                            zoom={ZOOM_LEVEL}
                            ref={mapRef}
                            style={{ height: "100%", width: "100%", zIndex: 0 }}
                        >
                            <TileLayer
                                url={osmProvider.url}
                                attribution={osmProvider.attribution}
                            />
                        </MapContainer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BasicMap;