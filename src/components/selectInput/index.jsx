import { useSelector } from "react-redux";
import { Label } from "reactstrap";
import "./style.css";

const Select = (props) => {
  const { label, errors, onChange, options, ...inputProps } = props;
  const { isDarkMode } = useSelector((state) => state?.themeMode);

  return (
    <div data-bs-theme={isDarkMode ? "dark" : "light"} className="w-100">
      {label && <Label>{label}</Label>}
      <select {...inputProps} onChange={onChange} className="form-select">
        {options?.map((option, index) => (
          <option key={index} value={option?.value} hidden={index === 0}>
            {option?.name}
          </option>
        ))}
      </select>
      {errors && (
        <small className="text-danger mt-1">{`Please provide ${inputProps?.name}`}</small>
      )}
    </div>
  );
};

export default Select;
