import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import ResizableSAPSidebar from "./TreeItem";
import { FaBell, FaCircle, FaList, FaUser } from "react-icons/fa";
import currencyCodes from "currency-codes";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const currencyList = currencyCodes.data.map((item) => item.code);

const ExpandableTextarea = ({ id, name, placeholder }) => {
  const textAreaRef = useRef(null);

  const handleInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const handleFocus = () => {
    const el = textAreaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    }
  };

  const handleBlur = () => {
    const el = textAreaRef.current;
    if (el) {
      el.style.height = "28px";
    }
  };

  return (
    <textarea
      id={id}
      name={name}
      ref={textAreaRef}
      rows={1}
      placeholder={placeholder}
      onInput={handleInput}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className="min-h-[28px] max-h-[200px] w-full placeholder:text-center px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400 resize-none overflow-hidden transition-all duration-200"
    />
  );
};

const Client = () => {
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

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(formData, null, 2));
  };

  const [currencyList, setCurrencyList] = useState([]);
  const [currency, setCurrency] = useState("INR");
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => {
      const newState = !prev;

      // Fetch currencies only if opening the dropdown and list is empty
      if (newState && currencyList.length === 0) {
        fetch("http://192.168.0.235:8000/api/currency")
          .then((res) => res.json())
          .then((data) => {
            if (Array.isArray(data)) {
              // Remove duplicate currency_code values
              const seen = new Set();
              const uniqueCurrencies = data.filter((item) => {
                if (seen.has(item.currency_code)) return false;
                seen.add(item.currency_code);
                return true;
              });
              setCurrencyList(uniqueCurrencies);
            } else {
              console.error("Unexpected API response format:", data);
            }
          })
          .catch((err) => console.error("Failed to load currencies", err));
      }

      return newState;
    });
  };

  const handleCurrencySelect = (code) => {
    setCurrency(code);
    setShowDropdown(false);
  };

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
                  required
                  className="w-[60px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Tabs Section - Full Width */}
          <div className="w-full bg-blue-100 border-t-2 border-b-2 border-[#031015]">
            <div className="flex justify-between items-center px-3">
              <div className="bg-amber-500 rounded-md bg-gradient-to-b from-amber-500 to-white">
                <h1 className="font-bold">CLIENT</h1>
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
            <div className="w-full h-[350px] overflow-y-scroll">
              {/* Top Input Rows */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:px-4 mb-5">
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="client_id"
                    className="w-[130px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                  >
                    Client ID<span className="text-amber-500"> *</span>
                  </label>
                  <input
                    type="text"
                    id="client_id"
                    name="client_id"
                    placeholder="0007"
                    value={clientInfo?.client_id || ""}
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

                <div className="relative">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="currency"
                      className="w-[130px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                    >
                      Currency<span className="text-amber-500"> *</span>
                    </label>
                    <input
                      type="text"
                      id="currency"
                      name="currency"
                      value={currency}
                      placeholder="INR"
                      readOnly
                      className="w-[60px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                    />
                    <button
                      type="button"
                      onClick={toggleDropdown}
                      className="w-4 h-4 flex items-center justify-center bg-white border border-gray-500 rounded hover:bg-amber-400"
                    >
                      <FaList className="text-black text-[7px]" />
                    </button>
                  </div>

                  {showDropdown && (
                    <ul className="absolute z-10 mt-1 ml-[172px] w-[220px] bg-white border border-gray-400 rounded shadow-md max-h-40 overflow-auto">
                      {currencyList.map((cur) => (
                        <li
                          key={cur.currency_code}
                          onClick={() =>
                            handleCurrencySelect(cur.currency_code)
                          }
                          className="px-3 py-1 text-sm hover:bg-amber-200 cursor-pointer"
                        >
                          {cur.currency_code} - {cur.currency_name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

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
                    required
                    className="w-[40px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                  />
                </div>

                <div className="relative">
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
                      value={country}
                      readOnly
                      placeholder="India"
                      className="w-[90px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowCountryDropdown(!showCountryDropdown)
                      }
                      className="w-4 h-4 flex items-center justify-center bg-white border border-gray-500 rounded hover:bg-amber-400"
                    >
                      <FaList className="text-black text-[7px]" />
                    </button>
                  </div>

                  {showCountryDropdown && (
                    <ul className="absolute z-10 mt-1 ml-[172px] w-[160px] bg-white border border-gray-400 rounded shadow-md max-h-40 overflow-auto">
                      {countryList.map((cty) => (
                        <li
                          key={cty}
                          onClick={() => {
                            setCountry(cty);
                            setShowCountryDropdown(false);
                          }}
                          className="px-3 py-1 text-sm hover:bg-amber-200 cursor-pointer"
                        >
                          {cty}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

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
                      value={countryCode}
                      readOnly
                      placeholder="IN"
                      className="w-[35px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowCountryCodeDropdown(!showCountryCodeDropdown)
                      }
                      className="w-4 h-4 flex items-center justify-center bg-white border border-gray-500 rounded hover:bg-amber-400"
                    >
                      <FaList className="text-black text-[7px]" />
                    </button>
                  </div>

                  {showCountryCodeDropdown && (
                    <ul className="absolute z-10 mt-1 ml-[172px] w-[80px] bg-white border border-gray-400 rounded shadow-md max-h-40 overflow-auto">
                      {countryCodeList.map((code) => (
                        <li
                          key={code}
                          onClick={() => {
                            setCountryCode(code);
                            setShowCountryCodeDropdown(false);
                          }}
                          className="px-3 py-1 text-sm hover:bg-amber-200 cursor-pointer"
                        >
                          {code}
                        </li>
                      ))}
                    </ul>
                  )}
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
                      value={fiscalYear}
                      readOnly
                      placeholder="2025-2026"
                      className="w-[85px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
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
                      htmlFor="number_range_object"
                      className="w-[130px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                    >
                      Number Range<span className="text-amber-500"> *</span>
                    </label>
                    <input
                      type="text"
                      id="number_range_object"
                      name="number_range_object"
                      value={numberRange}
                      readOnly
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
                    placeholder="TX1"
                    required
                    className="w-[40px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                  />
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
