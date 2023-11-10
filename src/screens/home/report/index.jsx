import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Container,
  Label,
  Spinner,
  Table,
} from "reactstrap";
import SideNavbar from "../../../components/sideNavbar";
import CustNavbar from "../../../components/navbar";
import { useEffect, useState } from "react";
import CustomInput from "../../../components/input";
import TransactionCategoryModal from "../modal";
import { getTransaction } from "../../../config/service/firebase/transaction";
import "./style.css";

const Report = () => {
  const [sideBarToggle, setSideBarToggle] = useState(false);
  const [modal, setModal] = useState(false);
  const [transactionData, setTransactionData] = useState({});
  const [transactionDataBackUp, setTransactionDataBackUp] = useState({});
  const [expenseaAmount, setExpenseaAmount] = useState(0);
  const [incomeAmount, setIncomeAmount] = useState(0);
  const [tableLoader, setTableLoader] = useState(true);

  const [startDate, setStartDate] = useState({
    value: "",
    isError: false,
    messageError: "",
  });
  const [endDate, setEndDate] = useState({
    value: "",
    isError: false,
    messageError: "",
  });

  useEffect(() => {
    getTransactionDataHandler();
  }, []);

  const startDateHandler = (e) => {
    if (e.target.value === "") {
      setStartDate({
        value: e.target.value,
        isError: true,
        messageError: "Please select date",
      });
    } else {
      setStartDate({
        value: e.target.value,
        isError: false,
        messageError: "",
      });
    }
  };

  const endDateHandler = (e) => {
    if (e.target.value === "") {
      setEndDate({
        value: e.target.value,
        isError: true,
        messageError: "Please select date",
      });
    } else {
      setEndDate({
        value: e.target.value,
        isError: false,
        messageError: "",
      });
    }
  };

  const toggle = () => setModal(!modal);

  const getTransactionDataHandler = () => {
    let tempReportData = {};
    let tempExpenseAmount = 0;
    let tempIncomeAmount = 0;
    getTransaction().then((res) => {
      totalAmountHanlder();
      setTableLoader(false)
      res.forEach((element) => {
        if (!tempReportData[element.data().category]) {
          tempReportData[element.data().category] = [];
        }
        tempReportData[element.data().category].push(element.data());

        if (element.data().type === "expense") {
          tempExpenseAmount += parseInt(element.data().amount);
        } else {
          tempIncomeAmount += parseInt(element.data().amount);
        }
      });
      setTransactionData(tempReportData);
      setTransactionDataBackUp(tempReportData);
      setExpenseaAmount(tempExpenseAmount);
      setIncomeAmount(tempIncomeAmount);
    });
  };

  const filterData = () => {
    console.log(startDate.value, endDate.value);
    if (new Date(startDate.value) <= new Date(endDate.value)) {
      let filteredData = {};
      for (let category in transactionDataBackUp) {
        let categoryData = transactionDataBackUp[category].filter((item) => {
          let itemDate = new Date(item.date);
          return (
            itemDate >= new Date(startDate.value) &&
            itemDate <= new Date(endDate.value)
          );
        });

        if (categoryData.length > 0) {
          filteredData[category] = categoryData;
        }
      }
      setTransactionData(filteredData);
      totalAmountHanlder(filteredData);
    } else {
      setStartDate({
        value: startDate.value,
        isError: true,
        messageError: "Invalid Data",
      });
      setEndDate({
        value: endDate.value,
        isError: true,
        messageError: "",
      });
    }
  };

  const clearFilterHanlder = () => {
    setTransactionData(transactionDataBackUp);
    totalAmountHanlder(transactionDataBackUp);
  };

  const todayDateAttributeHanlder = () => {
    let d = new Date();
    return (
      d.getFullYear() + "-" + parseInt(d.getMonth() + 1) + "-" + d.getDate()
    );
  };

  const totalAmountHanlder = (filteredData) => {
    let expenseFilter = {};
    let incomeFilter = {};
    let tempTotalExpenseAmount = 0;
    let tempTotalIncomeAmount = 0;
    for (let category in filteredData) {
      expenseFilter[category] = filteredData[category].filter(
        (item) => item.type === "expense"
      );

      incomeFilter[category] = filteredData[category].filter(
        (item) => item.type === "income"
      );
    }

    for (let category in filteredData) {
      expenseFilter[category].forEach((expense) => {
        tempTotalExpenseAmount += parseInt(expense.amount);
      });

      incomeFilter[category].forEach((income) => {
        tempTotalIncomeAmount += parseInt(income.amount);
      });
    }
    setExpenseaAmount(tempTotalExpenseAmount);
    setIncomeAmount(tempTotalIncomeAmount);
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
        <h5 className="fw-bold py-3 my-3">Report Generate</h5>
        <Card className="">
          <CardBody className="pb-2">
            <CardTitle>Filter By Date</CardTitle>
          </CardBody>
          <CardBody className="pt-3 row align-items-end filter-date">
            <div className="col-md-4">
              <Label>Start date</Label>
              <CustomInput
                type="date"
                max={todayDateAttributeHanlder()}
                onChange={startDateHandler}
                value={startDate.value}
                isError={startDate.isError}
                messageError={startDate.messageError}
              />
            </div>
            <div className="col-md-4">
              <Label>End date</Label>
              <CustomInput
                type="date"
                onChange={endDateHandler}
                value={endDate.value}
                isError={endDate.isError}
                messageError={endDate.messageError}
                max={todayDateAttributeHanlder()}
              />
            </div>
            <div className="col-md-2">
              <Button color="primary" className="w-100" onClick={filterData}>
                Filter
              </Button>
            </div>
            <div className="col-md-2">
              <Button
                color="secondary"
                outline
                className="w-100"
                onClick={clearFilterHanlder}
              >
                Clear
              </Button>
            </div>
            <CardText className="mt-5">
              Transaction Reports Based On Categories
            </CardText>
            <div>
              {tableLoader ? (
                <div className="no-data">
                  <Spinner></Spinner>
                </div>
              ) : Object.keys(transactionData).length ? (
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(transactionData).map((category, ind) => {
                      let categoryItems = transactionData[category];
                      return (
                        <tr key={ind}>
                          <td>{category}</td>
                          <td>
                            {categoryItems.map((item, ind) => (
                              <span className="d-block" key={ind}>
                                {item.name}
                              </span>
                            ))}
                          </td>
                          <td>
                            {categoryItems.map((item, ind) => (
                              <span
                                key={ind}
                                className={
                                  item.type === "expense"
                                    ? "badge bg-danger mb-2 d-block"
                                    : "badge bg-success mb-2 d-block"
                                }
                              >
                                {item.type}
                              </span>
                            ))}
                          </td>
                          <td>
                            {categoryItems.map((item, ind) => (
                              <span key={ind} className="d-block">
                                {item.amount}
                              </span>
                            ))}
                          </td>
                          <td>
                            {categoryItems.map((item, ind) => (
                              <span key={ind} className="d-block">
                                {item.date}
                              </span>
                            ))}
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td className="fw-bold" colSpan="5">
                        <div className="d-flex justify-content-between">
                          <span>Total Expenses</span>
                          <span>{expenseaAmount}</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold" colSpan="5">
                        <div className="d-flex justify-content-between">
                          <span>Total Income</span>
                          <span>{incomeAmount}</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              ) : (
                <CardText className="no-data">
                No Data Found
              </CardText>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
      <TransactionCategoryModal modal={modal} toggle={toggle} />
    </div>
  );
};

export default Report;
