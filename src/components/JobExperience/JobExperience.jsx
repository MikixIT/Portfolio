import React, { useEffect, useRef } from "react";
import "./jobExperience.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REVEAL_SELECTOR =
  ".experience-card__highlight, .experience-card__stack-item, .experience-card__metric";

const experiences = [
  {
    role: "Fullstack Developer",
    company: "Mindpeak",
    location: "AI Products & Digital Pathology",
    period: "Nov 2025 - Present",
    summary:
      "Frontend Developer at Mindpeak, contributing to AI-powered pathology software used in biopharma.",
    highlights: [
      "Building and optimizing user interfaces with React and TypeScript for complex AI-driven products.",
      "Collaborating closely with backend and machine learning teams to deliver scalable and performant features.",
      "Contributing to product quality with a strong focus on usability, maintainability and real-world workflow efficiency.",
    ],
    metrics: ["React", "TypeScript","Python"],
    stack: ["AI Products", "Cypress Testing", "Django"],
  },
  {
    role: "Frontend Web Developer",
    company: "FLOW4 Webdesign UG & Co. KG",
    location: "Hamburg, Germany · Hybrid",
    period: "2025",
    summary:
      "Frontend Developer at Flow4.com for clients including Barmer, Comdirect Bank, Veja Mate and Five E-Group.",
    highlights: [
      "Developed complex, high-performance and accessible websites using Nuxt, JavaScript, PHP and SCSS.",
      "Created custom WordPress solutions with ACF and GSAP animations for smooth interactions and polished UX.",
      "Delivered frontend work for diverse brands, balancing performance, accessibility and visual quality.",
    ],
    metrics: ["Nuxt / Vue", "Accessible Websites"],
    stack: ["JavaScript", "PHP", "SCSS", "WordPress", "ACF", "GSAP"],
  },
  {
    role: "Frontend Developer | UX Designer",
    company: "Freelance",
    location: "Remote",
    period: "2022 - 2025",
    summary:
      "Creating websites for companies in different sectors and delivering frontend solutions as an independent freelancer.",
    highlights: [
      "Worked across different client needs, from company websites to custom frontend implementations.",
      "Built interfaces using HTML, CSS, JavaScript ES6+, React, Next.js and Node.js.",
      "Used GSAP animations, Tailwind CSS and SCSS to create modern, responsive and engaging user experiences.",
    ],
    metrics: ["React", "Vue", "Next.js", "Node.js"],
    stack: ["HTML/CSS", "JavaScript", "Tailwind", "SCSS"],
  },
  {
    role: "E-Commerce Web Developer",
    company: "Luxury Boyhood",
    location: "Palermo, Sicily, Italy · On-site",
    period: "2021 - 2022",
    summary:
      "Developed and maintained e-commerce platforms from concept to implementation.",
    highlights: [
      "Implemented SEO strategies that improved website traffic by 15%, increasing online visibility and positioning.",
      "Optimized website performance and product page design for a stronger browsing and shopping experience.",
      "Delivered technical and visual improvements that resulted in a 30% increase in performance.",
    ],
    metrics: ["SEO", "Javascript", "Digital Marketing"],
    stack: ["E-Commerce", "Performance", "HTML/CSS"],
  },
];

function ExperienceCard({ experience, index, setCardRef }) {
  return (
    <div className="experience-card" ref={setCardRef(index)}>
      <div className="experience-card__header">
        <div className="experience-card__title-block">
          <p className="experience-card__period">{experience.period}</p>
          <h3>{experience.role}</h3>
          <p className="experience-card__company">
            {experience.company}
            <span>{experience.location}</span>
          </p>
        </div>
      </div>

      <p className="experience-card__summary">{experience.summary}</p>

      <ul className="experience-card__highlights">
        {experience.highlights.map((highlight) => (
          <li key={highlight} className="experience-card__highlight">
            {highlight}
          </li>
        ))}
      </ul>

      <div className="experience-card__footer">
        <div className="experience-card__metrics">
          {experience.metrics.map((metric) => (
            <span key={metric} className="experience-card__metric">
              {metric}
            </span>
          ))}
        </div>

        <div className="experience-card__stack">
          {experience.stack.map((item) => (
            <span key={item} className="experience-card__stack-item">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function JobExperience() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const leadRef = useRef(null);
  const railFillRef = useRef(null);
  const cardRefs = useRef([]);

  const setCardRef = (index) => (element) => {
    cardRefs.current[index] = element;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 64 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
            end: "bottom 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        leadRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: leadRef.current,
            start: "top 92%",
            end: "bottom 72%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        railFillRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            end: "bottom 30%",
            scrub: 1,
          },
        }
      );

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const direction = index % 2 === 0 ? -90 : 90;
        const revealTargets = card.querySelectorAll(REVEAL_SELECTOR);

        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: direction,
            y: 80,
            rotateX: 10,
            transformPerspective: 1200,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotateX: 0,
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 84%",
              end: "top 55%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          revealTargets,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 78%",
              end: "top 56%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="job-experience" ref={sectionRef}>
      <div className="job-experience__container">
        <div className="job-experience__heading"> 
          <h2 ref={titleRef}>Job Experience</h2>
          <p className="job-experience__lead" ref={leadRef}>
            From freelance delivery to e-commerce platforms, I turn business
            goals into fast interfaces, clear frontend systems and measurable
            improvements.
          </p>
        </div>

        <div className="job-experience__timeline">
          <div className="job-experience__rail" aria-hidden="true">
            <span className="job-experience__rail-base"></span>
            <span
              className="job-experience__rail-fill"
              ref={railFillRef}
            ></span>
          </div>

          <div className="job-experience__list">
            {experiences.map((experience, index) => {
              const isLeft = index % 2 === 0;

              return (
                <article
                  className={`experience-row ${
                    isLeft ? "experience-row--left" : "experience-row--right"
                  }`}
                  key={`${experience.role}-${experience.company}`}
                >
                  <div className="experience-row__slot">
                    {isLeft ? (
                      <ExperienceCard
                        experience={experience}
                        index={index}
                        setCardRef={setCardRef}
                      />
                    ) : null}
                  </div>

                  <div className="experience-row__middle" aria-hidden="true">
                    <span className="experience-row__dot"></span>
                  </div>

                  <div className="experience-row__slot">
                    {!isLeft ? (
                      <ExperienceCard
                        experience={experience}
                        index={index}
                        setCardRef={setCardRef}
                      />
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default JobExperience;
