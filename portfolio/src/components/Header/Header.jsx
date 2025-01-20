import React from "react";
import "./header.scss";

import "boxicons";

function Header() {
  return (
    <div className="header-wrap">
      <p className="top-description">
        My Github {""}
        <box-icon
          name="link-external"
          size="sm"
          border="square"
          animation="tada"
        ></box-icon>{" "}
      </p>
    </div>
  );
}

export default Header;
