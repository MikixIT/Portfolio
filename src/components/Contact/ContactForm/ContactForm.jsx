import React, { useState } from "react";
import "./contactForm.scss"; // Assicurati di creare un file CSS per lo stile
import "boxicons";
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gestisci l'invio del form
    console.log(formData);
  };

  return (
    <div className="contact-form-container">
      {/* Left SIDE */}

      <div className="form-left">
        <h3>Fill the form. It's easy.</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              className="input-form"
              type="text"
              name="Name"
              placeholder="Your Name"
              value={formData.Name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              className="input-form"
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              className="input-form message-area"
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
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
        <h3>Get in touch</h3>
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
              color="#000"
              size="3em"
            ></box-icon>
          </a>
          <a
            href="https://github.com/MikixIT/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <box-icon type="logo" name="github" size="3em"></box-icon>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
