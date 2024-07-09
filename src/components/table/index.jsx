import React, { useState } from "react";
import { Table as BootstrapTable, Button, CardText, Spinner } from "reactstrap";
import { CaretIcon, EditIcon, TrashIcon } from "../Icons";
import "./style.css";

const Pagination = ({ totalPages, onPageChange, currentPage }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination d-flex gap-2">
        <li>
          <Button
            className="text-white page-item"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </Button>
        </li>
        {pages.map((page, index) => {
          return (
            <li>
              <Button
                key={index}
                color={currentPage === page ? "primary" : "secondary"}
                className="text-white page-item"
                onClick={() => onPageChange(page)}
              >
                {page}
              </Button>
            </li>
          );
        })}
        <li>
          <Button
            className="text-white page-item"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </li>
      </ul>
    </nav>
  );
};

const Actions = ({ onDelete, onUpdate, data, iconLoading, docId }) => {
  const isLoading = iconLoading && docId === data?.docID;
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
}) => {
  const [currentPage, setCurrentPage] = useState(1);

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
                  role={isNotAction ? "button" : ""}
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
                  <td key={colIndex}>
                    {column?.key !== "action" ? (
                      column?.function ? (
                        column.function(row[column?.key])
                      ) : typeof row[column?.objectKey] === "object" ? (
                        row[column?.objectKey][column?.key]
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
