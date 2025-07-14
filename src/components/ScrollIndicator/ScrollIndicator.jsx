import React, { useEffect, useRef } from "react";
import "./scrollIndicator.scss";
import { gsap } from "gsap";

function ScrollIndicator({ delay = 2, position = "bottom" }) {
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    let hasScrolled = false;

    const isMobile = () => window.innerWidth <= 768;

    const showScrollIndicator = () => {
      if (scrollIndicatorRef.current && !hasScrolled && isMobile()) {
        gsap.to(scrollIndicatorRef.current, {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: delay,
        });
      }
    };

    const hideScrollIndicator = () => {
      if (scrollIndicatorRef.current && !hasScrolled && isMobile()) {
        hasScrolled = true;
        gsap.to(scrollIndicatorRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    };

    const handleScroll = () => {
      if (!hasScrolled && isMobile()) {
        hideScrollIndicator();
      }
    };

    const handleResize = () => {
      if (!isMobile()) {
        gsap.set(scrollIndicatorRef.current, { opacity: 0 });
      }
    };

    if (isMobile()) {
      showScrollIndicator();
      window.addEventListener("scroll", handleScroll);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [delay]);

  return (
    <div
      className={`scroll-indicator scroll-indicator--${position}`}
      ref={scrollIndicatorRef}
    >
      <div className="scroll-arrow">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M7 10l5 5 5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

export default ScrollIndicator;
