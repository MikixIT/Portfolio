import React, { useState } from "react";
import "./contactForm.scss"; // Assicurati di creare un file CSS per lo stile

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
      <div className="form-left">
        <h3>Fill the form. It's easy.</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="Name"
              placeholder="Your name"
              value={formData.Name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              placeholder="Write your message"
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
      <div className="form-right">
        <h3>Let's talk about everything.</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil
          deleniti itaque similique magni. Magni, laboriosam perferendis maxime!
        </p>
        <a href="#" className="read-more">
          Read more
        </a>
      </div>
    </div>
  );
}

export default ContactForm;
