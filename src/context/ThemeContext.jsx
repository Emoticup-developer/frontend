// src/context/ThemeContext.jsx
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    background: "#ffffff",
    text: "#1f2937",
    buttonBg: "#f59e0b",
    buttonText: "#ffffff",
    cardBg: "#f9fafb",
    border: "#d1d5db",
  });

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
