import React, { forwardRef } from "react";
import "./card.scss";

const Card = forwardRef(({ title, description, link, image }, ref) => (
  <div className="card" ref={ref}>
    <div className="card-image">
      <img src={image} alt={title} />
    </div>
    <div className="card-content">
      <h3 className="title-card">{title}</h3>
      <p className="description">{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="button"
      >
        View Project
      </a>
    </div>
  </div>
));

export default Card;
