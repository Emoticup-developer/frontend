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

const Company = () => {
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
    plant: "",
  });

  // const handleChange = (e) =>
  //   setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(JSON.stringify(formData, null, 2));
  };

  const [currencyList, setCurrencyList] = useState([]);
  const [showCurrencyPopup, setShowCurrencyPopup] = useState(false);

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

  const [plantList, setPlantList] = useState([]);
  const [showPlantPopup, setShowPlantPopup] = useState(false);

  // Fetch plants from API
  const fetchPlants = async () => {
    try {
      const res = await axios.get("http://192.168.0.235:8000/api/plant");
      setPlantList(res.data);
    } catch (err) {
      toast.error("Failed to fetch plants");
    }
  };

  // Select a plant and update formData
  const handlePlantSelect = (name) => {
    setFormData({ ...formData, plant: name });
    setShowPlantPopup(false);
  };

  const [languageList, setLanguageList] = useState([]);
  const [language, setLanguage] = useState("EN");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

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
                <h1 className="font-bold uppercase">COMPANY</h1>
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
              <div className="flex flex-col lg:flex-row lg:gap-8 lg:px-4 mb-5">
                {/* Column 1 */}
                <div className="flex flex-col gap-4 w-full lg:w-1/2">
                  <div className="relative">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="company_id"
                        className="w-[130px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                      >
                        Company ID<span className="text-amber-500"> *</span>
                      </label>
                      <input
                        type="text"
                        id="company_id"
                        name="company_id"
                        placeholder="KP001"
                        value={formData.country_code}
                        readOnly
                        className={`w-[60px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400 ${
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

                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="company_name"
                      className="w-[130px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                    >
                      Company Name<span className="text-amber-500"> *</span>
                    </label>
                    <input
                      type="text"
                      id="company_name"
                      name="company_name"
                      placeholder="Reliance Global Holdings Ltd."
                      className="w-[200px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
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
                      placeholder="No. 12 MG Road"
                      className="w-[120px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                    />
                  </div>

                  <div className="relative">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="plant"
                        className="w-[130px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                      >
                        Plant<span className="text-amber-500"> *</span>
                      </label>
                      <input
                        type="text"
                        id="plant"
                        name="plant"
                        placeholder="P001"
                        value={formData.plant}
                        readOnly
                        className={`w-[100px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400 ${
                          formData.plant ? "bg-amber-500" : "bg-white"
                        }`}
                      />

                      {/* FaList Button */}
                      <button
                        type="button"
                        onClick={() => {
                          fetchPlants();
                          setShowPlantPopup(true);
                        }}
                        className="w-4 h-4 flex items-center justify-center bg-white border border-gray-500 rounded hover:bg-amber-400"
                      >
                        <FaList className="text-black text-[7px]" />
                      </button>

                      {/* Plant Popup */}
                      {showPlantPopup && (
                        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center bg-opacity-10">
                          <div className="bg-white w-[300px] h-[160px] pt-2 pb-0 pl-2 pr-2 rounded-md shadow-lg mb-40 ml-90">
                            {/* Close Button */}
                            <div className="flex justify-end items-center mb-2">
                              <button onClick={() => setShowPlantPopup(false)}>
                                <FaTimes />
                              </button>
                            </div>

                            {/* Plant Table */}
                            <div className="overflow-y-auto h-[112px]">
                              <table className="w-full border text-sm">
                                <thead>
                                  <tr className="bg-gray-200">
                                    <th className="p-2 border text-sm">Code</th>
                                    <th className="p-2 border text-sm">Name</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {plantList.map((plant, index) => (
                                    <tr
                                      key={index}
                                      className="hover:bg-amber-200 cursor-pointer h-[20px]"
                                      onClick={() =>
                                        handlePlantSelect(plant.name)
                                      }
                                    >
                                      <td className="p-2 border">
                                        {plant.code}
                                      </td>
                                      <td className="p-2 border">
                                        {plant.name}
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
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="po_box"
                      className="w-[130px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                    >
                      PO Box<span className="text-amber-500"> *</span>
                    </label>
                    <input
                      type="text"
                      id="po_box"
                      name="po_box"
                      placeholder="P.O. Box 1401"
                      className="w-[100px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                    />
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
                        placeholder="IN"
                        value={formData.country_code}
                        readOnly
                        className={`w-[35px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400 ${
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
                </div>

                {/* Column 2 */}
                <div className="flex flex-col gap-4 w-full lg:w-1/2">
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
                        placeholder="INR"
                        value={formData.currency}
                        readOnly
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

                      {/* Currency Popup */}
                      {showCurrencyPopup && (
                        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center bg-opacity-10">
                          <div className="bg-white w-[300px] h-[160px] pt-2 pb-0 pl-2 pr-2 rounded-md shadow-lg mb-40 ml-90">
                            {/* Header */}
                            <div className="flex justify-end items-center mb-2">
                              <button
                                onClick={() => setShowCurrencyPopup(false)}
                              >
                                <FaTimes />
                              </button>
                            </div>

                            {/* Table (only Currency Code + Name) */}
                            <div className="overflow-y-auto h-[112px]">
                              <table className="w-full border text-sm">
                                <thead>
                                  <tr className="bg-gray-200">
                                    <th className="p-2 border text-sm">Code</th>
                                    <th className="p-2 border text-sm">Name</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {currencyList.map((currency, index) => (
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
                        htmlFor="city"
                        className="w-[130px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                      >
                        City<span className="text-amber-500"> *</span>
                      </label>

                      {/* Readonly Input */}
                      <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="Mumbai"
                        value={formData.currency}
                        readOnly
                        className={`w-[75px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400 ${
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

                      {/* Currency Popup */}
                      {showCurrencyPopup && (
                        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center bg-opacity-10">
                          <div className="bg-white w-[300px] h-[160px] pt-2 pb-0 pl-2 pr-2 rounded-md shadow-lg mb-40 ml-90">
                            {/* Header */}
                            <div className="flex justify-end items-center mb-2">
                              <button
                                onClick={() => setShowCurrencyPopup(false)}
                              >
                                <FaTimes />
                              </button>
                            </div>

                            {/* Table (only Currency Code + Name) */}
                            <div className="overflow-y-auto h-[112px]">
                              <table className="w-full border text-sm">
                                <thead>
                                  <tr className="bg-gray-200">
                                    <th className="p-2 border text-sm">Code</th>
                                    <th className="p-2 border text-sm">Name</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {currencyList.map((currency, index) => (
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
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
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
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="email"
                      className="w-[130px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                    >
                      Email<span className="text-amber-500"> *</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="info@relianceglobal.com"
                      className="w-[170px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="contact_person"
                      className="w-[130px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                    >
                      Contact Person<span className="text-amber-500"> *</span>
                    </label>
                    <input
                      type="text"
                      id="contact_person"
                      name="contact_person"
                      placeholder="Prajwal"
                      className="w-[80px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
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

export default Company;
