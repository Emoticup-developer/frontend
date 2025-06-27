// src/pages/ThemeCustomizer.jsx
import { SketchPicker } from "react-color";
import { useTheme } from "../context/ThemeContext";

export default function ThemeCustomizer() {
  const { theme, setTheme } = useTheme();

  const handleChange = (property) => (color) => {
    setTheme((prev) => ({ ...prev, [property]: color.hex }));
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold">Theme Customizer</h2>

      {[
        { label: "Background", prop: "background" },
        { label: "Text", prop: "text" },
        { label: "Button Background", prop: "buttonBg" },
        { label: "Button Text", prop: "buttonText" },
        { label: "Card Background", prop: "cardBg" },
        { label: "Border Color", prop: "border" },
      ].map(({ label, prop }) => (
        <div key={prop}>
          <p className="mb-1 font-semibold">{label}</p>
          <SketchPicker
            color={theme[prop]}
            onChangeComplete={handleChange(prop)}
          />
        </div>
      ))}
    </div>
  );
}
