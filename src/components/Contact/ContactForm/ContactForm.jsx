import React, { useState, useEffect, useRef } from "react";
import "./contactForm.scss"; // Assicurati di avere il CSS giusto
import "boxicons";
import Swal from "sweetalert2";
import gsap from "gsap";

function ContactForm({ buttonContactClicked }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === null ? true : saved === "true";
  });
  const formRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 2.5,
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 100%",
          end: "top 50%",
          scrub: true,
        },
      }
    );
  }, []);

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
    const form = event.target;
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

      if (res.success) {
        Swal.fire({
          title: "✅ Done!",
          text: "I will reply to you as soon as possible!",
          width: "30em",
          color: getComputedStyle(document.documentElement)
            .getPropertyValue("--body_color")
            .trim(),
          background: getComputedStyle(document.documentElement)
            .getPropertyValue("--body_bg")
            .trim(),
          confirmButtonColor: getComputedStyle(document.documentElement)
            .getPropertyValue("--body_color")
            .trim(),
          confirmButtonText: "Cool!",
          allowEscapeKey: true,
          customClass: {
            popup: "swal2-theme-bg",
            confirmButton: "swal2-theme-btn",
          },
        });
        form.reset();
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
        color: getComputedStyle(document.documentElement)
          .getPropertyValue("--body_color")
          .trim(),
        background: getComputedStyle(document.documentElement)
          .getPropertyValue("--body_bg")
          .trim(),
        confirmButtonColor: getComputedStyle(document.documentElement)
          .getPropertyValue("--body_color")
          .trim(),
        confirmButtonText: "Okay  :(",
        allowEscapeKey: true,
        customClass: {
          popup: "swal2-theme-bg",
          confirmButton: "swal2-theme-btn",
        },
      });
    }
  };

  return (
    <div id="contact-form" className="contact-form-container" ref={formRef}>
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
        <div className="social-icons">
          <a
            href="https://www.linkedin.com/in/michaeltorresdev/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <box-icon
              type="logo"
              name="linkedin-square"
              size="3em"
              color={isDarkMode ? "white" : "black"}
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
              color={isDarkMode ? "white" : "black"}
            ></box-icon>
          </a>
        </div>

        <p className="description-contact-button">
          {" "}
          Want to talk about ideas, tech, or opportunities?{" "}
        </p>
        <button onClick={buttonContactClicked} className="contact-button">
          Let's Talk Now
        </button>
      </div>
    </div>
  );
}

export default ContactForm;
