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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ chartData }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!chartData || typeof chartData !== "object") {
      console.error("Invalid chartData provided");
      return;
    }

    const labels = Object.keys(chartData).map((monthYear) => {
      const [month, year] = monthYear.split("-");
      return `${month} ${year}`;
    });

    const incomeData = Object.values(chartData).map((item) => item?.i || 0);
    const expenseData = Object.values(chartData).map((item) => item?.e || 0);
    const savingData = incomeData.map((income, index) => {
      Math.max(expenseData[index] || 0 - income, 0);
    });

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
            return `${context.dataset.label}: ₹${context.raw.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return "₹" + value.toLocaleString();
          },
        },
      },
    },
  };

  console.log(data);
console.log({chartData});

  return (
    <div style={{ width: "100%", height: "400px" }}>
      {data ? (
        <Bar data={data} options={options} height={400} />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default BarChart;
