import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import osm from "./osm-providers";
import { useRef } from "react";
import "leaflet/dist/leaflet.css";
import ExternalInfo from "../components/ExternalInfo";

const BasicMap = () => {
    const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
    const ZOOM_LEVEL = 9;
    const mapRef = useRef();

    return (
        <>
            <ExternalInfo page="leafletBasic" />
            <div className="row">
                <div className="col text-center">
                    <div className="col">
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
                        </MapContainer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BasicMap;