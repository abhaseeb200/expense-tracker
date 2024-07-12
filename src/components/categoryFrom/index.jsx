import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";
import Select from "../selectInput";
import { Input } from "../input";
import {
  categoryInputs,
  categorySelects,
} from "../../config/constant/categoryInputs";
import useCategory from "../../hooks/useCategory";
import Dropdown from "../dropdown";

const CategoryFrom = (props) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const {
    isOpenModal,
    isUpdate,
    setIsUpdate,
    setIsOpenModal,
    currentData = {},
  } = props;

  const { useUpdateCategory, useAddCategory, loading } = useCategory();
  const { userData } = useSelector((state) => state?.auth);

  const handleClosedModal = () => {
    setValues({});
    setErrors({});
  };

  const handleModalCancel = () => {
    setIsOpenModal(false);
    setIsUpdate(false);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });

    if (!e.target.value?.trim()) {
      setErrors({ ...errors, [e.target.name]: true });
    } else {
      setErrors({ ...errors, [e.target.name]: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {};
    let error = {};
    let formData = new FormData(e.target);

    formData.forEach((value, key) => {
      data[key] = value;
      if (!value?.trim()) {
        error[key] = true;
      }
    });
    setErrors(error);

    if (!Object.values(error).includes(true)) {
      let body = {
        userId: userData?.userId,
        ...data,
      };
      if (isUpdate) {
        await useUpdateCategory(body, currentData?.docID);
      } else {
        await useAddCategory(body);
      }
    }
  };

  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={isOpenModal}
      onClosed={handleClosedModal}
    >
      <ModalHeader>{isUpdate ? "Update Category" : "Add Category"}</ModalHeader>
      <form onSubmit={handleSubmit} className="d-flex flex-column">
        {isOpenModal && (
          <ModalBody className="gap-3 d-flex flex-column">
            {categoryInputs?.map((input) => {
              return (
                <Input
                  key={input?.id}
                  {...input}
                  value={values[input.name] || currentData[input.name] || ""}
                  errors={errors[input.name] || ""}
                  onChange={onChange}
                />
              );
            })}
            {categorySelects?.map((select) => {
              return (
                <Dropdown
                  key={select?.id}
                  {...select}
                  value={values[select?.name] || currentData[select.name] || ""}
                  errors={errors[select?.name] || ""}
                  options={select?.options}
                  onChange={onChange}
                />
              );
            })}
          </ModalBody>
        )}

        <ModalFooter>
          <Button
            color="secondary"
            outline
            type="button"
            onClick={handleModalCancel}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            className="custom-button"
            disabled={loading}
            type="submit"
          >
            {loading ? <Spinner size="sm" /> : isUpdate ? "Save" : "Create"}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default CategoryFrom;
