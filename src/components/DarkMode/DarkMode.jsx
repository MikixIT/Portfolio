import React, { useState, useEffect, useRef } from "react";
import "./darkMode.scss";
import "animate.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function DarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const buttonRef = useRef(null);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode", isDarkMode);
  };

  useEffect(() => {
    const showAnim = gsap
      .fromTo(
        buttonRef.current,
        { xPercent: 0 },
        { xPercent: 100, duration: 2.5 }
      )
      .pause();

    ScrollTrigger.create({
      trigger: buttonRef.current,
      start: "top top",
      end: "max",
      scrub: 9,
      onUpdate: (self) => {
        if (self.direction === 1) {
          // Scrolling down
          showAnim.duration(9.5).play();
        } else {
          // Scrolling up
          showAnim.duration(1.2).reverse();
        }
      },
    });
  }, []);

  return (
    <div className="buttonDarkMode" ref={buttonRef}>
      <button
        className="animate__animated animate__backInDown animate__delay-2s"
        onClick={toggleDarkMode}
      >
        <box-icon
          type="solid"
          name="bulb"
          color={isDarkMode ? "black" : "white"}
          style={{ background: "transparent" }}
        ></box-icon>
      </button>
    </div>
  );
}

export default DarkMode;
