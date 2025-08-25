import React, { useEffect, useState } from "react";
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
import { Spinner } from "reactstrap";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ chartData, loading }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!chartData || typeof chartData !== "object") {
      console.error("Invalid chartData provided");
      return;
    }

    const labels = Object.keys(chartData);

    const incomeData = Object.values(chartData).map((item) => item?.i || 0);
    const expenseData = Object.values(chartData).map((item) => item?.e || 0);
    const savingData = Object.values(chartData).map((item) => item?.s || 0);
    const budgetData = Object.values(chartData).map((item) => item?.b);

    setData({
      labels,
      datasets: [
        {
          label: "Income",
          data: incomeData,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderRadius: 2,
        },
        {
          label: "Expense",
          data: expenseData,
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderRadius: 2,
        },
        {
          label: "Savings",
          data: savingData,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderRadius: 2,
        },
        {
          label: "Budget Goal",
          data: budgetData,
          backgroundColor: "rgba(229, 255, 0, 0.6)",
          borderRadius: 2,
        },
      ],
    });
  }, [chartData]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value.toLocaleString();
          },
        },
      },
    },
  };

  return (
    <div>
      {loading ? (
        <div
          style={{ height: "367px" }}
          className="d-flex justify-content-center align-items-center"
        >
          <Spinner />
        </div>
      ) : data?.labels?.length ? (
        <Bar data={data} options={options} height={192} />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default BarChart;
