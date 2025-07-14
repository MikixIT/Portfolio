import React, { useState, useEffect, useRef } from "react";
import "./darkMode.scss";
import "animate.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdOutlineNightlight } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

function DarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === null ? true : saved === "true";
  });
  const buttonRef = useRef(null);
  const buttonIconRef = useRef(null);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      document.body.classList.toggle("dark-mode", newMode);
      document.body.classList.toggle("light-mode", !newMode);
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  useEffect(() => {
    // On mount, set the correct class on body
    document.body.classList.toggle("dark-mode", isDarkMode);
    document.body.classList.toggle("light-mode", !isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const button = document.querySelector(".buttonDarkMode");

    gsap.set(button, {
      y: 0,
      opacity: 1,
    });

    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        if (self.direction === 1 && self.progress > 0.1) {
          // Scrolling down - hide button
          gsap.to(button, {
            y: -100,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          });
        } else if (self.direction === -1 || self.progress < 0.1) {
          // Scrolling up or at top - show button
          gsap.to(button, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          });
        }
      },
    });
  }, []);

  useEffect(() => {
    gsap.set(".buttonDarkMode", {
      opacity: 0,
      visibility: "hidden",
      y: 20,
    });

    gsap.to(".buttonDarkMode", {
      duration: 3,
      y: 0,
      opacity: 1,
      visibility: "visible",
      ease: "power3.out",
      delay: 0.1,
    });
  }, []);

  useEffect(() => {
    if (buttonIconRef.current) {
      gsap.set(buttonIconRef.current, {
        opacity: 0,
        y: -30,
        scale: 0.8,
        rotationX: -15,
      });

      gsap.to(buttonIconRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.5,
      });
    }
  }, []);

  return (
    <div className="buttonDarkMode" ref={buttonRef}>
      <button
        className="animate__animated"
        onClick={toggleDarkMode}
        ref={buttonIconRef}
      >
        <MdOutlineNightlight
          size={28}
          color={isDarkMode ? "#fff" : "#000"}
          style={{ background: "transparent" }}
        />
      </button>
    </div>
  );
}

export default DarkMode;
