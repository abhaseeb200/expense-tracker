import { Input } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import { useState } from "react";

const CustomInput = ({isError,messageError,...props}) => {
  
  return (
    <>
      <Input
      {...props}
      // max={max}
      // min={min}
      // disabled = {disabled}
      // placeholder={placeholder}
      // type={type}
      // value={value}
      // onChange={onChange}
      className= {isError?"validationError":""}
      // autoComplete="on"
    />
    {messageError !== "" ? <small className="d-block text-error">{messageError}</small>:""}
    </>
  );
};
export default CustomInput;