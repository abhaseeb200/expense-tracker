import React, { useEffect } from "react";
import { useState } from "react";
import './style.css'

function SwitchTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [isDark]);

  return (
    <div onClick={() => setIsDark((prev) => !prev)} role="button">
      {isDark ? "Light" : "Dark"}
    </div>
  );
}

export default SwitchTheme;
