import React, { forwardRef } from "react";
import "./card.scss";

const Card = forwardRef(({ title, description, link, image }, ref) => (
  <div className="card" ref={ref}>
    <img src={image} alt={title} />
    <div className="card-content">
      <h2>{title}</h2>
      <p>{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="button"
      >
        View Project
        <span className="material-symbols-outlined">arrow_right_alt</span>
      </a>
    </div>
  </div>
));

export default Card;
