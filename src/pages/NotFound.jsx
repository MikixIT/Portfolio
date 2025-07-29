import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import LiquidChrome from "../components/Animations/LiquidChrome";

function NotFound() {
  const containerRef = useRef(null);
  const firstFourRef = useRef(null);
  const zeroRef = useRef(null);
  const lastFourRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

    tl.fromTo(
      containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0 }
    ).fromTo(
      [firstFourRef.current, zeroRef.current, lastFourRef.current],
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.15 },
      "-=0.6"
    );

    gsap.to(firstFourRef.current, {
      y: 0,
      duration: 0.5,
      yoyo: true,
      ease: "power1.inOut",
      delay: 1,
    });

    gsap.to(zeroRef.current, {
      x: 10,
      duration: 0.2,
      repeat: 1,
      yoyo: true,
      ease: "power1.inOut",
      delay: 1.2,
      onRepeat: () => {
        gsap.to(lastFourRef.current, {
          rotation: 24,
          y: 40,
          duration: 1.3,
          ease: "power2.in",
          yoyo: true,
          repeat: 2,
        });
      },
    });

    gsap.to(lastFourRef.current, {
      rotation: 0,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
      repeat: 5,
      repeatDelay: 0.7,
    });
  }, []);

  return (
    <div
      className="dark-mode"
      ref={containerRef}
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--body_bg)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        margin: "0px auto",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "50%",
          height: "300px",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "transparent",
        }}
      >
        <LiquidChrome
          baseColor={[0.1, 0.1, 0.1]}
          speed={0.5}
          amplitude={0.4}
          interactive={true}
        />
      </div>
      <h1
        style={{
          fontSize: "6rem",
          fontWeight: 600,
          margin: 0,
          letterSpacing: "-2px",
          color: "#ffffff",
          backgroundColor: "transparent",
          display: "flex",
          gap: "0.2em",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <span style={{ backgroundColor: "transparent" }} ref={firstFourRef}>
          4
        </span>
        <span style={{ backgroundColor: "transparent" }} ref={zeroRef}>
          0
        </span>
        <span style={{ backgroundColor: "transparent" }} ref={lastFourRef}>
          4
        </span>
      </h1>
      <p
        ref={subtitleRef}
        style={{
          fontSize: "1.5rem",
          marginTop: "1rem",
          color: "#aaaaaa",
          backgroundColor: "transparent",
        }}
      >
        Oops! This page doesn’t exist.
      </p>
      <a
        ref={buttonRef}
        href="/"
        style={{
          marginTop: "2rem",
          fontSize: "1rem",
          color: "#fff",
          textDecoration: "none",
          backgroundColor: "#1c1c1e",
          padding: "0.75rem 1.5rem",
          borderRadius: "12px",
          border: "1px solid #333",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#2c2c2e";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#1c1c1e";
        }}
      >
        Go back home
      </a>
      <a
        href="https://michaeltorresdev.dev"
        style={{
          textDecoration: "none",
          backgroundColor: "transparent",
          color: "#aaaaaa",
          marginTop: "6rem",
          transition: "all 0.6s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.color = "#39393bff";
        }}
        onMouseLeave={(e) => {
          e.target.style.color = "#aaaaaa";
        }}
      >
        michaeltorresdev.dev
      </a>
    </div>
  );
}

export default NotFound;
