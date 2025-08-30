import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./backToBubble.scss";

gsap.registerPlugin(ScrollTrigger);

const BackToBubble = ({
  position = "right",
  topText = "BACK TO",
  bottomText = "PORTFOLIO",
  navigateTo = "/",
  className = "",
  absolute = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const circleRef = useRef(null);
  const contentRef = useRef(null);

  // Add mounting delay effect
  // for don't crash with other animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const container = containerRef.current;
    const circle = circleRef.current;
    const content = contentRef.current;

    const isLeft = position === "left";
    const peekDistance = isLeft ? 40 : -40;
    const hoverDistance = isLeft ? 200 : -200;

    // Set initial position to prevent layout shifts
    gsap.set(container, { x: 0 });
    gsap.set(content, { opacity: 0, scale: 0.9 });

    gsap.to(container, {
      x: peekDistance,
      duration: 1.5,
      ease: "elastic.out(1, 0.3)",
      repeat: -1,
      repeatDelay: 5,
      yoyo: true,
    });

    gsap.to(circle, {
      scale: 1.02,
      duration: 2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    const handleMouseEnter = () => {
      gsap.killTweensOf([container, circle]);
      gsap.to(container, {
        x: hoverDistance,
        duration: 1.2,
        ease: "power3.out",
      });
      gsap.to(circle, { scale: 1.05, duration: 1.2, ease: "power3.out" });
      gsap.to(content, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(container, { x: 0, duration: 1.2, ease: "power3.out" });
      gsap.to(circle, { scale: 1, duration: 1.2, ease: "power3.out" });
      gsap.to(content, {
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.delayedCall(3, () => {
        gsap.to(container, {
          x: peekDistance,
          duration: 1.5,
          ease: "elastic.out(1, 0.3)",
          repeat: -1,
          repeatDelay: 5,
          yoyo: true,
        });

        gsap.to(circle, {
          scale: 1.02,
          duration: 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    };

    const handleClick = () => {
      gsap.to(circle, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      });
      gsap.delayedCall(0.2, () => navigate(navigateTo));
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("click", handleClick);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("click", handleClick);
      gsap.killTweensOf([container, circle, content]);
    };
  }, [navigate, navigateTo, position, isVisible]);

  //If is different to visible, just don't render
  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className={`back-to-bubble ${position} ${
        absolute ? "absolute" : ""
      } ${className}`}
      style={{ transform: "translateX(0)" }}
    >
      <div ref={circleRef} className="circle">
        <div ref={contentRef} className="circle-content">
          <span className="back-text">{topText}</span>
          <span className="portfolio-text">{bottomText}</span>
        </div>
      </div>
    </div>
  );
};

export default BackToBubble;
