import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ center }) => {
    const ZOOM_LEVEL = 6;
    const [location, setLocation] = useState(center);
    const [mapKey, setMapKey] = useState(0);

    useEffect(() => {
        setLocation(center);
        setMapKey((prevKey) => prevKey + 1);
    }, [center]);



    // Custom marker icon
    const markerIcon = new L.Icon({
        iconUrl: '/images/marker5.png',
        iconSize: [32, 96],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });

    return (
        <MapContainer
            key={mapKey}
            center={location}
            zoom={ZOOM_LEVEL}
            style={{ height: '300px', width: '100%' }}

        >
            <TileLayer
                url={'https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=1gChS6Aib0ohtpBmJnOY'}
                attribution={'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}
            />

            <Marker position={location} icon={markerIcon} />
        </MapContainer>
    );
};

export default Map;
