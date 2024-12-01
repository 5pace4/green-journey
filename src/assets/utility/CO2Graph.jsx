import { useEffect, useState } from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const CO2Graph = ({ sourceCoords, destinationCoords, mode }) => {
  const [chartData, setChartData] = useState(null);

  // Default CO2 emission rates for each driving mode (kg/km)
  const emissionRates = {
    car: 0.18,
    walking: 0, // walking doesn't contribute to CO2 emissions
    cycling: 0, // cycling doesn't contribute to CO2 emissions
    transit: 0.09,
  };

  // Calculate the CO2 emissions for the selected driving mode
  const calculateCO2Emissions = (mode, distance) => {
    const rate = emissionRates[mode];
    const emissionsInKg = distance * rate;
    return emissionsInKg;
  };

  useEffect(() => {
    if (sourceCoords && destinationCoords) {
      // Calculate distance between source and destination (using haversine formula)
      const haversineDistance = (coords1, coords2) => {
        const R = 6371; // Earth's radius in kilometers
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

      const distance = haversineDistance(sourceCoords, destinationCoords); // Distance in kilometers

      // Prepare chart data
      const labels = ['Car', 'Walking', 'Cycling', 'Transit'];
      const data = labels.map((modeType) => {
        return calculateCO2Emissions(modeType.toLowerCase(), distance); // Get CO2 for each mode
      });

      // Ensure there's a visible value, even if CO2 emissions are 0
      setChartData({
        labels,
        datasets: [
          {
            label: 'CO2 Emissions (kg)',
            data,
            fill: false,
            borderColor: '#00FF00',
            tension: 0.1,
            pointBackgroundColor: '#00FF00',
            borderWidth: 3,
            pointRadius: 5,
          },
        ],
      });
    }
  }, [sourceCoords, destinationCoords, mode]); // Recalculate when the source, destination, or mode changes

  return (
    <div
      style={{
        backgroundColor: '#121212',
        padding: '20px',
        borderRadius: '8px',
        width: '100%',
      }}
    >
      <h3 style={{ color: '#fff' }}>CO2 Emissions vs. Transport Mode</h3>
      {chartData && (
        <Line
          data={chartData}
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
                    return `${tooltipItem.raw.toFixed(2)} kg`; // Show in grams in tooltip
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

CO2Graph.propTypes = {
  sourceCoords: PropTypes.array.isRequired,
  destinationCoords: PropTypes.array.isRequired,
  mode: PropTypes.string.isRequired, // Add mode as a prop
};

export default CO2Graph;
