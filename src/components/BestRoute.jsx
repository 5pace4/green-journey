import { useState, useEffect } from 'react';
import ReactMapGL, { NavigationControl } from 'react-map-gl';

const BestRoute = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [transportation, setTransportation] = useState('car');
  const [viewport, setViewport] = useState({
    latitude: 23.7965, // Default latitude (BB Hall, CUET)
    longitude: 90.4184, // Default longitude (BB Hall, CUET)
    zoom: 16, // Set initial zoom to a bit closer for better visibility
  });

  const handleFindRoute = () => {
    console.log(`Finding route from ${from} to ${to} by ${transportation}`);
  };

  useEffect(() => {
    // Preload map tiles to speed up the loading time
    const map = new window.mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      accessToken:
        'pk.eyJ1IjoiNXBhY2U0IiwiYSI6ImNtNDJqdzZlaDAxOW4yeHNkeDc0cXFiNWMifQ.iON05oX8i4q_J-7jJJy5HA',
    });

    map.on('load', function () {
      map.resize();
    });
  }, []);

  return (
    <div
      className="best-route-container"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      {/* Input Section */}
      <div
        className="input-section"
        style={{
          display: 'flex',
          marginBottom: '20px',
          justifyContent: 'center',
        }}
      >
        <input
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          style={{ marginRight: '10px', padding: '8px', width: '200px' }}
        />
        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          style={{ marginRight: '10px', padding: '8px', width: '200px' }}
        />
        <select
          value={transportation}
          onChange={(e) => setTransportation(e.target.value)}
          style={{ marginRight: '10px', padding: '8px' }}
        >
          <option value="car">Car</option>
          <option value="bus">Bus</option>
          <option value="cycling">Cycling</option>
          <option value="walking">Walking</option>
          <option value="train">Train</option>
        </select>
        <button onClick={handleFindRoute} style={{ padding: '8px 16px' }}>
          Find Route
        </button>
      </div>

      {/* Map Container */}
      <div
        id="map"
        style={{ width: '90%', height: '600px', maxWidth: '1000px' }}
      >
        <ReactMapGL
          {...viewport}
          width="100%"
          height="100%"
          mapboxApiAccessToken="pk.eyJ1IjoiNXBhY2U0IiwiYSI6ImNtNDJqdzZlaDAxOW4yeHNkeDc0cXFiNWMifQ.iON05oX8i4q_J-7jJJy5HA"
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          scrollZoom={true} // Enable zooming using scroll
        >
          <NavigationControl showZoom={true} showCompass={false} />
        </ReactMapGL>
      </div>
    </div>
  );
};

export default BestRoute;
