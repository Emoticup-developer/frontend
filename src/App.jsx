// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashboardPage from "./pages/DashboardPage";
import ResizableSAPSidebar from "./pages/TreeItem";
import Client from "./pages/Client";
import { SearchProvider } from "./context/SearchContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Company from "./pages/Company";
import CompanyCode from "./pages/CompanyCode";
import BusinessArea from "./pages/BusinessArea";
import Plant from "./pages/Plant";
import EnterpriseStructure from "./pages/EnterpriseStructure";
import GeneralLedger from "./pages/GeneralLedger";
import FieldStatus from "./pages/FieldStatus";
import GeneralLedgerDetails from "./pages/GeneralLedgerDetails";
import JournalEntry from "./pages/JournalEntry";
import Sample from "./pages/Sample";
import Crud from "./pages/Crud";
import ThemeSettings from "./components/ThemeSettings";
import Layout from "./components/Layout";

// Import ThemeProvider and useTheme from our new context file
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import GUI from "./pages/GUI";
import Centrally from "./pages/Centrally";
import DefineCompany from "./pages/DefineCompany";
import CreateCompany from "./pages/CreateCompany";
import HomePage from "./pages/HomePage";
import ClientProfile from "./pages/ClientProfile";
import GLAccountDocument from "./pages/GLAccountDocument";

// A wrapper component to apply the global theme colors to each page
const ThemedPage = ({ children }) => {
  const { colors } = useTheme(); // Get the current effective colors from context

  return (
    // Apply background and text color to the page's root div
    // minHeight: '100vh' ensures the background covers the entire viewport
    <div
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        minHeight: "100vh",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      {children}
    </div>
  );
};

export default function App() {
  return (
    // Wrap the entire application with ThemeProvider to make theme context available everywhere
    <ThemeProvider>
      <SearchProvider>
        {" "}
        <BrowserRouter>
          <Routes>
            {/* Wrap each route element with ThemedPage to apply the theme's background and text color */}
            <Route
              path="/"
              element={
                <ThemedPage>
                  <Login />
                </ThemedPage>
              }
            />
            <Route element={<Layout />}>
              <Route
                path="/dashboard"
                element={
                  <ThemedPage>
                    <DashboardPage />
                  </ThemedPage>
                }
              />
              <Route
                path="/gui"
                element={
                  <ThemedPage>
                    <GUI />
                  </ThemedPage>
                }
              />

              <Route
                path="/gl-account-document"
                element={
                  <ThemedPage>
                    <GLAccountDocument />
                  </ThemedPage>
                }
              />
              <Route
                path="/centrally"
                element={
                  <ThemedPage>
                    <Centrally />
                  </ThemedPage>
                }
              />
              <Route
                path="/client"
                element={
                  <ThemedPage>
                    <Client />
                  </ThemedPage>
                }
              />
              <Route
                path="/home"
                element={
                  <ThemedPage>
                    <HomePage />
                  </ThemedPage>
                }
              />
              <Route
                path="/client-profile"
                element={
                  <ThemedPage>
                    <ClientProfile />
                  </ThemedPage>
                }
              />
              <Route
                path="/define-company"
                element={
                  <ThemedPage>
                    <DefineCompany />
                  </ThemedPage>
                }
              />
              <Route
                path="/create-company"
                element={
                  <ThemedPage>
                    <CreateCompany />
                  </ThemedPage>
                }
              />
              <Route
                path="/company"
                element={
                  <ThemedPage>
                    <Company />
                  </ThemedPage>
                }
              />
              <Route
                path="/company-code"
                element={
                  <ThemedPage>
                    <CompanyCode />
                  </ThemedPage>
                }
              />
              <Route
                path="/business-area"
                element={
                  <ThemedPage>
                    <BusinessArea />
                  </ThemedPage>
                }
              />
              <Route
                path="/plant"
                element={
                  <ThemedPage>
                    <Plant />
                  </ThemedPage>
                }
              />
              <Route
                path="/enterprise-structure"
                element={
                  <ThemedPage>
                    <EnterpriseStructure />
                  </ThemedPage>
                }
              />
              <Route
                path="/sample"
                element={
                  <ThemedPage>
                    <Sample />
                  </ThemedPage>
                }
              />
              <Route
                path="/general-ledger"
                element={
                  <ThemedPage>
                    <GeneralLedger />
                  </ThemedPage>
                }
              />

              <Route
                path="/glaccount-details"
                element={
                  <ThemedPage>
                    <GeneralLedgerDetails />
                  </ThemedPage>
                }
              />
              <Route
                path="/field-status-group"
                element={
                  <ThemedPage>
                    <FieldStatus />
                  </ThemedPage>
                }
              />
              <Route
                path="/crud"
                element={
                  <ThemedPage>
                    <Crud />
                  </ThemedPage>
                }
              />
              <Route
                path="/journal-entry"
                element={
                  <ThemedPage>
                    <JournalEntry />
                  </ThemedPage>
                }
              />
              <Route
                path="/hirarchy"
                element={
                  <ThemedPage>
                    <ResizableSAPSidebar />
                  </ThemedPage>
                }
              />
              <Route
                path="/settings"
                element={
                  <ThemedPage>
                    <ThemeSettings />
                  </ThemedPage>
                }
              />
            </Route>
          </Routes>

          {/* Global Toast Notifications */}
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </BrowserRouter>
      </SearchProvider>
    </ThemeProvider>
  );
}
