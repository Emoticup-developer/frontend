import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { IoIosPrint, IoMdCreate, IoMdSave } from "react-icons/io";
import { MdCancelScheduleSend, MdOutlinePreview } from "react-icons/md";
import axios from "axios";
import { FaList, FaSearch, FaTimes } from "react-icons/fa";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Country, State, City } from "country-state-city";

const CreateCompany = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isBlocked, setIsBlocked] = useState(false);
  const [formData, setFormData] = useState({
    company_code: "",
    company_name: "",
    company_name_short: "",
    street: "",
    po_box: "",
    postal_code: "",
    country: "",
    state: "",
    city: "",
    language: "",
    currency: "INR",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchBlockStatus = async () => {
      try {
        const response = await axios.get(`${backendUrl}api/record_range`);
        if (Array.isArray(response.data) && response.data.length > 0) {
          setIsBlocked(response.data[0].is_blocked);
        }
      } catch (error) {
        console.error("Error fetching block status:", error);
        toast.error("Failed to fetch block status");
      }
    };

    fetchBlockStatus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}api/company`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // ✅ This enables cookies/session
      });

      console.log("Form submitted successfully:", response.data);
      toast.success("Company Created successfully!");

      // Optional: Reset the form
      setFormData({
        company_code: "",
        company_name: "",
        company_name_short: "",
        street: "",
        po_box: "",
        postal_code: "",
        country: "",
        state: "",
        city: "",
        language: "",
        currency: "INR",
        description: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Invalid Company Code!");
    }
  };

  const handleCancel = async (e) => {
    e.preventDefault();

    setFormData({
      company_code: "",
      company_name: "",
      company_name_short: "",
      street: "",
      po_box: "",
      postal_code: "",
      country: "",
      state: "",
      city: "",
      language: "",
      currency: "INR",
      description: "",
    });
  };

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
      const res = await axios.get(`${backendUrl}api/currency`);
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
                      onClick={handleSubmit}
                      className="flex items-center space-x-1 cursor-pointer hover:text-blue-600"
                    >
                      <IoMdSave />
                      <span className="mr-5">Save</span>
                    </button>
                    <button
                      type="submit"
                      onClick={handleCancel}
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
                      {/* Company Code */}
                      <div className="flex items-center">
                        <label
                          htmlFor="company_code"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Company Code <span className="text-amber-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="company_code"
                          name="company_code"
                          placeholder="C100 - C999"
                          maxLength={4}
                          value={formData.company_code}
                          onChange={handleChange}
                          readOnly={!isBlocked}
                          className={`w-10 h-5 border rounded px-1 py-0.5 text-xs ${
                            isBlocked ? "bg-white" : "bg-gray-200"
                          }`}
                        />
                      </div>

                      {/* Company Name */}
                      <div className="flex items-center">
                        <label
                          htmlFor="company_name"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Company Name <span className="text-amber-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="company_name"
                          name="company_name"
                          value={formData.company_name}
                          onChange={handleChange}
                          className="w-80 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        />
                      </div>

                      {/* Name of Company 2 */}
                      <div className="flex items-center">
                        <label
                          htmlFor="company_name_short"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Name of Company 2
                        </label>
                        <input
                          type="text"
                          id="company_name_short"
                          name="company_name_short"
                          value={formData.company_name_short}
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
                          htmlFor="po_box"
                          className="w-64 text-left text-xs font-medium"
                        >
                          PO Box
                        </label>
                        <input
                          type="text"
                          id="po_box"
                          name="po_box"
                          value={formData.po_box}
                          onChange={handleChange}
                          className="w-26 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        />
                      </div>

                      {/* Postal Code */}
                      <div className="flex items-center">
                        <label
                          htmlFor="postal_code"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Postal Code
                        </label>
                        <input
                          type="text"
                          id="postal_code"
                          name="postal_code"
                          value={formData.postal_code}
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
                          State
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
                          City
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
                          htmlFor="description"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Other Details
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
