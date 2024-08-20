import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Card, CardBody, CardTitle } from "reactstrap";
import Input from "../../components/Input";
import Dropdown from "../../components/Dropdown";
import Table from "../../components/Table";
import reportColumns from "../../constant/columns/reportColumns";
import useCategory from "../../hooks/useCategory";
import useTransaction from "../../hooks/useTransaction";
import "./style.css";
import reportInputs from "../../constant/inputs/reportInputs";
import reportDropdown from "../../constant/dropdowns/reportDropdown";
import ImageModal from "../../components/ImageModal";

const Report = () => {
  const [values, setValues] = useState("");
  const [errors, setErrors] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [backUp, setBackUp] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenImage, setIsOpenImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const { initLoading, useGetTransaction } = useTransaction();
  const { initLoading: categoryLoading, useGetCategory } = useCategory();

  const { transactionData } = useSelector((state) => state.transaction);
  const { categoryData } = useSelector((state) => state.category);
  const { sourceData } = useSelector((state) => state.source);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSelect = (name, value, _, docId) => {
    setValues({ ...values, [name]: value, [`${name}Id`]: docId });
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

  const handleOpenImage = (url) => {
    setImageUrl(url);
    setIsOpenImage(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {};
    let error = {};
    let formData = new FormData(e.target);

    formData.forEach((value, key) => {
      data[key] = value;
    });

    const { start_date, end_date, category, sourceId, categoryId, source } =
      data;

    if (start_date && !end_date) {
      error["end_date"] = true;
    }
    if (!start_date && end_date) {
      error["start_date"] = true;
    }
    setErrors(error);

    if (!Object.values(error).includes(true)) {
      let filtered = [...transactionData];

      //FILTER WITH START DATE & END DATE
      if (start_date && end_date) {
        let start = new Date(start_date);
        let end = new Date(end_date);

        filtered = filtered.filter((item) => {
          const itemDate = new Date(item.date);
          return itemDate >= start && itemDate <= end;
        });
      }

      //FILTER WITH SELECT CATEGORY
      if (category !== "All" && categoryId) {
        filtered = filtered.filter((item) => {
          return item.category === category || item.categoryId === categoryId;
        });
      }

      //FILTER WITH SELECT SOURCE
      if (source !== "All" && sourceId) {
        filtered = filtered.filter((item) => {
          return item.sourceId === sourceId;
        });
      }

      setBackUp(filtered);
    }
  };

  useEffect(() => {
    let updatedData = [...transactionData];

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
  }, [sortConfig]);

  useEffect(() => {
    setBackUp(transactionData);
    setCurrentPage(1);
  }, [transactionData]);

  useEffect(() => {
    if (!transactionData?.length) {
      useGetTransaction();
    }

    if (!Object.values(categoryData)?.length) {
      useGetCategory();
    }
  }, []);

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <Card className="my-3 report">
        <CardBody className="pb-2">
          <CardTitle className="text-uppercase">Report Generate</CardTitle>
        </CardBody>
        <CardBody className="pt-3">
          {/* ========================== FILTER FORM ========================== */}
          <form
            onSubmit={handleSubmit}
            className="d-flex flex-wrap justify-content-between align-items-end mb-5 gap-20px gap-md-0 gap-4"
          >
            {reportInputs?.map((input) => (
              <Input
                {...input}
                max={
                  input.name === "start_date"
                    ? values["end_date"] || today
                    : today
                }
                min={input.name === "start_date" ? null : values["start_date"]}
                key={input?.id}
                value={values[input.name] || ""}
                errors={errors[input.name] || ""}
                onChange={handleChange}
              />
            ))}
            {reportDropdown?.map((select) => (
              <Dropdown
                {...select}
                key={select?.id}
                value={values[select?.name] || ""}
                options={[
                  { value: "", name: "All" },
                  ...Object.values(
                    select.name === "category" ? categoryData : sourceData
                  ),
                ]}
                onChange={handleChange}
                onSelect={(name, value, _, docId) =>
                  handleSelect(name, value, _, docId)
                }
              />
            ))}

            <Button color="primary" className="w-auto" type="submit">
              Filter
            </Button>
          </form>

          {/* =========================== TABLE =========================== */}
          <div className="d-flex flex-column gap-4 h-100 justify-content-between min-h-screen">
            <Table
              onSort={handleOnSort}
              sortConfig={sortConfig}
              columns={reportColumns}
              rows={backUp}
              loading={initLoading}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              colWidth="w-100"
              handleOpenImage={handleOpenImage}
            />
          </div>
        </CardBody>
      </Card>

      <ImageModal
        imageUrl={imageUrl}
        isOpen={isOpenImage}
        onClose={() => setIsOpenImage(false)}
      />
    </>
  );
};

export default Report;
