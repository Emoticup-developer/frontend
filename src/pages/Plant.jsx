import { useState, useEffect } from "react";
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
} from "react-icons/fa";
// import currencyCodes from "currency-codes";
import { useNavigate } from "react-router-dom";
// const currencyList = currencyCodes.data.map((item) => item.code);

const Plant = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [clientInfo, setClientInfo] = useState(null);

  useEffect(() => {
    const savedClientId = Cookies.get("client_id");
    const savedLanguage = Cookies.get("language");

    if (savedClientId)
      setClientInfo((prev) => ({ ...prev, client_id: savedClientId }));
    if (savedLanguage) setLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    domain: "",
  });

  // const handleChange = (e) =>
  //   setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(JSON.stringify(formData, null, 2));
  };

  const [currencyList, setCurrencyList] = useState([]);
  const [currency, setCurrency] = useState("INR");
  const [showTablePopup, setShowTablePopup] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addCurrencyData, setAddCurrencyData] = useState({
    currency_code: "",
    currency_name: "",
  });

  const fetchCurrencies = async () => {
    try {
      const res = await axios.get("http://192.168.0.235:8000/api/currency");
      const data = res.data;
      if (Array.isArray(data)) {
        const seen = new Set();
        const unique = data.filter((item) => {
          if (seen.has(item.currency_code)) return false;
          seen.add(item.currency_code);
          return true;
        });
        setCurrencyList(unique);
      } else {
        console.error("Invalid response:", data);
      }
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  const handleCurrencySelect = (code) => {
    setCurrency(code);
    setShowTablePopup(false);
  };

  const handleUpdateCurrency = async (currency_name) => {
    try {
      await axios.put(
        `http://192.168.0.235:8000/api/currency/${currency_name}`
      );
      fetchCurrencies();
      toast.success("Currency updated successfully!");
    } catch (err) {
      toast.error("Update failed!");
      console.error(err);
    }
  };

  const handleDeleteCurrency = async (currency_name) => {
    try {
      await axios.delete(
        `http://192.168.0.235:8000/api/currency/${currency_name}`
      );
      fetchCurrencies();
      toast.success("Currency deleted!");
    } catch (err) {
      toast.error("Delete failed!");
      console.error(err);
    }
  };

  const handleChange = (index, field, value) => {
    const list = [...currencyList];
    list[index][field] = value;
    setCurrencyList(list);
  };

  const handleAddCurrency = async () => {
    if (!addCurrencyData.currency_code || !addCurrencyData.currency_name) {
      toast.error("Both fields are required!");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        "http://192.168.0.235:8000/api/currency",
        addCurrencyData
      );
      fetchCurrencies();
      setAddCurrencyData({ currency_code: "", currency_name: "" });
      setShowAddPopup(false);
      toast.success("Currency added!");
    } catch (err) {
      toast.error("Add failed!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const [countryList, setCountryList] = useState([]);
  const [country, setCountry] = useState("India");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  // useEffect(() => {
  //   fetch("https://restcountries.com/v3.1/all")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const countries = data.map((item) => item.name.common);
  //       setCountryList(countries.sort());
  //     })
  //     .catch((err) => console.error("Failed to load countries", err));
  // }, []);

  const [countryCodeList, setCountryCodeList] = useState([]);
  const [countryCode, setCountryCode] = useState("IN");
  const [showCountryCodeDropdown, setShowCountryCodeDropdown] = useState(false);

  // useEffect(() => {
  //   fetch("https://restcountries.com/v3.1/all")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const codes = data
  //         .map((item) => item.cca2)
  //         .filter(Boolean)
  //         .sort();
  //       setCountryCodeList(codes);
  //     })
  //     .catch((err) => console.error("Failed to load country codes", err));
  // }, []);

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
  const [fiscalYear, setFiscalYear] = useState("2025-2026");
  const [showFiscalYearDropdown, setShowFiscalYearDropdown] = useState(false);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const years = [];

    for (let i = 0; i < 10; i++) {
      const start = currentYear - i;
      years.push(`${start}-${start + 1}`);
    }

    setFiscalYearList(years);
  }, []);

  const toggleFiscalYearDropdown = () =>
    setShowFiscalYearDropdown(!showFiscalYearDropdown);

  const handleFiscalYearSelect = (value) => {
    setFiscalYear(value);
    setShowFiscalYearDropdown(false);
  };

  const [numberRangeList, setNumberRangeList] = useState([]);
  const [numberRange, setNumberRange] = useState("NR01");
  const [showNumberRangeDropdown, setShowNumberRangeDropdown] = useState(false);

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
                <label
                  htmlFor="company_code"
                  className="w-[63px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                >
                  Code:<span className="text-amber-500"> *</span>
                </label>
                <input
                  type="text"
                  id="company_code"
                  name="company_code"
                  placeholder="007"
                  className="w-[60px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Tabs Section - Full Width */}
          <div className="w-full bg-blue-100 border-t-2 border-b-2 border-[#031015]">
            <div className="flex justify-between items-center px-3">
              <div className="bg-amber-500 rounded-md bg-gradient-to-b from-amber-500 to-white">
                <h1 className="font-bold uppercase">PLANT</h1>
              </div>
              <div>
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-1 justify-end lg:px-0">
                  <button
                    className="relative px-4 bg-white border border-black hover:bg-amber-500 text-black text-sm cursor-pointer font-semibold text-center"
                    style={{
                      clipPath: "polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    }}
                  >
                    Review
                  </button>

                  <button
                    className="relative px-4 bg-white border border-black hover:bg-amber-500 text-black cursor-pointer text-sm font-semibold text-center"
                    style={{
                      clipPath: "polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    }}
                  >
                    Park
                  </button>

                  <button
                    className="relative px-4 bg-white border border-black hover:bg-amber-500 text-black cursor-pointer text-sm font-semibold text-center"
                    style={{
                      clipPath: "polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    }}
                  >
                    Post
                  </button>
                  <button
                    className="relative px-4 bg-white border border-black hover:bg-amber-500 text-black cursor-pointer text-sm font-semibold text-center"
                    style={{
                      clipPath: "polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    }}
                  >
                    Cancel
                  </button>
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
              {/* Top Input Rows */}
              <div className="flex flex-col lg:flex-row lg:gap-8 lg:px-4 mb-5">
                {/* Column 1 */}
                <div className="flex flex-col gap-4 w-full lg:w-1/2">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="plant_code"
                      className="w-[130px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                    >
                      Plant Code<span className="text-amber-500"> *</span>
                    </label>
                    <input
                      type="text"
                      id="plant_code"
                      name="plant_code"
                      placeholder="PL01"
                      className="w-[50px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="name"
                      className="w-[130px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                    >
                      Plant Name<span className="text-amber-500"> *</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Mumbai Plant"
                      className="w-[105px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="street"
                      className="w-[130px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                    >
                      Street<span className="text-amber-500"> *</span>
                    </label>
                    <input
                      type="text"
                      id="street"
                      name="street"
                      placeholder="Plot 15, Ind. Area"
                      className="w-[150px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="postal_code"
                      className="w-[130px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                    >
                      Postal Code<span className="text-amber-500"> *</span>
                    </label>
                    <input
                      type="text"
                      id="postal_code"
                      name="postal_code"
                      placeholder="560001"
                      className="w-[65px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="city"
                      className="w-[130px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                    >
                      City<span className="text-amber-500"> *</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="Mumbai"
                      className="w-[70px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                    />
                  </div>
                </div>

                {/* Column 2 */}
                <div className="flex flex-col gap-4 w-full lg:w-1/2">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="country"
                      className="w-[130px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                    >
                      Country<span className="text-amber-500"> *</span>
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      placeholder="IN"
                      className="w-[35px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="region"
                      className="w-[130px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                    >
                      Region<span className="text-amber-500"> *</span>
                    </label>
                    <input
                      type="text"
                      id="region"
                      name="region"
                      placeholder="MH"
                      className="w-[40px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                    />
                  </div>

                  <div className="relative">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="language"
                        className="w-[130px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                      >
                        Language<span className="text-amber-500"> *</span>
                      </label>
                      <input
                        type="text"
                        id="language"
                        name="language"
                        value={language}
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
                              setLanguage(lang);
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
                    <label
                      htmlFor="telephone_fax"
                      className="w-[130px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                    >
                      Telephone/Fax<span className="text-amber-500"> *</span>
                    </label>
                    <input
                      type="text"
                      id="telephone_fax"
                      name="telephone_fax"
                      placeholder="91-22-12345678"
                      className="w-[120px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                    />
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

export default Plant;
