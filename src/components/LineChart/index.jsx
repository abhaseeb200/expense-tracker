import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const data = {
    labels: ["12 Jul", "14 Jul", "15 Jul", "18 Jul", "20 Jul", "22 Aug"],
    datasets: [
      {
        label: "Sales",
        data: [3100, 1400, 2100, 1500, 2700, 3600],
        fill: false,
        backgroundColor: "rgba(105, 108, 255, 0.2)",
        borderColor: "rgba(105, 108, 255, 1)",
        tension: 0.1,
        pointRadius: 5,
        fill: true,
      },
    ],
  };

  const options = {
    interaction: {
      intersect: false,
    },
    maintainAspectRation: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        align: "start",
        display: true,
        grid: {
          display: false,
        },
      },
      y: {
        display: true,
        beginAtZero: true,
        ticks: {
          stepSize: 1000,
          callback: function (value) {
            return value >= 1000 ? value / 1000 + "k" : value;
          },
        },
        border: { dash: [10, 4], color:"#000" },
        grid: {
          drawTicks: true,
          drawOnChartArea: true,
          color: "#ddd",
          tickColor: '#000',
        },
      },
    },
  };

  return <Line data={data} options={options} height={"173"} />;
};

export default LineChart;
