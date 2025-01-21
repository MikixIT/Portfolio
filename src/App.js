import "./App.scss";
import ContactButton from "./components/ContactButton/ContactButton";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <div className="main-container">
        <h1>
          MICHAEL <br /> TORRES <br /> DEV{" "}
        </h1>
      </div>
      <ContactButton />
    </>
  );
}

export default App;
