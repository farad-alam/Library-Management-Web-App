import { useEffect } from "react";

// DaisyUI themes: "light" and "dark"
const THEME_LIGHT = "light";
const THEME_DARK = "dark";

// Sets theme on <html data-theme="">
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

export default function useTheme() {
  useEffect(() => {
    // Detect system preference
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const prefersLight = window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;

    let theme = THEME_LIGHT; // default

    if (prefersDark) theme = THEME_DARK;
    else if (prefersLight) theme = THEME_LIGHT;

    setTheme(theme);

    // Optionally, listen for system changes and update theme
    const darkListener = (e) => {
      if (e.matches) setTheme(THEME_DARK);
    };
    const lightListener = (e) => {
      if (e.matches) setTheme(THEME_LIGHT);
    };

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", darkListener);
    window
      .matchMedia("(prefers-color-scheme: light)")
      .addEventListener("change", lightListener);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", darkListener);
      window
        .matchMedia("(prefers-color-scheme: light)")
        .removeEventListener("change", lightListener);
    };
  }, []);
}
