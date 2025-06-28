import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Spinner } from "reactstrap";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ income, expense, saving, loading }) => {
  const data = {
    labels: ["Income", "Expense", "Saving"],
    datasets: [
      {
        data: [income, expense, saving],
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
      tooltip: {
        enabled: true,
      },
    },
    cutout: "65%",
  };

  return (
    <div className="w-100 mx-auto my-0">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center h-100">
          <Spinner />
        </div>
      ) : expense && income ? (
        <Doughnut data={data} options={options} />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default DonutChart;
