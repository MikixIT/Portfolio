import { useState, useEffect } from "react";

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === null ? true : saved === "true";
  });

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
    document.body.classList.toggle("light-mode", !isDarkMode);
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const body = document.body;
    const updateDarkMode = () => {
      setIsDarkMode(body.classList.contains("dark-mode"));
    };
    const observer = new MutationObserver(updateDarkMode);
    observer.observe(body, { attributes: true, attributeFilter: ["class"] });
    updateDarkMode();
    return () => observer.disconnect();
  }, []);

  return [isDarkMode, setIsDarkMode];
}
