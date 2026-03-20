import { useRef, useLayoutEffect, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import "./scroll-velocity.css";

function useElementWidth(ref) {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }

    updateWidth();

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateWidth)
        : null;

    if (observer && ref.current) {
      observer.observe(ref.current);
    }

    window.addEventListener("resize", updateWidth);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updateWidth);
    };
  }, [ref]);

  return width;
}

function getIsMobile() {
  return typeof window !== "undefined" && window.innerWidth <= 768;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export const ScrollVelocity = ({
  scrollContainerRef,
  texts = [],
  velocity = 100,
  className = "",
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName = "parallax",
  scrollerClassName = "scroller",
  parallaxStyle,
  scrollerStyle,
}) => {
  const [isMobile, setIsMobile] = useState(getIsMobile);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(getIsMobile());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mobileVelocity = velocity * 0.6;
  const mobileDamping = damping * 1.5;
  const mobileStiffness = stiffness * 0.8;
  const mobileVelocityMapping = {
    input: [0, 500],
    output: [0, 3],
  };

  const finalVelocity = isMobile ? mobileVelocity : velocity;
  const finalDamping = isMobile ? mobileDamping : damping;
  const finalStiffness = isMobile ? mobileStiffness : stiffness;
  const finalVelocityMapping = isMobile
    ? mobileVelocityMapping
    : velocityMapping;
  function VelocityText({
    children,
    baseVelocity = finalVelocity,
    scrollContainerRef,
    className = "",
    damping = finalDamping,
    stiffness = finalStiffness,
    numCopies,
    velocityMapping = finalVelocityMapping,
    parallaxClassName,
    scrollerClassName,
    parallaxStyle,
    scrollerStyle,
  }) {
    const baseX = useMotionValue(0);
    const scrollOptions = scrollContainerRef
      ? { container: scrollContainerRef }
      : {};
    const { scrollY } = useScroll(scrollOptions);
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: damping,
      stiffness: stiffness,
    });
    const velocityFactor = useTransform(
      smoothVelocity,
      velocityMapping?.input || [0, 1000],
      velocityMapping?.output || [0, 5],
      { clamp: false }
    );

    const copyRef = useRef(null);
    const copyWidth = useElementWidth(copyRef);
    const [viewportWidth, setViewportWidth] = useState(0);

    useLayoutEffect(() => {
      function updateViewportWidth() {
        setViewportWidth(window.innerWidth);
      }

      updateViewportWidth();
      window.addEventListener("resize", updateViewportWidth);

      return () => window.removeEventListener("resize", updateViewportWidth);
    }, []);

    function wrap(min, max, v) {
      const range = max - min;
      const mod = (((v - min) % range) + range) % range;
      return mod + min;
    }

    const x = useTransform(baseX, (v) => {
      if (copyWidth === 0) return "0px";
      return `${wrap(-copyWidth, 0, v)}px`;
    });

    const directionFactor = useRef(1);
    useAnimationFrame((t, delta) => {
      if (!copyWidth) return;

      const safeVelocityFactor = clamp(velocityFactor.get(), -4, 4);
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

      if (safeVelocityFactor < 0) {
        directionFactor.current = -1;
      } else if (safeVelocityFactor > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * safeVelocityFactor;
      baseX.set(baseX.get() + moveBy);
    });

    const minimumCopies = copyWidth
      ? Math.ceil((viewportWidth * 2) / copyWidth) + 2
      : numCopies;
    const totalCopies = Math.max(numCopies, minimumCopies);
    const spans = [];
    for (let i = 0; i < totalCopies; i++) {
      spans.push(
        <span className={className} key={i} ref={i === 0 ? copyRef : null}>
          {children}
        </span>
      );
    }

    return (
      <div className={parallaxClassName} style={parallaxStyle}>
        <motion.div
          className={scrollerClassName}
          style={{ x, ...scrollerStyle }}
        >
          {spans}
        </motion.div>
      </div>
    );
  }

  return (
    <section>
      {texts.map((text, index) => (
        <VelocityText
          key={index}
          className={className}
          baseVelocity={index % 2 !== 0 ? -finalVelocity : finalVelocity}
          scrollContainerRef={scrollContainerRef}
          damping={finalDamping}
          stiffness={finalStiffness}
          numCopies={numCopies}
          velocityMapping={finalVelocityMapping}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
        >
          {text}&nbsp;
        </VelocityText>
      ))}
    </section>
  );
};

export default ScrollVelocity;
