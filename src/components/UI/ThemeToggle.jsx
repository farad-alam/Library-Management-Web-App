import React, { useCallback, useState, useEffect } from "react";

const THEME_LIGHT = "light";
const THEME_DARK = "dark";

function getCurrentTheme() {
  return document.documentElement.getAttribute("data-theme") || THEME_LIGHT;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getCurrentTheme());

  const toggleTheme = useCallback(() => {
    const newTheme = theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  }, [theme]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
      setTheme(savedTheme);
    }
  }, []);

  return (
    <button
      className="btn btn-sm btn-outline rounded-full"
      onClick={toggleTheme}
      aria-label="Toggle Theme"
    >
      {theme === THEME_LIGHT ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
