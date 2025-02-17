import React, { useEffect, useRef } from "react";
import Card from "./Card/Card";
import "./projectShow.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ProjectShow() {
  const cardsRef = useRef([]);
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.set(cardsRef.current, { opacity: 0, y: 50 });

    ScrollTrigger.batch(cardsRef.current, {
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power2.out",
        });
      },
      start: "top 80%",
      end: "bottom 60%",
    });
  }, []);

  return (
    <div className="project-show">
      <h2 ref={titleRef}>My Projects</h2>
      <div className="cards">
        {[
          {
            title: "Project 1",
            description: "Description 1",
            link: "#",
            image: "path/to/image1.jpg",
          },
          {
            title: "Project 2",
            description: "Description 2",
            link: "#",
            image: "path/to/image2.jpg",
          },
          {
            title: "Project 3",
            description: "Description 3",
            link: "#",
            image: "path/to/image3.jpg",
          },
          {
            title: "Project 4",
            description: "Description 4",
            link: "#",
            image: "path/to/image4.jpg",
          },
          {
            title: "Project 5",
            description: "Description 5",
            link: "#",
            image: "path/to/image5.jpg",
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
