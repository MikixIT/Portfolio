import { useRef } from "react";
import "./App.scss";
import ContactButton from "./components/ContactButton/ContactButton";
import Header from "./components/Header/Header";
import ProjectShow from "./components/ProjectShow/ProjectShow";
import DarkMode from "./components/DarkMode/DarkMode";

function App() {
  const projectShowRef = useRef(null);

  return (
    <>
      <Header />
      <section className="main-container">
        <DarkMode />
        <h1>
          MICHAEL <br /> TORRES <br /> DEV{" "}
        </h1>
        <ContactButton />
      </section>
    </>
  );
}

export default App;
