import React, { useState, useEffect } from "react";
import "./contactForm.scss"; // Assicurati di creare un file CSS per lo stile
import "boxicons";
import Swal from "sweetalert2";

function ContactForm() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const body = document.body;

    const updateDarkMode = () => {
      setIsDarkMode(body.classList.contains("dark-mode"));
    };

    const observer = new MutationObserver(updateDarkMode);

    observer.observe(body, { attributes: true, attributeFilter: ["class"] });

    updateDarkMode();

    return () => {
      observer.disconnect();
    };
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "3943c3b4-7425-4dcf-99d5-39eb387913cd");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      }).then((res) => res.json());
      // const res = { success: false };

      if (res.success) {
        Swal.fire({
          title: "✅ Done!",
          text: "I will reply to you as soon as possible!",
          width: "30em",
          color: "#606060",
          confirmButtonColor: "green",
          confirmButtonText: "Cool!",
          allowEscapeKey: true,
        });
        console.log("Email sent", res);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      Swal.fire({
        title: "❌ Error!",
        text: "Something went wrong. Please try again later. I'm Sorry >:(",
        toast: true,
        width: "30em",
        confirmButtonColor: "#d33",
        confirmButtonText: "Okay  :(",
        allowEscapeKey: true,
      });
    }
  };

  return (
    <div id="contact-form" className="contact-form-container">
      {/* Left SIDE */}

      <div className="form-left">
        <h3>Fill the form. It's easy.</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              className="input-form"
              type="text"
              name="name"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="form-group">
            <input
              className="input-form"
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />
          </div>
          <div className="form-group">
            <textarea
              className="input-form message-area"
              name="message"
              placeholder="Message"
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Send Message
          </button>
        </form>
      </div>

      {/* Right SIDE */}

      <div className="form-right">
        <h3>Get in touch.</h3>
        <p>I'm open to discussing new projects and ideas.</p>
        <a href="#" className="read-more">
          You can find me also here.
        </a>
        <div className="social-icons">
          <a
            href="https://www.linkedin.com/in/michaeltorresdev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <box-icon
              name="linkedin-square"
              type="logo"
              size="3em"
              color={isDarkMode ? "white" : "black"} // Cambia colore in base alla modalità
            ></box-icon>
          </a>
          <a
            href="https://github.com/MikixIT/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <box-icon
              type="logo"
              name="github"
              size="3em"
              color={isDarkMode ? "white" : "black"} // Cambia colore in base alla modalità
            ></box-icon>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
