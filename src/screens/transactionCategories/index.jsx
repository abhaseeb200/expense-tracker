import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router";
import { useDispatch, useSelector } from "react-redux";
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
import {CustomInput} from "../../components/input";
import Select from "../../components/selectInput/index";
import {
  deleteTransactionCatgory,
  getTransactionCategory,
  setTransactionCategory,
  updateTransactionCategory,
} from "../../config/service/firebase/transaction";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getCategory,
} from "../../feature/category/categorySlice";

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
  const [curretnDocID, setCurretnDocID] = useState("");
  const [saveLoader, setSaveLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const dispatch = useDispatch();
  const { categoryData } = useSelector((state) => state.category);

  const [currentUserID] = useOutletContext();

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

  const createCategory = async () => {
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
        let response = await setTransactionCategory(
          name.value.trim(),
          category.value,
          currentUserID
        );
        let data = {
          docID: response.id,
          docData: {
            name: name.value,
            category: category.value,
            userId: currentUserID,
          },
        };
        dispatch(addCategory(data));
        toast.success("Category add successfully!", {
          autoClose: 1500,
        });
        restAllFields();
      } catch (error) {
        toast.error(error.message, {
          autoClose: 1500,
        });
      } finally {
        setLoader(false);
      }
    }
  };

  const getTransactionCategoryHandler = async () => {
    try {
      if (!categoryData?.length) {
        let response = await getTransactionCategory(currentUserID);
        let temp = [];
        response.forEach((element) => {
          temp.push({ docID: element.id, docData: element.data() });
        });
        dispatch(getCategory(temp));
      }
    } catch (error) {
      toast.error(error?.message, {
        autoClose: 1500,
      });
    } finally {
      setTableLoader(false);
    }
  };

  const deleteHandler = async (item) => {
    setDeleteLoader(true);
    setCurretnDocID(item?.docID);
    try {
      await deleteTransactionCatgory(item?.docID);
      dispatch(deleteCategory(item?.docID));
      setDeleteLoader(false);
      restAllFields();
      toast.success("Delete category successfully!", {
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
        let data = {
          docID: curretnDocID,
          docData: { name: name.value, category: category.value },
        };
        dispatch(editCategory(data));
        toast.success("Update category successfully!", {
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
                onClick={createCategory}
              >
                {loader ? <Spinner size="sm" /> : "Add Category"}
              </Button>
            </div>
          )}
        </CardBody>
      </Card>

      <Card className="mb-3">
        <CardBody>
          <CardTitle className="mb-4">Categories Data</CardTitle>
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
                                item?.docID === curretnDocID && deleteLoader
                                  ? "btn-disabled w-100"
                                  : "w-100"
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
