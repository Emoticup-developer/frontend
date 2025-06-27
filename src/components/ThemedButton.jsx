// src/components/ThemedButton.jsx
import { useTheme } from "../context/ThemeContext";

export default function ThemedButton({ children }) {
  const { theme } = useTheme();

  return (
    <button
      style={{
        backgroundColor: theme.buttonBg,
        color: theme.buttonText,
        padding: "10px 20px",
        border: "none",
        borderRadius: "8px",
      }}
    >
      {children}
    </button>
  );
}
