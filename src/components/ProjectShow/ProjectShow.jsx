import React, { useEffect, useRef } from "react";
import Card from "./Card/Card";
import "./projectShow.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import prevPokeFilter from "../../assets/pokefilter-preview.png";
import prevMETEO from "../../assets/meteo-preview.png";
import prevApple from "../../assets/applelike-preview.png";
import prevQuiz from "../../assets/quizapp-preview.png";

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
            title: "PokèFilter",
            description:
              "Catch 'em all... filtered! Find the Pokémon you're looking for in a flash. Search and filter with RETRO-Style.",
            link: "https://mikixit.github.io/pokefilter-db/",
            image: prevPokeFilter,
          },
          {
            title: "MET3OWeather",
            description:
              "Real-time weather, reliable data. Discover the climate anywhere, with a click.",
            link: "https://mikixit.github.io/MET3OWeather/",
            image: prevMETEO,
          },
          {
            title: "Apple-Like",
            description:
              "Minimalism meets power. An Apple-style web experience, without compromise.",
            link: "https://mikixit.github.io/apple-site-like/",
            image: prevApple,
          },
          {
            title: "Quiz-App",
            description:
              "Easy quiz, maximum fun. Test your knowledge with a smile.",
            link: "https://mikixit.github.io/Quiz-App/",
            image: prevQuiz,
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
