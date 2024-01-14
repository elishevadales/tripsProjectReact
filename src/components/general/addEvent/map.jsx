import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ location }) => {
  const ZOOM_LEVEL = 15;
  const center = [location.lat, location.lon];
  const mapRef = useRef(null);

  useEffect(() => {
    // Center the map when the component mounts or when the location changes
    if (mapRef.current) {
      mapRef.current.setView(center, ZOOM_LEVEL);
    }
  }, [location, center, ZOOM_LEVEL]);



  // Custom marker icon
  const markerIcon = new L.Icon({
    iconUrl: '/images/marker5.png', // Replace with your marker icon path
    iconSize: [32, 96],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  return (
    <MapContainer
      center={center}
      zoom={ZOOM_LEVEL}
      style={{ height: '300px', width: '100%' }}
      whenCreated={(map) => (mapRef.current = map)}

    >
      <TileLayer
        url={'https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=1gChS6Aib0ohtpBmJnOY'}
        attribution={'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}
      />

      <Marker position={center} icon={markerIcon} />
    </MapContainer>
  );
};

export default Map;
