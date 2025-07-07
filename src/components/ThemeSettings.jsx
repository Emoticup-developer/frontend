// src/components/ThemeSettings.jsx
import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext"; // Import our custom theme hook
import { toast } from "react-toastify"; // Import toast for user notifications

const ThemeSettings = () => {
  // Destructure values from the theme context
  const {
    themeMode,
    toggleThemeMode,
    colors, // Effective colors (defaults + custom)
    customColors, // Only the custom colors set by the user
    updateCustomColors,
    defaultLightColors,
    defaultDarkColors,
  } = useTheme();

  // Use local state for the colors being edited in the settings UI.
  // Initialize with `customColors` from the context, as these are the ones the user has explicitly set.
  const [tempColors, setTempColors] = useState(customColors);

  // useEffect to synchronize `tempColors` with `customColors` from context.
  // This is important if `customColors` change outside this component (e.g., by `toggleThemeMode`).
  useEffect(() => {
    setTempColors(customColors);
  }, [customColors]);

  // Handler for when a color input changes
  const handleChange = (key, value) => {
    setTempColors((prev) => ({ ...prev, [key]: value }));
  };

  // Handler for applying changes to the global theme
  const applyChanges = () => {
    updateCustomColors(tempColors); // Call the context function to update and persist custom colors
    toast.success("Theme changes saved permanently!", { autoClose: 2000 });
  };

  // Determine the background and text color for the individual color option cards.
  // These should reflect the default light/dark theme's card colors, not the custom ones,
  // to maintain a consistent look for the settings options themselves.
  const cardBackgroundColor =
    themeMode === "dark"
      ? defaultDarkColors.cardBackground
      : defaultLightColors.cardBackground;
  const cardTextColor =
    themeMode === "dark" ? defaultDarkColors.text : defaultLightColors.text;

  return (
    <div
      className="max-w-xl mx-auto mt-6 rounded-lg shadow p-6 transition duration-300"
      style={{
        // Apply the effective background and text color from the global theme context
        backgroundColor: colors.background,
        color: colors.text,
        fontFamily: "Inter, sans-serif", // Ensure Inter font is applied
      }}
    >
      {/* AppBar section, using colors from the effective theme */}
      <div
        className="text-lg font-bold p-4 rounded-t"
        style={{
          backgroundColor: colors.appBar,
          color: colors.icon,
          borderRadius: "8px 8px 0 0",
        }}
      >
        Theme Settings
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-4">Customize Theme</h2>

        {/* Mapped array for color options */}
        {[
          { label: "AppBar Color", key: "appBar" },
          { label: "Icons Color", key: "icon" },
          { label: "Body Background", key: "background" },
          { label: "Text Color", key: "text" },
          { label: "Card Background", key: "cardBackground" }, // Added for customization
          { label: "Primary Button Color", key: "buttonPrimary" }, // Added for customization
          { label: "Button Text Color", key: "buttonText" }, // Added for customization
        ].map(({ label, key }) => (
          <div
            key={key}
            className="flex items-center justify-between rounded-md shadow-sm p-4 mb-3"
            style={{
              // Apply card specific background and text colors
              backgroundColor: cardBackgroundColor,
              color: cardTextColor,
              borderRadius: "8px",
            }}
          >
            <div className="flex items-center gap-3">
              {/* Color swatch */}
              <div
                className="w-6 h-6 rounded-full border border-gray-300"
                style={{ backgroundColor: tempColors[key] }}
              />
              <span>{label}</span>
            </div>
            {/* Color input picker */}
            <input
              type="color"
              value={tempColors[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              className="w-8 h-8 cursor-pointer rounded-full"
              style={{ border: "none", outline: "none" }} // Remove default input border
            />
          </div>
        ))}

        {/* Theme toggle button */}
        <div className="flex justify-center items-center my-6">
          <button
            onClick={toggleThemeMode}
            className="flex items-center gap-2 px-6 py-3 rounded-full shadow-lg text-white font-semibold transition duration-300 ease-in-out transform hover:scale-105"
            style={{
              // Button background color based on theme mode
              backgroundColor:
                themeMode === "dark"
                  ? defaultDarkColors.buttonPrimary
                  : defaultLightColors.buttonPrimary,
              color:
                themeMode === "dark"
                  ? defaultDarkColors.buttonText
                  : defaultLightColors.buttonText,
            }}
          >
            {themeMode === "dark" ? <FaMoon /> : <FaSun />}
            {themeMode === "dark"
              ? "Switch to Light Mode"
              : "Switch to Dark Mode"}
          </button>
        </div>

        {/* Apply changes button */}
        <div className="text-center mt-8">
          <button
            onClick={applyChanges}
            className="px-8 py-3 rounded-full bg-purple-600 text-white font-bold hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
            style={{
              background: "linear-gradient(45deg, #8a2be2, #a020f0)", // Violet gradient
              boxShadow: "0 4px 15px rgba(128, 0, 128, 0.4)", // Purple shadow
            }}
          >
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
