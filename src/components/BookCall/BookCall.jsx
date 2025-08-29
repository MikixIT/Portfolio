import { useEffect } from "react";
import "./bookCall.scss";

const BookCall = () => {
  useEffect(() => {
    // Check if script already exists before adding
    if (
      !document.querySelector(
        'script[src="https://assets.calendly.com/assets/external/widget.js"]'
      )
    ) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }

    // Cleanup function
    return () => {
      const script = document.querySelector(
        'script[src="https://assets.calendly.com/assets/external/widget.js"]'
      );
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="book-call-container">
      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/michaeltorresdeveloper/30min"
      ></div>
    </div>
  );
};

export default BookCall;
