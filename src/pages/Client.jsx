import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";
import ResizableSAPSidebar from "./TreeItem";
import {
  FaList,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaBell,
  FaUser,
  FaSave,
  FaSearch,
} from "react-icons/fa";
// import currencyCodes from "currency-codes";
import { useNavigate } from "react-router-dom";

// const currencyList = currencyCodes.data.map((item) => item.code);

const Client = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [clientInfo, setClientInfo] = useState(null);

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

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* <Topbar onMenuClick={handleDrawerToggle} isMobile={isMobile} /> */}

      {isMobile ? (
        mobileOpen && (
          <div className="fixed inset-0 z-40 flex">
            <div className="w-[300px] bg-white shadow-lg z-50">
              <ResizableSAPSidebar />
            </div>
            <div
              className="flex-1 bg-black opacity-50"
              onClick={handleDrawerToggle}
            ></div>
          </div>
        )
      ) : (
        <div className="w-[300px] bg-white border-r">
          <ResizableSAPSidebar />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 max-w-6xl h-screen bg-[#d2ecf7] border bg-gradient-to-b from-blue-[#d2ecf7] to-blue-[#d2ecf7] border-black lg:p-0 p-4">
        <form onSubmit={handleSubmit}>
          {/* Top Info Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 lg:px-4">
            {/* Left: Logo + Name + Role */}
            <div className="flex items-start gap-3 mt-5">
              <div className="w-[50px] h-[50px] bg-black flex items-center justify-center">
                <div className="w-[50px] h-[50px] bg-white flex items-center justify-center rounded-sm">
                  <div className="w-[42px] h-[42px] bg-black rounded-full flex items-center justify-center">
                    <FaUser className="text-white w-5 h-5" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold rounded-sm text-black">
                    Name:
                  </label>
                  <span className="text-sm font-semibold rounded-sm text-black">
                    Arun
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold rounded-sm text-black">
                    Role:
                  </label>
                  <span className="text-sm ml-2 font-semibold rounded-sm text-black">
                    Admin
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Help above, T Code below */}
            <div className="flex flex-col items-start sm:items-end gap-2 mt-5">
              <div className="flex gap-2">
                <button className="h-7 px-1 rounded text-amber-500">
                  <FaBell />
                </button>
                <button
                  onClick={handleLogout}
                  className="text-sm h-7 px-2 py-0.5 rounded bg-white border cursor-pointer border-black text-black"
                >
                  Logout
                </button>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative w-[120px]">
                  {/* Search Icon inside input */}
                  <FaSearch className="absolute top-2 left-2 text-gray-600 text-xs" />

                  <input
                    type="text"
                    id="company_code"
                    name="company_code"
                    placeholder="007"
                    className="w-full h-7 pl-6 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400 placeholder:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section - Full Width */}
          <div className="w-full bg-blue-100 border-t-2 border-b-2 border-[#031015]">
            <div className="flex justify-between items-center px-3">
              <div className="bg-amber-500 rounded-md bg-gradient-to-b from-amber-500 to-white">
                <h1 className="font-bold uppercase">CLIENT</h1>
              </div>
              <div>
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-1 justify-end lg:px-0">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="relative px-4 bg-white border border-black hover:bg-amber-500 text-black cursor-pointer text-sm font-semibold text-center"
                    style={{
                      clipPath: "polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    }}
                  >
                    Update
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowReviewPopup(true)}
                    className="relative px-4 bg-white border border-black hover:bg-amber-500 text-black text-sm cursor-pointer font-semibold text-center"
                    style={{
                      clipPath: "polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    }}
                  >
                    Review
                  </button>

                  {showReviewPopup && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30">
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
                          <div className="w-full h-full">
                            <div className="flex flex-col lg:flex-row gap-6 lg:px-4 mb-5">
                              {/* Left Column */}
                              <div className="flex flex-col gap-4 w-full lg:w-1/2">
                                <div className="flex items-center gap-2">
                                  <label
                                    htmlFor="client_id"
                                    className="w-[130px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
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
                                    className="w-[50px] h-7 border border-gray-500 rounded-sm text-sm text-black bg-amber-500 hover:bg-amber-400 px-2 py-0.5"
                                  />
                                </div>

                                <div className="relative">
                                  <div className="flex items-center gap-2">
                                    <label
                                      htmlFor="language"
                                      className="w-[130px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
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
                                      className="w-[35px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-amber-500 hover:bg-amber-400"
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
                                    className="w-[130px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
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
                                    className={`w-[50px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400 ${
                                      formData.currency
                                        ? "bg-amber-500"
                                        : "bg-white"
                                    }`}
                                  />
                                </div>

                                <div className="flex items-center gap-2">
                                  <label
                                    htmlFor="time_zone"
                                    className="w-[130px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
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
                                    className="w-[45px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
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
                                    onBlur={() =>
                                      collapseResize(description1Ref)
                                    }
                                    className="w-[317px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400 resize-none overflow-hidden transition-all duration-200"
                                  />
                                </div>
                              </div>

                              {/* Right Column */}
                              <div className="flex flex-col gap-4 w-full lg:w-1/2">
                                <div className="flex items-center gap-2">
                                  <label
                                    htmlFor="country_code"
                                    className="w-[130px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
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
                                    className={`w-[40px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400 ${
                                      formData.country_code
                                        ? "bg-amber-500"
                                        : "bg-white"
                                    }`}
                                  />
                                </div>

                                <div className="flex items-center gap-2">
                                  <label
                                    htmlFor="fiscal_year"
                                    className="w-[130px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
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
                                    className="w-[115px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                                  />
                                </div>

                                <div className="flex items-center gap-2">
                                  <label
                                    htmlFor="number_range_object"
                                    className="w-[130px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
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
                                    className="w-[50px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                                  />
                                </div>

                                <div className="flex items-center gap-2">
                                  <label
                                    htmlFor="tax_code"
                                    className="w-[130px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
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
                                    className="w-[50px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <a
                    href="#"
                    className="bg-amber-500 ml-5 bg-gradient-to-b from-amber-500 to-white relative px-4 mr-1 border border-black text-black cursor-pointer text-sm font-semibold text-center"
                    style={{
                      clipPath: "polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    }}
                  >
                    Back
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center p-2 rounded lg:p-4 lg:mt-5">
            {/* Scrollable Form Container */}
            <div className="w-full h-[360px] overflow-y-scroll">
              <div className="flex flex-col lg:flex-row gap-6 lg:px-4 mb-5">
                {/* Left Column */}
                <div className="flex flex-col gap-4 w-full lg:w-1/2">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="client_id"
                      className="w-[130px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
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
                      className="w-[50px] h-7 border border-gray-500 rounded-sm text-sm text-black bg-amber-500 hover:bg-amber-400 px-2 py-0.5"
                    />
                  </div>

                  <div className="relative">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="language"
                        className="w-[130px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
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
                        className="w-[35px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-amber-500 hover:bg-amber-400"
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

                  {/* Currency */}
                  <div className="relative">
                    <div className="flex items-center gap-2">
                      {/* Label */}
                      <label
                        htmlFor="currency"
                        className="w-[130px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                      >
                        Currency<span className="text-amber-500"> *</span>
                      </label>

                      {/* Readonly Input */}
                      <input
                        type="text"
                        id="currency"
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        className={`w-[50px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400 ${
                          formData.currency ? "bg-amber-500" : "bg-white"
                        }`}
                      />

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
                            {/* Header */}
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
                            <input
                              type="text"
                              placeholder="Search by code or name"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="w-full mb-2 px-2 py-1 border border-gray-400 rounded text-sm"
                            />

                            {/* Table */}
                            <div className="overflow-y-auto h-[130px]">
                              <table className="w-full border text-sm">
                                <thead>
                                  <tr className="bg-gray-200">
                                    <th className="p-2 border text-sm">Code</th>
                                    <th className="p-2 border text-sm">Name</th>
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

                  <div className="relative">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="time_zone"
                        className="w-[130px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                      >
                        Time Zone<span className="text-amber-500"> *</span>
                      </label>
                      <input
                        type="text"
                        id="time_zone"
                        name="time_zone"
                        placeholder="IST"
                        value={formData.time_zone}
                        onChange={handleChange}
                        className="w-[45px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                      />
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
                      className="w-[317px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400 resize-none overflow-hidden transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-4 w-full lg:w-1/2">
                  <div className="relative">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="country_code"
                        className="w-[130px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                      >
                        Country Code<span className="text-amber-500"> *</span>
                      </label>
                      <input
                        type="text"
                        id="country_code"
                        name="country_code"
                        value={formData.country_code}
                        onChange={handleChange}
                        readOnly
                        className={`w-[40px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400 ${
                          formData.country_code ? "bg-amber-500" : "bg-white"
                        }`}
                      />
                      {/* FaList Button */}
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

                      {/* Country Code Popup */}
                      {showCountryCodePopup && (
                        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center bg-opacity-10">
                          <div className="bg-white w-[300px] h-[160px] pt-2 pb-0 pl-2 pr-2 rounded-md shadow-lg mb-40 ml-90">
                            {/* Close Button */}
                            <div className="flex justify-end items-center mb-2">
                              <button
                                onClick={() => setShowCountryCodePopup(false)}
                              >
                                <FaTimes />
                              </button>
                            </div>

                            {/* Table */}
                            <div className="overflow-y-auto h-[112px]">
                              <table className="w-full border text-sm">
                                <thead>
                                  <tr className="bg-gray-200">
                                    <th className="p-2 border text-sm">Code</th>
                                    <th className="p-2 border text-sm">Name</th>
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
                  </div>
                  <div className="relative">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="fiscal_year"
                        className="w-[130px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                      >
                        Fiscal Year<span className="text-amber-500"> *</span>
                      </label>
                      <input
                        type="text"
                        id="fiscal_year"
                        name="fiscal_year"
                        value={formData.fiscal_year}
                        onChange={handleChange}
                        placeholder="JAN 1 - MAR 31"
                        className="w-[115px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                      />

                      <button
                        type="button"
                        onClick={toggleFiscalYearDropdown}
                        className="w-4 h-4 flex items-center justify-center bg-white border border-gray-500 rounded hover:bg-amber-400"
                      >
                        <FaList className="text-black text-[7px]" />
                      </button>
                    </div>

                    {showFiscalYearDropdown && (
                      <ul className="absolute z-10 mt-1 ml-[172px] w-[100px] bg-white border border-gray-400 rounded shadow-md max-h-40 overflow-auto">
                        {fiscalYearList.map((year) => (
                          <li
                            key={year}
                            onClick={() => handleFiscalYearSelect(year)}
                            className="px-3 py-1 text-sm hover:bg-amber-200 cursor-pointer"
                          >
                            {year}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="relative">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="number_range"
                        className="w-[130px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                      >
                        Number Range<span className="text-amber-500"> *</span>
                      </label>
                      <input
                        type="text"
                        id="number_range"
                        name="number_range"
                        value={formData.number_range}
                        onChange={handleChange}
                        placeholder="NR01"
                        className="w-[50px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                      />
                      <button
                        type="button"
                        onClick={toggleNumberRangeDropdown}
                        className="w-4 h-4 flex items-center justify-center bg-white border border-gray-500 rounded hover:bg-amber-400"
                      >
                        <FaList className="text-black text-[7px]" />
                      </button>
                    </div>

                    {showNumberRangeDropdown && (
                      <ul className="absolute z-10 mt-1 ml-[172px] w-[80px] bg-white border border-gray-400 rounded shadow-md max-h-40 overflow-auto">
                        {numberRangeList.map((range) => (
                          <li
                            key={range}
                            onClick={() => handleNumberRangeSelect(range)}
                            className="px-3 py-1 text-sm hover:bg-amber-200 cursor-pointer"
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
                        className="w-[130px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                      >
                        Tax Code<span className="text-amber-500"> *</span>
                      </label>
                      <input
                        type="text"
                        id="tax_code"
                        name="tax_code"
                        placeholder="TX1"
                        value={formData.tax_code}
                        onChange={handleChange}
                        className="w-[50px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                      />
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
                      <ul className="absolute z-10 mt-1 ml-[172px] w-[80px] bg-white border border-gray-400 rounded shadow-md max-h-40 overflow-auto">
                        {taxCodeList.map((code) => (
                          <li
                            key={code}
                            onClick={() => {
                              setTaxCode(code);
                              setShowTaxCodeDropdown(false);
                            }}
                            className="px-3 py-1 text-sm hover:bg-amber-200 cursor-pointer"
                          >
                            {code}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Client;
