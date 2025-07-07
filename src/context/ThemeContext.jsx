// src/context/ThemeContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";

// Define default themes (light and dark)
const defaultLightColors = {
  appBar: "#2196f3", // Blue
  icon: "#000000", // Black
  background: "#ffffff", // White
  text: "#000000", // Black
  cardBackground: "#f3e8ff", // Light purple for cards, matching the image's card color
  buttonPrimary: "#6b21a8", // Purple for primary buttons
  buttonText: "#ffffff", // White text on primary buttons
};

const defaultDarkColors = {
  appBar: "#1f2937", // Dark Gray
  icon: "#ffffff", // White
  background: "#121212", // Very Dark Gray
  text: "#ffffff", // White
  cardBackground: "#374151", // Slightly lighter dark gray for cards
  buttonPrimary: "#4b5563", // Darker gray for primary buttons
  buttonText: "#ffffff", // White text on primary buttons
};

// Keys for localStorage to store theme settings
const THEME_MODE_STORAGE_KEY = "appThemeMode";
const CUSTOM_COLORS_STORAGE_KEY = "appCustomColors";

// Create the Theme Context
export const ThemeContext = createContext();

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  // State for the current theme mode ('light' or 'dark')
  const [themeMode, setThemeMode] = useState("light");
  // State for custom colors selected by the user
  const [customColors, setCustomColors] = useState(defaultLightColors);

  // useEffect to load theme settings from localStorage on component mount
  useEffect(() => {
    try {
      const storedThemeMode = localStorage.getItem(THEME_MODE_STORAGE_KEY);
      const storedCustomColors = localStorage.getItem(
        CUSTOM_COLORS_STORAGE_KEY
      );

      if (storedThemeMode) {
        setThemeMode(storedThemeMode);
      }

      if (storedCustomColors) {
        // If custom colors are found, parse and set them
        const parsedColors = JSON.parse(storedCustomColors);
        setCustomColors(parsedColors);
      } else {
        // If no custom colors, apply default colors based on the stored mode
        if (storedThemeMode === "dark") {
          setCustomColors(defaultDarkColors);
        } else {
          setCustomColors(defaultLightColors);
        }
      }
    } catch (error) {
      console.error("Failed to load theme from localStorage", error);
      // Fallback to default light theme if an error occurs during loading
      setThemeMode("light");
      setCustomColors(defaultLightColors);
    }
  }, []); // Empty dependency array means this runs only once on mount

  // Determine the effective colors: start with default colors for the current mode,
  // then override with any custom colors selected by the user.
  const currentDefaultColors =
    themeMode === "dark" ? defaultDarkColors : defaultLightColors;
  const effectiveColors = { ...currentDefaultColors, ...customColors };

  // useEffect to apply the effective background and text color to the document body
  // This ensures global styling for elements outside React's root, like scrollbars or initial page load.
  useEffect(() => {
    document.body.style.backgroundColor = effectiveColors.background;
    document.body.style.color = effectiveColors.text;
    // Set font family globally
    document.body.style.fontFamily = "Inter, sans-serif";
  }, [effectiveColors]); // Re-run when effectiveColors change

  // Function to update custom colors and save them to localStorage
  const updateCustomColors = (newColors) => {
    setCustomColors(newColors);
    try {
      localStorage.setItem(
        CUSTOM_COLORS_STORAGE_KEY,
        JSON.stringify(newColors)
      );
      // When custom colors are set, we assume the user is no longer purely on a 'light'/'dark' default.
      // The themeMode state is kept separate for the toggle button's behavior.
    } catch (error) {
      console.error("Failed to save custom colors to localStorage", error);
    }
  };

  // Function to toggle between 'light' and 'dark' theme modes
  const toggleThemeMode = () => {
    setThemeMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      try {
        localStorage.setItem(THEME_MODE_STORAGE_KEY, newMode);
        // When toggling, reset custom colors to the defaults of the new mode.
        // This makes the "Toggle Theme" button switch between the predefined light/dark themes.
        const newDefaultColors =
          newMode === "dark" ? defaultDarkColors : defaultLightColors;
        setCustomColors(newDefaultColors);
        localStorage.setItem(
          CUSTOM_COLORS_STORAGE_KEY,
          JSON.stringify(newDefaultColors)
        );
      } catch (error) {
        console.error("Failed to save theme mode to localStorage", error);
      }
      return newMode;
    });
  };

  // The value provided by the context to its consumers
  const contextValue = {
    themeMode,
    toggleThemeMode,
    colors: effectiveColors, // The colors currently applied (defaults + custom overrides)
    customColors, // The colors specifically customized by the user (used in settings page)
    updateCustomColors,
    defaultLightColors,
    defaultDarkColors,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to easily consume the theme context in any component
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
