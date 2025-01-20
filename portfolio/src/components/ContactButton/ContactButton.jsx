import React from "react";
import "./contactButton.scss";
import "boxicons";

function ContactButton() {
  return (
    <>
      <button>
        {"  "}
        My Resume
        <box-icon
          name="download"
          size="m"
          animation="tada-hover"
          color="black"
        ></box-icon>
      </button>
    </>
  );
}

export default ContactButton;
