import React from "react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ContactForm() {
  const contactForm = useRef(null);

  useEffect(() => {
    if (contactForm.current) {
      gsap.fromTo(
        contactForm.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 2.5,
          scrollTrigger: {
            trigger: contactForm.current,
            start: "top 80%",
            end: "top 75%",
            scrub: true,
            markers: true,
          },
        }
      );
    }
  }, []);

  return (
    <div ref={contactForm} className="form-contact">
      <h1>form</h1>
    </div>
  );
}

export default ContactForm;
