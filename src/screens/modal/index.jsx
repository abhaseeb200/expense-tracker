import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Spinner,
} from "reactstrap";
import CustomInput from "../../components/input";
import Select from "../../components/selectInput/index";
import { setTransactionCategory } from "../../config/service/firebase/transaction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addCategory } from "../../feature/category/categorySlice";

const TransactionCategoryModal = ({
  args,
  modal,
  toggle,
  setIsModalOpen,
  getTransactionCategoryHandler,
  incomeCategoryData,
  expenseCategoryData,
  currentUserID,
}) => {
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

  const dispatch = useDispatch();

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

  const addCategoryHandler = () => {
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
          let data = {
            docID: res.id,
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
          getTransactionCategoryHandler();
          restAllFields();
        })
        .catch((err) => {
          toast.error(err?.message, {
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
    <div>
      <Modal
        className="modal-dialog-centered"
        isOpen={modal}
        toggle={toggle}
        onClosed={restAllFields}
        {...args}
      >
        <ModalHeader toggle={toggle}>Add Transaction Category</ModalHeader>
        <ModalBody>
          <div className="col-md-12 mb-3">
            <Label>Category name</Label>
            <CustomInput
              placeholder="Bills"
              type="text"
              value={name.value}
              isError={name.isError}
              messageError={name.messageError}
              onChange={nameHandler}
            />
          </div>
          <div className="col-md-12 mb-3">
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
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            outline
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            className={loader ? "btn-disabled cust-button" : "cust-button"}
            onClick={addCategoryHandler}
          >
            {loader ? <Spinner size="sm" /> : "Add Category"}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default TransactionCategoryModal;
