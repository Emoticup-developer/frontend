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
  FaSave,
} from "react-icons/fa";
import Sidebar from "../components/Sidebar";

const CreateCompany = ({ isActiveTab }) => {
  const appRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showApp, setShowApp] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const scrollRef = useRef(null);
  const [activeTab, setActiveTab] = useState("Type Description");
  const [showScrollButton, setShowScrollButton] = useState(false);

  const tabNames = [
    { name: "Type Description", id: "type-description" },
    { name: "Control Data", id: "control-data" },
    { name: "Create/bank/interest", id: "create-bank-interest" },
    { name: "Key word/translation", id: "keyword-translation" },
    { name: "Information(C/A)", id: "info-ca" },
    { name: "Information(CoCd)", id: "info-cocd" },
  ];

  const [formData, setFormData] = useState({
    company: "",
    companyName: "",
    companyName2: "",
    street: "",
    poBox: "",
    postalCode: "",
    city: "",
    country: "",
    languageKey: "",
    currency: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
          Create New Company
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
        <div className="flex flex-col min-h-screen w-full bg-gray-50 font-sans text-xs">
          <div className="flex-grow w-full bg-[#f0f4f8] text-sm font-sans flex flex-col">
            <div className="h-full w-full bg-gray-100 shadow-md border border-gray-300 rounded-sm flex flex-col">
              <div className="bg-blue-200/80 p-2">
                <h2 className="text-sm font-sans">
                  New Entries: Details of Added Entries
                </h2>
              </div>

              <div className="bg-blue-100/80 p-1">
                <h2 className="text-sm font-sans">
                  <FaSave className="ml-3" />
                </h2>
              </div>

              <div className="p-4 space-y-4">
                {/* Top Section */}
                <div className="space-y-2">
                  {/* Company */}
                  <div className="flex items-center">
                    <label
                      htmlFor="company"
                      className="w-44 text-left text-xs font-medium"
                    >
                      Company <span className="mr-2"></span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-9 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                    />
                  </div>

                  {/* Company Name */}
                  <div className="flex items-center">
                    <label
                      htmlFor="companyName"
                      className="w-44 text-left text-xs font-medium"
                    >
                      Company name
                      <span className="mr-2"></span>
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-80 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                    />
                  </div>

                  {/* Name of company 2 */}
                  <div className="flex items-center">
                    <label
                      htmlFor="companyName2"
                      className="w-44 text-left text-xs font-medium"
                    >
                      Name of company 2<span className="mr-2"></span>
                    </label>
                    <input
                      type="text"
                      id="companyName2"
                      name="companyName2"
                      value={formData.companyName2}
                      onChange={handleChange}
                      className="w-80 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                    />
                  </div>
                </div>

                {/* Detailed Information Section */}
                <div className="border border-blue-300 rounded-sm">
                  <div className="bg-blue-200/80 px-3 py-1.5 border-b border-blue-300">
                    <h3 className="text-sm font-sans">Detailed information</h3>
                  </div>
                  <div className="p-4 bg-blue-50/30 space-y-2">
                    {/* Street */}
                    <div className="flex items-center">
                      <label
                        htmlFor="street"
                        className="w-40 text-left text-xs font-medium"
                      >
                        Street
                      </label>
                      <input
                        type="text"
                        id="street"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        className="w-40 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                      />
                    </div>

                    {/* PO Box */}
                    <div className="flex items-center">
                      <label
                        htmlFor="poBox"
                        className="w-40 text-left text-xs font-medium"
                      >
                        PO Box
                      </label>
                      <input
                        type="text"
                        id="poBox"
                        name="poBox"
                        value={formData.poBox}
                        onChange={handleChange}
                        className="w-13 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                      />
                    </div>

                    {/* Postal Code */}
                    <div className="flex items-center">
                      <label
                        htmlFor="postalCode"
                        className="w-40 text-left text-xs font-medium"
                      >
                        Postal code
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="w-13 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                      />
                    </div>

                    {/* City */}
                    <div className="flex items-center">
                      <label
                        htmlFor="city"
                        className="w-40 text-left text-xs font-medium"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-20 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                      />
                    </div>

                    {/* Country */}
                    <div className="flex items-center">
                      <label
                        htmlFor="country"
                        className="w-40 text-left text-xs font-medium"
                      >
                        Country
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-20 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                      />
                    </div>

                    {/* Language Key */}
                    <div className="flex items-center">
                      <label
                        htmlFor="languageKey"
                        className="w-40 text-left text-xs font-medium"
                      >
                        Language Key
                      </label>
                      <input
                        type="text"
                        id="languageKey"
                        name="languageKey"
                        value={formData.languageKey}
                        onChange={handleChange}
                        className="w-6 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                      />
                    </div>

                    {/* Currency */}
                    <div className="flex items-center">
                      <label
                        htmlFor="currency"
                        className="w-40 text-left text-xs font-medium"
                      >
                        Currency
                      </label>
                      <input
                        type="text"
                        id="currency"
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        className="w-8 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCompany;
