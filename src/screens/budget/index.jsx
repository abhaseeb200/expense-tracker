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
import { useEffect, useState } from "react";
import CustomInput from "../../components/input";
import {
  deleteBudget as firebaseDeleteBudget,
  getBudget as firebaseGetBudget,
  setBudget,
  updateBudget as firebaseUpdateBudget,
} from "../../config/service/firebase/budget";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addBudget,
  deleteBudget,
  editBudget,
  getBudget,
} from "../../feature/budget/budgetSlice";

const Budget = () => {
  const [loader, setLoader] = useState(false);
  const [tableLoader, setTableLoader] = useState(false);
  const [currentDocID, setCurrentDocID] = useState("");
  const [saveLoader, setSaveLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  // const [budgetData, setBudgetData] = useState([]);

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

  const dispatch = useDispatch();
  const { budgetData } = useSelector((state) => state?.budget);

  const [currentUserID] = useOutletContext();

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

  const addBudgetHandler = () => {
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

    if (name.value === "" || date.value === "" || amount.value === "") {
      return;
    }

    //check validation
    if (!name.isError && !date.isError && !amount.isError) {
      setLoader(true);
      setBudget(name.value, date.value, amount.value, currentUserID)
        .then((res) => {
          setLoader(false);
          let data = {
            docID: currentDocID,
            docData: {
              name: name.value,
              date: date.value,
              amount: amount.value,
            },
          };
          dispatch(addBudget(data));
          toast.success("Budget add successfully!", {
            autoClose: 1500,
          });
        })
        .catch((err) => {
          setLoader(false);
          toast.error(err?.message, {
            autoClose: 1500,
          });
        });
    }
  };

  const getBudgetHandler = () => {
    setTableLoader(true)
    firebaseGetBudget(currentUserID)
      .then((res) => {
        let tempBudgetData = [];
        res.forEach((element) => {
          tempBudgetData.push({
            docID: element.id,
            docData: element.data(),
          });
        });
        setTableLoader(false);
        dispatch(getBudget(tempBudgetData));
      })
      .catch((err) => {
        setTableLoader(false);
        toast.error(err?.message, {
          autoClose: 1500,
        });
      });
  };

  const deleteHandler = async (item) => {
    setDeleteLoader(true);
    setCurrentDocID(item?.docID);
    try {
      await firebaseDeleteBudget(item?.docID);
      dispatch(deleteBudget(item?.docID));
      setDeleteLoader(false);
      restAllFields();
      toast.success("Delete budget successfully!", {
        autoClose: 1500,
      });
    } catch (error) {
      setDeleteLoader(false);
      toast.error(error.message, {
        autoClose: 1500,
      });
    }
  };

  const editHandler = (item) => {
    setName({
      value: item.docData.name,
      isError: false,
      messageError: "",
    });
    setDate({
      value: item.docData.date,
      isError: false,
      messageError: "",
    });
    setAmount({
      value: item.docData.amount,
      isError: false,
      messageError: "",
    });
    setCurrentDocID(item.docID);
    setIsUpdate(true);
  };

  const saveHandler = async () => {
    if (name.value === "" || amount.value === "" || date.value === "") {
      return;
    }

    //CHECK VALIDATION
    if (!name.isError && !amount.isError && !date.isError) {
      setSaveLoader(true);
      try {
        await firebaseUpdateBudget(
          name.value,
          amount.value,
          date.value,
          currentDocID
        );
        let data = {
          docID: currentDocID,
          docData: { name: name.value, amount: amount.value, date: date.value },
        };
        dispatch(editBudget(data));
        toast.success("Update Budget successfully!", {
          autoClose: 1500,
        });
        setIsUpdate(false);
        setSaveLoader(false);
        restAllFields();
      } catch (error) {
        toast.error(error?.message, {
          autoClose: 1500,
        });
      }
    }
  };

  const cancelHandler = () => {
    restAllFields();
    setIsUpdate(false);
  };

  const restAllFields = () => {
    setName({
      value: "",
      isError: false,
      messageError: "",
    });
    setDate({
      value: "",
      isError: false,
      messageError: "",
    });
    setAmount({
      value: "",
      isError: false,
      messageError: "",
    });
  };

  const todayDateAttributeHandler = () => {
    let d = new Date();
    return (
      d.getFullYear() + "-" + parseInt(d.getMonth() + 1) + "-" + d.getDate()
    );
  };

  useEffect(() => {
    if (!budgetData?.length) {
      getBudgetHandler();
    }
  }, [currentUserID]);

  return (
    <>
      <h5 className="fw-bold py-3 my-3">Budget</h5>
      <Card className="">
        <CardBody className="pb-3">
          <CardTitle>Add Budget Goals</CardTitle>
        </CardBody>
        <CardBody className="pt-3 row">
          <div className="col-md-12 mb-3">
            <Label>Budget name</Label>
            <CustomInput
              placeholder="Bills"
              type="text"
              value={name.value}
              isError={name.isError}
              messageError={name.messageError}
              onChange={nameHandler}
            />
          </div>
          <div className="col-md-6 mb-3">
            <Label>Select Date</Label>
            <CustomInput
              placeholder=""
              type="date"
              max={todayDateAttributeHandler()}
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
                  onClick={saveHandler}
                >
                  {saveLoader ? <Spinner size="sm" /> : "Save"}
                </Button>
              </div>
              <div className="col-md-6">
                <Button
                  color="secondary"
                  outline
                  onClick={cancelHandler}
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
                onClick={addBudgetHandler}
              >
                {loader ? <Spinner size="sm" /> : "Add Budget"}
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
      <Card className="mt-4">
        <CardBody className="pb-0">
          <CardTitle>Budget Goals</CardTitle>
        </CardBody>
        <CardBody className="pt-0">
          {tableLoader ? (
            <div className="no-data">
              <Spinner />
            </div>
          ) : budgetData.length ? (
            <div className="table-responsive">
              <Table bordered>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {budgetData.map((item, ind) => {
                    return (
                      <tr key={ind}>
                        <td>{item?.docData?.name}</td>
                        <td>{item?.docData?.date}</td>
                        <td>{item?.docData?.amount}</td>
                        <td style={{ width: "200px" }}>
                          <div className="d-inline-flex w-100">
                            <Button
                              color="primary"
                              className="me-2"
                              onClick={() => editHandler(item)}
                            >
                              Edit
                            </Button>
                            <Button
                              color="danger"
                              className={
                                item?.docID === currentDocID && deleteLoader
                                  ? "btn-disabled w-100"
                                  : "w-100"
                              }
                              onClick={() => deleteHandler(item)}
                            >
                              {item?.docID === currentDocID && deleteLoader ? (
                                <Spinner size="sm" />
                              ) : (
                                "Delete"
                              )}
                            </Button>
                          </div>
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
    </>
  );
};

export default Budget;
