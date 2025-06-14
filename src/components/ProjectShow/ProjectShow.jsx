import React, { useEffect, useRef } from "react";
import Carousel from "./Carousel/Carousel";
import "./projectShow.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ProjectShow() {
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, x: -700 },
      {
        opacity: 1,
        x: 0,
        duration: 8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 75%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <div className="project-show">
      <h2 ref={titleRef}>My Creations</h2>
      <Carousel />
    </div>
  );
}

export default ProjectShow;
