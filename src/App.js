// import { useRef } from "react";
import "./App.scss";
import ContactButton from "./components/ContactButton/ContactButton";
import Header from "./components/Header/Header";
// import ProjectShow from "./components/ProjectShow/ProjectShow";
import DarkMode from "./components/DarkMode/DarkMode";
import { Typewriter } from "react-simple-typewriter";
import Intro from "./components/Intro/Intro";

// const projectShowRef = useRef(null);
function App() {
  return (
    <>
      <Intro />
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
                "CODER",
                "PROBLEM",
                "SOLVING",
                "DEVELOPER",
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
        <ContactButton />
      </section>
    </>
  );
}

export default App;
