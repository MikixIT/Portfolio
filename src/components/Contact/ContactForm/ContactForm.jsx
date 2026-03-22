import React, { useState, useEffect, useRef } from "react";
import "./contactForm.scss"; // Assicurati di avere il CSS giusto
import Swal from "sweetalert2";
import gsap from "gsap";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useDarkMode } from "../../../hooks/useDarkMode";

function ContactForm({ buttonContactClicked }) {
  const [isDarkMode] = useDarkMode();
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const onSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.target;
    const formData = new FormData(event.target);

    formData.append("access_key", "3943c3b4-7425-4dcf-99d5-39eb387913cd");
    formData.append("subject", "New portfolio contact message");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      setIsSubmitting(true);

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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact-form" className="contact-form-container" ref={formRef}>
      {/* Left SIDE */}
      <div className="form-left">
        <h3>Fill the form. It's easy.</h3>
        <form onSubmit={onSubmit}>
          <input
            type="checkbox"
            name="botcheck"
            tabIndex="-1"
            autoComplete="off"
            style={{ display: "none" }}
          />
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
          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
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
            <FaLinkedin size="3em" color={isDarkMode ? "white" : "black"} />
          </a>
          <a
            href="https://github.com/MikixIT/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub size="3em" color={isDarkMode ? "white" : "black"} />
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
