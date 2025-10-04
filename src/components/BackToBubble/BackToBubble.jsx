import React from "react";
import "./backToBubble.scss";

function BackToBubble({
  position = "right",
  link = "/blog",
  label = "(beta) MY BLOG!",
  emoji = "🚀",
}) {
  return (
    <div className={`back-bubble ${position}`}>
      <div className='white-bubble'>
        <div className='bubble-emoji'>
          <a href={link}> {emoji}</a>
        </div>
        <div className='bubble-content'>
          <a href={link}>{label}</a>
        </div>
      </div>
    </div>
  );
}

export default BackToBubble;
