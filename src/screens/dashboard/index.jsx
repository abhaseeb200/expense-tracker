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
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale, elements } from "chart.js";
// import { getTransaction as firebaseGetTransaction } from "../../config/service/firebase/transaction";
// import { getBudget as firebaseGetBudget } from "../../config/service/firebase/budget";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { getTransaction } from "../../feature/transaction/transactionSlice";
// import { getBudget } from "../../feature/budget/budgetSlice";

Chart.register(CategoryScale);

const Dashboard = () => {
  const [expenseAmountData, setExpenseAmountData] = useState([]);
  const [incomeAmountData, setIncomeAmountData] = useState([]);
  const [budgetAmountData, setBudgetAmountData] = useState([]);
  const [labelData, setLabelData] = useState([]);
  const [labelDataHorizontal, setLabelDataHorizontal] = useState([]);
  const [tablerLoader, setTableLoader] = useState(false);

  const dispatch = useDispatch();
  const { transactionData } = useSelector((state) => state.transaction);
  const { budgetData } = useSelector((state) => state.budget);
  const { isDarkMode } = useSelector((state) => state?.themeMode);

  const [currentUserID] = useOutletContext();

  const verticalChartHandler = (tempExpenseAmount, tempIncomeAmount) => {
    //comparing two objects of income and expenses, to add 0 if does't have month amount
    for (let key in tempExpenseAmount) {
      if (
        tempExpenseAmount.hasOwnProperty(key) !==
        tempIncomeAmount.hasOwnProperty(key)
      ) {
        tempIncomeAmount[key] = 0;
      }
    }
    for (let key in tempIncomeAmount) {
      if (
        tempIncomeAmount.hasOwnProperty(key) !==
        tempExpenseAmount.hasOwnProperty(key)
      ) {
        tempExpenseAmount[key] = 0;
      }
    }

    //convert objects to array
    let tempExpenseData = Object.values(tempExpenseAmount);
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
    //comparing two objects of income and expenses, to add 0 if does't have month amount
    for (let key in tempExpenseAmount) {
      if (
        tempExpenseAmount.hasOwnProperty(key) !==
        tempBudgetAmount.hasOwnProperty(key)
      ) {
        tempBudgetAmount[key] = 0;
      }
    }
    for (let key in tempBudgetAmount) {
      if (
        tempBudgetAmount.hasOwnProperty(key) !==
        tempExpenseAmount.hasOwnProperty(key)
      ) {
        tempExpenseAmount[key] = 0;
      }
    }

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
    scales: {
      x: {
        ticks: {
          color: isDarkMode ? "#afb4b9" : "#697a8d",
        },
      },
      y: {
        ticks: {
          color: isDarkMode ? "#afb4b9" : "#697a8d",
        },
      },
    },
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: true,
        labels: {
          color: isDarkMode ? "#afb4b9" : "#697a8d",
        },
      },
      responsive: true,
    },
  };

  //horizontal line Chart
  const dataHorizontal = {
    labels: labelDataHorizontal,
    datasets: [
      {
        label: "Budget",
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
    scales: {
      x: {
        ticks: {
          color: isDarkMode ? "#afb4b9" : "#697a8d",
        },
      },
      y: {
        ticks: {
          color: isDarkMode ? "#afb4b9" : "#697a8d",
        },
      },
    },
    responsive: true,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        position: "top",
        labels: {
          color: isDarkMode ? "#afb4b9" : "#697a8d",
        },
      },
    },
  };

  const fetchData = () => {
    let tempExpenseAmount = {};
    let tempIncomeAmount = {};
    let tempBudgetAmount = {};
    if (!transactionData?.length) {
      setTableLoader(true);
      firebaseGetTransaction(currentUserID)
        .then((res) => {
          let tempTransactionData = [];
          res.forEach((element) => {
            tempTransactionData.push({
              docID: element.id,
              docData: element.data(),
            });
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
          dispatch(getTransaction(tempTransactionData));
          verticalChartHandler(tempExpenseAmount, tempIncomeAmount);
          setTableLoader(false);
        })
        .catch((err) => {
          toast.error(err?.message, {
            autoClose: 1500,
          });
          setTableLoader(false);
        });
    } else {
      transactionData.forEach((element) => {
        let month = new Date(element?.docData.date).getMonth();
        if (element?.docData?.type === "expense") {
          if (!tempExpenseAmount[month]) {
            tempExpenseAmount[month] = parseInt(element?.docData?.amount);
          } else {
            tempExpenseAmount[month] += parseInt(element?.docData?.amount);
          }
        } else {
          if (!tempIncomeAmount[month]) {
            tempIncomeAmount[month] = parseInt(element?.docData?.amount);
          } else {
            tempIncomeAmount[month] += parseInt(element?.docData?.amount);
          }
        }
      });
      verticalChartHandler(tempExpenseAmount, tempIncomeAmount);
    }

    if (!budgetData?.length) {
      firebaseGetBudget(currentUserID)
        .then((res) => {
          let tempBudgetData = [];
          res.forEach((element) => {
            tempBudgetData.push({
              docID: element.id,
              docData: element.data(),
            });
            let month = new Date(element.data().date).getMonth();
            if (!tempBudgetAmount[month]) {
              tempBudgetAmount[month] = parseInt(element.data().amount);
            } else {
              tempBudgetAmount[month] += parseInt(element.data().amount);
            }
          });
          dispatch(getBudget(tempBudgetData));
          horizontalChartHandler(tempBudgetAmount, tempExpenseAmount);
          setTableLoader(false);
        })
        .catch((err) => {
          toast.error(err?.message, {
            autoClose: 1500,
          });
          setTableLoader(false);
        });
    } else {
      budgetData.forEach((element) => {
        let month = new Date(element?.docData.date).getMonth();
        if (!tempBudgetAmount[month]) {
          tempBudgetAmount[month] = parseInt(element?.docData.amount);
        } else {
          tempBudgetAmount[month] += parseInt(element?.docData.amount);
        }
      });
      horizontalChartHandler(tempBudgetAmount, tempExpenseAmount);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentUserID]);

  return (
    <>
      <Card className="mt-4">
        <CardBody className="pb-0">
          <CardTitle>Transaction Comparison Between Months</CardTitle>
        </CardBody>
        <CardBody className="pt-0">
          {tablerLoader ? (
            <div className="no-data">
              <Spinner />
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
              <Spinner />
            </div>
          ) : expenseAmountData.length || budgetAmountData.length ? (
            <Bar data={dataHorizontal} options={optionsHorizontal} />
          ) : (
            <CardText className="no-data">No Data found</CardText>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default Dashboard;
