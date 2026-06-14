import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "synthwave"
  );

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "synthwave";
    document.documentElement.setAttribute("data-theme", saved);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "synthwave" ? "light" : "synthwave";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      id="toggleDark"
      className="px-4 py-2 text-sm font-medium border-2 border-accent-500 text-neutral bg-neutral-content rounded-md cursor-pointer hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      onClick={toggleTheme}
    >
      {theme === "synthwave" ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default ThemeToggle;
