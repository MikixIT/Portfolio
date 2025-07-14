import React, { useState, useEffect, useRef } from "react";
import "./contactButton.scss";
import { VscComment } from "react-icons/vsc";
import { gsap } from "gsap";

function ContactButton({ calendarButtonClicked }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === null ? true : saved === "true";
  });
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
        { opacity: 0, y: -20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out" }
      );
      gsap.to(buttonRef.current, {
        scale: 1.08,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
      });
      gsap.fromTo(
        ".dropdown-item",
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.1, delay: 0.1 }
      );
    } else {
      gsap.to(dropdownRef.current, {
        opacity: 0,
        y: -20,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.in",
      });
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

  return (
    <div className="apple-dropdown-container">
      <button
        className={`apple-contact-btn${isDarkMode ? " dark" : ""}${
          isDropdownOpen ? " open" : ""
        }`}
        onClick={toggleDropdown}
        ref={buttonRef}
        aria-haspopup="true"
        aria-expanded={isDropdownOpen}
      >
        <span
          className="apple-contact-icon"
          aria-hidden="true"
          style={{ background: "transparent" }}
        >
          <VscComment
            size={24}
            color={isDarkMode ? "white" : "black"}
            style={{ background: "transparent" }}
          />
        </span>
        <span className="apple-contact-text">Get in touch</span>
        <span
          className="apple-contact-chevron"
          aria-hidden="true"
          style={{ background: "transparent" }}
        >
          ▾
        </span>
      </button>
      <div
        className={`apple-dropdown${isDropdownOpen ? " show" : ""}${
          isDarkMode ? " dark" : ""
        }`}
        ref={dropdownRef}
        role="menu"
      >
        <div
          className="dropdown-item"
          role="menuitem"
          tabIndex={0}
          onClick={() => {
            const contactForm = document.getElementById("contact-form");
            if (contactForm) {
              contactForm.scrollIntoView({ behavior: "smooth" });
            }
            setIsDropdownOpen(false);
          }}
        >
          <span
            className="dropdown-item-icon"
            aria-hidden="true"
            style={{ background: "transparent" }}
          >
            📩
          </span>
          <span className="dropdown-item-label">Email Form</span>
        </div>
        <div
          className="dropdown-item"
          role="menuitem"
          tabIndex={0}
          onClick={calendarButtonClicked}
        >
          <span
            className="dropdown-item-icon"
            aria-hidden="true"
            style={{ background: "transparent" }}
          >
            📆
          </span>
          <span className="dropdown-item-label">Book a Call</span>
        </div>
      </div>
    </div>
  );
}

export default ContactButton;
