import React from "react";
import "./contactButton.scss";
import "boxicons";
import { useState, useEffect } from "react";

function ContactButton() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const body = document.body;
    const observer = new MutationObserver(() => {
      setIsDarkMode(body.classList.contains("dark-mode"));
    });

    observer.observe(body, { attributes: true, attributeFilter: ["class"] });

    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <>
      <button
        className="button-contact"
        onClick={() =>
          (window.location.href =
            "https://github.com/MikixIT/Portfolio/blob/portfolio/CV/MichaelTorres-Lebenslauf.pdf?raw=true")
        }
      >
        {"  "}
        My CV
        <box-icon
          name="download"
          size="m"
          animation="tada"
          color={isDarkMode ? "white" : "black"}
          style={{ marginLeft: 8 }}
        ></box-icon>
      </button>
    </>
  );
}

export default ContactButton;
