import React, { useState } from "react";
import "./darkMode.scss";

function DarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode", isDarkMode);
  };

  return (
    <div className="buttonDarkMode">
      <button onClick={toggleDarkMode}>
        <box-icon
          type="solid"
          name="bulb"
          color={isDarkMode ? "black" : "white"}
          animation="flashing-hover"
        ></box-icon>
      </button>
    </div>
  );
}

export default DarkMode;
