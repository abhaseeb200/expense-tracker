import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Dropdown as DropdownReactStrap,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Label,
  Spinner,
} from "reactstrap";

const Dropdown = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { isDarkMode } = useSelector((state) => state?.themeMode);

  const {
    label,
    errors,
    onChange,
    options,
    placeholder,
    onAddCategory,
    onSelect,
    loading,
    allValues,
    className,
    ...inputProps
  } = props;

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div className={`position-relative ${className}`}>
      <input type="hidden" {...inputProps} onChange={onChange} />

      <div className="d-flex justify-content-between">
        {label && <Label>{label}</Label>}
        {onAddCategory && (
          <div
            role="button"
            type="button"
            className="fw-bolder text-uppercase text-primary form-label"
            onClick={onAddCategory}
          >
            + Add New Category
          </div>
        )}
      </div>

      <DropdownReactStrap isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle
          caret
          color="dark"
          className="w-100 text-start bg-transparent form-control"
        >
          {inputProps?.value || placeholder}
        </DropdownToggle>
        <DropdownMenu dark={isDarkMode} className="w-100">
          {loading ? (
            <DropdownItem className="py-2 text-center">
              <Spinner size="sm" />
            </DropdownItem>
          ) : options?.length ? (
            options.map((i, index) => (
              <DropdownItem
                key={index}
                className="py-2"
                onClick={() => {
                  onSelect(inputProps?.name, i?.name, i?.id, i?.docId);
                }}
              >
                {i.name}
              </DropdownItem>
            ))
          ) : (
            //EMPTY ONCLICK CALL, DUE TO AVOID AUTO-OPEN ON PRESS ENTER
            <DropdownItem className="py-2" onClick={() => {}}>
              {allValues?.type
                ? "No Data Found"
                : "Please Select Transition Type"}
            </DropdownItem>
          )}
        </DropdownMenu>
      </DropdownReactStrap>

      {errors && (
        <small className="text-danger mt-1">{`Please provide ${inputProps?.name}`}</small>
      )}
    </div>
  );
};

export default Dropdown;
