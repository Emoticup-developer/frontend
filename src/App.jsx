// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeCustomizer from "./pages/ThemeCustomizer";
import Login from "./pages/Login";
import DashboardPage from "./pages/DashboardPage";
import ResizableSAPSidebar from "./pages/TreeItem";
import InvoicePosting from "./pages/InvoicePosting";
import Client from "./pages/Client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/client" element={<Client />} />
          <Route path="/customize" element={<ThemeCustomizer />} />
          <Route path="/invoice-posting" element={<InvoicePosting />} />
          <Route path="/hirarchy" element={<ResizableSAPSidebar />} />
        </Routes>

        {/* Global Toast Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}
