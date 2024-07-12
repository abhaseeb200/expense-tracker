import { Label, Input as ReactStrapInput } from "reactstrap";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { useState } from "react";
import { useEffect } from "react";

const CustomInput = ({ className, isError, messageError, ...props }) => {
  const { isDarkMode } = useSelector((state) => state?.themeMode);
  return (
    <div className="w-100" data-bs-theme={isDarkMode ? "dark" : "light"}>
      <ReactStrapInput
        {...props}
        className={`${className} ${isError && "validationError"}`}
      />
      {messageError !== "" ? (
        <small className="d-block text-errors">{messageError}</small>
      ) : (
        ""
      )}
    </div>
  );
};

const Input = (props) => {
  const { isDarkMode } = useSelector((state) => state?.themeMode);
  const {
    label,
    errors,
    errorMessage,
    onChange,
    className,
    inputClassName,
    ...inputProps
  } = props;

  return (
    <div
      className={`d-flex flex-column ${className}`}
      data-bs-theme={isDarkMode ? "dark" : "light"}
    >
      {label && <Label>{label}</Label>}
      <ReactStrapInput
        {...inputProps}
        onChange={onChange}
        className={inputClassName}
      />
      {inputProps?.value && (
        <small className="text-danger d-none">{errorMessage}</small>
      )}
      {errors && (
        <small className="text-danger mt-1">{`Please provide ${inputProps?.name}`}</small>
      )}
    </div>
  );
};

export { Input, CustomInput };
