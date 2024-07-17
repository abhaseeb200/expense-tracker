import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, CardTitle } from "reactstrap";
import Search from "../../components/Search";
import Table from "../../components/table";
import CategoryFrom from "../../components/categoryFrom";
import categoryColumns from "../../config/constant/categoryColumns";
import useCategory from "../../hooks/useCategory";

const Category = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentDocID, setCurrentDocID] = useState("");
  const [search, setSearch] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [backUp, setBackUp] = useState([]);
  const [currentData, setCurrentData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const { categoryData } = useSelector((state) => state.category);

  const { useGetCategory, useDeleteCategory, initLoading, loading } =
    useCategory();

  const handleDelete = async (data) => {
    setCurrentDocID(data?.docId);
    await useDeleteCategory(data?.docId);
  };

  const handleUpdate = (data) => {
    setIsUpdate(true);
    setIsOpenModal(true);
    setCurrentData(data);
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
    setCurrentData({});
    setIsOpenModal(true);
  };

  useEffect(() => {
    let updatedData = [...categoryData];

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
    setBackUp(categoryData);
    setCurrentPage(1);
  }, [categoryData]);

  useEffect(() => {
    if (!categoryData?.length) {
      useGetCategory();
    }
  }, []);

  return (
    <>
      <Card className="my-3 h-100">
        {/* ================================ SCREEN TITLE ================================ */}
        <CardBody className="pb-0 d-flex justify-content-between gap-3 flex-column">
          <CardTitle className="text-uppercase">Add Category</CardTitle>
          <Search
            onClick={handleAddCategory}
            onChange={(e) => setSearch(e.target.value)}
            isOpenModal={isOpenModal}
            value={search}
          />
        </CardBody>

        {/* ================================ TABLE ================================ */}
        <CardBody className="row fill-available flex-column min-h-screen justify-content-between gap-4">
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
            colWidth="w-44"
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </CardBody>
      </Card>

      {/* ================================ SUBMIT FORM ================================ */}
      <CategoryFrom
        isUpdate={isUpdate}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        setIsUpdate={setIsUpdate}
        currentData={currentData}
        setCurrentData={setCurrentData}
      />
    </>
  );
};

export default Category;
