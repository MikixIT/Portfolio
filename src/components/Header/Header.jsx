import { useEffect, useState, useRef } from "react";
import "./header.scss";
import "animate.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";
import { useDarkMode } from "../../hooks/useDarkMode";

gsap.registerPlugin(ScrollTrigger);

function Header() {
  const [isDarkMode] = useDarkMode();
  const headerIconsRef = useRef(null);

  useEffect(() => {
    const header = document.querySelector(".header-wrap");

    gsap.set(header, {
      y: 0,
      opacity: 1,
    });

    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        if (self.direction === 1 && self.progress > 0.1) {
          // Scrolling down - hide header
          gsap.to(header, {
            y: -100,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          });
        } else if (self.direction === -1 || self.progress < 0.1) {
          // Scrolling up or at top - show header
          gsap.to(header, {
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
    gsap.set(".header-wrap", {
      opacity: 0,
      visibility: "hidden",
      y: 20,
    });

    gsap.to(".header-wrap", {
      duration: 3,
      y: 0,
      opacity: 1,
      visibility: "visible",
      ease: "power3.out",
      delay: 0.1,
    });
  }, []);

  useEffect(() => {
    const icons = headerIconsRef.current?.children;

    if (icons) {
      gsap.set(icons, {
        opacity: 0,
        y: -30,
        scale: 0.8,
        rotationX: -15,
      });

      gsap.to(icons, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.5,
      });
    }
  }, []);

  return (
    <div className="header-wrap">
      <div className="header-icons" ref={headerIconsRef}>
        <a
          href="https://github.com/MikixIT/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="header-icon"
        >
          <FaGithub
            size={24}
            color={isDarkMode ? "white" : "black"}
            style={{ background: "transparent" }}
          />
        </a>
        x
        <a
          href="https://www.linkedin.com/in/michaeltorresdev/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="header-icon"
        >
          <FaLinkedin
            size={24}
            color={isDarkMode ? "white" : "black"}
            style={{ background: "transparent" }}
          />
        </a>
        <a
          href="https://github.com/MikixIT/Portfolio/raw/refs/heads/portfolio/CV/MichaelTorres-CV.pdf"
          className="header-icon"
          title="Download CV"
          download
        >
          <HiDownload
            size={24}
            color={isDarkMode ? "#fff" : "#000"}
            style={{ background: "transparent" }}
          />
        </a>
      </div>
    </div>
  );
}

export default Header;
