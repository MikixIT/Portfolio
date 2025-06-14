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
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      document.body.classList.toggle("dark-mode", newMode);
      return newMode;
    });
  };

  useEffect(() => {
    if (buttonRef.current) {
      const showAnim = gsap
        .fromTo(
          buttonRef.current,
          { xPercent: 0 },
          { xPercent: -400, duration: 0.5 }
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
            showAnim.duration(0.5).play();
          } else {
            // Scrolling up
            showAnim.duration(0.2).reverse();
          }
        },
      });
    }
  }, []);

  useEffect(() => {
    gsap.from(".buttonDarkMode", {
      duration: 1,
      y: 700,
      opacity: 1,
      ease: "power2.out",
    });
    gsap.to(".buttonDarkMode", {
      duration: 1,
      y: 0,
      opacity: 1,
      ease: "power2.out",
    });
  }, []);
  return (
    <div className="buttonDarkMode" ref={buttonRef}>
      <button className="animate__animated" onClick={toggleDarkMode}>
        <box-icon
          type="solid"
          name="bulb"
          color={isDarkMode ? "white" : "black"}
          style={{ background: "transparent" }}
        ></box-icon>
      </button>
    </div>
  );
}

export default DarkMode;
