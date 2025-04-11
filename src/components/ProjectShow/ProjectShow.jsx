import React, { useEffect, useRef } from "react";
import Card from "./Card/Card";
import "./projectShow.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import prevPokeFilter from "../../assets/pokefilter-preview.png";
import prevMETEO from "../../assets/meteo-preview.png";
import prevApple from "../../assets/applelike-preview.png";
import prevPokeQuiz from "../../assets/quiz-pokeapp-preview.png";
import prevVanGogh from "../../assets/vgd-preview.png";

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
            title: "Van Gogh Digital",
            description:
              "Watch Van Gogh's paintings come to life with Next.js and GSAP! ",
            link: "https://van-gogh-digital-sknu.vercel.app/",
            image: prevVanGogh,
          },
          {
            title: "MET3OWeather",
            description:
              "Real-time weather, reliable data. Discover the climate anywhere, with a click.",
            link: "https://mikixit.github.io/MET3OWeather/",
            image: prevMETEO,
          },
          {
            title: "PokèQuiz",
            description:
              "Look at the image, pick the right name, and prove your Poké-knowledge!",
            link: "https://mikixit.github.io/poke-quiz/",
            image: prevPokeQuiz,
          },
          {
            title: "Apple-Like",
            description:
              "Minimalism meets power. An Apple-style web experience, without compromise.",
            link: "https://mikixit.github.io/apple-site-like/",
            image: prevApple,
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
