import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, CardTitle } from "reactstrap";
import Search from "../../components/Search";
import categoryColumns from "../../config/constant/categoryColumns";
import useCategory from "../../hooks/useCategory";
import Table from "../../components/table";
import CategoryFrom from "../../components/categoryFrom";

const Category = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentDocID, setCurrentDocID] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [backUp, setBackUp] = useState([]);
  const [currentData, setCurrentData] = useState({});

  const { categoryData } = useSelector((state) => state.category);
  const { userData } = useSelector((state) => state?.auth);

  const { useGetCategory, useDeleteCategory, initLoading, loading } =
    useCategory();

  const handleDelete = async (data) => {
    setCurrentDocID(data?.docID);
    await useDeleteCategory(data?.docID);
  };

  const handleUpdate = (data) => {
    setIsUpdate(true);
    setIsOpenModal(true);
    setCurrentData(data);
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

  const handleAddCategory = () => {
    setCurrentData({});
    setIsOpenModal(true);
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
          <Search onClick={handleAddCategory} isOpenModal={isOpenModal} />
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

      <CategoryFrom
        isUpdate={isUpdate}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        setIsUpdate={setIsUpdate}
        currentData={currentData}
      />
    </>
  );
};

export default Category;
