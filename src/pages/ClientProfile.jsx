import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

import { IoIosPrint } from "react-icons/io";
import { MdOutlinePreview } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import {
  FaExpand,
  FaTimes,
  FaBars,
  FaMinus,
  FaLockOpen,
  FaLock,
  FaSearch,
  FaList,
  FaCircle,
  FaHome,
  FaInfoCircle,
} from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import axios from "axios";
const tabNames = [
  { name: "Basic Data", id: "basic-data" },
  { name: "Details", id: "details" },
];

const ClientProfile = ({ isActiveTab }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [clientInfo, setClientInfo] = useState(null);
  const [showClientIDTooltip, setShowClientIDTooltip] = useState(false);
  const [showLanguageTooltip, setShowLanguageTooltip] = useState(false);
  const [showCurrencyTooltip, setShowCurrencyTooltip] = useState(false);
  const [showTimeZoneTooltip, setShowTimeZoneTooltip] = useState(false);
  const [showCountryCodeTooltip, setShowCountryCodeTooltip] = useState(false);
  const [showFiscalYearTooltip, setShowFiscalYearTooltip] = useState(false);
  const [showNumberRangeTooltip, setShowNumberRangeTooltip] = useState(false);
  const [showTaxCodeTooltip, setShowTaxCodeTooltip] = useState(false);

  const [activeTab, setActiveTab] = useState("Basic Data");
  const [disabled, setDisabled] = useState(true);
  const scrollRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Prevent scroll jumps
  useEffect(() => {
    const el = document.activeElement;
    if (el && typeof el.blur === "function") el.blur();
  }, [activeTab]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el && el.scrollWidth > el.clientWidth) setShowScrollButton(true);
  }, []);

  const handleTabClick = (name) => {
    setActiveTab(name);
  };

  const description1Ref = useRef(null);

  const autoResize = (ref) => {
    if (ref && ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  };

  const collapseResize = (ref) => {
    if (ref && ref.current) {
      ref.current.style.height = "28px"; // Default collapsed height
    }
  };

  const [position, setPosition] = useState({ x: 200, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const savedClientId = Cookies.get("client_id");
    const savedLanguage = Cookies.get("language");

    setFormData((prev) => ({
      ...prev,
      client_id: savedClientId || "",
      language: savedLanguage || "",
    }));
  }, []);

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

  // ✅ Input field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Submit logic
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { client_id, language } = formData;

    if (!client_id || !language) {
      toast.error("Missing client_id or language!");
      return;
    }

    try {
      const response = await axios.put(
        `http://192.168.0.235:8000/api/client/${client_id}`,
        {
          client_id,
          language,
          currency: formData.currency,
          time_zone: formData.time_zone,
          country_code: formData.country_code,
          fiscal_year: formData.fiscal_year,
          number_range_object: formData.number_range_object,
          tax_code: formData.tax_code,
          description: formData.description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // ✅ Update state and cookie after successful update
      setFormData((prev) => {
        const updated = { ...prev, ...response.data };
        Cookies.set("formData", JSON.stringify(updated), { expires: 7 });
        return updated;
      });

      toast.success("Client data updated successfully!");
    } catch (error) {
      console.error("Error updating client:", error);
      toast.error("Failed to update client.");
    }
  };

  const [currencyList, setCurrencyList] = useState([]);
  const [showCurrencyPopup, setShowCurrencyPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all currencies
  const fetchCurrencies = async () => {
    try {
      const res = await axios.get("http://192.168.0.235:8000/api/currency");
      setCurrencyList(res.data);
    } catch (err) {
      toast.error("Failed to fetch currencies");
    }
  };

  // Select currency for main input
  const handleCurrencySelect = (code) => {
    setFormData({ ...formData, currency: code });
    setShowCurrencyPopup(false);
  };

  // Filter currency list
  const filteredCurrencyList = currencyList.filter(
    (currency) =>
      currency.currency_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currency.currency_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const [countryList, setCountryList] = useState([]);
  // const [showCountryPopup, setShowCountryPopup] = useState(false);

  // // Fetch countries from API
  // const fetchCountries = async () => {
  //   try {
  //     const res = await axios.get("http://192.168.0.235:8000/api/country");
  //     setCountryList(res.data);
  //   } catch (err) {
  //     toast.error("Failed to fetch countries");
  //   }
  // };

  // // Select a country and update formData
  // const handleCountrySelect = (name) => {
  //   setFormData({ ...formData, country: name });
  //   setShowCountryPopup(false);
  // };

  const [countryCodeList, setCountryCodeList] = useState([]);
  const [showCountryCodePopup, setShowCountryCodePopup] = useState(false);

  // Fetch countries from API
  const fetchCountriesCode = async () => {
    try {
      const res = await axios.get("http://192.168.0.235:8000/api/country");
      setCountryCodeList(res.data);
    } catch (err) {
      toast.error("Failed to fetch countries");
    }
  };

  // Select a country code and update formData
  const handleCountryCodeSelect = (code) => {
    setFormData({ ...formData, country_code: code });
    setShowCountryCodePopup(false);
  };

  const [languageList, setLanguageList] = useState([]);
  const [language, setLanguage] = useState("EN");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  // useEffect(() => {
  //   fetch("https://restcountries.com/v3.1/all")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const langs = new Set();
  //       data.forEach((country) => {
  //         if (country.languages) {
  //           Object.values(country.languages).forEach((lang) => langs.add(lang));
  //         }
  //       });
  //       setLanguageList(Array.from(langs).sort());
  //     })
  //     .catch((err) => console.error("Failed to load languages", err));
  // }, []);

  const [fiscalYearList, setFiscalYearList] = useState([]);
  const [fiscalYear, setFiscalYear] = useState("JAN 1 - MAR 31");
  const [showFiscalYearDropdown, setShowFiscalYearDropdown] = useState(false);

  const [timeZone, setTimeZone] = useState("");
  const [showTimeZoneDropdown, setShowTimeZoneDropdown] = useState(false);
  const timeZoneList = [""]; // Customize as needed

  // useEffect(() => {
  //   const currentYear = new Date().getFullYear();
  //   const years = [];

  //   for (let i = 0; i < 10; i++) {
  //     const start = currentYear - i;
  //     years.push(`${start}-${start + 1}`);
  //   }

  //   setFiscalYearList(years);
  // }, []);

  const toggleFiscalYearDropdown = () =>
    setShowFiscalYearDropdown(!showFiscalYearDropdown);

  const handleFiscalYearSelect = (value) => {
    setFiscalYear(value);
    setShowFiscalYearDropdown(false);
  };

  const [numberRangeList, setNumberRangeList] = useState([]);
  const [numberRange, setNumberRange] = useState("NR01");
  const [showNumberRangeDropdown, setShowNumberRangeDropdown] = useState(false);

  const [taxCode, setTaxCode] = useState("");
  const [showTaxCodeDropdown, setShowTaxCodeDropdown] = useState(false);
  const taxCodeList = ["TX1", "TX2", "TX3"]; // Example list

  // Uncomment and modify this if you're fetching from an API later
  // useEffect(() => {
  //   fetch("https://your-api.com/number-range")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const ranges = data.map(item => item.code); // Adjust based on your response structure
  //       setNumberRangeList(ranges);
  //     })
  //     .catch((err) => console.error("Failed to load number ranges", err));
  // }, []);

  useEffect(() => {
    // Static example list
    setNumberRangeList(["NR01", "NR02", "NR03", "NR04"]);
  }, []);

  const toggleNumberRangeDropdown = () =>
    setShowNumberRangeDropdown(!showNumberRangeDropdown);

  const handleNumberRangeSelect = (value) => {
    setNumberRange(value);
    setShowNumberRangeDropdown(false);
  };

  const [showReviewPopup, setShowReviewPopup] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("client");
    Cookies.remove("user");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const appRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showApp, setShowApp] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  // const scrollRef = useRef(null);
  // const [activeTab, setActiveTab] = useState("Basic Data");
  // const [showScrollButton, setShowScrollButton] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
        description: "",
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

  // const handleTabClick = (tabName, index, event) => {
  //   event.preventDefault();
  //   setActiveTab(tabName);
  //   const tabEl = scrollRef.current?.children[index];
  //   tabEl?.scrollIntoView({ behavior: "smooth", inline: "center" });
  // };

  // const disabled = disabledStates[activeTab];

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
          <section className="w-full">
            <div className="bg-[#e5f3fd] px-4 py-0.5 shadow-sm">
              <div className="flex flex-wrap justify-between items-center p-2 rounded lg:p-0 lg:mt-5">
                {/* Scrollable Form Container */}
                <div className="w-full h-[120px]">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:px-4 mb-5">
                    <div className="flex flex-col gap-4">
                      <div className="relative flex items-center gap-2">
                        <label
                          htmlFor="client_id"
                          className="w-[95px] text-left text-xs font-medium"
                        >
                          Client ID <span className="text-amber-500"> *</span>
                        </label>

                        <div className="relative">
                          <input
                            type="text"
                            id="client_id"
                            name="client_id"
                            placeholder="0007"
                            value={formData.client_id}
                            onChange={handleChange}
                            readOnly
                            required
                            onFocus={() => setShowClientIDTooltip(true)}
                            onBlur={() => setShowClientIDTooltip(false)}
                            className="w-[50px] border-gray-500 text-black bg-gray-200 hover:bg-amber-400 h-5 border rounded px-1 py-0.5 text-xs"
                          />

                          {/* Info Icon */}
                          <FaInfoCircle
                            className="absolute -right-5 top-1 text-blue-600 cursor-pointer"
                            onMouseEnter={() => setShowClientIDTooltip(true)}
                            onMouseLeave={() => setShowClientIDTooltip(false)}
                          />

                          {/* Tooltip */}
                          {showClientIDTooltip && (
                            <div className="absolute left-[70px] top-0 z-10 w-48 bg-gray-800 text-white text-xs p-2 rounded shadow-md">
                              This Client ID is auto-generated and cannot be
                              edited.
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="relative">
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor="language"
                            className="w-[95px] text-left text-xs font-medium"
                          >
                            Language <span className="text-amber-500">*</span>
                          </label>

                          <div className="relative">
                            <input
                              type="text"
                              id="language"
                              name="language"
                              value={formData.language}
                              onChange={handleChange}
                              readOnly
                              placeholder="EN"
                              onFocus={() => setShowLanguageTooltip(true)}
                              onBlur={() => setShowLanguageTooltip(false)}
                              className="w-[25px] border-gray-500 text-black bg-gray-200 hover:bg-amber-400 h-5 border rounded px-1 py-0.5 text-xs"
                            />

                            {/* Info Icon */}
                            <FaInfoCircle
                              className="absolute -right-5 top-1 text-blue-600 cursor-pointer"
                              onMouseEnter={() => setShowLanguageTooltip(true)}
                              onMouseLeave={() => setShowLanguageTooltip(false)}
                            />

                            {/* Tooltip */}
                            {showLanguageTooltip && (
                              <div className="absolute left-[50px] top-0 z-10 w-54 bg-gray-800 text-white text-xs p-2 rounded shadow-md">
                                The language code is auto-detected. Select from
                                the list if needed.
                              </div>
                            )}
                          </div>
                        </div>

                        {showLanguageDropdown && (
                          <ul className="absolute z-10 mt-1 ml-[172px] w-[150px] bg-white border border-gray-400 rounded shadow-md max-h-40 overflow-auto">
                            {languageList.map((lang) => (
                              <li
                                key={lang}
                                onClick={() => {
                                  setLanguage(lang); // Optional: sync formData too if needed
                                  setFormData((prev) => ({
                                    ...prev,
                                    language: lang,
                                  }));
                                  setShowLanguageDropdown(false);
                                }}
                                className="px-3 py-1 text-sm hover:bg-amber-200 cursor-pointer"
                              >
                                {lang}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div className="relative">
                        <div className="flex items-center gap-2">
                          {/* Label */}
                          <label
                            htmlFor="currency"
                            className="w-[95px] text-left text-xs font-medium"
                          >
                            Currency<span className="text-amber-500"> *</span>
                          </label>

                          {/* Input + Info icon container */}
                          <div className="relative">
                            {/* Readonly Input */}
                            <input
                              type="text"
                              id="currency"
                              name="currency"
                              value={formData.currency}
                              onChange={handleChange}
                              readOnly
                              onFocus={() => setShowCurrencyTooltip(true)}
                              onBlur={() => setShowCurrencyTooltip(false)}
                              className={`w-[40px] border-gray-500 text-black bg-white hover:bg-amber-400 h-5 border rounded px-1 py-0.5 text-xs ${
                                formData.currency ? "bg-amber-500" : "bg-white"
                              }`}
                            />

                            {/* Info Icon */}
                            <FaInfoCircle
                              className="absolute -right-10 top-1 text-blue-600 cursor-pointer"
                              onMouseEnter={() => setShowCurrencyTooltip(true)}
                              onMouseLeave={() => setShowCurrencyTooltip(false)}
                            />

                            {/* Tooltip */}
                            {showCurrencyTooltip && (
                              <div className="absolute left-[60px] top-0 z-10 w-28 bg-gray-800 text-white text-xs p-2 rounded shadow-md">
                                Currency code is required. Click the list icon
                                to select one.
                              </div>
                            )}
                          </div>

                          {/* FaList Button */}
                          <button
                            type="button"
                            onClick={() => {
                              fetchCurrencies();
                              setShowCurrencyPopup(true);
                            }}
                            className="w-4 h-4 flex items-center justify-center bg-white border border-gray-500 rounded hover:bg-amber-400"
                          >
                            <FaList className="text-black text-[7px]" />
                          </button>

                          {showCurrencyPopup && (
                            <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center bg-opacity-10">
                              <div className="bg-white w-[300px] h-[210px] pt-2 pb-0 pl-2 pr-2 rounded-md shadow-lg mb-40 ml-90">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="font-semibold">
                                    Select Currency
                                  </span>
                                  <button
                                    onClick={() => setShowCurrencyPopup(false)}
                                  >
                                    <FaTimes />
                                  </button>
                                </div>

                                {/* Search Input */}
                                <div className="w-full mb-2 flex items-center border border-gray-400 rounded px-2 py-1 bg-white">
                                  <FaSearch className="text-gray-500 mr-2 text-sm" />
                                  <input
                                    type="text"
                                    placeholder="Search by code or name"
                                    value={searchTerm}
                                    onChange={(e) =>
                                      setSearchTerm(e.target.value)
                                    }
                                    className="w-full outline-none text-sm"
                                  />
                                </div>

                                {/* Table */}
                                <div className="overflow-y-auto h-[130px]">
                                  <table className="w-full border text-sm">
                                    <thead>
                                      <tr className="bg-gray-200">
                                        <th className="p-2 border text-sm">
                                          Code
                                        </th>
                                        <th className="p-2 border text-sm">
                                          Name
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {filteredCurrencyList.map(
                                        (currency, index) => (
                                          <tr
                                            key={index}
                                            className="hover:bg-amber-200 cursor-pointer h-[20px]"
                                            onClick={() =>
                                              handleCurrencySelect(
                                                currency.currency_code
                                              )
                                            }
                                          >
                                            <td className="p-2 border">
                                              {currency.currency_code}
                                            </td>
                                            <td className="p-2 border">
                                              {currency.currency_name}
                                            </td>
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="relative">
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor="time_zone"
                            className="w-[95px] text-left text-xs font-medium"
                          >
                            Time Zone<span className="text-amber-500"> *</span>
                          </label>
                          {/* Input + Info icon container */}
                          <div className="relative">
                            <input
                              type="text"
                              id="time_zone"
                              name="time_zone"
                              placeholder="IST"
                              value={formData.time_zone}
                              onChange={handleChange}
                              readOnly
                              onFocus={() => setShowTimeZoneTooltip(true)}
                              onBlur={() => setShowTimeZoneTooltip(false)}
                              className="w-[30px] h-5 px-1 py-0.5 border border-gray-500 rounded text-xs text-black hover:bg-amber-400 bg-white"
                            />

                            {/* Info Icon */}
                            <FaInfoCircle
                              className="absolute -right-10 top-1 text-blue-600 cursor-pointer"
                              onMouseEnter={() => setShowTimeZoneTooltip(true)}
                              onMouseLeave={() => setShowTimeZoneTooltip(false)}
                            />

                            {/* Tooltip */}
                            {showTimeZoneTooltip && (
                              <div className="absolute left-[60px] top-0 z-10 w-49 bg-gray-800 text-white text-xs p-2 rounded shadow-md">
                                Select the appropriate time zone for your
                                region.
                              </div>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              setShowTimeZoneDropdown(!showTimeZoneDropdown)
                            }
                            className="w-4 h-4 flex items-center justify-center bg-white border border-gray-500 rounded hover:bg-amber-400"
                          >
                            <FaList className="text-black text-[7px]" />
                          </button>
                        </div>

                        {showTimeZoneDropdown && (
                          <ul className="absolute z-10 mt-1 ml-[172px] w-[100px] bg-white border border-gray-400 rounded shadow-md max-h-40 overflow-auto">
                            {timeZoneList.map((zone) => (
                              <li
                                key={zone}
                                onClick={() => {
                                  setTimeZone(zone);
                                  setShowTimeZoneDropdown(false);
                                }}
                                className="px-3 py-1 text-sm hover:bg-amber-200 cursor-pointer"
                              >
                                {zone}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div className="relative">
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor="country_code"
                            className="w-[95px] text-left text-xs font-medium"
                          >
                            Country Code
                            <span className="text-amber-500"> *</span>
                          </label>

                          <div className="relative">
                            <input
                              type="text"
                              id="country_code"
                              name="country_code"
                              value={formData.country_code}
                              onChange={handleChange}
                              readOnly
                              onFocus={() => setShowCountryCodeTooltip(true)}
                              onBlur={() => setShowCountryCodeTooltip(false)}
                              className={`w-[25px] border-gray-500 text-black bg-white hover:bg-amber-400 h-5 border rounded px-1 py-0.5 text-xs ${
                                formData.country_code
                                  ? "bg-amber-500"
                                  : "bg-white"
                              }`}
                            />

                            <FaInfoCircle
                              className="absolute -right-10 top-1 text-blue-600 cursor-pointer"
                              onMouseEnter={() =>
                                setShowCountryCodeTooltip(true)
                              }
                              onMouseLeave={() =>
                                setShowCountryCodeTooltip(false)
                              }
                            />

                            {showCountryCodeTooltip && (
                              <div className="absolute left-[60px] top-0 z-10 w-64 bg-gray-800 text-white text-xs p-2 rounded shadow-md">
                                Country code is assigned based on your selected
                                country.
                              </div>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              fetchCountriesCode();
                              setShowCountryCodePopup(true);
                            }}
                            className="w-4 h-4 flex items-center justify-center bg-white border border-gray-500 rounded hover:bg-amber-400"
                          >
                            <FaList className="text-black text-[7px]" />
                          </button>
                        </div>

                        {showCountryCodePopup && (
                          <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center bg-opacity-10">
                            <div className="bg-white w-[300px] h-[160px] pt-2 pb-0 pl-2 pr-2 rounded-md shadow-lg mb-40 ml-90">
                              <div className="flex justify-end mb-2">
                                <button
                                  onClick={() => setShowCountryCodePopup(false)}
                                >
                                  <FaTimes />
                                </button>
                              </div>

                              <div className="overflow-y-auto h-[112px]">
                                <table className="w-full border text-sm">
                                  <thead>
                                    <tr className="bg-gray-200">
                                      <th className="p-2 border">Code</th>
                                      <th className="p-2 border">Name</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {countryCodeList.map((country, index) => (
                                      <tr
                                        key={index}
                                        className="hover:bg-amber-200 cursor-pointer h-[20px]"
                                        onClick={() =>
                                          handleCountryCodeSelect(
                                            country.country_code
                                          )
                                        }
                                      >
                                        <td className="p-2 border">
                                          {country.country_code}
                                        </td>
                                        <td className="p-2 border">
                                          {country.country_name}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="relative">
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor="fiscal_year"
                            className="w-[95px] text-left text-xs font-medium"
                          >
                            Fiscal Year
                            <span className="text-amber-500"> *</span>
                          </label>

                          <div className="relative">
                            <input
                              type="text"
                              id="fiscal_year"
                              name="fiscal_year"
                              placeholder="JAN 1 - MAR 31"
                              value={formData.fiscal_year}
                              onChange={handleChange}
                              readOnly
                              onFocus={() => setShowFiscalYearTooltip(true)}
                              onBlur={() => setShowFiscalYearTooltip(false)}
                              className="w-[95px] border-gray-500 text-black bg-white hover:bg-amber-400 h-5 border rounded px-1 py-0.5 text-xs"
                            />

                            <FaInfoCircle
                              className="absolute -right-10 top-1 text-blue-600 cursor-pointer"
                              onMouseEnter={() =>
                                setShowFiscalYearTooltip(true)
                              }
                              onMouseLeave={() =>
                                setShowFiscalYearTooltip(false)
                              }
                            />

                            {showFiscalYearTooltip && (
                              <div className="absolute left-[120px] top-0 z-10 w-64 bg-gray-800 text-white text-xs p-2 rounded shadow-md">
                                Select the fiscal year range your company
                                follows.
                              </div>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={toggleFiscalYearDropdown}
                            className="w-4 h-4 flex items-center justify-center bg-white border border-gray-500 rounded hover:bg-amber-400"
                          >
                            <FaList className="text-black text-[7px]" />
                          </button>
                        </div>

                        {showFiscalYearDropdown && (
                          <ul className="absolute z-10 mt-1 ml-[172px] w-[100px] bg-white border border-gray-400 rounded shadow-md max-h-40 overflow-auto text-xs">
                            {fiscalYearList.map((year) => (
                              <li
                                key={year}
                                onClick={() => handleFiscalYearSelect(year)}
                                className="px-3 py-1 hover:bg-amber-200 cursor-pointer"
                              >
                                {year}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="relative">
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor="number_range"
                            className="w-[95px] text-left text-xs font-medium"
                          >
                            Number Range
                            <span className="text-amber-500"> *</span>
                          </label>

                          <div className="relative">
                            <input
                              type="text"
                              id="number_range"
                              name="number_range"
                              value={formData.number_range}
                              onChange={handleChange}
                              placeholder="NR01"
                              readOnly
                              onFocus={() => setShowNumberRangeTooltip(true)}
                              onBlur={() => setShowNumberRangeTooltip(false)}
                              className="w-[50px] h-5 px-1 py-0.5 border border-gray-500 rounded text-xs text-black hover:bg-amber-400 bg-white"
                            />

                            <FaInfoCircle
                              className="absolute -right-10 top-1 text-blue-600 cursor-pointer"
                              onMouseEnter={() =>
                                setShowNumberRangeTooltip(true)
                              }
                              onMouseLeave={() =>
                                setShowNumberRangeTooltip(false)
                              }
                            />

                            {showNumberRangeTooltip && (
                              <div className="absolute left-[60px] top-0 z-10 w-30 bg-gray-800 text-white text-xs p-2 rounded shadow-md">
                                Choose a number range for document IDs.
                              </div>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={toggleNumberRangeDropdown}
                            className="w-4 h-4 flex items-center justify-center bg-white border border-gray-500 rounded hover:bg-amber-400"
                          >
                            <FaList className="text-black text-[7px]" />
                          </button>
                        </div>

                        {showNumberRangeDropdown && (
                          <ul className="absolute z-10 mt-1 ml-[172px] w-[80px] bg-white border border-gray-400 rounded shadow-md max-h-40 overflow-auto text-xs">
                            {numberRangeList.map((range) => (
                              <li
                                key={range}
                                onClick={() => handleNumberRangeSelect(range)}
                                className="px-3 py-1 hover:bg-amber-200 cursor-pointer"
                              >
                                {range}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div className="relative">
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor="tax_code"
                            className="w-[95px] text-left text-xs font-medium"
                          >
                            Tax Code<span className="text-amber-500"> *</span>
                          </label>

                          <div className="relative">
                            <input
                              type="text"
                              id="tax_code"
                              name="tax_code"
                              placeholder="TX1"
                              value={formData.tax_code}
                              onChange={handleChange}
                              readOnly
                              onFocus={() => setShowTaxCodeTooltip(true)}
                              onBlur={() => setShowTaxCodeTooltip(false)}
                              className="w-[50px] h-5 px-1 py-0.5 border border-gray-500 rounded text-xs text-black hover:bg-amber-400 bg-white"
                            />

                            <FaInfoCircle
                              className="absolute -right-10 top-1 text-blue-600 cursor-pointer"
                              onMouseEnter={() => setShowTaxCodeTooltip(true)}
                              onMouseLeave={() => setShowTaxCodeTooltip(false)}
                            />

                            {showTaxCodeTooltip && (
                              <div className="absolute left-[60px] top-0 z-10 w-30 bg-gray-800 text-white text-xs p-2 rounded shadow-md">
                                Choose the applicable tax code for this company.
                              </div>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              setShowTaxCodeDropdown(!showTaxCodeDropdown)
                            }
                            className="w-4 h-4 flex items-center justify-center bg-white border border-gray-500 rounded hover:bg-amber-400"
                          >
                            <FaList className="text-black text-[7px]" />
                          </button>
                        </div>

                        {showTaxCodeDropdown && (
                          <ul className="absolute z-10 mt-1 ml-[172px] w-[80px] bg-white border border-gray-400 rounded shadow-md max-h-40 overflow-auto text-xs">
                            {taxCodeList.map((code) => (
                              <li
                                key={code}
                                onClick={() => {
                                  setTaxCode(code);
                                  setShowTaxCodeDropdown(false);
                                }}
                                className="px-3 py-1 hover:bg-amber-200 cursor-pointer"
                              >
                                {code}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className="flex items-start gap-2">
                        <textarea
                          id="description"
                          name="description"
                          ref={description1Ref}
                          placeholder="Description"
                          value={formData.description}
                          onChange={handleChange}
                          onFocus={() => autoResize(description1Ref)}
                          onInput={() => autoResize(description1Ref)}
                          onBlur={() => collapseResize(description1Ref)}
                          className="w-[250px] h-5 px-2 border border-gray-500 rounded text-xs text-black bg-white hover:bg-amber-400 resize-none overflow-hidden transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      case "Details":
        return (
          <section className="p-5 w-full">
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
    <div>
      <div className="bg-gray-50 p-2">
        <div className="flex justify-between space-x-6 text-sm text-gray-700">
          <div className="flex px-2">
            <button
              onClick={handleSubmit}
              className="flex items-center space-x-1 cursor-pointer hover:text-blue-600"
            >
              <GrUpdate />
              <span className="mr-5">Update</span>
            </button>
            <button
              onClick={() => setShowReviewPopup(true)}
              className="flex items-center space-x-1 cursor-pointer hover:text-blue-600"
            >
              <MdOutlinePreview />
              <span className="mr-5">Review</span>
            </button>

            {showReviewPopup && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30"
                style={{ top: position.y, left: position.x }}
                onMouseDown={handleMouseDown}
              >
                <div className="bg-white rounded-md shadow-lg p-6 w-fit h-fit max-w-screen-md ml-20 mt-30">
                  <div className="flex justify-end mb-4 w-full">
                    <button
                      onClick={() => setShowReviewPopup(false)}
                      className="bg-amber-400 hover:bg-amber-400 text-black text-sm p-1 rounded-full transition-colors duration-200"
                    >
                      <FaTimes className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Your full form content pasted below */}
                  <div className="flex flex-wrap justify-between items-center p-2 rounded lg:p-4 lg:mt-5">
                    {/* Paste your existing form content from <div className="w-full h-[360px] overflow-y-scroll"> onwards here */}
                    <div className="w-full h-[150px]">
                      <div className="flex flex-col lg:flex-row gap-6 lg:px-4 mb-5">
                        {/* Left Column */}
                        <div className="flex flex-col gap-4 w-full lg:w-1/2">
                          <div className="flex items-center gap-2">
                            <label
                              htmlFor="client_id"
                              className="w-[95px] text-left text-xs font-medium"
                            >
                              Client ID
                              <span className="text-amber-500"> *</span>
                            </label>
                            <input
                              type="text"
                              id="client_id"
                              name="client_id"
                              placeholder="0007"
                              value={formData.client_id}
                              onChange={handleChange}
                              readOnly
                              required
                              className="w-[35px] border-gray-500 text-black bg-gray-200 hover:bg-amber-400 h-5 border rounded px-1 py-0.5 text-xs"
                            />
                          </div>

                          <div className="relative">
                            <div className="flex items-center gap-2">
                              <label
                                htmlFor="language"
                                className="w-[95px] text-left text-xs font-medium"
                              >
                                Language
                                <span className="text-amber-500"> *</span>
                              </label>
                              <input
                                type="text"
                                id="language"
                                name="language"
                                value={formData.language}
                                onChange={handleChange}
                                readOnly
                                placeholder="EN"
                                className="w-[25px] border-gray-500 text-black bg-gray-200 hover:bg-amber-400 h-5 border rounded px-1 py-0.5 text-xs"
                              />
                            </div>

                            {showLanguageDropdown && (
                              <ul className="absolute z-10 mt-1 ml-[172px] w-[150px] bg-white border border-gray-400 rounded shadow-md max-h-40 overflow-auto">
                                {languageList.map((lang) => (
                                  <li
                                    key={lang}
                                    onClick={() => {
                                      setLanguage(lang); // Optional: sync formData too if needed
                                      setFormData((prev) => ({
                                        ...prev,
                                        language: lang,
                                      }));
                                      setShowLanguageDropdown(false);
                                    }}
                                    className="px-3 py-1 text-sm hover:bg-amber-200 cursor-pointer"
                                  >
                                    {lang}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Label */}
                            <label
                              htmlFor="currency"
                              className="w-[95px] text-left text-xs font-medium"
                            >
                              Currency
                              <span className="text-amber-500"> *</span>
                            </label>

                            {/* Readonly Input */}
                            <input
                              type="text"
                              id="currency"
                              name="currency"
                              value={formData.currency}
                              readOnly
                              onChange={handleChange}
                              className={`w-[40px] border-gray-500 text-black bg-gray-200 hover:bg-amber-400 h-5 border rounded px-1 py-0.5 text-xs ${
                                formData.currency ? "bg-amber-500" : "bg-white"
                              }`}
                            />
                          </div>

                          <div className="flex items-center gap-2">
                            <label
                              htmlFor="time_zone"
                              className="w-[95px] text-left text-xs font-medium"
                            >
                              Time Zone
                              <span className="text-amber-500"> *</span>
                            </label>
                            <input
                              type="text"
                              id="time_zone"
                              name="time_zone"
                              value={formData.time_zone}
                              readOnly
                              onChange={handleChange}
                              placeholder="IST"
                              className="w-[30px] border-gray-500 text-black bg-gray-200 hover:bg-amber-400 h-5 border rounded px-1 py-0.5 text-xs"
                            />
                          </div>

                          <div className="flex items-start gap-2">
                            <textarea
                              id="description"
                              name="description"
                              ref={description1Ref}
                              placeholder="Description"
                              value={formData.description}
                              onChange={handleChange}
                              readOnly
                              onFocus={() => autoResize(description1Ref)}
                              onInput={() => autoResize(description1Ref)}
                              onBlur={() => collapseResize(description1Ref)}
                              className="w-[230px] h-5 px-2 border border-gray-500 rounded-sm text-xs text-black bg-gray-200 hover:bg-amber-400 resize-none overflow-hidden transition-all duration-200"
                            />
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col gap-4 w-full lg:w-1/2">
                          <div className="flex items-center gap-2">
                            <label
                              htmlFor="country_code"
                              className="w-[95px] text-left text-xs font-medium"
                            >
                              Country Code
                              <span className="text-amber-500"> *</span>
                            </label>
                            <input
                              type="text"
                              id="country_code"
                              name="country_code"
                              value={formData.country_code}
                              onChange={handleChange}
                              readOnly
                              className={`w-[40px] border-gray-500 text-black bg-gray-200 hover:bg-amber-400 h-5 border rounded px-1 py-0.5 text-xs ${
                                formData.country_code
                                  ? "bg-amber-500"
                                  : "bg-white"
                              }`}
                            />
                          </div>

                          <div className="flex items-center gap-2">
                            <label
                              htmlFor="fiscal_year"
                              className="w-[95px] text-left text-xs font-medium"
                            >
                              Fiscal Year
                              <span className="text-amber-500"> *</span>
                            </label>
                            <input
                              type="text"
                              id="fiscal_year"
                              name="fiscal_year"
                              value={formData.fiscal_year}
                              readOnly
                              onChange={handleChange}
                              placeholder="JAN 1 - MAR 31"
                              className="w-[95px] border-gray-500 text-black bg-gray-200 hover:bg-amber-400 h-5 border rounded px-1 py-0.5 text-xs"
                            />
                          </div>

                          <div className="flex items-center gap-2">
                            <label
                              htmlFor="number_range_object"
                              className="w-[95px] text-left text-xs font-medium"
                            >
                              Number Range
                              <span className="text-amber-500"> *</span>
                            </label>
                            <input
                              type="text"
                              id="number_range_object"
                              name="number_range_object"
                              value={formData.number_range}
                              onChange={handleChange}
                              readOnly
                              placeholder="NR01"
                              className="w-[50px] border-gray-500 text-black bg-gray-200 hover:bg-amber-400 h-5 border rounded px-1 py-0.5 text-xs"
                            />
                          </div>

                          <div className="flex items-center gap-2">
                            <label
                              htmlFor="tax_code"
                              className="w-[95px] text-left text-xs font-medium"
                            >
                              Tax Code
                              <span className="text-amber-500"> *</span>
                            </label>
                            <input
                              type="text"
                              id="tax_code"
                              name="tax_code"
                              value={formData.tax_code}
                              readOnly
                              onChange={handleChange}
                              placeholder="TX1"
                              className="w-[30px] border-gray-500 text-black bg-gray-200 hover:bg-amber-400 h-5 border rounded px-1 py-0.5 text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex">
            <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
              <IoIosPrint />
            </div>
            <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
              <a href="/home">
                <span className="px-2">Exit</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        {/* Tab buttons */}
        <div className="p-2 flex items-center">
          <div
            ref={scrollRef}
            className="flex space-x-1 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          >
            {tabNames.map((tab) => (
              <button
                key={tab.name}
                onClick={() => handleTabClick(tab.name)}
                className={`snap-start px-3 py-1 text-xs cursor-pointer font-medium border-b-2 ${
                  activeTab === tab.name
                    ? "text-blue-900 border-blue-900"
                    : "text-gray-600 border-transparent"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
          {showScrollButton && (
            <button
              onClick={() =>
                scrollRef.current?.scrollBy({ left: 120, behavior: "smooth" })
              }
              className="ml-2 p-1 bg-white rounded shadow hover:bg-gray-100"
            >
              <FiChevronRight size={16} />
            </button>
          )}
        </div>

        {/* {disabled && (
          <div className="px-4 text-sm text-gray-500 mb-2">
            Inputs are locked. Enable to edit.
          </div>
        )} */}

        {/* Scrollable Content */}
        <div className="relative w-full h-[362px] overflow-y-auto border border-gray-300 bg-white">
          <div className="min-h-[270px] w-full">{renderSectionContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
