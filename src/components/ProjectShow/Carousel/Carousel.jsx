import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Card from "../Card/Card"; // path corretto
import projects from "../../../data/projects"; // path corretto
import "./carousel.scss";

const Carousel = ({ options = { dragFree: true, loop: true } }) => {
  const [emblaRef] = useEmblaCarousel(options, [
    AutoScroll({
      speed: 2,
      stopOnInteraction: false,
      startDelay: 20,
      stopOnMouseEnter: true,
    }),
  ]);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {projects.map((project, index) => (
            <div className="embla__slide" key={index}>
              <Card
                title={project.title}
                description={project.description}
                link={project.link}
                image={project.image}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
