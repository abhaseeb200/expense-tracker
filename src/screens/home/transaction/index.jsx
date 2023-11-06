import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Container,
  Label,
  Navbar,
} from "reactstrap";
import SideNavbar from "../../../components/sideNavbar";
import CustNavbar from "../../../components/navbar";
import { useState } from "react";
import CustomInput from "../../../components/input";
import Select from "../../../components/selectInput/select";

const Transaction = () => {
  const [sideBarToggle, setSideBarToggle] = useState(false);

  const [name, setName] = useState({
    value: "",
    isError: false,
    messageError: "",
  });

  const [date, setDate] = useState({
    value: "",
    isError: false,
    messageError: "",
  });

  const [amount, setAmount] = useState({
    value: "",
    isError: false,
    messageError: "",
  });

  const [category, setCategory] = useState({
    value: "",
    isError: false,
    messageError: "",
  });

  const nameHandler = (e) => {
    let expVal = e.target.value.trim().toLowerCase();
    if (expVal === "") {
      setName({
        value: e.target.value,
        isError: true,
        messageError: "Please provide name",
      });
    } else if (!expVal.match(/^[0-9a-z\s]+$/)) {
      setName({
        value: e.target.value,
        isError: true,
        messageError: "Special Character not allowed",
      });
    } else {
      setName({
        value: e.target.value,
        isError: false,
        messageError: "",
      });
    }
  };

  const dateHandler = (e) => {
    if (e.target.value === "") {
      setDate({
        value: e.target.value,
        isError: true,
        messageError: "Please select date",
      });
    } else {
      setDate({
        value: e.target.value,
        isError: false,
        messageError: "",
      });
    }
  };

  const amountHandler = (e) => {
    if (e.target.value === "") {
      setAmount({
        value: e.target.value,
        isError: true,
        messageError: "Please provide amount",
      });
    } else if (e.target.value <= 0) {
      setAmount({
        value: e.target.value,
        isError: true,
        messageError: "Amount must be greater than 0",
      });
    } else {
      setAmount({
        value: e.target.value,
        isError: false,
        messageError: "",
      });
    }
  };

  const categoryHandler = (e) => {
    if (e.target.selectedIndex === 0) {
      console.log(e.target.value);
      setCategory({
        value: e.target.value,
        isError: true,
        messageError: "Please select type",
      });
    } else {
      setCategory({
        value: e.target.value,
        isError: false,
        messageError: "",
      });
    }
  };

  const addTransacion = () => {
    if (name.value === "") {
      setName({
        value: name.value,
        isError: true,
        messageError: "Please provide name",
      });
    }
    if (date.value === "") {
      setDate({
        value: date.value,
        isError: true,
        messageError: "Please select date",
      });
    }
    if (amount.value === "") {
      setAmount({
        value: amount.value,
        isError: true,
        messageError: "Please provide amount",
      });
    }
    if (category.value === "") {
      console.log(category.selectedIndex, category.value );
      setCategory({
        value: category.value,
        isError: true,
        messageError: "Please select type",
      });
    }

    if (name.value === "" || date.value === "" || amount.value === "" || category.selectedIndex === 0) {
      return
    }

    //check validation
    if (!name.isError && !date.isError && !amount.isError) {
      console.log("passed");
    } else {
      console.log("faild");
    }
  };

  return (
    <div className="container-lg">
      <SideNavbar
        sideBarToggle={sideBarToggle}
        setSideBarToggle={setSideBarToggle}
      />
      <div className="layout-page">
        <CustNavbar setSideBarToggle={setSideBarToggle} />
        <h5 className="fw-bold py-3 my-3">Transaction Entry</h5>
        <Card>
          <CardBody className="pb-3">
            <CardTitle>Add Transaction</CardTitle>
          </CardBody>
          <CardBody className="pt-3 row">
            <div className="col-md-4 mb-3">
              <Label>name</Label>
              <CustomInput
                placeholder="Bills"
                type="text"
                value={name.value}
                isError={name.isError}
                messageError={name.messageError}
                onChange={nameHandler}
              />
            </div>
            <div className="col-md-4 mb-3">
              <Label>Transaction Type</Label>
              <Select>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </Select>
            </div>
            <div className="col-md-4 mb-3">
              <Label>Select Category</Label>
              <Select
                onChange={categoryHandler}
                value={category.value}
                isError={category.isError}
                messageError={category.messageError}
              >
                <option selected value="">
                  Select Category
                </option>
                <option value="rent">Rent</option>
                <option value="home">Home</option>
              </Select>
            </div>
            <div className="col-md-6 mb-3">
              <Label>Select Date</Label>
              <CustomInput
                placeholder=""
                type="date"
                value={date.value}
                isError={date.isError}
                messageError={date.messageError}
                onChange={dateHandler}
              />
            </div>
            <div className="col-md-6 mb-3">
              <Label>Amount</Label>
              <CustomInput
                placeholder="1234"
                type="number"
                value={amount.value}
                isError={amount.isError}
                messageError={amount.messageError}
                onChange={amountHandler}
              />
            </div>
            <div className="col-md-12 w-100">
              <Button color="primary" className="w-100" onClick={addTransacion}>
                Add Transaction
              </Button>
            </div>
          </CardBody>
          {/* <CardBody className="pt-0">
            <CardText className="no-data">No Data found</CardText>
          </CardBody> */}
        </Card>
        <Card className="mt-4">
          <CardBody className="pb-0">
            <CardTitle>Transaction Data</CardTitle>
          </CardBody>
          <CardBody className="pt-0">
            <CardText className="no-data">No Data found</CardText>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Transaction;
