import React from "react";
import "./contactButton.scss";
import "boxicons";

function ContactButton() {
  return (
    <>
      <button
        onClick={() => (window.location.href = "https://www.example.com")}
      >
        {"  "}
        My CV
        <box-icon
          name="download"
          size="m"
          animation="tada-hover"
          color="white"
          style={{ marginLeft: 8 }}
        ></box-icon>
      </button>
    </>
  );
}

export default ContactButton;
