import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from "reactstrap";
import CustomInput from "../../../components/input";
import Select from "../../../components/selectInput/select";

function TransactionCategoryModal({ args, modal, toggle }) {
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
    if (name.value === "") {
      setName({
        value: name.value,
        isError: true,
        messageError: "Please provide name",
      });
    }
    if (category.value === "") {
      setCategory({
        value: category.value,
        isError: true,
        messageError: "Please select type",
      });
    }

    if (name.value === "" || category.selectedIndex === 0) {
      return;
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
        <ModalHeader toggle={toggle}>Add Transaction Cateogory</ModalHeader>
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
              <option value="default" hidden="" selected="">
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
              toggle();
            }}
          >
            Cancel
          </Button>
          <Button color="primary" onClick={() => addCategory()}>
            Add Category
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default TransactionCategoryModal;
