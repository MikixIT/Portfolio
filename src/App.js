import "./App.scss";
import ContactButton from "./components/ContactButton/ContactButton";
import Header from "./components/Header/Header";
import DarkMode from "./components/DarkMode/DarkMode";
import { Typewriter } from "react-simple-typewriter";
import Intro from "./components/Intro/Intro";
import ProjectShow from "./components/ProjectShow/ProjectShow";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    gsap.from("h1", {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power4.out",
      delay: 0.5,
    });
    gsap.to("h1", {
      duration: 1,
      y: 0,
      opacity: 1,
      ease: "power4.out",
      delay: 0.5,
    });

    // Animazione per il Typewriter
    gsap.from("#type-writer", {
      duration: 1,
      y: 50,
      opacity: 1,
      ease: "power4.out",
      delay: 1,
    });

    gsap.to("#type-writer", {
      duration: 1,
      y: 0,
      opacity: 1,
      ease: "power4.out",
      delay: 1.5,
    });
  }, []);

  return (
    <>
      <Header />
      <section className="main-container">
        <DarkMode />
        <h1>
          MICHAEL <br /> TORRES <br />
          <span id="type-writer">
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
        </h1>
        <div className="contact-button">
          <ContactButton />
        </div>
      </section>
      <section className="main-content">
        <ProjectShow />
      </section>
    </>
  );
}

export default App;
