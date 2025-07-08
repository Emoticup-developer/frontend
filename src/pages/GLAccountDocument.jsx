import { useRef, useState, useEffect } from "react";
import { FiChevronRight, FiChevronDown, FiChevronLeft } from "react-icons/fi";
import { RiSideBarFill } from "react-icons/ri";
import { BsCreditCardFill } from "react-icons/bs";
import { IoIosPrint } from "react-icons/io";
import {
  FaFolderOpen,
  FaFolder,
  FaExpand,
  FaCompress,
  FaTimes,
  FaBars,
  FaMinus,
  FaLockOpen,
  FaLock,
  FaSearch,
  FaList,
  FaCircle,
  FaRegHandPaper,
  FaPlay,
  FaRegBookmark,
  FaEdit,
} from "react-icons/fa";
import Sidebar from "../components/Sidebar";

const GLAccountDocument = ({ isActiveTab }) => {
  const appRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showApp, setShowApp] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const scrollRef = useRef(null);
  const [activeTab, setActiveTab] = useState("Basic Data");
  const [showScrollButton, setShowScrollButton] = useState(false);

  const tabNames = [
    { name: "Basic Data", id: "basic-data" },
    { name: "Details", id: "details" },
  ];

  // Individual disabled state for each tab
  const [disabledStates, setDisabledStates] = useState(() => {
    const init = {};
    tabNames.forEach((t) => (init[t] = true));
    return init;
  });

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const el = scrollRef.current;
        setShowScrollButton(
          el.scrollWidth > el.clientWidth + el.scrollLeft + 20
        );
      }
    };
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, []);

  // Disable all, then enable activeTab after delay
  useEffect(() => {
    setDisabledStates((prev) => {
      const updated = { ...prev };
      tabNames.forEach((tab) => (updated[tab] = true));
      return updated;
    });

    const timeout = setTimeout(() => {
      setDisabledStates((prev) => ({
        ...prev,
        [activeTab]: false,
      }));
    }, 2000);

    return () => clearTimeout(timeout);
  }, [activeTab]);

  const handleTabClick = (tabName, index, event) => {
    event.preventDefault();
    setActiveTab(tabName); // match by name
    const tabEl = scrollRef.current?.children[index];
    tabEl?.scrollIntoView({ behavior: "smooth", inline: "center" });
  };

  const disabled = disabledStates[activeTab];

  // Show or hide scroll button
  useEffect(() => {
    const el = scrollRef.current;
    if (el && el.scrollWidth > el.clientWidth) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  }, []);

  // Dynamic Section Content
  const renderSectionContent = () => {
    switch (activeTab) {
      case "Basic Data":
        return (
          <section
            id="basic-data"
            className="p-4 border border-gray-300 bg-white w-full h-[365px] overflow-y-auto"
          >
            <div className="bg-[#e5f3fd] p-6 rounded shadow-md">
              <div className="grid grid-cols-3 gap-x-6 gap-y-4 items-center">
                {/* Invoice / Document Date */}
                <div className="flex items-center">
                  <label
                    htmlFor="invoice_date"
                    className="w-40 text-right text-xs font-medium"
                  >
                    Invoice / Document Date{" "}
                    <span className="text-amber-500">*</span>
                  </label>
                  <input
                    id="invoice_date"
                    type="text"
                    className="w-28 h-6 border rounded px-2 text-xs bg-white"
                  />
                </div>

                {/* Posting Date */}
                <div className="flex items-center">
                  <label
                    htmlFor="posting_date"
                    className="w-40 text-right text-xs font-medium"
                  >
                    Posting Date <span className="text-amber-500">*</span>
                  </label>
                  <input
                    id="posting_date"
                    type="text"
                    className="w-28 h-6 border rounded px-2 text-xs bg-white"
                  />
                </div>

                {/* Invoice Type */}
                <div className="flex items-center">
                  <label
                    htmlFor="invoice_type"
                    className="w-40 text-right text-xs font-medium"
                  >
                    Invoice Type <span className="text-amber-500">*</span>
                  </label>
                  <input
                    id="invoice_type"
                    type="text"
                    className="w-28 h-6 border rounded px-2 text-xs bg-white"
                  />
                </div>

                {/* Document Header Text */}
                <div className="flex items-center">
                  <label
                    htmlFor="doc_header"
                    className="w-40 text-right text-xs font-medium"
                  >
                    Document Header Text{" "}
                    <span className="text-amber-500">*</span>
                  </label>
                  <input
                    id="doc_header"
                    type="text"
                    className="w-28 h-6 border rounded px-2 text-xs bg-white"
                  />
                </div>

                {/* Reference */}
                <div className="flex items-center">
                  <label
                    htmlFor="reference"
                    className="w-40 text-right text-xs font-medium"
                  >
                    Reference <span className="text-amber-500">*</span>
                  </label>
                  <input
                    id="reference"
                    type="text"
                    className="w-28 h-6 border rounded px-2 text-xs bg-white"
                  />
                </div>

                {/* Company Code */}
                <div className="flex items-center">
                  <label
                    htmlFor="company_code"
                    className="w-40 text-right text-xs font-medium"
                  >
                    Company Code <span className="text-amber-500">*</span>
                  </label>
                  <input
                    id="company_code"
                    type="text"
                    className="w-28 h-6 border rounded px-2 text-xs bg-white"
                  />
                </div>

                {/* Currency */}
                <div className="flex items-center">
                  <label
                    htmlFor="currency"
                    className="w-40 text-right text-xs font-medium"
                  >
                    Currency <span className="text-amber-500">*</span>
                  </label>
                  <input
                    id="currency"
                    type="text"
                    className="w-28 h-6 border rounded px-2 text-xs bg-white"
                  />
                </div>

                {/* Month */}
                <div className="flex items-center">
                  <label
                    htmlFor="month"
                    className="w-40 text-right text-xs font-medium"
                  >
                    Month <span className="text-amber-500">*</span>
                  </label>
                  <input
                    id="month"
                    type="text"
                    className="w-28 h-6 border rounded px-2 text-xs bg-white"
                  />
                </div>

                {/* Year */}
                <div className="flex items-center">
                  <label
                    htmlFor="year"
                    className="w-40 text-right text-xs font-medium"
                  >
                    Year <span className="text-amber-500">*</span>
                  </label>
                  <input
                    id="year"
                    type="text"
                    className="w-28 h-6 border rounded px-2 text-xs bg-white"
                  />
                </div>
              </div>
            </div>
          </section>
        );
      case "Details":
        return (
          <section
            id="details"
            className="p-4 border border-gray-300 bg-white w-full h-[299px] overflow-y-auto"
          >
            <p className="font-medium mb-3">Account Control in Company Code</p>
            <div className="border border-gray-200 bg-gray-200 p-3 w-[800px] text-center">
              {/* Account Currency */}
              <div className="flex items-center mb-2">
                <label
                  htmlFor="account_currency"
                  className="w-60 text-right pr-4"
                >
                  Account Currency:
                </label>
                <input
                  type="text"
                  id="account_currency"
                  name="account_currency"
                  disabled={disabled}
                  placeholder="INR"
                  className={`border border-gray-200 bg-white p-1 rounded w-12 ${
                    disabled ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
                <span className="ml-4">United States Dollar</span>
              </div>

              {/* Balances in Local Crcy Only */}
              <div className="flex items-center mb-2">
                <label
                  htmlFor="balance_currency_check"
                  className="w-60 text-right pr-4"
                >
                  Balances in Local Crcy Only:
                </label>
                <input
                  type="checkbox"
                  id="balance_currency_check"
                  name="balance_currency_check"
                  disabled={disabled}
                  placeholder="INR"
                  className={`w-4 h-4 border border-gray-200 bg-white p-1 rounded ${
                    disabled ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              </div>

              {/* Tax Category + checkbox + explanation */}
              <div className="flex items-center mb-2">
                <label htmlFor="tax_category" className="w-60 text-right pr-4">
                  Tax Category:
                </label>
                <input
                  type="text"
                  id="tax_category"
                  name="tax_category"
                  disabled={disabled}
                  placeholder="+1"
                  className={`border border-gray-200 bg-white p-1 rounded w-12 mr-2 ${
                    disabled ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
                <FaCircle className="w-2 h-2 mr-2" />
                <span>Only output tax allowed</span>
              </div>

              {/* Posting without tax */}
              <div className="flex items-center mb-2">
                <label className="w-60 text-right pr-4">
                  Posting without tax allowed:
                </label>
                <input type="checkbox" className="w-4 h-4" />
              </div>

              {/* Alternative Account No */}
              <div className="flex items-center">
                <label className="w-60 text-right pr-4">
                  Alternative Account No.:
                </label>
                <input
                  type="text"
                  className="border border-gray-300 bg-white px-2 py-1 w-40"
                  placeholder=""
                />
              </div>
            </div>
            <p className="font-medium mb-3 mt-3">
              Account Management in Company Code
            </p>
            <div className="border border-gray-200 bg-gray-200 p-3 w-[800px] text-center">
              {/* Account Currency */}
              <div className="flex items-center mb-2">
                <label className="w-60 text-right pr-4">Sort Key:</label>
                <input
                  type="text"
                  disabled={disabled}
                  className={`border border-gray-200 bg-white p-1 rounded w-12 ${
                    disabled ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              </div>
            </div>
            {/* Account Settings in Controlling Area A000 */}
            <p className="font-medium mb-3 mt-3">
              Account Settings in Controlling Area A000 Controlling Area A000
            </p>
            <div className="border border-gray-200 bg-gray-200 p-3 w-[800px] text-center">
              {/* CElEm Category */}
              <div className="flex items-center mb-2">
                <label className="w-60 text-right pr-4">*CElEm category:</label>
                <input
                  type="text"
                  placeholder="11"
                  disabled={disabled}
                  className={`border border-gray-300 bg-white px-2 py-1 w-12 rounded ${
                    disabled ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
                <span className="ml-4">Revenues</span>
              </div>

              {/* Record Quantity */}
              <div className="flex items-center mb-2">
                <label className="w-60 text-right pr-4">Record Quantity:</label>
                <input
                  type="checkbox"
                  disabled={disabled}
                  className="w-4 h-4"
                />
              </div>

              {/* Internal UoM */}
              <div className="flex items-center">
                <label className="w-60 text-right pr-4">Internal UoM:</label>
                <input
                  type="checkbox"
                  disabled={disabled}
                  className="w-4 h-4"
                />
              </div>
            </div>

            {/* Joint Venture Data in Company Code */}
            <p className="font-medium mt-2 mb-3">
              Joint venture data in company code
            </p>
            <div className="border border-gray-200 bg-gray-200 p-3 w-[800px] text-center">
              {/* Recovery Indicator */}
              <div className="flex items-center">
                <label className="w-60 text-right pr-4">
                  Recovery Indicator:
                </label>
                <input
                  type="checkbox"
                  disabled={disabled}
                  className="w-4 h-4"
                />
              </div>
            </div>
          </section>
        );

        return (
          <section id="info-cocd" className="p-4 mt-4 border rounded bg-white">
            <p>Company Code level information displayed here.</p>
          </section>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
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

  const [openMenus, setOpenMenus] = useState({
    devcust: false,
    masterdata: false,
    aerp: false,
    client: false,
    accounting: false,
    imgfunc: false,
    imgsub: false,
    quickaccess: false,
    financial: false,
    ledger: false,
    masterRecord: false,
    glAccount: false,
    individualProcessing: false,
  });

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

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
      <div className="bg-[#e5f3fd] p-1 text-xs shadow-md flex justify-between items-center">
        <div className="flex text-black">
          <FaBars className="mx-2 mt-1 text-xs cursor-pointer" title="Menu" />
          <h6 className="mx-2 text-sm">Menu</h6>
          <h6 className="mx-2 text-sm">Edit</h6>
          <h6 className="mx-2 text-sm">Favorites</h6>
          <h6 className="mx-2 text-sm">Extras</h6>
          <h6 className="mx-2 text-sm">System</h6>
          <h6 className="mx-2 text-sm">Help</h6>
        </div>
        <div className="flex items-center space-x-2 text-black">
          <h6 className="mx-2 text-sm">Admin</h6>
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
      <div className="relative flex items-center p-2 bg-[#9abddc] h-12">
        {/* Left - AERP */}
        <h1 className="text-black font-bold text-3xl">AERP</h1>
      </div>

      <div className="relative bg-[#f5fbff] border border-gray-200 text-black font-semibold p-1 text-xs shadow-md flex justify-between items-center">
        {/* Sidebar Toggle Buttons */}
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

        {/* Center Text */}
        <p className="absolute left-1/2 transform -translate-x-1/2 text-[16px] font-semibold">
          Edit G/L Account Document
        </p>

        {/* Search Box */}
        <div className="relative flex items-center ml-4 z-10">
          <input
            type="text"
            placeholder="Search..."
            className="pl-8 pr-2 py-0.5 rounded-sm border border-gray-300 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            style={{ width: "150px" }}
          />
          <FaSearch className="absolute left-2 text-gray-400 text-sm" />
        </div>
      </div>

      <div className="flex flex-grow overflow-hidden">
        {isSidebarVisible && <Sidebar />}

        {/* Main Content */}
        <div className="flex-1 font-sans text-xs bg-gray-50">
          <div className="bg-gray-50 p-2">
            <div className="flex justify-between space-x-6 text-sm text-gray-700">
              <div className="flex px-2">
                <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
                  <BsCreditCardFill />
                  <span className="mr-5">Hold</span>
                </div>
                <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
                  <RiSideBarFill />
                  <span className="mr-5">Simulate</span>
                </div>
                <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
                  <FaRegBookmark />
                  <span className="mr-5">Park</span>
                </div>
                <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
                  <FaEdit />
                  <span className="mr-5">Editing Options</span>
                </div>
                <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
                  <span>More</span>
                  <FiChevronDown size={14} />
                </div>
              </div>
              <div className="flex">
                <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
                  <IoIosPrint />
                </div>
                <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
                  <span className="px-2">Exit</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            {/* Tabs */}
            <div className="p-2 flex items-center">
              <div
                ref={scrollRef}
                className="flex space-x-1 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
              >
                {tabNames.map((tab, index) => (
                  <a
                    key={tab.name}
                    href={`#${tab.id}`} // use tab.id here
                    onClick={(e) => handleTabClick(tab.name, index, e)}
                    className={`snap-start px-3 py-0.5 whitespace-nowrap text-xs font-medium border-b-2 ${
                      activeTab === tab.name
                        ? "text-blue-900 border-blue-900"
                        : "text-gray-700 border-transparent"
                    }`}
                  >
                    {tab.name}
                  </a>
                ))}
              </div>

              {showScrollButton && (
                <button
                  onClick={() =>
                    scrollRef.current?.scrollBy({
                      left: 120,
                      behavior: "smooth",
                    })
                  }
                  className="ml-2 p-1 bg-white rounded shadow hover:bg-gray-100"
                >
                  <FiChevronRight size={16} />
                </button>
              )}
            </div>

            {/* Optional message */}
            {disabled && (
              <div className="px-4 text-sm text-gray-500 mb-2">
                Unlocking inputs...
              </div>
            )}

            {/* Tab Section Content */}
            {renderSectionContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GLAccountDocument;
