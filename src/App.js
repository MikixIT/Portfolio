import "./App.scss";
import ContactButton from "./components/ContactButton/ContactButton";
import Header from "./components/Header/Header";
import DarkMode from "./components/DarkMode/DarkMode";
import { Typewriter } from "react-simple-typewriter";
import ProjectShow from "./components/ProjectShow/ProjectShow";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Modal from "./components/Modal/Modal";
import BookCall from "./components/BookCall/BookCall";
import TextCursor from "./components/Animations/text-cursor";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    document.body.classList.add("dark-mode");
  });

  const [modalStaus, setModalStatus] = useState(false);
  const openModal = () => {
    setModalStatus(true);
  };
  const closeModal = () => {
    setModalStatus(false);
  };

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
        </span>{" "}
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
        <ProjectShow />
      </section>
      <section className="contact-section">
        <Contact buttonContactClicked={openModal} />
      </section>
      <section>
        <Footer />
      </section>
      <Modal
        titleModal={"Booking a short call with me"}
        subtitleModal={"Let's talk about your project."}
        isOpenModal={modalStaus}
        closeModal={closeModal}
        contentModal={<BookCall />}
      />
    </>
  );
}

export default App;
