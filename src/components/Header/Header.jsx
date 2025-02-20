import { useEffect, useState } from "react";
import "./header.scss";
import "boxicons";
import "animate.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

  useEffect(() => {
    const showAnim = gsap
      .fromTo(".header-wrap", { xPercent: 0 }, { xPercent: 200, duration: 1.5 })
      .pause();

    ScrollTrigger.create({
      trigger: ".header-wrap",
      start: "top top",
      end: "max",
      scrub: 9,
      onUpdate: (self) => {
        if (self.direction === 1) {
          // Scrolling down
          showAnim.duration(19.5).play();
        } else {
          // Scrolling up
          showAnim.duration(8.2).reverse();
        }
      },
    });
  }, []);

  useEffect(() => {
    // Animazione per l'intestazione
    gsap.from(".header-wrap", {
      duration: 1,
      y: 50,
      opacity: 1,
      ease: "power4.out",
    });
    gsap.to(".header-wrap", {
      duration: 1,
      y: 0,
      opacity: 1,
      ease: "power4.out",
    });
  }, []);

  return (
    <div className="header-wrap">
      <div className="top-description">
        <p className="animate__animated animate__tada animate__delay-5s">
          Github{" "}
          <a href="https://www.github.com/mikixit">
            <box-icon
              name="link-external"
              size="sm"
              border="square"
              animation="tada"
              style={{ marginLeft: 5 }}
              color={isDarkMode ? "white" : "black"}
            ></box-icon>{" "}
          </a>{" "}
        </p>

        <p className="animate__animated animate__tada animate__delay-2s">
          Linkedin{" "}
          <a href="https://www.linkedin.com/in/michaeltorresdev/">
            <box-icon
              name="link-external"
              size="sm"
              border="square"
              animation="tada"
              style={{ marginLeft: 5 }}
              color={isDarkMode ? "white" : "black"}
            ></box-icon>{" "}
          </a>{" "}
        </p>
      </div>
    </div>
  );
}

export default Header;
