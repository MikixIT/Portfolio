import React, { useState, useEffect, useRef } from "react";
import "./contactButton.scss";
import { gsap } from "gsap";

function ContactButton({ calendarButtonClicked }) {
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
    if (!buttonRef.current || !dropdownRef.current) return;

    if (isDropdownOpen) {
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 2.1, ease: "power2.out" }
      );
    } else {
    }
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
              onClick={() => {
                const contactForm = document.getElementById("contact-form");
                if (contactForm) {
                  contactForm.scrollIntoView({ behavior: "smooth" });
                }
                setIsDropdownOpen(false);
              }}
            >
              📩
            </div>

            <div className="dropdown-item" onClick={calendarButtonClicked}>
              📆
            </div>
          </div>
        ) : (
          <>
            {"  "}
            GET IN TOUCH
          </>
        )}
      </button>
    </div>
  );
}

export default ContactButton;
