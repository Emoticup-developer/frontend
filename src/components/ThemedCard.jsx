// src/components/ThemedCard.jsx
import { useTheme } from "../context/ThemeContext";

export default function ThemedCard({ children }) {
  const { theme } = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme.cardBg,
        border: `1px solid ${theme.border}`,
        color: theme.text,
        padding: "16px",
        borderRadius: "8px",
        marginBottom: "16px",
      }}
    >
      {children}
    </div>
  );
}
