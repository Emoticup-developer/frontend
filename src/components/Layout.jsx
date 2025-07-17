import { useRef, useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaExpand,
  FaTimes,
  FaBars,
  FaMinus,
  FaLockOpen,
  FaLock,
  FaSearch,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useSearch } from "../context/SearchContext";

const Layout = () => {
  const appRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showApp, setShowApp] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const { setSearchTarget } = useSearch();
  const [searchTerm, setSearchTerm] = useState("");
  const [username, setUsername] = useState("User");

  const location = useLocation();
  const navigate = useNavigate();

  const routeTitles = {
    "/customers": "Customers",
    "/vendors": "Vendors",
    "/client-profile": "Client",
    "/preferences": "Preferences",
    "/gl-account-document": "Enter Account Document",
    "/centrally": "Centrally",
    "/define-company": "Define Company",
    "/create-company": "Define Company",
    "/define-fiscal-year": "Define Fiscal Year Variant",
    "/charts-of-accounts": "Charts of Accounts",
    "/assign-coa-to-company-code": "Assign CoA to Company Code",
    "/create-company-code": "Define Company Code",
    "/field-status-variants": "Define Field Status Variants",
    "/field-status-groups": "Define Field Status Groups",
    "/typical-field-groups": "Typical Field Groups",
    "/posting-period-variant": "Posting Period Variant",
    "/define-tolerance-groups": "Define Tolerance Groups",
    "/tax-on-sales-and-purchase": "Tax on Sales & Purchases (Define Tax Codes)",
    "/define-account-groups": "Define Account Groups",
    "/assign-company-to-company-code": "Assign Company Code to Company",
    "/assign-fiscal-year": "Assign Fiscal Year Variant to Company Code",
    "/document-types": "Document Types",
    "/number-ranges": "Number Ranges",
    "/define-gl-account-types": "Define G/L Account Types",
    "/charts-of-accounts-level-fields": "Charts of Accounts Level Fields",
    "/company-code-level-fields": "Company Code Level Fields",
  };

  const pageTitle = routeTitles[location.pathname] || "Dashboard";

  const handleSearch = () => {
    if (searchTerm.toUpperCase() === "G001") {
      setSearchTarget("G001");
      navigate("/gl-account-document");
    } else {
      toast.error("No code found!");
    }
  };

  const handleLogout = () => {
    Cookies.remove("client");
    Cookies.remove("username");
    Cookies.remove("language");
    toast.success("Logged out successfully");
    navigate("/");
  };

  useEffect(() => {
    const nameFromCookie = Cookies.get("username");
    if (nameFromCookie) {
      setUsername(nameFromCookie);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () =>
      setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const goFullscreen = () => {
    if (appRef.current?.requestFullscreen) appRef.current.requestFullscreen();
  };
  const exitFullscreen = () => {
    if (document.fullscreenElement && document.exitFullscreen)
      document.exitFullscreen();
  };
  const handleCloseApp = () => setShowApp(false);
  const toggleLock = () => setIsLocked((prev) => !prev);

  if (!showApp) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-200 text-gray-700 text-2xl p-4 text-center">
        <p>Application Closed.</p>
        <p className="text-lg mt-2">Please close this browser tab manually.</p>
        <button
          onClick={() => setShowApp(true)}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-base"
        >
          Re-open App
        </button>
      </div>
    );
  }

  return (
    <div
      ref={appRef}
      className="w-screen h-screen bg-gray-100 overflow-hidden flex flex-col font-sans font-semibold"
    >
      {/* Top Menu Bar */}
      <div className="bg-gray-200 p-1 text-xs shadow-md flex justify-between items-center">
        <div className="flex text-black">
          <FaBars className="mx-2 mt-0.5 text-xs cursor-pointer" title="Menu" />
          <h6 className="mx-2 text-xs">Menu</h6>
          <h6 className="mx-2 text-xs">Edit</h6>
          <h6 className="mx-2 text-xs">Favorites</h6>
          <h6 className="mx-2 text-xs">Extras</h6>
          <h6 className="mx-2 text-xs">System</h6>
          <h6 className="mx-2 text-xs">Help</h6>
        </div>
        <div className="flex items-center space-x-2 text-black">
          <h6 className="mx-2 text-xs uppercase">{username}</h6>
          <button
            onClick={toggleLock}
            title={isLocked ? "Unlock" : "Lock"}
            className="hover:bg-gray-200 p-1 rounded"
          >
            {isLocked ? <FaLock /> : <FaLockOpen />}
          </button>
          <button
            onClick={exitFullscreen}
            disabled={!isFullscreen || isLocked}
            className={`hover:bg-gray-200 p-1 rounded ${
              !isFullscreen || isLocked ? "opacity-50 cursor-not-allowed" : ""
            }`}
            title="Exit Fullscreen"
          >
            <FaMinus />
          </button>
          <button
            onClick={goFullscreen}
            disabled={isFullscreen || isLocked}
            className={`hover:bg-gray-200 p-1 rounded ${
              isFullscreen || isLocked ? "opacity-50 cursor-not-allowed" : ""
            }`}
            title="Fullscreen"
          >
            <FaExpand />
          </button>
          <button
            onClick={handleCloseApp}
            title="Close"
            className="hover:bg-gray-200 p-1 rounded"
          >
            <FaTimes />
          </button>
        </div>
      </div>

      {/* App Header */}
      <div className="relative flex justify-between items-center p-2 bg-[#9abddc] h-12">
        <h1 className="text-black font-bold text-3xl ml-2">AERP</h1>
        <FaHome className="mr-2" />
      </div>

      {/* Control Panel */}
      <div className="relative bg-[#f5fbff] border border-gray-200 text-black font-semibold p-1 text-xs shadow-md flex justify-between items-center">
        {/* Sidebar Toggle */}
        <div className="flex items-center gap-2 mr-4 z-10">
          <button
            className={`p-1 ${
              isSidebarVisible
                ? "text-blue-600 hover:text-blue-800"
                : "text-gray-400 cursor-not-allowed"
            }`}
            onClick={() => isSidebarVisible && setIsSidebarVisible(false)}
            title="Hide Sidebar"
            disabled={!isSidebarVisible}
          >
            <FiChevronLeft size={18} />
          </button>

          <button
            className={`p-1 ${
              !isSidebarVisible
                ? "text-blue-600 hover:text-blue-800"
                : "text-gray-400 cursor-not-allowed"
            }`}
            onClick={() => !isSidebarVisible && setIsSidebarVisible(true)}
            title="Show Sidebar"
            disabled={isSidebarVisible}
          >
            <FiChevronRight size={18} />
          </button>
        </div>

        {/* Page Title */}
        <p className="absolute left-1/2 transform -translate-x-1/2 text-[16px] font-semibold">
          {pageTitle}
        </p>

        {/* Search and Logout */}
        <div className="flex items-center gap-4 ml-4 z-10">
          {/* Search Box */}
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="pl-8 pr-2 py-0.5 rounded-sm border border-gray-300 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              style={{ width: "150px" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <FaSearch className="absolute left-2 text-gray-400 text-sm" />
          </div>

          {/* Only show logout on /home */}
          {location.pathname === "/home" && (
            <button
              onClick={handleLogout}
              className="flex items-center cursor-pointer bg-gray-50 border border-black px-2 py-0.5 rounded gap-1 text-xs mr-3"
            >
              <FaSignOutAlt size={14} />
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-grow overflow-hidden">
        {isSidebarVisible && <Sidebar />}
        <div className="flex-1 font-sans text-xs max-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
