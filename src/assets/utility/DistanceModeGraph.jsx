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

const DistanceModeGraph = ({ sourceCoords, destinationCoords, mode }) => {
  const [chartData, setChartData] = useState(null);

  // Default velocities for each driving mode (km/h)
  const velocityRates = {
    car: 60,
    walking: 5,
    cycling: 15,
    transit: 30,
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

  // Update the graph whenever the coordinates or mode changes
  useEffect(() => {
    if (sourceCoords && destinationCoords) {
      const distance = haversineDistance(sourceCoords, destinationCoords); // Distance in kilometers

      // Prepare data for Time vs Mode chart
      const labels = ['Car', 'Walking', 'Cycling', 'Transit'];
      const timeDataForModes = labels.map((modeType) => {
        return calculateTime(modeType.toLowerCase(), distance); // Calculate time  for each mode
      });

      setChartData({
        labels,
        datasets: [
          {
            label: 'Time (minutes)',
            data: timeDataForModes,
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
    <div
      style={{
        backgroundColor: '#121212',
        padding: '20px',
        borderRadius: '8px',
        width: '100%',
      }}
    >
      <h3 style={{ color: '#fff', textAlign: 'center' }}>
        Time vs. Transport Mode
      </h3>
      {chartData && (
        <Line
          data={chartData}
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
                    return `${tooltipItem.raw.toFixed(2)} Hr`;
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
                tension: 0.4, // makes the line a bit smoother
              },
              point: {
                radius: 5,
              },
            },
          }}
        />
      )}
    </div>
  );
};

DistanceModeGraph.propTypes = {
  sourceCoords: PropTypes.array.isRequired,
  destinationCoords: PropTypes.array.isRequired,
  mode: PropTypes.string.isRequired,
};

export default DistanceModeGraph;
