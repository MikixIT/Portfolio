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
      trigger: document.documentElement, // Trigger sull'intero documento
      start: "bottom-=100 bottom", // Quando il fondo della pagina è visibile
      end: "bottom bottom", // Fine del trigger
      onEnter: () => {
        gsap.to(footer, {
          y: "0%", // Mostra il footer
          duration: 1,
          ease: "power2.out",
        });
      },
      onLeaveBack: () => {
        gsap.to(footer, {
          y: "100%", // Nasconde il footer
          duration: 1,
          ease: "power2.in",
        });
      },
      onUpdate: (self) => {
        // Controllo esplicito per chiudere il footer durante uno scroll veloce
        if (self.direction === -1 && self.progress === 0) {
          gsap.to(footer, {
            y: "100%", // Nasconde il footer
            duration: 0.5,
            ease: "power2.in",
          });
        }
      },
    });
  }, []);

  return (
    <div
      ref={footerRef}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "100px",
        backgroundColor: "#333",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: "translateY(100%)", // Footer inizialmente nascosto
        letterSpacing: "5px",
      }}
    >
      Dev with ⚛️ by Michael Torres
    </div>
  );
}

export default Footer;
