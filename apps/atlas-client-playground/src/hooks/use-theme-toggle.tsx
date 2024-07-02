import { useState, useEffect } from "react";

export const useThemeToggle = (defaultClassName: string = "light") => {
  const [theme, setTheme] = useState(defaultClassName);

  useEffect(() => {
    const body = document.body;
    body.classList.remove("light", "dark");
    body.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return [theme, toggleTheme] as const;
};
