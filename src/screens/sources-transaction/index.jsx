import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
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
import sourceColumns from "../../constant/columns/sourceColumns";
import SourceInputs from "../../constant/inputs/sourceInputs";
import useSource from "../../hooks/useSource";
import "./style.css";
import ImageModal from "../../components/ImageModal";

const SourcesTransaction = () => {
  const [currentDocId, setCurrentDocId] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [backUp, setBackUp] = useState([]);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [preview, setPreview] = useState("");
  const [isOpenImage, setIsOpenImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const {
    useGetSource,
    useAddSource,
    useUpdateSource,
    useDeleteSource,
    initLoading,
    loading,
  } = useSource();

  const { userData } = useSelector((state) => state?.auth);
  const { sourceData } = useSelector((state) => state?.source);

  const handleDelete = async (data) => {
    await useDeleteSource(data?.docId);
  };

  const handleUpdate = (data) => {
    setPreview(data?.sourceURL);
    setIsUpdate(true);
    setIsOpenModal(true);
    setValues(data);
    setCurrentDocId(data?.docId);
  };

  const handleClosedModal = () => {
    setValues({});
    setErrors({});
    setPreview("");
  };

  const handleOnSort = (columnKey) => {
    console.log(columnKey);

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

  const handleModalCancel = () => {
    setIsOpenModal(false);
    setIsUpdate(false);
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];

    if (!file?.type.includes("image"))
      return toast?.error("File type not accepted");

    if (file.size > 500 * 1024)
      return toast?.error("File size must be less than 500 KB");

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setErrors({ ...errors, [event.target.name]: false });
    };
    reader.readAsDataURL(file);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });

    // REMOVE DESCRIPTION VALIDATION
    if (e.target.name === "description") return;

    if (!e.target.value?.trim()) {
      setErrors({ ...errors, [e.target.name]: true });
    } else {
      setErrors({ ...errors, [e.target.name]: false });
    }
  };

  const handleOpenImage = (url) => {
    setImageUrl(url);
    setIsOpenImage(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {};
    let error = {};
    let formData = new FormData(e.target);

    formData.forEach((value, key) => {
      data[key] = value;

      if (typeof value === "object") {
        if (value.size === 0) {
          error[key] = true;
        }
      } else {
        if (!value?.trim() && key !== "description") {
          error[key] = true;
        }
      }
    });

    setErrors(error);

    //SUBMIT THE FORM BY USING 'DATA'
    if (!Object.values(error).includes(true)) {
      let body = {
        ...data,
        userId: userData?.userId,
        timeStamp: Date.now(),
      };

      if (isUpdate) {
        await useUpdateSource(data, currentDocId);
      } else {
        await useAddSource(body, setValues, setPreview);
      }
    }
  };

  useEffect(() => {
    let updatedData = [...Object.values(sourceData)];

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
    setBackUp(Object.values(sourceData));
    setCurrentPage(1);
  }, [sourceData]);

  useEffect(() => {
    if (!Object.values(sourceData)?.length) {
      useGetSource();
    }
  }, []);

  return (
    <>
      <Card className="my-3 h-100">
        {/* ================================ SCREEN TITLE ================================ */}
        <CardBody className="pb-0 d-flex justify-content-between gap-3 flex-column">
          <CardTitle>
            Add Transactions Source
          </CardTitle>
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
            columns={sourceColumns}
            rows={backUp}
            loading={initLoading}
            iconLoading={loading}
            docId={currentDocId}
            currentPage={currentPage}
            isView={true}
            setCurrentPage={setCurrentPage}
            colWidth="w-210px"
            handleOpenImage={handleOpenImage}
          />
        </CardBody>
      </Card>

      {/* ================================ FORM - MODAL ================================ */}
      <Modal
        className="modal-dialog-centered"
        isOpen={isOpenModal}
        onClosed={handleClosedModal}
      >
        <ModalHeader>{isUpdate ? "Update Source" : "Add Source"}</ModalHeader>
        <form onSubmit={handleSubmit} className="d-flex flex-column">
          <ModalBody className="gap-4 d-flex flex-column">
            {/* ======================= UPLOAD FILE ======================= */}
            <div className="file-upload-wrapper">
              <input
                type="file"
                id="fileInput"
                className="file-input"
                name="uploadSource"
                accept="image/*"
                onChange={handleUpload}
              />
              <label htmlFor="fileInput" className="file-label">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-100 h-100 object-fit-cover"
                  />
                ) : (
                  <div className="d-flex flex-column align-items-center">
                    <box-icon
                      name="cloud-upload"
                      color="#696cff"
                      style={{ width: "45px", height: "100%" }}
                    ></box-icon>
                    <span className="form-label text-primary fw-bold">
                      Upload a source
                    </span>
                  </div>
                )}
              </label>
              {errors.uploadSource && (
                <small className="text-danger mt-1">
                  Please provide source
                </small>
              )}
            </div>

            {/* ======================= OTHERS INPUTS ======================= */}
            {SourceInputs?.map((input) => {
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

      <ImageModal
        imageUrl={imageUrl}
        isOpen={isOpenImage}
        onClose={() => setIsOpenImage(false)}
      />
    </>
  );
};

export default SourcesTransaction;
