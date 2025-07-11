import { useRef, useState, useEffect } from "react";
import { FiChevronRight, FiChevronDown, FiChevronLeft } from "react-icons/fi";
import { RiSideBarFill } from "react-icons/ri";
import { BsCreditCardFill } from "react-icons/bs";
import { IoIosPrint } from "react-icons/io";
import { MdCancelScheduleSend } from "react-icons/md";
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
  FaPlusCircle,
  FaMinusCircle,
  FaPaperPlane,
  FaTimesCircle,
  FaHome,
} from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useSearch } from "../context/SearchContext";

const HomePage = ({ isActiveTab }) => {
  const appRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showApp, setShowApp] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const scrollRef = useRef(null);
  const [activeTab, setActiveTab] = useState("Basic Data");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { setSearchTarget } = useSearch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.toUpperCase() === "G001") {
      setSearchTarget("G001"); // Notify sidebar
      navigate("/gl-account-document"); // Navigate to page
    } else {
      toast.error("No code found!");
    }
  };

  const [lineItems, setLineItems] = useState(
    Array.from({ length: 6 }, () => ({
      s: false,
      glAccount: "",
      shortText: "",
      dc: "",
      amount: "",
      locCurrAmount: "",
      tax: false,
      taxJurisdiction: "",
      assignmentNo: "",
      description: "",
    }))
  );

  const addNewLine = () => {
    setLineItems([
      ...lineItems,
      {
        s: false,
        glAccount: "",
        shortText: "",
        dc: "Debit",
        amount: "",
        locCurrAmount: "",
        tax: false,
        taxJurisdiction: "",
        assignmentNo: "",
      },
    ]);
  };

  const updateLineItem = (index, field, value) => {
    const updatedItems = [...lineItems];
    updatedItems[index][field] = value;
    setLineItems(updatedItems);
  };

  const [totalDebit, setTotalDebit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const [balanceStatus, setBalanceStatus] = useState("initial"); // 'initial', 'unbalanced', 'balanced'

  const addLineItem = () => {
    setLineItems([...lineItems, { ...initialLineItem }]);
  };

  const removeLineItem = (index) => {
    const updated = lineItems.filter((_, i) => i !== index);
    if (updated.length === 0) {
      setLineItems([{ ...initialLineItem }]); // Add a fresh line if all are removed
    } else {
      setLineItems(updated);
    }
  };

  // --- Effect for Calculating Totals and Balance Status ---

  useEffect(() => {
    let debit = 0;
    let credit = 0;

    lineItems.forEach((item) => {
      const amount = parseFloat(item.amount) || 0;
      if (item.dc === "Debit") {
        debit += amount;
      } else if (item.dc === "Credit") {
        credit += amount;
      }
    });

    setTotalDebit(debit);
    setTotalCredit(credit);

    if (debit === 0 && credit === 0) {
      setBalanceStatus("initial");
    } else if (debit !== credit) {
      setBalanceStatus("unbalanced");
    } else {
      setBalanceStatus("balanced");
    }
  }, [lineItems]);

  const handlePost = async () => {
    if (totalDebit !== totalCredit) {
      alert("Debit and Credit totals must match");
      return;
    }
    try {
      const payload = {
        // ...header, // Assuming 'header' state exists elsewhere
        entries: lineItems,
        status: "posted",
      };
      // await axios.post("http://192.168.0.235:8000/conf/journal_entry", payload);
      alert("Journal Posted");
    } catch (error) {
      console.error(error);
      alert("Error Posting");
    }
  };

  const handlePark = async () => {
    const payload = {
      // ...header, // Assuming 'header' state exists elsewhere
      entries: lineItems,
      status: "parked",
    };
    // await axios.post("http://192.168.0.235:8000/conf/journal_entry_temp", payload);
    alert("Journal Parked");
  };

  const [formData, setFormData] = useState(() => {
    const saved = Cookies.get("formData");
    return saved
      ? JSON.parse(saved)
      : {
          currency: "INR",
          time_zone: "",
          country_code: "IN",
          fiscal_year: "",
          number_range: "",
          tax_code: "",
          description: "",
          client_id: Cookies.get("client_id") || "",
          language: Cookies.get("language") || "",
        };
  });

  // ✅ Keep cookies updated whenever formData changes
  useEffect(() => {
    Cookies.set("formData", JSON.stringify(formData)); // store for 7 days
  }, [formData]);

  useEffect(() => {
    const savedClientId = Cookies.get("client_id");
    const savedLanguage = Cookies.get("language");

    setFormData((prev) => ({
      ...prev,
      client_id: savedClientId || "",
      language: savedLanguage || "",
    }));
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("client");
    Cookies.remove("user");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const tabNames = [
    { name: "Basic Data", id: "basic-data" },
    { name: "Details", id: "details" },
  ];

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

  useEffect(() => {
    setDisabledStates((prev) => {
      const updated = { ...prev };
      tabNames.forEach((tab) => (updated[tab] = true));
      return updated;
    });
    const timeout = setTimeout(() => {
      setDisabledStates((prev) => ({ ...prev, [activeTab]: false }));
    }, 2000);
    return () => clearTimeout(timeout);
  }, [activeTab]);

  const handleTabClick = (tabName, index, event) => {
    event.preventDefault();
    setActiveTab(tabName);
    const tabEl = scrollRef.current?.children[index];
    tabEl?.scrollIntoView({ behavior: "smooth", inline: "center" });
  };

  const disabled = disabledStates[activeTab];

  useEffect(() => {
    const el = scrollRef.current;
    if (el && el.scrollWidth > el.clientWidth) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  }, []);

  // The rest of the component remains the same
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
      <div className="bg-gray-200 p-1 text-xs shadow-md flex justify-between items-center">
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
          <FaHome />
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
        <h1 className="text-black font-bold text-3xl">AERP</h1>
      </div>
      <div className="relative bg-[#f5fbff] border border-gray-200 text-black font-semibold p-1 text-xs shadow-md flex justify-between items-center">
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
        <p className="absolute left-1/2 transform -translate-x-1/2 text-[16px] font-semibold">
          Main Page
        </p>

        <div className="relative flex items-center ml-4 mr-3 z-10">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search..."
              className="pl-8 pr-2 py-0.5 mr-2 bg-gray-100 rounded-sm border border-gray-500 text-xs text-gray-800 w-40"
            />
            <FaSearch
              onClick={handleSearch}
              className="absolute left-2 text-gray-400 text-sm cursor-pointer"
            />
          </div>
          <button
            onClick={handleLogout}
            className="text-xs h-5 px-2 py-0.5 rounded bg-white border border-black text-black"
          >
            Logout
          </button>

          {/* <input
            type="text"
            placeholder="Search..."
            className="pl-8 pr-2 py-0.5 rounded-sm border border-gray-300 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            style={{ width: "150px" }}
          />
          <FaSearch className="absolute left-2 text-gray-400 text-sm" /> */}
        </div>
      </div>
      <div className="flex flex-grow overflow-hidden">
        {isSidebarVisible && <Sidebar />}
        <div className="flex flex-col min-h-screen w-full bg-[#e5f3fd] font-sans text-xs">
          <div className="flex-grow w-full bg-[#f0f4f8] text-sm font-sans flex flex-col">
            <div className="h-full w-full bg-[#e5f3fd] shadow-md border border-gray-300 rounded-sm flex flex-col">
              {/* <div className="bg-gray-50 p-2">
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
                <div className="p-2 flex items-center">
                  <div
                    ref={scrollRef}
                    className="flex space-x-1 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
                  >
                    {tabNames.map((tab, index) => (
                      <a
                        key={tab.name}
                        href={`#${tab.id}`}
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
                {disabled && (
                  <div className="px-4 text-sm text-gray-500 mb-2">
                    Unlocking inputs...
                  </div>
                )}
                {renderSectionContent()}
              </div> */}

              <div className="bg-white border border-gray-300 rounded text-justify p-4 mx-4 my-4 text-xs font-sans leading-normal text-gray-800 shadow-md">
                <strong>About AERP:</strong> (Accelerated Enterprise Resource
                Planning) is a modern ERP software platform designed to
                streamline and automate core business processes such as finance,
                inventory, sales, procurement, HR, and production. Tailored for
                small to mid-sized businesses, AERP offers real-time data
                visibility, customizable modules, and integration capabilities.
                It helps companies improve efficiency, maintain compliance,
                reduce operational costs, and enhance decision-making through
                analytics. AERP supports both cloud and on-premise deployments
                and ensures user-friendly interfaces with role-based access. Its
                scalable architecture enables businesses to adapt and grow
                seamlessly while maintaining control over complex operations.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
