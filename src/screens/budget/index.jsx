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
import Input from "../../components/Input";
import Table from "../../components/Table";
import Search from "../../components/Search";
import useBudget from "../../hooks/useBudget";
import budgetInputs from "../../config/constant/budgetInputs";
import budgetColumns from "../../config/constant/budgetColumns";

const Budget = () => {
  const [currentDocID, setCurrentDocID] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [backUp, setBackUp] = useState([]);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const {
    useGetBudget,
    useUpdateBudget,
    useDeleteBudget,
    useAddBudget,
    initLoading,
    loading,
  } = useBudget();

  const { budgetData } = useSelector((state) => state?.budget);
  const { userData } = useSelector((state) => state?.auth);

  const handleDelete = async (data) => {
    setCurrentDocID(data?.docID);
    await useDeleteBudget(data?.docID);
  };

  const handleUpdate = (data) => {
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
        timeStamp: Date.now(),
        amount: +data?.amount,
        ...data,
      };

      if (isUpdate) {
        await useUpdateBudget(body, currentDocID);
      } else {
        await useAddBudget(body);
        setValues({});
      }
    }
  };

  useEffect(() => {
    let updatedData = [...budgetData];

    if (search?.trim()) {
      setCurrentPage(1);
      updatedData = updatedData.filter((item) =>
        Object.keys(item).some((k) =>
          item[k]
            ?.toLocaleString()
            .toLowerCase()
            .includes(search.toLowerCase().trim())
        )
      );
    }

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
  }, [sortConfig, search]);

  useEffect(() => {
    setSortConfig({ key: "", direction: "" });
    setBackUp(budgetData);
    setCurrentPage(1);
  }, [budgetData]);

  useEffect(() => {
    if (!budgetData?.length) {
      useGetBudget();
    }
  }, []);

  return (
    <>
      <Card className="my-3 h-100">
        {/* ================================ SCREEN TITLE ================================ */}
        <CardBody className="pb-0 d-flex justify-content-between gap-3 flex-column">
          <CardTitle className="text-uppercase">Add Budget Goals</CardTitle>
          <Search
            onClick={() => setIsOpenModal(true)}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            isOpenModal={isOpenModal}
          />
        </CardBody>

        {/* ================================ TABLE ================================ */}
        <CardBody className="row fill-available flex-column min-h-screen justify-content-between gap-4">
          <Table
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            onSort={handleOnSort}
            sortConfig={sortConfig}
            columns={budgetColumns}
            rows={backUp}
            loading={initLoading}
            iconLoading={loading}
            docId={currentDocID}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            colWidth="w-30"
          />
        </CardBody>
      </Card>

      {/* ================================ FORM - MODAL ================================ */}
      <Modal
        className="modal-dialog-centered"
        isOpen={isOpenModal}
        onClosed={handleClosedModal}
      >
        <ModalHeader>{isUpdate ? "Update Budget" : "Add Budget"}</ModalHeader>
        <form onSubmit={handleSubmit} className="d-flex flex-column">
          <ModalBody className="gap-4 d-flex flex-column">
            {budgetInputs?.map((input) => {
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

export default Budget;
