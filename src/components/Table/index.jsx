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

const Pagination = ({ totalPages, onPageChange, currentPage }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination d-flex gap-2 m-0">
        <li>
          <ChevronIcon
            width="20"
            height="20"
            fill="#fff"
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
                className={`text-white page-item ${
                  currentPage === page && "border-primary text-primary"
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
            fill="#fff"
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
        <Link to={data?.docId}>
          <EyeIcon fill="#afb4b9" className="w-auto" />
        </Link>
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
  referenceData = [],
}) => {
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
                              ? "#fff"
                              : "#717171"
                          }
                        />
                        <CaretIcon
                          className="rotate-180"
                          fill={
                            sortConfig?.direction === "asc" &&
                            sortConfig?.key === column?.key
                              ? "#fff"
                              : "#717171"
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
                  <td key={colIndex} className="align-middle">
                    {column?.key !== "action" ? (
                      column?.function ? (
                        column.function(row, column?.key, referenceData)
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
