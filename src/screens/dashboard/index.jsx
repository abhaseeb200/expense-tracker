import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Spinner,
} from "reactstrap";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import "../style.css";
import {
  DollarIcon,
  SaveMoneyIcon,
  TransferIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "../../components/Icons";
import LineChart from "../../components/LineChart";
import DonutChart from "../../components/DonutChart";
import BarChart from "../../components/BarChart";

Chart.register(CategoryScale);

const recentExpense = [
  {
    name: "Fridge",
    price: 500,
    date: "2 July, 2024",
  },
  {
    name: "Fridge",
    price: 500,
    date: "2 July, 2024",
  },
  {
    name: "Fridge",
    price: 500,
    date: "2 July, 2024",
  },
  {
    name: "Fridge",
    price: 500,
    date: "2 July, 2024",
  },
  {
    name: "Fridge",
    price: 500,
    date: "2 July, 2024",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const { transactionData } = useSelector((state) => state.transaction);
  const { budgetData } = useSelector((state) => state.budget);
  const { isDarkMode } = useSelector((state) => state?.themeMode);
  const { userData, isLogin } = useSelector((state) => state?.auth);

  //vertical line Chart
  // const dataVertical = {
  //   labels: labelData,
  //   datasets: [
  //     {
  //       label: "Income",
  //       borderWidth: 1,
  //       data: incomeAmountData,
  //     },
  //     {
  //       label: "Expense",
  //       borderWidth: 1,
  //       data: expenseAmountData,
  //     },
  //   ],
  // };
  // const optionsVertical = {
  //   scales: {
  //     x: {
  //       ticks: {
  //         color: isDarkMode ? "#afb4b9" : "#697a8d",
  //       },
  //     },
  //     y: {
  //       ticks: {
  //         color: isDarkMode ? "#afb4b9" : "#697a8d",
  //       },
  //     },
  //   },
  //   plugins: {
  //     title: {
  //       display: false,
  //     },
  //     legend: {
  //       display: true,
  //       labels: {
  //         color: isDarkMode ? "#afb4b9" : "#697a8d",
  //       },
  //     },
  //     responsive: true,
  //   },
  // };

  return (
    <>
      <div className="d-flex justify-content-evenly gap-3 flex-lg-nowrap flex-wrap mt-3">
        <Card className="w-25 w-lg-50">
          <CardBody>
            <DollarIcon className="icon-with-bg" fill="#696cff" />
            <small className="text-uppercase ">Total Income</small>
            <h4 className="fw-semibold mt-1">Rs 45,000</h4>
            <small className="d-flex align-items-center">
              <TrendingUpIcon
                width="22"
                height="22"
                fill="#696cff"
                className="me-2"
              />
              <span className="text-primary fw-medium me-1">6%</span> vs last 07
              days
            </small>
          </CardBody>
        </Card>

        <Card className="w-25 w-lg-50">
          <CardBody>
            <TransferIcon className="icon-with-bg" fill="#696cff" />
            <small className="text-uppercase">Total Expense</small>
            <h4 className="fw-semibold">Rs 45,000</h4>
            <small className="d-flex align-items-center">
              <TrendingDownIcon
                width="22"
                height="22"
                fill="#dc3545"
                className="me-2"
              />
              <span className="text-danger fw-medium me-1">6%</span> vs last 07
              days
            </small>
          </CardBody>
        </Card>

        <Card className="w-25 w-lg-50">
          <CardBody>
            <SaveMoneyIcon className="icon-with-bg" fill="#696cff" />
            <small className="text-uppercase ">Total Saving</small>
            <h4 className="fw-semibold">Rs 45,000</h4>
            <small className="d-flex align-items-center">
              <TrendingDownIcon
                width="22"
                height="22"
                fill="#dc3545"
                className="me-2"
              />
              <span className="text-danger fw-medium me-1">6%</span> vs last 07
              days
            </small>
          </CardBody>
        </Card>

        <Card className="w-25 w-lg-50">
          <CardBody>
            <WalletIcon className="icon-with-bg" fill="#696cff" />
            <small className="text-uppercase ">Mostly Spending</small>
            <h4 className="fw-semibold">House Hold</h4>
            <small className="d-flex align-items-center">
              <TrendingUpIcon
                width="22"
                height="22"
                fill="#696cff"
                className="me-2"
              />
              <span className="text-primary fw-medium me-1">6%</span> vs last 07
              days
            </small>
          </CardBody>
        </Card>
      </div>

      <div className="d-flex gap-3 flex-lg-nowrap flex-wrap my-3">
        <Card className="w-76">
          <CardBody className="">
            <CardTitle className="text-uppercase mb-3">
              Monthly Overview
            </CardTitle>
            <BarChart />
          </CardBody>
        </Card>

        <Card className="w-24">
          <CardBody>
            <CardTitle className="text-uppercase mb-3">
              Recent Expenses
            </CardTitle>

            <div className="d-flex flex-column gap-2">
              {recentExpense.map((expense) => (
                <div className="recent-expenses">
                  <div className="d-flex justify-content-between">
                    <h6 className="m-0">{expense?.name}</h6>
                    <h6 className="m-0">{expense?.price}</h6>
                  </div>
                  <span>{expense?.date}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="d-flex gap-3 flex-md-nowrap flex-wrap mb-3">
        <Card className="w-37">
          <CardBody className="">
            <CardTitle className="text-uppercase mb-4">
              Report Overview
            </CardTitle>
            <div className="d-flex">
              <DonutChart />
            </div>
          </CardBody>
        </Card>

        <Card className="w-63">
          <CardBody className="">
            <CardTitle className="mb-4 text-uppercase">
              Expenses Activity
            </CardTitle>
            <LineChart />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
