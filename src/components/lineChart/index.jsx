// LineChart.js
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
        data: [300, 400, 200, 500, 700, 600],
        fill: false,
        backgroundColor: "rgba(105, 108, 255, 0.2)",
        borderColor: "rgba(105, 108, 255, 1)",
        tension: 0.1,
        pointRadius: 5,
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
      },
      y: {
        display: true,
        beginAtZero: true,
        ticks: {
          stepSize: 200,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
