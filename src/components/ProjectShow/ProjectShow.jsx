import React from "react";
import Card from "./Card/Card";
import "./projectShow.scss";

function ProjectShow() {
  return (
    <>
      <div className="project-show">
        ProjectShow:
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
}

export default ProjectShow;
