// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeCustomizer from "./pages/ThemeCustomizer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import DashboardPage from "./pages/DashboardPage";
import SampleForm from "./pages/SampleForm";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/customize" element={<ThemeCustomizer />} />
          <Route path="/employees/create" element={<SampleForm />} />
        </Routes>

        {/* ToastContainer placed globally */}
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </ThemeProvider>
  );
}
