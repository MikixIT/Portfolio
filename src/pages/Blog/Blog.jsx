import "./Blog.scss";
import React from "react";
import DarkMode from "../../components/DarkMode/DarkMode";
import Header from "../../components/Header/Header";

function Blog() {
  return (
    <div className="blog-page">
      <DarkMode />
      <Header />
      <div className="blog-content">
        <h1>BLOG</h1>
      </div>
    </div>
  );
}

export default Blog;
