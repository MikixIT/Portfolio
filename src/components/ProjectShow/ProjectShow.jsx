import React, { useEffect, useRef } from "react";
import Card from "./Card/Card";
import "./projectShow.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import previewImage from "../../assets/Preview.png";

gsap.registerPlugin(ScrollTrigger);

function ProjectShow() {
  const cardsRef = useRef([]);
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

    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
            scrub: 1,
          },
        }
      );
    });
  }, []);

  return (
    <div className="project-show">
      <h2 ref={titleRef}>My Creations</h2>
      <div className="cards">
        {[
          {
            title: "Project 1",
            description: "Description 1",
            link: "#",
            image: previewImage,
          },
          {
            title: "Project 2",
            description: "Description 2",
            link: "#",
            image: previewImage,
          },
          {
            title: "Project 3",
            description: "Description 3",
            link: "#",
            image: previewImage,
          },
          {
            title: "Project 4",
            description: "Description 4",
            link: "#",
            image: previewImage,
          },
        ].map((project, index) => (
          <Card
            key={index}
            title={project.title}
            description={project.description}
            link={project.link}
            image={project.image}
            ref={(el) => (cardsRef.current[index] = el)}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectShow;
