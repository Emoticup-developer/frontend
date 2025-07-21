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
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import GUI from "./pages/GUI";
import Centrally from "./pages/Centrally";
import DefineCompany from "./pages/DefineCompany";
import CreateCompany from "./pages/CreateCompany";
import HomePage from "./pages/HomePage";
import ClientProfile from "./pages/ClientProfile";
import GLAccountDocument from "./pages/GLAccountDocument";
import FiscalYearVariantForm from "./components/FiscalYearVariantForm";
import ChartsofAccounts from "./pages/ChartsofAccounts";
import AssignCOAToCompanyCode from "./pages/AssignCOAToCompanyCode";
import CreateCompanyCode from "./pages/CreateCompanyCode";
import DefineFiscalYear from "./pages/DefineFiscalYear";
import AssignFiscalYeartoCompanyCode from "./pages/AssignFiscalYeartoCompanyCode";
import AssignCompanytoCompanyCode from "./pages/AssignCompanytoCompanyCode";
import DefineAccountGroups from "./pages/DefineAccountGroups";
import FieldStatusVariants from "./pages/FieldStatusVariants";
import FieldStatusGroups from "./pages/FieldStatusGroups";
import TypicalFieldGroups from "./pages/TypicalFieldGroups";
import PostingPeriodVariant from "./pages/PostingPeriodVariant";
import DefineToleranceGroups from "./pages/DefineToleranceGroups";
import TaxonSalesandPurchase from "./pages/TaxonSalesandPurchase";
import DocumentTypes from "./pages/DocumentTypes";
import NumberRanges from "./pages/NumberRanges";
import DefineGLAccountTypes from "./pages/DefineGLAccountTypes";
import ChartsAccountsFields from "./pages/ChartsAccountsFields";
import CompanyCodeFields from "./pages/CompanyCodeFields";
import LedgerDefinitionFields from "./pages/LedgerDefinitionFields";
import DefineCurrencyandExchangeRateTypes from "./pages/DefineCurrencyandExchangeRateTypes";
import PostJournalEntry from "./pages/PostJournalEntry";
import DisplayGLBalances from "./pages/DisplayGLBalances";
import DisplayLineItems from "./pages/DisplayLineItems";
import TrialBalance from "./pages/TrialBalance";
import ProfitandLossStatement from "./pages/ProfitandLossStatement";
import BalanceSheet from "./pages/BalanceSheet";
import APARAging from "./pages/APARAging";
import TaxReport from "./pages/TaxReport";
import AssetRegister from "./pages/AssetRegister";
import BankReconciliationReport from "./pages/BankReconciliationReport";
import DefineNumberRanges from "./pages/DefineNumberRanges";
import FieldTableForm from "./pages/FieldTableForm";
import DefineBusinessArea from "./pages/DefineBusinessArea";
import DefineGLAccountsTypes from "./pages/DefineGLAccountsTypes";

