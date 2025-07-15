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
import Layout from "../components/Layout";

const HomePage = ({ isActiveTab }) => {
  // const appRef = useRef(null);
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
    <div className="bg-[#e5f3fd] w-full min-h-screen overflow-y-auto">
      <div className="bg-white border border-gray-300 rounded text-justify p-4 mx-4 my-4 text-xs font-sans leading-normal text-gray-800 shadow-md">
        <strong>About AERP:</strong> (Accelerated Enterprise Resource Planning)
        is a modern ERP software platform designed to streamline and automate
        core business processes such as finance, inventory, sales, procurement,
        HR, and production. Tailored for small to mid-sized businesses, AERP
        offers real-time data visibility, customizable modules, and integration
        capabilities. It helps companies improve efficiency, maintain
        compliance, reduce operational costs, and enhance decision-making
        through analytics. AERP supports both cloud and on-premise deployments
        and ensures user-friendly interfaces with role-based access. Its
        scalable architecture enables businesses to adapt and grow seamlessly
        while maintaining control over complex operations.
      </div>
    </div>
  );
};

export default HomePage;
