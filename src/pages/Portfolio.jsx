import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Typewriter } from "react-simple-typewriter";

import ContactButton from "../components/ContactButton/ContactButton";
import Header from "../components/Header/Header";
import DarkMode from "../components/DarkMode/DarkMode";
import ProjectShow from "../components/ProjectShow/ProjectShow";
import Contact from "../components/Contact/Contact";
import Modal from "../components/Modal/Modal";
import BookCall from "../components/BookCall/BookCall";
import TextCursor from "../components/Animations/text-cursor";
import ScrollVelocity from "../components/Animations/scroll-velocity";
import { useLenis } from "../hooks/useLenis";
import Footer from "../components/Footer/Footer";
import WhoIAm from "../components/whoiam/WhoIAm";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const lenis = useLenis();

  const [modalStatus, setModalStatus] = useState(false);

  const openModal = () => setModalStatus(true);
  const closeModal = () => setModalStatus(false);

  useEffect(() => {
    gsap.from("h1", {
      duration: 1,
      y: 100,
      opacity: 0,
      ease: "power4.out",
    });
    gsap.to("h1", {
      duration: 1,
      y: 0,
      opacity: 1,
      ease: "power4.out",
    });

    gsap.from(".type-writer", {
      duration: 1,
      y: 300,
      opacity: 0,
      ease: "power4.out",
    });
    gsap.to(".type-writer", {
      duration: 1,
      y: 0,
      opacity: 1,
      ease: "power4.out",
    });
  }, []);

  useEffect(() => {
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    }
  }, [lenis]);

  return (
    <>
      <Header />
      <section className="main-container">
        <DarkMode />
        <h1>
          MICHAEL <br /> TORRES <br />
        </h1>
        <span className="type-writer">
          <Typewriter
            words={[
              ".DEV",
              "CREATIVE",
              "DEVELOPER",
              "BASED IN",
              "HAMBURG",
              "CODER",
              "PROBLEM",
              "SOLVING",
              "DREAMER",
              "STILL HERE?",
            ]}
            loop={999}
            cursor
            cursorStyle="|"
            typeSpeed={400}
            deleteSpeed={60}
            delaySpeed={800}
          />
        </span>
        <TextCursor
          text="scroll"
          delay={0.01}
          spacing={100}
          followMouseDirection={true}
          randomFloat={true}
          exitDuration={0.1}
          maxPoints={15}
        />
        <div className="contact-button">
          <ContactButton calendarButtonClicked={openModal} />
        </div>
      </section>
      <section className="main-content">
        <WhoIAm />
        <ProjectShow />
        <ScrollVelocity
          texts={["EXPLORE MY PROJECTS ", "CHECK THEM OUT"]}
          velocity={50}
          className="custom-scroll-text"
        />
      </section>
      <section className="contact-section">
        <Contact buttonContactClicked={openModal} />
        <Footer />
      </section>
      <Modal
        titleModal={"Booking a short call with me!"}
        subtitleModal={"Let's talk about your project."}
        isOpenModal={modalStatus}
        closeModal={closeModal}
        contentModal={modalStatus && <BookCall key={modalStatus} />}
      />
    </>
  );
}
