import React from "react";
import "./contactButton.scss";
import "boxicons";

function ContactButton() {
  return (
    <>
      <button
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
          color="white"
          style={{ marginLeft: 8 }}
        ></box-icon>
      </button>
    </>
  );
}

export default ContactButton;
