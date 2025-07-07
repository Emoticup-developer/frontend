import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import banner from "../assets/banner.json";
import axios from "axios";
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
import ResizableSAPAccessSidebar from "./TreeItemSAP";

// const currencyList = currencyCodes.data.map((item) => item.code);

const MainPage = () => {
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
      {/* Main Content */}
      <main className="flex-1 bg-[#d2ecf7] border bg-gradient-to-b from-[#d2ecf7] to-[#d2ecf7] border-black lg:p-0 p-4">
        <form onSubmit={handleSubmit}>
          {/* 🧱 Top Info Row - Fixed Header */}
          <div className="fixed top-0 left-0 right-0 z-50 bg-[#d2ecf7] border-b border-black px-4 py-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              {/* Left: Logo + Name + Role */}
              <div className="flex items-start gap-3">
                <div className="w-[50px] h-[50px] bg-black flex items-center justify-center">
                  <div className="w-[50px] h-[50px] bg-white flex items-center justify-center rounded-sm">
                    <div className="w-[42px] h-[42px] bg-black rounded-full flex items-center justify-center">
                      <FaUser className="text-white w-5 h-5" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-semibold text-black">
                      Name:
                    </label>
                    <span className="text-sm font-semibold text-black">
                      Arun
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-semibold text-black">
                      Role:
                    </label>
                    <span className="text-sm font-semibold text-black">
                      Admin
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Notification + Logout + T-Code */}
              <div className="flex flex-col items-start sm:items-end gap-2">
                <div className="flex gap-2">
                  <button className="h-7 px-1 rounded text-amber-500">
                    <FaBell />
                  </button>
                  <button
                    onClick={handleLogout}
                    className="text-sm h-7 px-2 py-0.5 rounded bg-white border border-black text-black"
                  >
                    Logout
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative w-[120px]">
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
          </div>

          {/* 🧱 Sidebar + Page Content */}
          <div className="w-full overflow-hidden">
            <div className="flex h-full">
              {/* Sidebar */}
              <div className="w-[300px] bg-white border-r overflow-y-auto">
                <ResizableSAPAccessSidebar />
              </div>

              {/* Page Content with spacing beside sidebar */}
              <div className="flex-1 mt-24 p-4 mx-4 w-full h-[76vh]">
                <div className="w-full h-full">
                  <Lottie animationData={banner} loop={true} />
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default MainPage;
