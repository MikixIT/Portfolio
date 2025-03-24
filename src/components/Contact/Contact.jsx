import React from "react";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./contact.scss";
import ContactForm from "./ContactForm/ContactForm";

gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const h2Ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      h2Ref.current,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 2.5,
        scrollTrigger: {
          trigger: h2Ref.current,
          start: "top 90%",
          end: "top 50%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div className="contact-section">
      <h2 ref={h2Ref}>Contact Me</h2>
      <ContactForm />
    </div>
  );
}

export default Contact;
