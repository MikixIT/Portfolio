import "./App.scss";
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog/Blog";
import NotFound from "./pages/NotFound";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactGA from "react-ga4";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const location = useLocation();
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
