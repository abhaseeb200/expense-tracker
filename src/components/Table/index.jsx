import React, { useState } from "react";
import { Table as BootstrapTable, Button, CardText, Spinner } from "reactstrap";
import {
  ChevronIcon,
  CaretIcon,
  EditIcon,
  TrashIcon,
  EyeOffIcon,
  EyeIcon,
} from "../Icons";
import "./style.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatDate } from "../../lib/helper";

const Pagination = ({ totalPages, onPageChange, currentPage }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination d-flex gap-2 ">
        <li>
          <ChevronIcon
            width="20"
            height="20"
            fill="#384551"
            role="button"
            className={`transform-rotate page-item ${
              currentPage === 1 && "pointer-event-none opacity-6"
            }`}
            onClick={() => onPageChange(currentPage - 1)}
          />
        </li>
        {pages.map((page, index) => {
          return (
            <li key={index}>
              <div
                className={`page-item ${
                  currentPage === page && "text-white active"
                }`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </div>
            </li>
          );
        })}
        <li>
          <ChevronIcon
            width="20"
            height="20"
            fill="#384551"
            role="button"
            className={`page-item ${
              currentPage === totalPages && "pointer-event-none opacity-6"
            }`}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </li>
      </ul>
    </nav>
  );
};

const Actions = ({
  isUpdate,
  onDelete,
  onUpdate,
  data,
  iconLoading,
  docId,
  isView,
  handleOpenImage,
}) => {
  const isLoading = iconLoading && !isUpdate && docId === data?.docId;
  return (
    <div className="d-flex gap-2 justify-content-end align-items-center h-full">
      <div
        onClick={() => onDelete(data)}
        role="button"
        className={`${isLoading && "d-flex"}`}
      >
        {isLoading ? (
          <Spinner style={{ width: "15px", height: "15px" }} />
        ) : (
          <TrashIcon fill="#afb4b9" size="18" role="button" />
        )}
      </div>
      <div onClick={() => onUpdate(data)} role="button">
        <EditIcon fill="#afb4b9" size="18" />
      </div>
      {isView && (
        <EyeIcon
          fill="#afb4b9"
          className="w-auto"
          onClick={() => handleOpenImage(data?.sourceURL)}
        />
      )}
    </div>
  );
};

const Table = ({
  onDelete,
  onUpdate,
  onSort,
  sortConfig,
  columns,
  rows,
  loading,
  iconLoading,
  docId,
  isUpdate = false,
  colWidth = "w-18",
  currentPage = 1,
  setCurrentPage,
  isView,
  handleOpenImage,
  isReport,
  reportData = {},
}) => {
  const { isDarkMode } = useSelector((state) => state?.themeMode);

  console.log(reportData);

  const rowsPerPage = 10;

  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getCurrentPageRows = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return rows.slice(startIndex, startIndex + rowsPerPage);
  };

  return (
    <>
      <BootstrapTable responsive>
        <thead>
          <tr>
            {columns?.map((column, index) => {
              const isNotAction = column?.key !== "action";
              return (
                <th
                  scope="row"
                  key={index}
                  role={isNotAction ? "button" : null}
                  className={colWidth}
                  onClick={() =>
                    isNotAction ? onSort(column?.key, column?.objectKey) : null
                  }
                >
                  <div className="d-flex justify-content-between position-relative">
                    {column?.title}
                    {isNotAction && (
                      <span
                        className="d-flex flex-column position-absolute cursor-pointer end-0"
                        style={{ top: "-2px" }}
                      >
                        <CaretIcon
                          fill={
                            sortConfig?.direction === "desc" &&
                            sortConfig?.key === column?.key
                              ? isDarkMode
                                ? "#fff"
                                : "#000"
                              : isDarkMode
                              ? "#717171"
                              : "#a9a9a9"
                          }
                        />
                        <CaretIcon
                          className="rotate-180"
                          fill={
                            sortConfig?.direction === "asc" &&
                            sortConfig?.key === column?.key
                              ? isDarkMode
                                ? "#fff"
                                : "#000"
                              : isDarkMode
                              ? "#717171"
                              : "#a9a9a9"
                          }
                        />
                      </span>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns?.length + 1}>
                <div className="d-flex justify-content-center align-items-center h-100px">
                  <Spinner size="sm" />
                </div>
              </td>
            </tr>
          ) : rows?.length ? (
            getCurrentPageRows()?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns?.map((column, colIndex) => (
                  <td key={colIndex} className="align-middle break-spaces">
                    {column?.key !== "action" ? (
                      column?.function ? (
                        column.function(row, column?.key, handleOpenImage)
                      ) : (
                        row[column?.key]
                      )
                    ) : (
                      <Actions
                        iconLoading={iconLoading}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                        data={row}
                        docId={docId}
                        isUpdate={isUpdate}
                        isView={isView}
                        handleOpenImage={handleOpenImage}
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns?.length + 1} className="text-center h-100px">
                No Data found
              </td>
            </tr>
          )}
        </tbody>
      </BootstrapTable>

      {isReport && (
        <div className="my-4 d-flex flex-row flex-wrap gap-5 justify-content-between align-items-center">
          <div className="d-flex flex-column align-items-center gap-2">
            <h6 className="fw-bold m-0 text-uppercase">Expense: </h6>
            <span className="fw-bold">Rs. {reportData?.expense}</span>
          </div>

          <div className="d-flex flex-column align-items-center gap-2">
            <h6 className="fw-bold m-0 text-uppercase">Income: </h6>
            <span className="fw-bold">Rs. {reportData?.income}</span>
          </div>

          <div className="d-flex flex-column align-items-center gap-2">
            <h6 className="fw-bold m-0 text-uppercase">Saving: </h6>
            <span className="fw-bold">
              Rs. {Math.max(reportData?.income - reportData?.expense, 0)}
            </span>
          </div>

          {/* <div className="d-flex flex-column align-items-center gap-2">
            <h6 className="fw-bold m-0 text-uppercase">Date Range: </h6>
            <span className="">{new Date(reportData?.fromDate?.seconds * 1000).toDateString()} <b>-</b> {new Date(reportData?.toDate?.seconds * 1000).toDateString()}</span>
          </div> */}
        </div>
      )}

      {rows && rows?.length > rowsPerPage && (
        <Pagination
          totalPages={totalPages}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      )}
    </>
  );
};

export default Table;
