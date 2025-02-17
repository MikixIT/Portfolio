import React, { forwardRef } from "react";
import "./card.scss";

const Card = forwardRef(({ title, description, link, image }, ref) => (
  <div className="card" ref={ref}>
    <div className="card-image">
      <img src={image} alt={title} />
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
    <a href={link} target="_blank" rel="noopener noreferrer">
      View Project
    </a>
  </div>
));

export default Card;
