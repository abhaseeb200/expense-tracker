import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ className }) => {
  const data = {
    labels: ["Green", "Black", "Light Green"],
    datasets: [
      {
        data: [25, 10, 65],
        backgroundColor: [
          "#009688", // Dark Green
          "#333333", // Black
          "#4CAF50", // Light Green
        ],
        hoverBackgroundColor: [
          "#00796B", // Darker Green
          "#2C2C2C", // Darker Black
          "#388E3C", // Darker Light Green
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    cutout: "65%",
  };

  return (
    <div className="w-100 mx-auto my-0">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;
