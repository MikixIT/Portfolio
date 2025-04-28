import { useEffect } from "react";
import "./bookCall.scss"; // importa lo stile SCSS

const BookCall = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="book-call">
      <h2>Let’s talk – book a short intro call </h2>
      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/michaeltorresdeveloper/30min"
        style={{ minWidth: "320px", height: "630px" }}
      ></div>
    </div>
  );
};

export default BookCall;
