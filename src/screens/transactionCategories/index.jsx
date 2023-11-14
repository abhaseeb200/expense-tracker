import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Label,
  Spinner,
  Table,
} from "reactstrap";
import CustomInput from "../../components/input";
import Select from "../../components/selectInput/select";
import { useState } from "react";
import {
  deleteTransactionCatgory,
  getTransactionCategory,
  setTransactionCategory,
  updateTransactionCategory,
} from "../../config/service/firebase/transaction";
import { useOutletContext } from "react-router";
import { toast } from "react-toastify";
import { useEffect } from "react";

const TransactionCategories = () => {
  const [name, setName] = useState({
    value: "",
    isError: false,
    messageError: "",
  });

  const [category, setCategory] = useState({
    value: "",
    isError: false,
    messageError: "",
  });

  const [loader, setLoader] = useState(false);
  const [tableLoader, setTableLoader] = useState(true);
  const [categoryData, setCategoryData] = useState([]);
  const [curretnDocID, setCurretnDocID] = useState("");
  const [saveLoader, setSaveLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

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
        messageError: "Category name should be alphanumeric",
      });
    } else {
      setName({
        value: e.target.value,
        isError: false,
        messageError: "",
      });
    }
  };

  const categoryHandler = (e) => {
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

  const [currentUserID] = useOutletContext();

  const addCategory = async () => {
    let isAready = false;
    if (name.value === "") {
      setName({
        value: name.value,
        isError: true,
        messageError: "Please provide name",
      });
    } else {
      for (let i = 0; i < categoryData?.length; i++) {
        if (
          categoryData[i].docData.name.replace(/ /g, "").toLowerCase() ===
          name.value.toLowerCase().replace(/ /g, "")
        ) {
          setName({
            value: name.value,
            isError: true,
            messageError: "Name is already exists",
          });
          isAready = true;
          break;
        } else {
          isAready = false;
        }
      }
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
      category.selectedIndex === 0 ||
      category.value === "" ||
      isAready
    ) {
      return;
    }

    //check validation
    if (!name.isError && !category.isError) {
      setLoader(true);
      try {
        await setTransactionCategory(
          name.value.trim(),
          category.value,
          currentUserID
        );
        setLoader(false);
        toast.success("Category add successfully!", {
          autoClose: 1500,
        });
        restAllFields();
        getTransactionCategoryHandler();
      } catch (error) {
        console.log(error);
        toast.error(err, {
          autoClose: 1500,
        });
        setLoader(false);
      }
    }
  };

  const getTransactionCategoryHandler = async () => {
    console.log(
      "getTransactionCategoryHandler",
      "=================================="
    );
    try {
      let response = await getTransactionCategory(currentUserID);
      let temp = [];
      response.forEach((element) => {
        temp.push({ docID: element.id, docData: element.data() });
      });
      setCategoryData(temp);
      setTableLoader(false)
    } catch (error) {
      console.log(error);
      toast.error(error, {
        autoClose: 1500,
      });
    }
  };

  const deleteHandler = async (item) => {
    setDeleteLoader(true)
    setCurretnDocID(item.docID);
    try {
      await deleteTransactionCatgory(item.docID);
      await getTransactionCategoryHandler();
      toast.error("Delete category successfully!", {
        autoClose: 1500,
      });
      restAllFields();
    } catch (error) {
      console.log(error);
      setDeleteLoader(false)
      toast.error(error, {
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
    setCategory({
      value: item.docData.category,
      isError: false,
      messageError: "",
    });
    setCurretnDocID(item.docID);
    setIsUpdate(true);
  };

  const saveHandler = async () => {
    if (
      name.value === "" ||
      category.value === "" ||
      category.selectedIndex === 0
    ) {
      return;
    }

    //check validition
    if (!name.isError && !category.isError) {
      setSaveLoader(true);
      try {
        await updateTransactionCategory(
          name.value,
          category.value,
          curretnDocID
        );
        await getTransactionCategoryHandler();
        toast.success("Delete category successfully!", {
          autoClose: 1500,
        });
        setIsUpdate(false)
        setSaveLoader(false);
        restAllFields();
      } catch (error) {
        console.log(error);
        toast.error(error, {
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

    setCategory({
      value: "",
      isError: false,
      messageError: "",
    });
  };

  useEffect(() => {
    getTransactionCategoryHandler();
  }, [currentUserID]);

  return (
    <>
      <h5 className="fw-bold py-3 my-3">Custom Transaction Categories</h5>
      <Card className="mb-3">
        <CardBody className="pb-3">
          <CardTitle>Add Category</CardTitle>
        </CardBody>
        <CardBody className="pb-3 row">
          <div className="col-md-6 mb-3">
            <Label>Name</Label>
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
            <Label>Transaction Type</Label>
            <Select
              onChange={categoryHandler}
              value={category.value}
              isError={category.isError}
              messageError={category.messageError}
            >
              <option value="default" hidden>
                Select Transaction
              </option>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </Select>
          </div>
          {isUpdate ? (
            <>
              <div className="col-md-6 mb-3">
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
                  onClick={cancelHandler}
                  className="w-100"
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <div className="col-md-12 mb-3">
              <Button
                color="primary"
                className={loader ? "btn-disabled w-100" : "w-100"}
                onClick={addCategory}
              >
                {loader ? <Spinner size="sm" /> : "Add Category"}
              </Button>
            </div>
          )}
        </CardBody>
      </Card>

      <Card className="mb-3">
        <CardBody>
          <CardTitle className="mb-4">Catgories Data</CardTitle>
          {tableLoader ? (
            <div className="no-data">
              <Spinner />
            </div>
          ) : categoryData?.length ? (
            <div className="table-responsive category-table">
              <Table bordered>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryData.map((item, ind) => {
                    return (
                      <tr key={ind}>
                        <td>{item.docData.name}</td>
                        <td>{item.docData.category}</td>
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
                                item?.docID === curretnDocID && deleteLoader ? "btn-disabled w-100":"w-100"
                              }
                              onClick={() => deleteHandler(item)}
                            >
                              {item?.docID === curretnDocID && deleteLoader ? (
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

export default TransactionCategories;
