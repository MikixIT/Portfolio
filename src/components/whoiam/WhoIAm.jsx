import React, { useEffect, useRef } from "react";
import "./whoIAm.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileImage from "../../assets/mtImg.jpg";
import ScrollIndicator from "../ScrollIndicator/ScrollIndicator";

gsap.registerPlugin(ScrollTrigger);

function WhoIAm() {
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 100%",
          end: "bottom 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 95%",
          end: "bottom 70%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        delay: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 85%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section className="who-i-am">
      <div className="who-i-am-container">
        <h2 ref={titleRef}>Who I Am</h2>

        <div className="who-i-am-content">
          <div className="content-text" ref={contentRef}>
            <p className="intro-text">
              Hi! I'm Michael Torres, a creative developer based in Hamburg.
            </p>

            <div className="description">
              <p>
                I dedicate myself to creating unique digital experiences that
                combine elegant design with innovative functionality. Every
                project is an opportunity to push the boundaries of
                technological creativity.
              </p>

              <p>
                Specialized in React, JavaScript and modern technologies, I
                transform ideas into digital realities that inspire and engage.
              </p>
            </div>

            <div className="skills">
              <h3>Skills</h3>
              <div className="skills-grid">
                <span className="skill-tag">React</span>
                <span className="skill-tag">Next.js</span>
                <span className="skill-tag">Vue</span>
                <span className="skill-tag">Nuxt.js</span>
                <span className="skill-tag">Tailwind</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">GSAP</span>
                <span className="skill-tag">Tailwind</span>
                <span className="skill-tag">SASS</span>
                <span className="skill-tag">Git</span>
              </div>
            </div>
          </div>

          <div className="profile-image" ref={imageRef}>
            <div className="image-container">
              <img src={profileImage} alt="Michael Torres" />
            </div>
          </div>
        </div>

        <ScrollIndicator delay={2} position="bottom" />
      </div>
    </section>
  );
}

export default WhoIAm;
