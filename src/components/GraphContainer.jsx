import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../styles/GraphContainer.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const GraphContainer = ({ sourceCoords, destinationCoords, mode }) => {
  const [co2ChartData, setCo2ChartData] = useState(null);
  const [distanceChartData, setDistanceChartData] = useState(null);

  // Default CO2 emission rates for each driving mode (kg/km)
  const emissionRates = {
    car: 0.18,
    walking: 0, // walking doesn't contribute to CO2 emissions
    cycling: 0, // cycling doesn't contribute to CO2 emissions
    transit: 0.09,
  };

  // Default velocities for each driving mode (km/h)
  const velocityRates = {
    car: 40,
    walking: 5,
    cycling: 10,
    transit: 30,
  };

  // Calculate CO2 emissions for the selected driving mode
  const calculateCO2Emissions = (mode, distance) => {
    const rate = emissionRates[mode];
    const emissionsInKg = distance * rate;
    return emissionsInKg;
  };

  // Calculate time using velocity and distance (Time = Distance / Velocity)
  const calculateTime = (mode, distance) => {
    const velocity = velocityRates[mode];
    const timeInHours = distance / velocity; // Time in hours
    return timeInHours;
  };

  // Calculate distance using the Haversine formula
  const haversineDistance = (coords1, coords2) => {
    const R = 6371; // Radius of Earth in kilometers
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
    return R * c; // Distance in kilometers
  };

  useEffect(() => {
    if (sourceCoords && destinationCoords) {
      const distance = haversineDistance(sourceCoords, destinationCoords); // Distance in kilometers

      // Prepare CO2 emissions data
      const co2Labels = ['Car', 'Walking', 'Cycling', 'Transit'];
      const co2Data = co2Labels.map((modeType) => {
        return calculateCO2Emissions(modeType.toLowerCase(), distance); // Get CO2 for each mode
      });

      setCo2ChartData({
        labels: co2Labels,
        datasets: [
          {
            label: 'CO2 Emissions (kg)',
            data: co2Data,
            fill: false,
            borderColor: '#00FF00',
            tension: 0.1,
            pointBackgroundColor: '#00FF00',
            borderWidth: 3,
            pointRadius: 5,
          },
        ],
      });

      // Prepare time data
      const timeLabels = ['Car', 'Walking', 'Cycling', 'Transit'];
      const timeData = timeLabels.map((modeType) => {
        return calculateTime(modeType.toLowerCase(), distance); // Calculate time for each mode
      });

      setDistanceChartData({
        labels: timeLabels,
        datasets: [
          {
            label: 'Time (minutes)',
            data: timeData,
            fill: false,
            borderColor: '#00FF00', // Green color for line
            tension: 0.1,
            pointBackgroundColor: '#00FF00', // Green color for points
            borderWidth: 3,
            pointRadius: 5,
          },
        ],
      });
    }
  }, [sourceCoords, destinationCoords, mode]);

  return (
    <div className="graph-container">
      <div className="graph">
        <h3 className="graph-title">CO2 Emissions vs. Transport Mode</h3>
        {co2ChartData && (
          <Line
            data={co2ChartData}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'CO2 Emissions by Transport Mode',
                  color: '#fff',
                },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => {
                      return `${tooltipItem.raw.toFixed(2)} kg`;
                    },
                  },
                  backgroundColor: '#333',
                  titleColor: '#fff',
                  bodyColor: '#fff',
                },
              },
              scales: {
                x: {
                  grid: {
                    color: '#444',
                  },
                  ticks: {
                    color: '#fff',
                  },
                },
                y: {
                  grid: {
                    color: '#444',
                  },
                  ticks: {
                    color: '#fff',
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 5,
                },
              },
            }}
          />
        )}
      </div>

      <div className="graph">
        <h3 className="graph-title">Time vs. Transport Mode</h3>
        {distanceChartData && (
          <Line
            data={distanceChartData}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Time Taken by Transport Mode',
                  color: '#fff',
                },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => {
                      return `${tooltipItem.raw.toFixed(2)} Hour`;
                    },
                  },
                  backgroundColor: '#333',
                  titleColor: '#fff',
                  bodyColor: '#fff',
                },
              },
              scales: {
                x: {
                  grid: {
                    color: '#444',
                  },
                  ticks: {
                    color: '#fff',
                  },
                },
                y: {
                  grid: {
                    color: '#444',
                  },
                  ticks: {
                    color: '#fff',
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 5,
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

GraphContainer.propTypes = {
  sourceCoords: PropTypes.array.isRequired,
  destinationCoords: PropTypes.array.isRequired,
  mode: PropTypes.string.isRequired,
};

export default GraphContainer;
