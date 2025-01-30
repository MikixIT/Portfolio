import React, { useEffect } from "react";
import "./intro.scss";
import { preLoaderAnim } from "../Animation/Animation";
import "animate.css";
import "boxicons";

function Intro() {
  useEffect(() => {
    preLoaderAnim();
  }, []);

  return (
    <div className="preloader">
      <div className="texts-container">
        <span className="animate__animated animate__flash">Welcome to</span>
        <span> Michael's </span>
        <span> Portolio </span>
      </div>
    </div>
  );
}

export default Intro;
