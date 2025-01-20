import React from "react";
import "./header.scss";
import "boxicons";

function Header() {
  return (
    <div className="header-wrap">
      <p className="top-description">
        My Github{" "}
        <a href="https://www.github.com/mikixit">
          <box-icon
            name="link-external"
            size="sm"
            border="square"
            animation="tada"
          ></box-icon>{" "}
        </a>
      </p>
    </div>
  );
}

export default Header;