const ThemedPage = ({ children }) => {
  const { colors } = useTheme();

  return (
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
    <ThemeProvider>
      <SearchProvider>
        <BrowserRouter>
          <Routes>
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
                path="/define-fiscal-year"
                element={
                  <ThemedPage>
                    <DefineFiscalYear />
                  </ThemedPage>
                }
              />
              <Route
                path="/define-number-ranges"
                element={
                  <ThemedPage>
                    <DefineNumberRanges />
                  </ThemedPage>
                }
              />
              <Route
                path="/field-table"
                element={
                  <ThemedPage>
                    <FieldTableForm />
                  </ThemedPage>
                }
              />
              <Route
                path="/define-gl-account-types"
                element={
                  <ThemedPage>
                    <DefineGLAccountsTypes />
                  </ThemedPage>
                }
              />
              <Route
                path="/define-business-area"
                element={
                  <ThemedPage>
                    <DefineBusinessArea />
                  </ThemedPage>
                }
              />
              <Route
                path="/assign-fiscal-year"
                element={
                  <ThemedPage>
                    <AssignFiscalYeartoCompanyCode />
                  </ThemedPage>
                }
              />
              <Route
                path="/charts-of-accounts"
                element={
                  <ThemedPage>
                    <ChartsofAccounts />
                  </ThemedPage>
                }
              />
              <Route
                path="/define-account-groups"
                element={
                  <ThemedPage>
                    <DefineAccountGroups />
                  </ThemedPage>
                }
              />
              <Route
                path="/field-status-variants"
                element={
                  <ThemedPage>
                    <FieldStatusVariants />
                  </ThemedPage>
                }
              />
              <Route
                path="/field-status-groups"
                element={
                  <ThemedPage>
                    <FieldStatusGroups />
                  </ThemedPage>
                }
              />
              <Route
                path="/typical-field-groups"
                element={
                  <ThemedPage>
                    <TypicalFieldGroups />
                  </ThemedPage>
                }
              />
              <Route
                path="/posting-period-variant"
                element={
                  <ThemedPage>
                    <PostingPeriodVariant />
                  </ThemedPage>
                }
              />
              <Route
                path="/define-tolerance-groups"
                element={
                  <ThemedPage>
                    <DefineToleranceGroups />
                  </ThemedPage>
                }
              />
              <Route
                path="/tax-on-sales-and-purchase"
                element={
                  <ThemedPage>
                    <TaxonSalesandPurchase />
                  </ThemedPage>
                }
              />
              <Route
                path="/document-types"
                element={
                  <ThemedPage>
                    <DocumentTypes />
                  </ThemedPage>
                }
              />
              <Route
                path="/number-ranges"
                element={
                  <ThemedPage>
                    <NumberRanges />
                  </ThemedPage>
                }
              />
              <Route
                path="/define-gl-account-types"
                element={
                  <ThemedPage>
                    <DefineGLAccountTypes />
                  </ThemedPage>
                }
              />
              <Route
                path="/charts-of-accounts-level-fields"
                element={
                  <ThemedPage>
                    <ChartsAccountsFields />
                  </ThemedPage>
                }
              />
              <Route
                path="/post-journal-entry"
                element={
                  <ThemedPage>
                    <PostJournalEntry />
                  </ThemedPage>
                }
              />
              <Route
                path="/display-gl-balances"
                element={
                  <ThemedPage>
                    <DisplayGLBalances />
                  </ThemedPage>
                }
              />
              <Route
                path="/display-line-items"
                element={
                  <ThemedPage>
                    <DisplayLineItems />
                  </ThemedPage>
                }
              />
              <Route
                path="/trial-balance"
                element={
                  <ThemedPage>
                    <TrialBalance />
                  </ThemedPage>
                }
              />
              <Route
                path="/profit-loss-statement"
                element={
                  <ThemedPage>
                    <ProfitandLossStatement />
                  </ThemedPage>
                }
              />
              <Route
                path="/balance-sheet"
                element={
                  <ThemedPage>
                    <BalanceSheet />
                  </ThemedPage>
                }
              />
              <Route
                path="/ap-ar-aging"
                element={
                  <ThemedPage>
                    <APARAging />
                  </ThemedPage>
                }
              />
              <Route
                path="/tax-report"
                element={
                  <ThemedPage>
                    <TaxReport />
                  </ThemedPage>
                }
              />
              <Route
                path="/asset-register"
                element={
                  <ThemedPage>
                    <AssetRegister />
                  </ThemedPage>
                }
              />
              <Route
                path="/bank_reconciliation_report"
                element={
                  <ThemedPage>
                    <BankReconciliationReport />
                  </ThemedPage>
                }
              />
              <Route
                path="/company-code-level-fields"
                element={
                  <ThemedPage>
                    <CompanyCodeFields />
                  </ThemedPage>
                }
              />
              <Route
                path="/ledger-definition-fields"
                element={
                  <ThemedPage>
                    <LedgerDefinitionFields />
                  </ThemedPage>
                }
              />
              <Route
                path="/define-currency-and-exchange-rate-types"
                element={
                  <ThemedPage>
                    <DefineCurrencyandExchangeRateTypes />
                  </ThemedPage>
                }
              />
              <Route
                path="/assign-coa-to-company-code"
                element={
                  <ThemedPage>
                    <AssignCOAToCompanyCode />
                  </ThemedPage>
                }
              />
              <Route
                path="/assign-company-to-company-code"
                element={
                  <ThemedPage>
                    <AssignCompanytoCompanyCode />
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
                path="/create-company-code"
                element={
                  <ThemedPage>
                    <CreateCompanyCode />
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
