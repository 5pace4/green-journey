import { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
// import CO2Graph from './CO2Graph'; // Import CO2Graph component
import '../styles/BestPath.css';
// import DistanceModeGraph from './DistanceModeGraph';
import GraphContainer from './GraphContainer';
mapboxgl.accessToken =
  'pk.eyJ1IjoiNXBhY2U0IiwiYSI6ImNtNDJqdzZlaDAxOW4yeHNkeDc0cXFiNWMifQ.iON05oX8i4q_J-7jJJy5HA';

const BestPath = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [transportMode, setTransportMode] = useState('driving');
  const [map, setMap] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [sourceCoords, setSourceCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);

  const cuetGateCoords = [91.9729445, 22.4620833]; // Coordinates for CUET

  const handleSourceChange = (e) => setSource(e.target.value);
  const handleDestinationChange = (e) => setDestination(e.target.value);
  const handleModeChange = (e) => setTransportMode(e.target.value);

  const haversineDistance = (coords1, coords2) => {
    const R = 6371;
    const lat1 = (coords1[1] * Math.PI) / 180;
    const lon1 = (coords1[0] * Math.PI) / 180;
    const lat2 = (coords2[1] * Math.PI) / 180;
    const lon2 = (coords2[0] * Math.PI) / 180;
    const dlat = lat2 - lat1;
    const dlon = lon2 - lon1;
    const a =
      Math.sin(dlat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const geocodeAddress = async (address) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address,
    )}.json?access_token=${mapboxgl.accessToken}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.features && data.features.length > 0) {
      let nearestLocation = data.features[0];
      let minDistance = Infinity;

      for (let feature of data.features) {
        const coords = feature.geometry.coordinates;
        const distance = haversineDistance(cuetGateCoords, coords);
        if (distance < minDistance) {
          minDistance = distance;
          nearestLocation = feature;
        }
      }

      return nearestLocation.geometry.coordinates;
    } else {
      alert(`Could not find coordinates for ${address}`);
      return null;
    }
  };

  const getRoute = async (sourceCoords, destinationCoords) => {
    const url = `https://api.mapbox.com/directions/v5/mapbox/${transportMode}/${sourceCoords[0]},${sourceCoords[1]};${destinationCoords[0]},${destinationCoords[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.routes && data.routes.length > 0) {
      const route = data.routes[0];
      setRouteInfo({
        distance: route.distance / 1000, // Convert to kilometers
        duration: route.duration / 60, // Convert to minutes
      });

      return route.geometry;
    } else {
      alert('No route found');
      return null;
    }
  };

  const updateMap = (routeGeoJSON, sourceCoords, destinationCoords) => {
    if (map) {
      map.remove();
    }

    const newMap = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: sourceCoords,
      zoom: 12,
    });

    new mapboxgl.Marker({ color: 'blue' })
      .setLngLat(sourceCoords)
      .setPopup(new mapboxgl.Popup().setHTML('<h3>Source</h3>'))
      .addTo(newMap);

    new mapboxgl.Marker({ color: 'red' })
      .setLngLat(destinationCoords)
      .setPopup(new mapboxgl.Popup().setHTML('<h3>Destination</h3>'))
      .addTo(newMap);

    if (routeGeoJSON) {
      newMap.on('load', () => {
        newMap.addSource('route', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: routeGeoJSON,
              },
            ],
          },
        });

        newMap.addLayer({
          id: 'route-layer',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#00FF00',
            'line-width': 6,
          },
        });
      });
    }

    setMap(newMap);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sourceCoords = await geocodeAddress(source);
    const destinationCoords = await geocodeAddress(destination);

    if (sourceCoords && destinationCoords) {
      const routeGeoJSON = await getRoute(sourceCoords, destinationCoords);
      if (routeGeoJSON) {
        updateMap(routeGeoJSON, sourceCoords, destinationCoords);
        setSourceCoords(sourceCoords);
        setDestinationCoords(destinationCoords);
      }
    }
  };

  useEffect(() => {
    const newMap = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: cuetGateCoords,
      zoom: 15,
    });

    new mapboxgl.Marker({ color: 'red' })
      .setLngLat(cuetGateCoords)
      .setPopup(new mapboxgl.Popup().setHTML('<h3>CUET Gate</h3>'))
      .addTo(newMap);

    setMap(newMap);
  }, []);

  return (
    <div className="best-path">
      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <input
            type="text"
            placeholder="From"
            value={source}
            onChange={handleSourceChange}
            className="input"
          />
          <input
            type="text"
            placeholder="To"
            value={destination}
            onChange={handleDestinationChange}
            className="input"
          />
        </div>
        <div className="dropdown-container">
          <select
            className="dropdown"
            value={transportMode}
            onChange={handleModeChange}
          >
            <option value="driving">Car</option>
            <option value="walking">Walking</option>
            <option value="cycling">Cycling</option>
            <option value="transit">Public Transit</option>
          </select>
        </div>
        <button type="submit" className="btn">
          Find Route
        </button>
      </form>

      {/* Render the CO2Graph and required time here */}
      {sourceCoords && destinationCoords && (
        <GraphContainer
          sourceCoords={sourceCoords}
          destinationCoords={destinationCoords}
        />
      )}
      {routeInfo && (
        <div className="info">
          <div className="journey-info">
            <h2>
              This may be the best path with the least distance{' '}
              <span className="highlight-distance">
                {routeInfo.distance.toFixed(2)} km,{' '}
              </span>
              and time{' '}
              <span className="highlight-time">
                {`${Math.floor(routeInfo.duration / 60)} hour ${(
                  routeInfo.duration % 60
                ).toFixed(0)} minutes`}
              </span>
            </h2>
            <h3>
              “
              <span className="highlight-quote">
                Wishing you a smooth and safe journey ahead, enjoy every moment
                along the way!
              </span>
              ”
            </h3>
          </div>
        </div>
      )}

      <div id="map" className="map-container"></div>
    </div>
  );
};

export default BestPath;
