import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./footer.scss";

gsap.registerPlugin(ScrollTrigger);

function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;

    ScrollTrigger.create({
      trigger: document.documentElement,
      start: "bottom bottom",
      end: "bottom bottom",
      onEnter: () => {
        gsap.to(footer, {
          y: "0%",
          duration: 0.1, // più rapido
          ease: "power4.out", // più secco
        });
      },
      onLeaveBack: () => {
        gsap.to(footer, {
          y: "150%", // esce ancora di più
          duration: 0.1, // più rapido
          ease: "back.in(2)", // spinto verso il basso
        });
      },
      onUpdate: (self) => {
        if (self.direction === -1 && self.progress === 0) {
          gsap.to(footer, {
            y: "150%",
            duration: 0.1,
            ease: "back.in(2)",
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
