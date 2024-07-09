import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";
import { Input } from "../../components/input";
import Select from "../../components/selectInput/index";
import Search from "../../components/Search";
import categoryColumns from "../../config/constant/categoryColumns";
import useCategory from "../../hooks/useCategory";
import Table from "../../components/table";
import {
  categoryInputs,
  categorySelects,
} from "../../config/constant/categoryInputs";

const Category = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentDocID, setCurrentDocID] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [backUp, setBackUp] = useState([]);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const { categoryData } = useSelector((state) => state.category);
  const { userData } = useSelector((state) => state?.auth);

  const {
    useGetCategory,
    useUpdateCategory,
    useDeleteCategory,
    useAddCategory,
    initLoading,
    loading,
  } = useCategory();

  const handleDelete = async (data) => {
    setCurrentDocID(data?.docID);
    await useDeleteCategory(data?.docID);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });

    if (!e.target.value?.trim()) {
      setErrors({ ...errors, [e.target.name]: true });
    } else {
      setErrors({ ...errors, [e.target.name]: false });
    }
  };

  const handleUpdate = (data) => {
    console.log(data);
    setIsUpdate(true);
    setIsOpenModal(true);
    setValues(data);
    setCurrentDocID(data?.docID);
  };

  const handleClosedModal = () => {
    setValues({});
    setErrors({});
  };

  const handleOnSort = (columnKey, objectKey) => {
    let newDirection = "asc";
    if (sortConfig?.direction === "desc" && sortConfig?.key === columnKey) {
      newDirection = "asc";
    } else {
      newDirection = "desc";
    }

    setSortConfig({
      key: columnKey,
      direction: newDirection,
      objectKey: objectKey,
    });
  };

  const handleModalCancel = () => {
    setIsOpenModal(false);
    setIsUpdate(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {};
    let error = {};
    let formData = new FormData(e.target);

    formData.forEach((value, key) => {
      data[key] = value;
      if (!value?.trim()) {
        error[key] = true;
      }
    });

    setErrors(error);

    //SUBMIT THE FORM BY USING 'DATA'
    if (!Object.values(error).includes(true)) {
      let body = {
        userId: userData?.userId,
        ...data,
      };
      if (isUpdate) {
        await useUpdateCategory(body, currentDocID);
      } else {
        await useAddCategory(body);
      }
    }
  };

  useEffect(() => {
    let updatedData = [...categoryData];

    if (sortConfig.key && sortConfig.direction) {
      updatedData.sort((a, b) => {
        let valueA = a[sortConfig?.key];
        let valueB = b[sortConfig?.key];

        if (typeof valueA === "string" && typeof valueB === "string") {
          valueA = valueA.toLowerCase();
          valueB = valueB.toLowerCase();
        }

        if (sortConfig.direction === "asc") {
          if (valueA < valueB) return -1;
          if (valueA > valueB) return 1;
        } else if (sortConfig.direction === "desc") {
          if (valueA > valueB) return -1;
          if (valueA < valueB) return 1;
        }
        return 0;
      });
    }

    setBackUp(updatedData);
  }, [sortConfig]);

  useEffect(() => {
    setSortConfig({ key: "", direction: "" });
    setBackUp(categoryData);
  }, [categoryData]);

  useEffect(() => {
    if (!categoryData?.length) {
      useGetCategory();
    }
  }, [userData]);

  return (
    <>
      <Card className="my-3 h-100">
        {/* ================================ SCREEN TITLE ================================ */}
        <CardBody className="pb-3 d-flex justify-content-between gap-3 flex-column">
          <CardTitle className="text-uppercase">Add Category</CardTitle>
          <Search
            onClick={() => setIsOpenModal(true)}
            isOpenModal={isOpenModal}
          />
        </CardBody>

        {/* ================================ TABLE ================================ */}
        <CardBody className="pt-3 row fill-available flex-column">
          <Table
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            onSort={handleOnSort}
            sortConfig={sortConfig}
            columns={categoryColumns}
            rows={backUp}
            docId={currentDocID}
            iconLoading={loading}
            loading={initLoading}
          />
        </CardBody>
      </Card>

      {/* ================================ FORM - MODAL ================================ */}
      <Modal
        className="modal-dialog-centered"
        isOpen={isOpenModal}
        onClosed={handleClosedModal}
      >
        <ModalHeader>
          {isUpdate ? "Update Category" : "Add Category"}
        </ModalHeader>
        <form onSubmit={handleSubmit} className="d-flex flex-column">
          <ModalBody className="gap-3 d-flex flex-column">
            {categoryInputs?.map((input) => {
              return (
                <Input
                  key={input?.id}
                  {...input}
                  value={values[input.name] || ""}
                  onChange={onChange}
                  errors={errors[input.name]}
                />
              );
            })}
            {categorySelects?.map((select) => {
              return (
                <Select
                  key={select?.id}
                  {...select}
                  value={values[select?.name] || ""}
                  errors={errors[select?.name]}
                  options={select?.options}
                  onChange={onChange}
                />
              );
            })}
          </ModalBody>

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
    </>
  );
};

export default Category;
