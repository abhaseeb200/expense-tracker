import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Label,
  Navbar,
  Spinner,
  Table,
} from "reactstrap";
import SideNavbar from "../../../components/sideNavbar";
import CustNavbar from "../../../components/navbar";
import { useEffect, useState } from "react";
import CustomInput from "../../../components/input";
import Select from "../../../components/selectInput/select";
import TransactionCategoryModal from "../modal";
import "boxicons";
import {
  getTransaction,
  getTransactionCategory,
  setTransaction,
} from "../../../config/service/firebase/transaction";

const Transaction = ({ direction, ...args }) => {
  const [sideBarToggle, setSideBarToggle] = useState(false);
  const [modal, setModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
  const [transactionCategoryData, settransactionCategoryData] = useState([]);
  const [loader,setLoader] = useState(false)
  const [tableLoader,setTableLoader] = useState(true)

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

  const [transactionSelect, setTransactionSelect] = useState("expense");

  const [category, setCategory] = useState({
    value: "",
    isError: false,
    messageError: "",
  });

  useEffect(() => {
    getTransaction().then((res) => {
      res.forEach((element) => {
        transactionData.push(element.data())
      });
      setTransactionData([...transactionData]);
      setTableLoader(false)
    });

    getTransactionCategory().then((res)=>{
      res.forEach((element)=>{
        console.log(element.data());
        transactionCategoryData.push(element.data())
      })
      settransactionCategoryData([...transactionCategoryData])
    })
  }, []);

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const toggle = () => setModal(!modal);

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
    setCategory(e.target.value);
    if (e.target.selectedIndex === 0) {
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

  const selectTransactionHandler = (e) => {
    setTransactionSelect(e.target.value);
    setCategory({
      value: "",
      isError: false,
      messageError: "",
    });
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
      setCategory({
        value: category.value,
        isError: true,
        messageError: "Please select type",
      });
    }

    if (
      name.value === "" ||
      date.value === "" ||
      amount.value === "" ||
      category.selectedIndex === 0
    ) {
      return;
    }

    //check validation
    if (!name.isError && !date.isError && !amount.isError) {
      setLoader(true)
      console.log("passed");
      setTransaction(
        name.value,
        category.value,
        date.value,
        amount.value,
        transactionSelect
      )
        .then((res) => {
          console.log(res);
          setLoader(false)
          getTransaction()
        })
        .catch((err) => {
          setLoader(false)
          console.log(err);
        });
    }
  };

  // let tempTransactionCategory = [
  //   {
  //     type: "expense",
  //     name: "bills",
  //   },
  //   {
  //     type: "expense",
  //     name: "retails",
  //   },
  //   {
  //     type: "income",
  //     name: "sallary",
  //   },
  //   {
  //     type: "income",
  //     name: "freelancer",
  //   },
  // ];

  let expenseCategoryData = transactionCategoryData.filter(
    (i) => i.type === "expense"
  );
  console.log(transactionCategoryData);
  let incomeCategoryData = transactionCategoryData.filter(
    (i) => i.type === "income"
  );

  return (
    <div className="container-lg">
      <SideNavbar
        sideBarToggle={sideBarToggle}
        setSideBarToggle={setSideBarToggle}
        toggle={toggle}
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
              <Select
                onChange={selectTransactionHandler}
                value={transactionSelect}
              >
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
                <option value="" hidden>
                  Select Category
                </option>
                {transactionSelect === "income"
                  ? incomeCategoryData.map((item, ind) => {
                      return (
                        <option key={ind} value={item.name}>
                          {item.name}
                        </option>
                      );
                    })
                  : expenseCategoryData.map((item, ind) => {
                      return (
                        <option key={ind} value={item.name}>
                          {item.name}
                        </option>
                      );
                    })}
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
              <Button color="primary" className={loader ? "btn-disabled w-100" : "w-100"} onClick={addTransacion}>
                {loader?<Spinner size="sm"></Spinner>:"Add Transaction"}
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
           {tableLoader? <div className="no-data"> <Spinner></Spinner> </div> :<Table bordered>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {transactionData.map((item, ind) => {
                  return (
                    <tr key={ind}>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.date}</td>
                      <td>{item.amount}</td>
                      <td>{item.type}</td>
                      <td className="text-end">
                        <Dropdown
                          isOpen={dropdownOpen}
                          toggle={toggleDropdown}
                          direction={direction}
                        >
                          <DropdownToggle className="p-0 bg-white border-0">
                            <box-icon
                              name="dots-vertical-rounded"
                              color="#697a8d"
                              style={{ width: "18px" }}
                            ></box-icon>
                          </DropdownToggle>
                          <DropdownMenu {...args}>
                            <DropdownItem
                              style={{
                                padding: "9px 20px",
                                display: "inline-flex",
                                color: "#697a8d",
                              }}
                            >
                              <box-icon
                                name="trash"
                                color="#697a8d"
                                style={{ width: "18px", marginRight: "6px" }}
                              ></box-icon>
                              Delete
                            </DropdownItem>
                            <DropdownItem
                              style={{
                                padding: "9px 20px",
                                display: "inline-flex",
                                color: "#697a8d",
                              }}
                            >
                              <box-icon
                                name="edit-alt"
                                color="#697a8d"
                                style={{ width: "18px", marginRight: "6px" }}
                              ></box-icon>
                              Edit
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>}
          </CardBody>
          {/* <CardBody className="pt-0">
            <CardText className="no-data">No Data found</CardText>
          </CardBody> */}
        </Card>
      </div>
      <TransactionCategoryModal modal={modal} toggle={toggle} />
    </div>
  );
};

export default Transaction;
