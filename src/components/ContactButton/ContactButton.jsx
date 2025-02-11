import React, { useState, useEffect, useRef } from "react";
import "./contactButton.scss";
import "boxicons";
import { gsap } from "gsap";

function ContactButton() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

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

  useEffect(() => {
    if (isDropdownOpen) {
      gsap.to(buttonRef.current, {
        width: "300px",
        duration: 0.1,
        ease: "power2.out",
      });
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 2.1, ease: "power2.out" }
      );
    } else {
      gsap.to(dropdownRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.1,
        ease: "power2.in",
        onComplete: () => {
          gsap.to(buttonRef.current, {
            width: "200px",
            duration: 0.1,
            ease: "power2.in",
          });
        },
      });
    }
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (url) => {
    window.location.href = url;
    setIsDropdownOpen(false);
  };

  return (
    <div className="dropdown-container">
      <button
        className="button-contact animate__pulse"
        onClick={toggleDropdown}
        ref={buttonRef}
      >
        {isDropdownOpen ? (
          <div className="button-options" ref={dropdownRef}>
            <div
              className="dropdown-item"
              onClick={() =>
                handleOptionClick(
                  "https://github.com/MikixIT/Portfolio/raw/refs/heads/portfolio/CV/MichaelTorres-Lebenslauf.pdf"
                )
              }
            >
              🇩🇪 Deutsch CV
            </div>
            <div
              className="dropdown-item"
              onClick={() =>
                handleOptionClick(
                  "https://github.com/MikixIT/Portfolio/raw/refs/heads/portfolio/CV/MichaelTorres-CV.pdf"
                )
              }
            >
              🇬🇧 English CV
            </div>
          </div>
        ) : (
          <>
            {"  "}
            My CV
            <box-icon
              name="download"
              size="m"
              animation="tada"
              color={isDarkMode ? "white" : "black"}
              style={{ marginLeft: 8 }}
            ></box-icon>
          </>
        )}
      </button>
    </div>
  );
}

export default ContactButton;
