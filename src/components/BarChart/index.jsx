import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Income",
        data: [3000, 4000, 3500, 5000, 4500],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderRadius: 2,
      },
      {
        label: "Expense",
        data: [2000, 2500, 2200, 3000, 2800],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderRadius: 2,
      },
      {
        label: "Saving",
        data: [1000, 1500, 1300, 2000, 1700],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderRadius: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
      },

      y: {
        ticks: {
          stepSize: 1000,
        },
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
