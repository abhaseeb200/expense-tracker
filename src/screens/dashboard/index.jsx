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

Chart.register(CategoryScale);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { transactionData } = useSelector((state) => state.transaction);
  const { budgetData } = useSelector((state) => state.budget);
  const { isDarkMode } = useSelector((state) => state?.themeMode);

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
      <div className="d-flex gap-3 flex-lg-nowrap flex-wrap mt-3">
        <Card className="w-25 w-lg-50">
          <CardBody className="pb-0">
            <CardTitle>Total Expense</CardTitle>
          </CardBody>
          <CardBody className="pt-0">
            <CardText className="no-data">No Data found</CardText>
          </CardBody>
        </Card>

        <Card className="w-25 w-lg-50">
          <CardBody className="pb-0">
            <CardTitle>Total Income</CardTitle>
          </CardBody>
          <CardBody className="pt-0">
            <CardText className="no-data">No Data found</CardText>
          </CardBody>
        </Card>

        <Card className="w-25 w-lg-50">
          <CardBody className="pb-0">
            <CardTitle>Total Saving</CardTitle>
          </CardBody>
          <CardBody className="pt-0">
            <CardText className="no-data">No Data found</CardText>
          </CardBody>
        </Card>

        <Card className="w-25 w-lg-50">
          <CardBody className="pb-0">
            <CardTitle>Mostly Expense</CardTitle>
          </CardBody>
          <CardBody className="pt-0">
            <CardText className="no-data">No Data found</CardText>
          </CardBody>
        </Card>
      </div>

      <div className="d-flex gap-3 my-3">
        <Card className="w-63">
          <CardBody className="pb-0">
            <CardTitle>Bar Chart</CardTitle>
          </CardBody>
          <CardBody className="pt-0">
            <CardText className="no-data">No Data found</CardText>
          </CardBody>
        </Card>

        <Card className="w-37">
          <CardBody className="pb-0">
            <CardTitle>Latest expenses</CardTitle>
          </CardBody>
          <CardBody className="pt-0">
            <CardText className="no-data">No Data found</CardText>
          </CardBody>
        </Card>
      </div>

      <div className="d-flex gap-3 mb-3">
        <Card className="w-37">
          <CardBody className="pb-0">
            <CardTitle>Pie chart</CardTitle>
          </CardBody>
          <CardBody className="pt-0">
            <CardText className="no-data">No Data found</CardText>
          </CardBody>
        </Card>

        <Card className="w-63">
          <CardBody className="pb-0">
            <CardTitle>Line Chart of latest expenses</CardTitle>
          </CardBody>
          <CardBody className="pt-0">
            <CardText className="no-data">No Data found</CardText>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
