import { Input } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { useState } from "react";

const CustomInput = ({ isError, messageError, ...props }) => {
  return (
    <>
      <Input {...props} className={isError ? "validationError" : ""} />
      {messageError !== "" ? (
        <small className="d-block text-error">{messageError}</small>
      ) : (
        ""
      )}
    </>
  );
};
export default CustomInput;
