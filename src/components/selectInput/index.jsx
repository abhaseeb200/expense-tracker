import { useSelector } from "react-redux";
import "./style.css";

const Select = ({ children, onChange, value, isError, messageError }) => {
  const { isDarkMode } = useSelector((state) => state?.themeMode);


  return (
    <div data-bs-theme={isDarkMode ? "dark" : "light"} className="w-100">
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
    </div>
  );
};

export default Select;
