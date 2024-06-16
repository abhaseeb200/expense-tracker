import {
  Badge,
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
import { useEffect, useState } from "react";
import CustomInput from "../../components/input";
import Select from "../../components/selectInput/index";
import "boxicons";
import {
  deleteTransaction as firebaseDeleteTransaction,
  getTransaction as firebaseGetTransaction,
  getTransactionCategory,
  setTransaction,
  updateTransaction,
} from "../../config/service/firebase/transaction";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addTransaction,
  getTransaction,
  deleteTransaction,
  editTransaction,
} from "../../feature/transaction/transactionSlice";
import { getCategory } from "../../feature/category/categorySlice";
import TransactionCategoryModal from "../modal";

const Transaction = ({ direction, ...args }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [transactionData, setTransactionData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [tableLoader, setTableLoader] = useState(true);
  const [currentSelect, setCurrentSelect] = useState(false);
  const [actionLoader, setActionLoader] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [saveLoader, setSaveLoader] = useState(false);
  const [currentDocID, setCurrentDocID] = useState("");
  const [expenseCategoryData, setExpenseCategoryData] = useState([]);
  const [incomeCategoryData, setIncomeCategoryData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentUserID] = useOutletContext();

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

  const dispatch = useDispatch();
  const { transactionData } = useSelector((state) => state.transaction);
  const { categoryData } = useSelector((state) => state.category);

  const toggleDropdown = (ind) => {
    setDropdownOpen((prevState) => !prevState);
    setCurrentSelect(ind);
  };

  const nameHandler = (e) => {
    let expVal = e.target.value.trim().toLowerCase();
    if (expVal === "") {
      setName({
        value: e.target.value,
        isError: true,
        messageError: "Please provide name",
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

  const addTransactionHandler = () => {
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
    if (category?.value === "" || category?.selectedIndex === 0) {
      setCategory({
        value: category?.value,
        isError: true,
        messageError: "Please select type",
      });
    }

    if (
      name.value === "" ||
      date.value === "" ||
      amount.value === "" ||
      category?.value === "" ||
      category.selectedIndex === 0
    ) {
      return;
    }

    //check validation
    if (
      !name.isError &&
      !date.isError &&
      !amount.isError &&
      !category.isError
    ) {
      setLoader(true);
      setTransaction(
        name.value,
        category.value,
        date.value,
        amount.value,
        transactionSelect,
        currentUserID
      )
        .then((res) => {
          let data = {
            docID: res.id,
            docData: {
              name: name.value,
              category: category.value,
              date: date.value,
              amount: amount.value,
              type: transactionSelect,
              userId: currentUserID,
            },
          };
          dispatch(addTransaction(data));
          setLoader(false);
          resetFeilds();
          toast.success("Transaction add successfully!", {
            autoClose: 1500,
          });
        })
        .catch((err) => {
          setLoader(false);
          toast.error(err.message, {
            autoClose: 1500,
          });
        });
    }
  };

  const getTransactionHandler = () => {
    if (!transactionData?.length) {
      firebaseGetTransaction(currentUserID)
        .then((res) => {
          let tempTransactionData = [];
          res.forEach((element) => {
            tempTransactionData.push({
              docID: element.id,
              docData: element.data(),
            });
          });
          dispatch(getTransaction(tempTransactionData));
          setTableLoader(false);
        })
        .catch((err) => {
          setTableLoader(false);
        });
    }
    setTableLoader(false);
  };

  const getTransactionCategoryHandler = () => {
    let tempExpenseCategoryData = [];
    let tempIncomeCategoryData = [];
    if (!categoryData?.length) {
      getTransactionCategory(currentUserID).then((res) => {
        let data = [];
        res.forEach((element) => {
          data.push({
            docID: element.id,
            docData: element.data(),
          });
          if (element.data().category === "expense") {
            tempExpenseCategoryData.push(element.data());
          } else {
            tempIncomeCategoryData.push(element.data());
          }
        });
        dispatch(getCategory(data));
      });
    } else {
      categoryData.forEach((element) => {
        if (element?.docData?.category === "expense") {
          tempExpenseCategoryData.push(element?.docData);
        } else {
          tempIncomeCategoryData.push(element?.docData);
        }
      });
    }
    setExpenseCategoryData(tempExpenseCategoryData);
    setIncomeCategoryData(tempIncomeCategoryData);
  };

  const deleteItem = (ind, item) => {
    setActionLoader(true);
    firebaseDeleteTransaction(item.docID)
      .then(() => {
        setActionLoader(false);
        dispatch(deleteTransaction(item?.docID));
        resetFeilds();
        toast.success("Transaction delete successfully!", {
          autoClose: 1500,
        });
        setIsUpdate(false);
        setDropdownOpen((prevState) => !prevState);
      })
      .catch((err) => {
        toast.error(err?.message, {
          autoClose: 1500,
        });
        setDropdownOpen((prevState) => !prevState);
      });
    setDropdownOpen(false);
  };

  const updateItem = (ind, item) => {
    setName({
      value: item.docData.name,
      isError: false,
      messageError: "",
    });
    setCategory({
      value: item.docData.category,
      isError: false,
      messageError: "",
    });
    setTransactionSelect(item.docData.type);
    setAmount({
      value: item.docData.amount,
      isError: false,
      messageError: "",
    });
    setDate({
      value: item.docData.date,
      isError: false,
      messageError: "",
    });
    setIsUpdate(true);
    setCurrentDocID(item.docID);
  };

  const saveHandler = () => {
    if (category.value === "") {
      setCategory({
        value: category.value,
        isError: true,
        messageError: "Please select type",
      });
      return;
    }
    if (
      !name.isError &&
      !date.isError &&
      !amount.isError &&
      !category.isError
    ) {
      setSaveLoader(true);
      updateTransaction(
        name.value,
        transactionSelect,
        category.value,
        date.value,
        amount.value,
        currentDocID
      )
        .then((res) => {
          setSaveLoader(false);
          setIsUpdate(false);
          let data = {
            docID: currentDocID,
            docData: {
              name: name.value,
              type: transactionSelect,
              category: category.value,
              data: date.value,
              amount: amount.value,
              userId: currentUserID,
            },
          };
          dispatch(editTransaction(data));
          resetFeilds();
          toast.success("Transaction update successfully!", {
            autoClose: 1500,
          });
        })
        .catch((err) => {
          toast.error(err, {
            autoClose: 1500,
          });
          setSaveLoader(false);
          setIsUpdate(false);
        });
    }
  };

  const cancelHanlder = () => {
    setIsUpdate(false);
    resetFeilds();
  };

  const resetFeilds = () => {
    setName({
      value: "",
      isError: false,
      messageError: "",
    });
    setCategory({
      value: "",
      isError: false,
      messageError: "",
    });
    setTransactionSelect("expense");
    setAmount({
      value: "",
      isError: false,
      messageError: "",
    });
    setDate({
      value: "",
      isError: false,
      messageError: "",
    });
  };

  const todayDateAttributeHanlder = () => {
    let d = new Date();
    return (
      d.getFullYear() + "-" + parseInt(d.getMonth() + 1) + "-" + d.getDate()
    );
  };

  const addCategoryHandler = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    getTransactionCategoryHandler()
  }, [categoryData])
  
  useEffect(() => {
    getTransactionHandler();
    getTransactionCategoryHandler();
  }, [currentUserID]);

  return (
    <>
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
          <div className="col-md-4 mb-3 d-flex flex-wrap justify-content-between align-items-center">
            <Label>Select Category</Label>
            <h6
              role="button"
              className="form-label fw-bolder text-primary"
              onClick={addCategoryHandler}
            >
              Add Category
            </h6>
            <Select
              onChange={categoryHandler}
              value={category.value}
              isError={category.isError}
              messageError={category.messageError}
            >
              <option value="" hidden>
                Select Category
              </option>
              {transactionSelect === "income" ? (
                incomeCategoryData.length > 0 ? (
                  incomeCategoryData.map((item, ind) => (
                    <option key={ind} value={item.name}>
                      {item.name}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No Income category found
                  </option>
                )
              ) : expenseCategoryData.length > 0 ? (
                expenseCategoryData.map((item, ind) => (
                  <option key={ind} value={item.name}>
                    {item.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No Expense category found
                </option>
              )}
            </Select>
          </div>
          <div className="col-md-6 mb-3">
            <Label>Select Date</Label>
            <CustomInput
              max={todayDateAttributeHanlder()}
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
          {isUpdate ? (
            <>
              <div className="col-md-6 mb-2">
                <Button
                  color="primary"
                  className={saveLoader ? "btn-disabled w-100" : "w-100"}
                  onClick={() => saveHandler()}
                >
                  {saveLoader ? <Spinner size="sm" /> : "Save"}
                </Button>
              </div>
              <div className="col-md-6">
                <Button
                  color="secondary"
                  outline
                  onClick={cancelHanlder}
                  className="w-100"
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <div className="col-md-12 w-100">
              <Button
                color="primary"
                className={loader ? "btn-disabled w-100" : "w-100"}
                onClick={() => addTransactionHandler}
              >
                {loader ? <Spinner size="sm" /> : "Add Transaction"}
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
      <Card className="mt-4">
        <CardBody className="pb-0">
          <CardTitle>Transaction Data</CardTitle>
        </CardBody>
        <CardBody className="pt-0">
          {tableLoader ? (
            <div className="no-data">
              <Spinner />
            </div>
          ) : transactionData.length ? (
            <div className="table-responsive">
              <Table bordered>
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
                  {transactionData?.map((item, ind) => {
                    return (
                      <tr key={ind}>
                        <td>{item.docData.name}</td>
                        <td>{item.docData.category}</td>
                        <td>{item.docData.date}</td>
                        <td>{item.docData.amount}</td>
                        <td>
                          {item.docData.type === "expense" ? (
                            <Badge color="danger">{item.docData.type}</Badge>
                          ) : (
                            <Badge color="primary">{item.docData.type}</Badge>
                          )}
                        </td>
                        <td className="text-end">
                          <Dropdown
                            isOpen={currentSelect === ind && dropdownOpen}
                            toggle={() => toggleDropdown(ind)}
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
                                onClick={() => deleteItem(ind, item)}
                                style={{
                                  padding: "9px 20px",
                                  display: "inline-flex",
                                  color: "#697a8d",
                                }}
                              >
                                {actionLoader ? (
                                  <Spinner size="sm"></Spinner>
                                ) : (
                                  <>
                                    <box-icon
                                      name="trash"
                                      color="#697a8d"
                                      style={{
                                        width: "18px",
                                        marginRight: "6px",
                                      }}
                                    ></box-icon>
                                    Delete
                                  </>
                                )}
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => updateItem(ind, item)}
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
              </Table>
            </div>
          ) : (
            <CardText className="no-data">No Data found</CardText>
          )}
        </CardBody>
      </Card>
      <TransactionCategoryModal
        modal={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        incomeCategoryData={incomeCategoryData}
        expenseCategoryData={expenseCategoryData}
        currentUserID={currentUserID}
        getTransactionCategoryHandler={getTransactionCategoryHandler}
      />
    </>
  );
};

export default Transaction;
