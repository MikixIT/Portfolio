import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./contactForm.scss";

gsap.registerPlugin(ScrollTrigger);

function ContactForm() {
  const [name, setName] = useState(""); // Stato per il nome dell'utente
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); // Stato per il passo attuale del form
  const containerRef = useRef(null); // Riferimento al contenitore principale
  const yourNameRef = useRef(null); // Riferimento per il nome visualizzato
  const contactForm = useRef(null);

  useEffect(() => {
    if (contactForm.current) {
      gsap.fromTo(
        contactForm.current,
        {
          y: 100,
          opacity: 1,
        },
        {
          y: 0,
          opacity: 1,
          duration: 2.5,
          scrollTrigger: {
            trigger: contactForm.current,
            start: "top 90%",
            end: "top 55%",
            scrub: true,
          },
        }
      );
    }
  }, []);

  const validateFields = (fields) => {
    for (const field of fields) {
      if (!field.trim()) {
        return false; // Se un campo è vuoto, la validazione fallisce
      }
    }
    return true; // Tutti i campi sono validi
  };

  const handleNext = (e, nextStep) => {
    e.preventDefault();

    if (nextStep === 2 && !validateFields([name, email])) {
      alert("Please fill in all required fields.");
      return;
    }

    if (nextStep === 3 && !validateFields([message])) {
      alert("Please provide a message.");
      return;
    }

    setStep(nextStep);
    const container = containerRef.current;
    if (container) {
      if (nextStep === 2) {
        container.classList.add("center", "slider-two-active");
        container.classList.remove("full", "slider-one-active");
      } else if (nextStep === 3) {
        container.classList.add("full", "slider-three-active");
        container.classList.remove(
          "center",
          "slider-two-active",
          "slider-one-active"
        );
      }
    }
  };

  const handleBack = (e, prevStep) => {
    e.preventDefault();
    setStep(prevStep);
    const container = containerRef.current;
    if (container) {
      if (prevStep === 1) {
        container.classList.add("slider-one-active");
        container.classList.remove("center", "slider-two-active", "full");
      } else if (prevStep === 2) {
        container.classList.add("center", "slider-two-active");
        container.classList.remove("full", "slider-three-active");
      }
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setName(""); // Reset nome
    setStep(1); // Torna al primo passo
    const container = containerRef.current;
    if (container) {
      container.classList.remove(
        "center",
        "slider-two-active",
        "slider-three-active",
        "full"
      );
      container.classList.add("slider-one-active");
    }
  };

  return (
    <div ref={contactForm} className="form-contact">
      <div ref={containerRef} className="container slider-one-active">
        <div className="steps">
          <div className={`step step-one ${step === 1 ? "active" : ""}`}>
            <div className="liner"></div>
            <span>Hello!</span>
          </div>
          <div className={`step step-two ${step === 2 ? "active" : ""}`}>
            <div className="liner"></div>
            <span>Message</span>
          </div>
          <div className={`step step-three ${step === 3 ? "active" : ""}`}>
            <div className="liner"></div>
            <span>Sended!</span>
          </div>
        </div>
        <div className="line">
          <div className="dot-move"></div>
          <div className="dot zero"></div>
          <div className="dot center"></div>
          <div className="dot full"></div>
        </div>
        <div className="slider-ctr">
          <div className="slider">
            <form className="slider-form slider-one">
              <h2>Let's get in touch.</h2>
              <label className="input">
                <input
                  type="text"
                  className="name"
                  placeholder="What's your name?*"
                  value={name}
                  onChange={(e) => setName(e.target.value)} // Aggiorna lo stato del nome
                  required
                />
              </label>
              <label className="input">
                <input
                  type="text"
                  className="name"
                  placeholder="Your Email?*"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Aggiorna lo stato dell'email
                />
              </label>
              <button className="first next" onClick={(e) => handleNext(e, 2)}>
                Next
              </button>
            </form>
            <form className="slider-form slider-two">
              <h2>How can I help you?</h2>
              <label className="input">
                <input
                  type="text"
                  className="name"
                  placeholder="What's your message?*"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)} // Aggiorna lo stato del messaggio
                />
              </label>
              <button className="second next" onClick={(e) => handleNext(e, 3)}>
                Send Message
              </button>
              <button
                className="back"
                onClick={(e) => handleBack(e, 1)}
                style={{ marginRight: "10px" }}
              >
                Back
              </button>
            </form>
            <div className="slider-form slider-three">
              <h2>
                Thank you{" "}
                <span ref={yourNameRef} className="yourname">
                  {name}
                </span>
                !
              </h2>
              <h3>
                We have received your message and will reply at our earliest
                convenience.
              </h3>
              <a className="reset" href="#" onClick={handleReset}>
                Send another message
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
