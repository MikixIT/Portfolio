import "./Blog.scss";
import React from "react";
import DarkMode from "../../components/DarkMode/DarkMode";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import posts from "../../data/posts";
import { Typewriter } from "react-simple-typewriter";

function Blog() {
  return (
    <div className="blog-page">
      <DarkMode />
      <Header />
      <main className="blog-content">
        <h1 className="blog-title">Michael's Blog</h1>
        <span className="type-writer-blog">
          <Typewriter
            words={[
              "A dev trying to make sense of the internet",
              "Writing about coding and developer life",
              "Coding stories and practical tutorials",
              "Blogging about code & everyday dev life",
              "From bug to deploy, one post at a time",
              "Personal notes on dev and tech",
              "A dev writing for other devs",
              "Typing code, not novels… mostly",
              "Writing tutorials to procrastinate",
              "STILL HERE? READ SOMETHING DUDE!",
            ]}
            loop={999}
            cursor
            cursorStyle="|"
            typeSpeed={120}
            deleteSpeed={40}
            delaySpeed={800}
          />
        </span>
        <div className="blog-list">
          <h1 className="posts-best-title">LATEST POSTS:</h1>
          {posts.map((post) => (
            <article key={post.id} className="blog-post">
              <h2>
                <Link to={post.slug}>{post.title}</Link>
              </h2>
              <time className="blog-date">{post.date}</time>
              <p className="blog-description">{post.description}</p>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Blog;
