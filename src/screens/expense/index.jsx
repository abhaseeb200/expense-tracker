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
import CategoryForm from "../../components/CategoryForm";
import Dropdown from "../../components/Dropdown";
import useCategory from "../../hooks/useCategory";
import useExpense from "../../hooks/useExpense";
import expenseColumns from "../../config/constant/expenseColumns";
import { expenseInputs, expenseSelects } from "../../config/constant/expenseInput";

const Expense = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [isCategoryModal, setIsCategoryModal] = useState(false);
  const [isTransitionModal, setIsTransitionModal] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [search, setSearch] = useState("");
  const [backUp, setBackUp] = useState([]);
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [currentDocId, setCurrentDocId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    initLoading,
    loading,
    useGetExpense,
    useAddExpense,
    useDeleteExpense,
    useUpdateExpense,
  } = useExpense();

  const { useGetCategory, initLoading: categoryLoading } = useCategory();

  const { expenseData } = useSelector((state) => state.expense);
  const { categoryData } = useSelector((state) => state.category);
  const { userData } = useSelector((state) => state?.auth);

  const handleClosedModal = () => {
    setIsUpdate(false);
    setIsTransitionModal(false);
    setValues({});
    setErrors({});
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
    setIsUpdate(true);
    setIsTransitionModal(true);
    setValues(data);
    setCurrentDocId(data?.docId);
  };

  const handleDelete = async (data) => {
    setCurrentDocId(data?.docId);
    await useDeleteExpense(data?.docId);
  };

  const handleOnSort = (columnKey) => {
    let newDirection = "asc";
    if (sortConfig?.direction === "desc" && sortConfig?.key === columnKey) {
      newDirection = "asc";
    } else {
      newDirection = "desc";
    }
    setSortConfig({
      key: columnKey,
      direction: newDirection,
    });
  };

  const handleAddCategory = () => {
    setIsCategoryModal(true);
  };

  const getCategoryOptions = (values) => {
    switch (values.type) {
      case "Expense":
        return expense;
      case "Income":
        return income;
      default:
        return [];
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

    //SUBMIT THE FORM BY USING 'DATA'
    if (!Object.values(error).includes(true)) {
      let body = {
        userId: userData?.userId,
        timeStamp: Date.now(),
        amount: +data?.amount,
        ...data,
      };

      if (isUpdate) {
        await useUpdateExpense(body, currentDocId);
      } else {
        await useAddExpense(body, setValues);
      }
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSelect = (name, value) => {
    // RESET `CATEGORY` FIELD WHEN CHANGE IN `TYPE` FIELD
    if (value === "Expense" || value === "Income") {
      setValues({ ...values, [name]: value, category: "" });
    } else {
      setValues({ ...values, [name]: value });
    }

    if (!value?.trim()) {
      setErrors({ ...errors, [name]: true });
    } else {
      setErrors({ ...errors, [name]: false });
    }
  };

  useEffect(() => {
    let updatedData = [...expenseData];

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

    if (sortConfig?.key && sortConfig?.direction) {
      updatedData.sort((a, b) => {
        let valueA = a[sortConfig?.key];
        let valueB = b[sortConfig?.key];

        if (typeof valueA === "string" && typeof valueB === "string") {
          valueA = valueA.toLowerCase();
          valueB = valueB.toLowerCase();
        }
        if (sortConfig?.direction === "asc") {
          if (valueA < valueB) return -1;
          if (valueA > valueB) return 1;
        } else if (sortConfig?.direction === "desc") {
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
    setSearch("");
    setBackUp(expenseData);
    setCurrentPage(1);
  }, [expenseData]);

  useEffect(() => {
    let expense = [];
    let income = [];

    categoryData?.map((i) =>
      i?.category.toLowerCase() === "expense"
        ? expense.push({ value: i?.name, name: i?.name })
        : income.push({ value: i?.name, name: i?.name })
    );

    setExpense(expense);
    setIncome(income);
  }, [categoryData]);

  //CODE WILL EXECUTE WHEN CATEGORY MODEL IS OPEN
  useEffect(() => {
    if (!categoryData?.length) {
      useGetCategory();
    }
  }, [isCategoryModal]);

  useEffect(() => {
    if (!expenseData?.length) {
      useGetExpense();
    }
  }, []);

  return (
    <>
      <Card className="my-3 h-100">
        {/* ================================ SCREEN TITLE ================================ */}
        <CardBody className="pb-0 d-flex justify-content-between gap-3 flex-column">
          <CardTitle className="text-uppercase">Add Transaction</CardTitle>
          <Search
            onClick={() => setIsTransitionModal(true)}
            onChange={(e) => handleSearch(e)}
            isOpenModal={isTransitionModal}
            value={search}
          />
        </CardBody>

        {/* ================================ TABLE ================================ */}
        <CardBody className="gap-4 row fill-available flex-column min-h-screen justify-content-between card-body">
          <Table
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            onSort={handleOnSort}
            sortConfig={sortConfig}
            columns={expenseColumns}
            rows={backUp}
            loading={initLoading}
            iconLoading={loading}
            docId={currentDocId}
            isUpdate={isUpdate}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </CardBody>
      </Card>

      {/* ========================= CREATE TRANSITION - MODAL ========================= */}
      <Modal
        className="modal-dialog-centered"
        isOpen={isTransitionModal}
        onClosed={handleClosedModal}
      >
        <ModalHeader>Add Transaction</ModalHeader>
        <form onSubmit={handleSubmit}>
          <ModalBody className="gap-4 d-flex flex-column">
            {expenseInputs?.map((input) => {
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
            {expenseSelects?.map((select) => {
              return (
                <Dropdown
                  key={select?.id}
                  {...select}
                  value={values[select?.name] || ""}
                  errors={errors[select?.name] || ""}
                  onChange={onChange}
                  allValues={values}
                  loading={select?.name === "category" && categoryLoading}
                  options={
                    select?.name === "category"
                      ? getCategoryOptions(values)
                      : select?.options
                  }
                  onAddCategory={
                    select?.name === "category" && handleAddCategory
                  }
                  onSelect={(name, value) => handleSelect(name, value)}
                />
              );
            })}
          </ModalBody>
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

      {/* ========================= TRANSITION CATEGORY - MODAL ========================= */}
      {isCategoryModal && (
        <CategoryForm
          isOpenModal={isCategoryModal}
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          setIsOpenModal={setIsCategoryModal}
        />
      )}
    </>
  );
};

export default Expense;
