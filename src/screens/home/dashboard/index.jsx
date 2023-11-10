import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Container,
  Spinner,
} from "reactstrap";
import "../style.css";
import SideNavbar from "../../../components/sideNavbar";
import CustNavbar from "../../../components/navbar";
import { useEffect, useState } from "react";
import TransactionCategoryModal from "../modal";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale, elements } from "chart.js";
import { getTransaction } from "../../../config/service/firebase/transaction";
import { getBudget } from "../../../config/service/firebase/budget";

Chart.register(CategoryScale);

const Dashboard = () => {
  const [sideBarToggle, setSideBarToggle] = useState(false);
  const [modal, setModal] = useState(false);
  const [expenseAmountData, setExpenseAmountData] = useState([]);
  const [incomeAmountData, setIncomeAmountData] = useState([]);
  const [budgetAmountData, setBudgetAmountData] = useState([]);
  const [labelData, setLabelData] = useState([]);
  const [labelDataHorizontal, setLabelDataHorizontal] = useState([]);
  const [tablerLoader, setTableLoader] = useState(true);

  useEffect(() => {
    let tempExpenseAmount = {};
    let tempIncomeAmount = {};
    let tempBudgetAmount = {};
    getTransaction()
      .then((res) => {
        res.forEach((element) => {
          let month = new Date(element.data().date).getMonth();
          // filter out amount with their months in object
          if (element.data().type === "expense") {
            if (!tempExpenseAmount[month]) {
              tempExpenseAmount[month] = parseInt(element.data().amount);
            } else {
              tempExpenseAmount[month] += parseInt(element.data().amount);
            }
          } else {
            if (!tempIncomeAmount[month]) {
              tempIncomeAmount[month] = parseInt(element.data().amount);
            } else {
              tempIncomeAmount[month] += parseInt(element.data().amount);
            }
          }
        });
        verticalChartHandler(tempExpenseAmount, tempIncomeAmount);
        setTableLoader(false)
      })
      .catch((err) => {
        console.log(err);
        setTableLoader(false)
      });

    getBudget()
      .then((res) => {
        res.forEach((element) => {
          let month = new Date(element.data().date).getMonth();
          if (!tempBudgetAmount[month]) {
            tempBudgetAmount[month] = parseInt(element.data().amount);
          } else {
            tempBudgetAmount[month] += parseInt(element.data().amount);
          }
        });
        horizontalChartHandler(tempBudgetAmount, tempExpenseAmount);
        setTableLoader(false)
      })
      .catch((err) => {
        console.log(err);
        setTableLoader(false)
      });
  }, []);

  const verticalChartHandler = (tempExpenseAmount, tempIncomeAmount) => {
    //convert objects to array
    let tempExpenseData = Object.values(tempExpenseAmount);
    console.log(tempExpenseData, tempExpenseAmount);
    setExpenseAmountData(tempExpenseData);

    let tempIncomeData = Object.values(tempIncomeAmount);
    setIncomeAmountData(tempIncomeData);

    //convert object keys to array
    let combineKeys = [
      ...Object.keys(tempExpenseAmount),
      ...Object.keys(tempIncomeAmount),
    ];
    let labelData = [...new Set(combineKeys)];

    //change months number to their name
    let tempMonth = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let labelMonthsName = labelData.map((i) => tempMonth[i]);
    setLabelData(labelMonthsName);
  };

  const horizontalChartHandler = (tempBudgetAmount, tempExpenseAmount) => {
    console.log(tempBudgetAmount, "====");
    let tempBudgetData = Object.values(tempBudgetAmount);
    setBudgetAmountData(tempBudgetData);
    //convert object keys to array
    let combineKeys = [
      ...Object.keys(tempExpenseAmount),
      ...Object.keys(tempBudgetAmount),
    ];
    let labelData = [...new Set(combineKeys)];
    setLabelDataHorizontal(labelData);

    //change months number to their name
    let tempMonth = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let labelMonthsName = labelData.map((i) => tempMonth[i]);
    setLabelDataHorizontal(labelMonthsName);
  };

  const toggle = () => setModal(!modal);

  //vertical line Chart
  const dataVertical = {
    labels: labelData,
    datasets: [
      {
        label: "Income",
        borderWidth: 1,
        data: incomeAmountData,
      },
      {
        label: "Expense",
        borderWidth: 1,
        data: expenseAmountData,
      },
    ],
  };
  const optionsVertical = {
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: true,
      },
      responsive: true,
    },
  };

  //horizontal line Chart
  const dataHorizontal = {
    labels: labelDataHorizontal,
    datasets: [
      {
        label: "Income",
        borderWidth: 1,
        data: budgetAmountData,
      },
      {
        label: "Expense",
        borderWidth: 1,
        data: expenseAmountData,
      },
    ],
  };
  const optionsHorizontal = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="container-lg">
      <SideNavbar
        sideBarToggle={sideBarToggle}
        setSideBarToggle={setSideBarToggle}
        toggle={toggle}
      />
      <div className="layout-page">
        <CustNavbar setSideBarToggle={setSideBarToggle} />
        <Card className="mt-4">
          <CardBody className="pb-0">
            <CardTitle>Transaction Comparison Between Months</CardTitle>
          </CardBody>
          <CardBody className="pt-0">
            {tablerLoader ? (
              <div className="no-data">
                <Spinner></Spinner>
              </div>
            ) : expenseAmountData.length || incomeAmountData.length ? (
              <Bar data={dataVertical} options={optionsVertical} />
            ) : (
              <CardText className="no-data">No Data found</CardText>
            )}
          </CardBody>
        </Card>
        <Card className="mt-4">
          <CardBody className="pb-0">
            <CardTitle>Budget & Expense Comparison Between Months</CardTitle>
          </CardBody>
          <CardBody className="pt-0">
            {tablerLoader ? (
              <div className="no-data">
                <Spinner></Spinner>
              </div>
            ) : expenseAmountData.length || budgetAmountData.length ? (
              <Bar data={dataHorizontal} options={optionsHorizontal} />
            ) : (
              <CardText className="no-data">No Data found</CardText>
            )}
          </CardBody>
        </Card>
      </div>
      <TransactionCategoryModal modal={modal} toggle={toggle} />
    </div>
  );
};

export default Dashboard;
