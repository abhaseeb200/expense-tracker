import { Input } from "reactstrap";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

const CustomInput = ({ isError, messageError, ...props }) => {
  const { isDarkMode } = useSelector((state) => state?.themeMode);
  return (
    <div className="w-100" data-bs-theme={isDarkMode ? "dark" : "light"}>
      <Input {...props} className={isError ? "validationError" : ""} />
      {messageError !== "" ? (
        <small className="d-block text-error">{messageError}</small>
      ) : (
        ""
      )}
    </div>
  );
};
export default CustomInput;
