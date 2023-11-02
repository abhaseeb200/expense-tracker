import { Input } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

const CustInput = ({placeholder,type,value,onChange,isError,messageError}) => {
  return (
    <>
      <Input
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      className= {isError?"border-danger":""}
    />
    {messageError !== "" ? <small className="d-block text-danger">{messageError}</small>:""}
    </>
  );
};
export default CustInput;
