import { useEffect } from "react";
import "./bookCall.scss";

const BookCall = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="book-call-container">
      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/michaeltorresdeveloper/30min"
        style={{ minWidth: "420px", height: "630px" }}
      ></div>
    </div>
  );
};

export default BookCall;
