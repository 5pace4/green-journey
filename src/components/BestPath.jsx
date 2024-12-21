import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import Autosuggest from 'react-autosuggest';
import '../styles/BestPath.css';
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
  const [suggestions, setSuggestions] = useState([]);
  const [inputFocus, setInputFocus] = useState('');

  const cuetGateCoords = useMemo(() => [91.9729445, 22.4620833], []);

  const markers = useRef([]);

  const haversineDistance = useCallback((coords1, coords2) => {
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
  }, []);

  const geocodeAddress = useCallback(
    async (address) => {
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
    },
    [haversineDistance, cuetGateCoords],
  );

  const getRoute = useCallback(
    async (sourceCoords, destinationCoords) => {
      const url = `https://api.mapbox.com/directions/v5/mapbox/${transportMode}/${sourceCoords[0]},${sourceCoords[1]};${destinationCoords[0]},${destinationCoords[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        setRouteInfo({
          distance: route.distance / 1000,
          duration: route.duration / 60,
        });

        return route.geometry;
      } else {
        alert('No route found');
        return null;
      }
    },
    [transportMode],
  );

  const updateMap = useCallback(
    (routeGeoJSON, sourceCoords, destinationCoords) => {
      if (!map) return;

      // Remove existing markers
      markers.current.forEach((marker) => marker.remove());
      markers.current = [];

      const bounds = new mapboxgl.LngLatBounds();
      bounds.extend(sourceCoords);
      bounds.extend(destinationCoords);

      // Fit map to bounds
      map.fitBounds(bounds, {
        padding: 50,
        linear: false,
        duration: 2000,
      });

      const sourceMarker = new mapboxgl.Marker({ color: 'blue' })
        .setLngLat(sourceCoords)
        .setPopup(new mapboxgl.Popup().setHTML('<h3>Source</h3>'))
        .addTo(map);
      markers.current.push(sourceMarker);

      const destinationMarker = new mapboxgl.Marker({ color: 'red' })
        .setLngLat(destinationCoords)
        .setPopup(new mapboxgl.Popup().setHTML('<h3>Destination</h3>'))
        .addTo(map);
      markers.current.push(destinationMarker);

      if (routeGeoJSON) {
        if (map.getLayer('route-layer')) {
          map.removeLayer('route-layer');
          map.removeSource('route');
        }

        map.addSource('route', {
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

        map.addLayer({
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
      }
    },
    [map],
  );

  const fetchSuggestions = async (value) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      value,
    )}.json?access_token=${mapboxgl.accessToken}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.features && data.features.length > 0) {
      setSuggestions(
        data.features.map((feature) => ({
          name: feature.place_name,
          coords: feature.geometry.coordinates,
        })),
      );
    } else {
      setSuggestions([]);
    }
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    if (value.trim()) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleSuggestionSelected = (event, { suggestion }) => {
    if (inputFocus === 'source') {
      setSource(suggestion.name);
      setSourceCoords(suggestion.coords);
    } else if (inputFocus === 'destination') {
      setDestination(suggestion.name);
      setDestinationCoords(suggestion.coords);
    }
  };

  const getSuggestionValue = (suggestion) => suggestion.name;

  const renderSuggestion = (suggestion) => (
    <div className="autosuggest-suggestion">{suggestion.name}</div>
  );

  const theme = {
    container: 'autosuggest-container',
    input: 'input', // Reuse your input styling
    suggestionsContainer: 'autosuggest-suggestions-container',
    suggestion: 'autosuggest-suggestion-item',
    suggestionHighlighted: 'autosuggest-suggestion-highlighted',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (sourceCoords && destinationCoords) {
      const routeGeoJSON = await getRoute(sourceCoords, destinationCoords);
      if (routeGeoJSON) {
        updateMap(routeGeoJSON, sourceCoords, destinationCoords);
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

    newMap.on('load', () => {
      const initialMarker = new mapboxgl.Marker({ color: 'red' })
        .setLngLat(cuetGateCoords)
        .setPopup(new mapboxgl.Popup().setHTML('<h3>CUET Gate</h3>'))
        .addTo(newMap);
      markers.current.push(initialMarker);
    });

    setMap(newMap);
    return () => newMap.remove();
  }, [cuetGateCoords]);

  return (
    <div className="best-path">
      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <Autosuggest
            theme={theme}
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            onSuggestionSelected={handleSuggestionSelected}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={{
              placeholder: 'From',
              value: source,
              onChange: (_, { newValue }) => setSource(newValue),
              onFocus: () => setInputFocus('source'),
            }}
          />
          <Autosuggest
            theme={theme}
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            onSuggestionSelected={handleSuggestionSelected}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={{
              placeholder: 'To',
              value: destination,
              onChange: (_, { newValue }) => setDestination(newValue),
              onFocus: () => setInputFocus('destination'),
            }}
          />
        </div>
        <div className="dropdown-container">
          <select
            className="dropdown"
            value={transportMode}
            onChange={(e) => setTransportMode(e.target.value)}
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
