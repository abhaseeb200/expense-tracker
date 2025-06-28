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

const LineChart = ({ chartData }) => {
  const labels = chartData?.map((item) =>
    new Date(item.date * 1000).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    })
  );

  const amounts = chartData?.map((item) => item.amount);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Expense",
        data: amounts,
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
        border: { dash: [10, 4], color: "#000" },
        grid: {
          drawTicks: true,
          drawOnChartArea: true,
          color: "#ddd",
          tickColor: "#000",
        },
      },
    },
  };

  return (
    <div>
      {Object.keys(chartData).length ? (
        <Line data={data} options={options} height={"173"} />
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default LineChart;
