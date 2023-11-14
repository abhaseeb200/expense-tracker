import { Button, Card, CardBody, CardText, CardTitle, Label, Table } from "reactstrap";
import CustomInput from "../../components/input";
import Select from "../../components/selectInput/select";
import { useState } from "react";

const TransactionCategories = (
  args,
  modal,
  toggle,
  getTransactionCategoryHandler,
  incomeCategoryData,
  expenseCategoryData,
  currentUserID
) => {
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

  const [categoryData, setCategoryData] = useState(["hh"]);
  const [loader, setLoader] = useState(false);
  const [tableLoader, setTableLoader] = useState(false);

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

  const addCategory = () => {
    let allCategoryData = [...incomeCategoryData, ...expenseCategoryData];
    let isAready = false;
    if (name.value === "") {
      setName({
        value: name.value,
        isError: true,
        messageError: "Please provide name",
      });
    } else {
      for (let i = 0; i < allCategoryData.length; i++) {
        if (
          allCategoryData[i].name.replace(/ /g, "").toLowerCase() ===
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
      setTransactionCategory(name.value.trim(), category.value, currentUserID)
        .then((res) => {
          setLoader(false);
          toast.success("Category add successfully!", {
            autoClose: 1500,
          });
          restAllFields();
          getTransactionCategoryHandler(currentUserID);
        })
        .catch((err) => {
          toast.error(err, {
            autoClose: 1500,
          });
          setLoader(false);
        });
    }
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
          <div className="col-md-12 mb-3">
            <Button
              color="primary"
              className={loader ? "btn-disabled w-100" : "w-100"}
              onClick={addCategory}
            >
              {loader ? <Spinner size="sm" /> : "Add Category"}
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card className="mb-3">
        <CardBody>
          <CardTitle>Catgories Data</CardTitle>
          <CardBody className="pt-0">
          {tableLoader ? (
            <div className="no-data">
              <Spinner />
            </div>
          ) : categoryData.length ? (
            <div className="table-responsive">
              <Table bordered>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryData.map((item, ind) => {
                    return (
                      <tr key={ind}>
                        <td>{item.name}</td>
                        <td>{item.date}</td>
                        <td>{item.amount}</td>
                        <td>{item.amount}</td>
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
        </CardBody>
      </Card>
    </>
  );
};

export default TransactionCategories;
