import { Input } from "reactstrap";
import "./style.css";
import { useState } from "react";

const Select = ({ children, onChange, value, isError, messageError }) => {
  return (
    <>
      <select
        value={value}
        onChange={onChange}
        className={isError ? "validationError form-select" : "form-select"}
      >
        {children}
      </select>
      {messageError !== "" ? (
        <small className="d-block text-error">{messageError}</small>
      ) : (
        ""
      )}
    </>
  );
};

export default Select;
