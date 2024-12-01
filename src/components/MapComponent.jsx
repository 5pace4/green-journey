// MapComponent.js
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

// Set your public Mapbox token
mapboxgl.accessToken =
  'pk.eyJ1IjoiNXBhY2U0IiwiYSI6ImNtNDJqMzk4YjAxYTUya3B4Ynh1Zmd5NXoifQ.-43hl2W5mj5ijk6bMHldXA';

const MapComponent = () => {
  const mapContainerRef = useRef(null); // Reference to map container

  useEffect(() => {
    // Initialize the map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current, // Container reference
      style: 'mapbox://styles/mapbox/streets-v11', // Map style
      center: [90.4125, 23.8103], // Coordinates for Dhaka [longitude, latitude]
      zoom: 12, // Set zoom level closer to Dhaka
    });

    // Cleanup on unmount
    return () => map.remove();
  }, []);

  return (
    <div
      ref={mapContainerRef}
      className="map-container" // Use the responsive map container class
    />
  );
};

export default MapComponent;
