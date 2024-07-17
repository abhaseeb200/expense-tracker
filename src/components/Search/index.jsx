import React from "react";
import { Input } from "../input";
import { Button } from "reactstrap";
import "./style.css";
import { useSelector } from "react-redux";

const Search = (props) => {
  const { onClick, isOpenModal, value, onChange } = props;

  const { isDarkMode } = useSelector((state) => state?.themeMode);

  return (
    <div className="d-flex gap-2 flex-sm-row flex-column">
      {/* ===================== SEARCH - INPUT ===================== */}
      <div className="position-relative w-100">
        <span className="position-absolute lh-0 top-9px left-14px">
          <box-icon
            name="search"
            color={isDarkMode ? "#fff" : "#697a8d"}
            size="20px"
          ></box-icon>
        </span>
        <Input
          placeholder="Search content..."
          inputClassName="ps-40 w-100"
          onChange={onChange}
          value={value}
        />
      </div>

      {/* ===================== MODAL OPEN - BUTTON ===================== */}
      <Button
        color="primary"
        className="w-200px"
        onClick={() => onClick(!isOpenModal)}
      >
        Add New
      </Button>
    </div>
  );
};

export default Search;
