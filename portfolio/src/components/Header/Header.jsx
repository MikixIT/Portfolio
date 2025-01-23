import { useEffect, useState } from "react";
import "./header.scss";
import "boxicons";

function Header() {
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
    <div className="header-wrap">
      <p className="top-description">
        My Github{" "}
        <a href="https://www.github.com/mikixit">
          <box-icon
            name="link-external"
            size="sm"
            border="square"
            animation="tada"
            style={{ marginLeft: 5 }}
            color={isDarkMode ? "white" : "black"}
          ></box-icon>{" "}
        </a>
      </p>
    </div>
  );
}

export default Header;
