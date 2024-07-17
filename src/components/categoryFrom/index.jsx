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
import { Input } from "../input";
import {
  categoryInputs,
  categorySelects,
} from "../../config/constant/categoryInputs";
import useCategory from "../../hooks/useCategory";
import Dropdown from "../dropdown";
import { toast } from "react-toastify";

const CategoryFrom = (props) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const { categoryData } = useSelector((state) => state.category);

  const {
    isOpenModal,
    isUpdate,
    setIsUpdate,
    setIsOpenModal,
    currentData = {},
    setCurrentData,
  } = props;

  const { useUpdateCategory, useAddCategory, loading } = useCategory();
  const { userData } = useSelector((state) => state?.auth);

  const handleClosedModal = () => {
    setValues({});
    setErrors({});
    setIsOpenModal(false);
    setIsUpdate(false);
    setCurrentData && setCurrentData({});
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });

    if (!e.target.value?.trim()) {
      setErrors({ ...errors, [e.target.name]: true });
    } else {
      setErrors({ ...errors, [e.target.name]: false });
    }
  };

  const handleSelect = (name, value) => {
    setValues({ ...values, [name]: value });

    if (!value?.trim()) {
      setErrors({ ...errors, [name]: true });
    } else {
      setErrors({ ...errors, [name]: false });
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
    
    //SUBMIT THE FORM BY USING `DATA`
    if (!Object.values(error).includes(true)) {
      let body = {
        userId: userData?.userId,
        ...data,
        name: data?.name?.trim(),
      };

      let isExists = categoryData.find(
        (i) =>
          i?.name?.toLowerCase().trim() === data?.name?.toLowerCase().trim() &&
          i?.category?.toLowerCase() === data?.category?.toLowerCase()
      );
      if (isExists) {
        return toast.error("Category already exists");
      }

      if (isUpdate) {
        await useUpdateCategory(body, currentData?.docId);
      } else {
        await useAddCategory(body);
      }
    }
  };

  useEffect(() => {
    if (Object.keys(currentData)?.length) {
      setValues(currentData);
    }
  }, [currentData]);

  // RESET FORM WHEN NEW CATEGORY IS ADDED
  useEffect(() => {
    return () => {
      if (!isUpdate) {
        setValues({});
      }
    };
  }, [categoryData]);

  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={isOpenModal}
      onClosed={handleClosedModal}
    >
      <ModalHeader>{isUpdate ? "Update Category" : "Add Category"}</ModalHeader>
      <form onSubmit={handleSubmit} className="d-flex flex-column">
        {isOpenModal && (
          <ModalBody className="gap-4 d-flex flex-column">
            {categoryInputs?.map((input) => {
              return (
                <Input
                  key={input?.id}
                  {...input}
                  value={values[input.name] || ""}
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
                  value={values[select?.name] || ""}
                  errors={errors[select?.name] || ""}
                  options={select?.options}
                  onSelect={(name, value) => handleSelect(name, value)}
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
            onClick={handleClosedModal}
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
