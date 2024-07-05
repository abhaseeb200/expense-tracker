import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Container,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";
import { CustomInput, Input } from "../../components/input";
import Table from "../../components/table";
// import {
//   deleteBudget as firebaseDeleteBudget,
//   getBudget as firebaseGetBudget,
//   setBudget,
//   updateBudget as firebaseUpdateBudget,
// } from "../../config/service/firebase/budget";
// import {
//   addBudget,
//   deleteBudget,
//   editBudget,
//   getBudget,
// } from "../../feature/budget/budgetSlice";
import useBudget from "../../hooks/useBudget";
import BudgetColumns from "../../config/constant/budgetColumns";
import Search from "../../components/Search";

const inputs = [
  {
    id: 1,
    name: "name",
    type: "text",
    placeholder: "Bills.",
    label: "name",
  },
  {
    id: 2,
    name: "date",
    type: "date",
    label: "date",
    max: new Date().toISOString().split("T")[0],
  },
  {
    id: 3,
    name: "amount",
    type: "number",
    placeholder: "200...",
    label: "amount",
    required: true,
    min: 1,
    pattern: "/^[1-9]d*$/",
    errorMessage: "Amount must be greater than 01",
  },
];

const Budget = () => {
  // const [loader, setLoader] = useState(false);
  const [tableLoader, setTableLoader] = useState(false);
  const [currentDocID, setCurrentDocID] = useState("");
  const [saveLoader, setSaveLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [backUp, setBackUp] = useState([]);

  const [values, setValues] = useState({
    name: "",
    date: "",
    amount: "",
  });
  const [errors, setErrors] = useState({});

  const {
    useGetBudget,
    useUpdateBudget,
    useDeleteBudget,
    useAddBudget,
    initLoading,
    loading,
  } = useBudget();

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
  const { userData } = useSelector((state) => state.auth);

  console.log({ budgetData });

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
            docID: res.id,
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
          toast.errors(err?.message, {
            autoClose: 1500,
          });
        });
    }
  };

  const getBudgetHandler = () => {
    setTableLoader(true);
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
        toast.errors(err?.message, {
          autoClose: 1500,
        });
      });
  };

  const deleteHandler = async (item) => {
    console.log(item);
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
    } catch (errors) {
      setDeleteLoader(false);
      toast.errors(errors.message, {
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
    console.log(currentDocID);
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
      } catch (errors) {
        toast.errors(errors?.message, {
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

  const handleDelete = async (data) => {
    setCurrentDocID(data?.docID);
    await useDeleteBudget(data?.docID);
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

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });

    if (!e.target.value) {
      setErrors({ ...errors, [e.target.name]: true });
    } else {
      setErrors({ ...errors, [e.target.name]: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // return console.log(e.target.reset);

    const data = {};
    let error = {};
    let formData = new FormData(e.target);

    formData.forEach((value, key) => {
      data[key] = value;
      if (!value) {
        error[key] = true;
      }
    });

    setErrors(error);

    //SUBMIT THE FORM BY USING 'DATA'
    if (!Object.values(error).includes(true)) {
      //REQUIRED BODY KEYS
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
    setBackUp(budgetData);
  }, [budgetData]);

  useEffect(() => {
    if (!budgetData?.length) {
      useGetBudget();
    }
  }, [currentUserID]);

  return (
    <>
      <Card className="my-3 h-100">
        {/* ================================ SCREEN TITLE ================================ */}
        <CardBody className="pb-3 d-flex justify-content-between gap-3 flex-column">
          <CardTitle className="text-uppercase">Add Budget Goals</CardTitle>
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
            columns={BudgetColumns}
            rows={backUp}
            loading={initLoading}
            iconLoading={loading}
            docId={currentDocID}
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
          <ModalBody className="gap-3 d-flex flex-column">
            {inputs?.map((input) => {
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
