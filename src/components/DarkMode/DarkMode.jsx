import React, { useState, useEffect } from "react";
import "./darkMode.scss";
import "animate.css";
import { gsap } from "gsap";

function DarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode", isDarkMode);
  };

  // useEffect(() => {
  //   const button = document.querySelector(".buttonDarkMode");

  //   const handleScroll = () => {
  //     if (window.scrollY > 200) {
  //       // sostituisci 200 con la distanza di scorrimento desiderata
  //       gsap.to(button, {
  //         duration: 0.7,
  //         translateY: -100,
  //         opacity: 0,
  //         ease: "power2.in",
  //       });
  //     } else {
  //       gsap.to(button, {
  //         duration: 0.7,
  //         translateY: 0,
  //         opacity: 1,
  //         ease: "power2.out",
  //       });
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <div className="buttonDarkMode">
      <button
        className="animate__animated animate__backInDown animate__delay-2s"
        onClick={toggleDarkMode}
      >
        <box-icon
          type="solid"
          name="bulb"
          color={isDarkMode ? "black" : "white"}
          styel={" background: transparent;"}
        ></box-icon>
      </button>
    </div>
  );
}

export default DarkMode;
