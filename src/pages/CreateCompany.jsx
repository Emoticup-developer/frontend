import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { IoIosPrint, IoMdCreate, IoMdSave } from "react-icons/io";
import { MdCancelScheduleSend, MdOutlinePreview } from "react-icons/md";
import axios from "axios";
import { FaInfoCircle, FaList, FaSearch, FaTimes } from "react-icons/fa";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Country, State, City } from "country-state-city";

const CreateCompany = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
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

  const [range, setRange] = useState(null);
  const [existingCodes, setExistingCodes] = useState([]);
  const [showLanguageTooltip, setShowLanguageTooltip] = useState(false);
  const [languageList, setLanguageList] = useState([]);
  const [language, setLanguage] = useState("EN");
  // const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showCurrencyTooltip, setShowCurrencyTooltip] = useState(false);
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

  useEffect(() => {
    const savedClientId = Cookies.get("client_id");
    const savedLanguage = Cookies.get("language");

    setFormData((prev) => ({
      ...prev,
      client_id: savedClientId || "",
      language: savedLanguage || "",
    }));
  }, []);

  const filteredCurrencyList = currencyList.filter(
    (currency) =>
      currency.currency_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currency.currency_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // useEffect(() => {
  //   const fetchAll = async () => {
  //     try {
  //       const [rangeRes, codesRes] = await Promise.all([
  //         axios.get("http://192.168.0.235:8000/api/record_range", {
  //           withCredentials: true,
  //         }),
  //         axios.get("http://192.168.0.235:8000/api/client", {
  //           withCredentials: true,
  //         }),
  //       ]);

  //       const rg = rangeRes.data.find(
  //         (r) => r.field === "COMPANY" && !r.is_blocked
  //       );
  //       setRange(rg);

  //       const used = codesRes.data.map((c) => c.company.toUpperCase());
  //       setExistingCodes(used);
  //     } catch (err) {
  //       console.error(err);
  //       toast.error("Failed to load configuration.");
  //     }
  //   };

  //   fetchAll();
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.trim().toUpperCase() }));
  };

  const validateCompany = () => {
    if (!range) {
      toast.error("Company range not configured.");
      return false;
    }
    const { suffix, start_from, end_to } = range;
    const code = formData.company;
    if (!code.startsWith(suffix)) {
      toast.error(`Code must start with "${suffix}"`);
      return false;
    }
    const num = parseInt(code.slice(suffix.length), 10);
    if (isNaN(num)) {
      toast.error("Code format invalid.");
      return false;
    }
    if (num < +start_from || num > +end_to) {
      toast.error(
        `Number must be between ${suffix}${start_from} and ${suffix}${end_to}`
      );
      return false;
    }
    if (existingCodes.includes(code)) {
      toast.error("Company code already exists.");
      return false;
    }
    return true;
  };

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry));
      setSelectedState("");
      setSelectedCity("");
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      setCities(City.getCitiesOfState(selectedCountry, selectedState));
      setSelectedCity("");
    }
  }, [selectedState]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateCompany()) return;

    try {
      const res = await axios.post(
        "http://192.168.0.235:8000/api/company",
        formData,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200 || res.status === 201) {
        toast.success("Company saved!");
        setFormData({
          company: "",
          companyName: "",
          companyName2: "",
          street: "",
          poBox: "",
          postalCode: "",
          country: "",
          state: "",
          city: "",
          languageKey: "",
          currency: "",
        });
      } else {
        toast.error("Failed to save company.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error saving company.");
    }
  };

  return (
    <div>
      <div className="flex flex-col min-h-screen w-full bg-gray-50 font-sans text-xs">
        <div className="flex-grow w-full bg-[#f0f4f8] text-sm font-sans flex flex-col">
          <form onSubmit={handleSubmit}>
            <div className="h-full w-full bg-gray-100 shadow-md border border-gray-300 rounded-sm flex flex-col">
              {/* 🔷 Header Action Bar (non-scrollable) */}
              <div className="bg-gray-50 p-2">
                <div className="flex justify-between space-x-6 text-sm text-gray-700">
                  <div className="flex px-2">
                    <button
                      type="button"
                      className="flex items-center space-x-1 cursor-pointer hover:text-blue-600"
                    >
                      <IoMdCreate />
                      <span className="mr-5">Edit</span>
                    </button>
                    <button
                      type="submit"
                      className="flex items-center space-x-1 cursor-pointer hover:text-blue-600"
                    >
                      <IoMdSave />
                      <span className="mr-5">Save</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center space-x-1 cursor-pointer hover:text-blue-600"
                    >
                      <MdCancelScheduleSend />
                      <span className="mr-5">Cancel</span>
                    </button>
                    <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
                      <MdOutlinePreview />
                      <span className="mr-5">Review</span>
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
                      <a href="/home">
                        <span className="px-2">Exit</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="relative w-full h-[404px] overflow-y-auto">
                <div className="min-h-[404px] w-full">
                  <div className="p-4 space-y-4">
                    <div className="space-y-2">
                      {/* Company */}
                      <div className="flex items-center">
                        <label
                          htmlFor="company"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Company <span className="text-amber-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          placeholder="AB01"
                          value={formData.company}
                          maxLength={4}
                          onChange={handleChange}
                          className="w-9 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        />
                      </div>

                      {/* Company Name */}
                      <div className="flex items-center">
                        <label
                          htmlFor="companyName"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Company Name <span className="text-amber-500">*</span>
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

                      {/* Name of Company 2 */}
                      <div className="flex items-center">
                        <label
                          htmlFor="companyName2"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Name of Company 2
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

                      {/* Street */}
                      <div className="flex items-center">
                        <label
                          htmlFor="street"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Street
                        </label>
                        <input
                          type="text"
                          id="street"
                          name="street"
                          value={formData.street}
                          onChange={handleChange}
                          className="w-60 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        />
                      </div>

                      {/* PO Box */}
                      <div className="flex items-center">
                        <label
                          htmlFor="poBox"
                          className="w-64 text-left text-xs font-medium"
                        >
                          PO Box
                        </label>
                        <input
                          type="text"
                          id="poBox"
                          name="poBox"
                          value={formData.poBox}
                          onChange={handleChange}
                          className="w-26 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        />
                      </div>

                      {/* Postal Code */}
                      <div className="flex items-center">
                        <label
                          htmlFor="postalCode"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Postal Code
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

                      {/* Country */}
                      <div className="flex items-center">
                        <label className="w-64 text-left text-xs font-medium">
                          Country <span className="text-amber-500">*</span>
                        </label>
                        <select
                          className="w-34 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                          value={selectedCountry}
                          onChange={(e) => setSelectedCountry(e.target.value)}
                        >
                          <option value="">-- Select Country --</option>
                          {countries.map((country) => (
                            <option
                              key={country.isoCode}
                              value={country.isoCode}
                            >
                              {country.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* State */}
                      <div className="flex items-center">
                        <label className="w-64 text-left text-xs font-medium">
                          State <span className="text-amber-500">*</span>
                        </label>
                        <select
                          className="w-30 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                          value={selectedState}
                          onChange={(e) => setSelectedState(e.target.value)}
                          disabled={!selectedCountry}
                        >
                          <option value="">-- Select State --</option>
                          {states.map((state) => (
                            <option key={state.isoCode} value={state.isoCode}>
                              {state.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* City */}
                      <div className="flex items-center">
                        <label className="w-64 text-left text-xs font-medium">
                          City <span className="text-amber-500">*</span>
                        </label>
                        <select
                          className="w-30 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                          value={selectedCity}
                          onChange={(e) => setSelectedCity(e.target.value)}
                          disabled={!selectedState}
                        >
                          <option value="">-- Select City --</option>
                          {cities.map((city) => (
                            <option key={city.name} value={city.name}>
                              {city.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center">
                        <label
                          htmlFor="language"
                          className="w-64 text-left text-xs font-medium"
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
                            className="w-7 h-5 border rounded px-1 py-0.5 text-xs bg-gray-200"
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <div className="flex items-center gap-2">
                          {/* Label */}
                          <label
                            htmlFor="currency"
                            className="w-62 text-left text-xs font-medium"
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
                              className="w-10 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                            />

                            {/* Info Icon */}
                            <FaInfoCircle
                              className="absolute -right-10 top-1 text-blue-600 cursor-pointer"
                              onMouseEnter={() => setShowCurrencyTooltip(true)}
                              onMouseLeave={() => setShowCurrencyTooltip(false)}
                            />

                            {/* Tooltip */}
                            {showCurrencyTooltip && (
                              <div className="absolute left-[60px] top-0 z-10 w-35 bg-gray-800 text-white text-xs p-2 rounded shadow-md">
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
                            <div
                              className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30"
                              style={{ top: position.y, left: position.x }}
                              onMouseDown={handleMouseDown}
                            >
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

                      <div className="flex items-center">
                        <label
                          htmlFor="company"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Other Details{" "}
                        </label>
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

                  {/* Information Section */}
                  <div className="p-4">
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Information:
                    </label>
                    <div className="w-full border border-gray-300 rounded-sm bg-white p-2 text-xs leading-relaxed text-gray-800">
                      Creating a company involves entering key organizational
                      details such as its legal name, address, country, and
                      language. This information forms the foundation of
                      enterprise structure within the system and is essential
                      for legal reporting, financial integration, and business
                      operations. Currency and language settings ensure accurate
                      communication and transaction processing across modules.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCompany;
