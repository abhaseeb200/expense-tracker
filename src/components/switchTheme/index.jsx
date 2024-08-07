import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isDark } from "../../feature/themeMode/themeSlice";
import "./style.css";

function SwitchTheme() {
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector((state) => state?.themeMode);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [isDarkMode]);

  return (
    <div
      onClick={() => {
        dispatch(isDark(!isDarkMode));
      }}
      role="button"
      className="lh-0"
    >
      {isDarkMode ? (
        <box-icon name="moon" color="#fff" role="button"></box-icon>
      ) : (
        <box-icon name="sun" color="#000" role="button"></box-icon>
      )}
    </div>
  );
}

export default SwitchTheme;
