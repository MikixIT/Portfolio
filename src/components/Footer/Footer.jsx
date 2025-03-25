import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./footer.scss";

gsap.registerPlugin(ScrollTrigger);

function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;

    // GSAP ScrollTrigger per animare il footer
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: "bottom bottom",
      end: "bottom bottom",

      onEnter: () => {
        gsap.to(footer, {
          y: "0%",
          duration: 1,
          ease: "power2.out",
        });
      },
      onLeaveBack: () => {
        gsap.to(footer, {
          y: "100%",
          duration: 1,
          ease: "power2.in",
        });
      },
      onUpdate: (self) => {
        if (self.direction === -1 && self.progress === 0) {
          gsap.to(footer, {
            y: "100%",
            duration: 0.2,
            ease: "power2.in",
          });
        }
      },
    });
  }, []);

  return (
    <footer ref={footerRef}>
      Dev with <a href="https://github.com/MikixIT/Portfolio">⚛️</a> by{" "}
      <a href="https://www.linkedin.com/in/michaeltorresdeveloper/">
        Michael Torres
      </a>
    </footer>
  );
}

export default Footer;
