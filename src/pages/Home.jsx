// src/pages/Home.jsx
import ThemedButton from "../components/ThemedButton";
import ThemedCard from "../components/ThemedCard";

export default function Home() {
  return (
    <div className="p-6">
      <ThemedCard>
        <h2 className="text-lg font-semibold mb-2">Dashboard Card</h2>
        <p>This is a card with themed background and border.</p>
        <ThemedButton>Click Me</ThemedButton>
      </ThemedCard>
    </div>
  );
}
