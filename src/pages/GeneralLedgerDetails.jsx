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
} from "react-icons/fa";
// import currencyCodes from "currency-codes";
import { useNavigate } from "react-router-dom";
// const currencyList = currencyCodes.data.map((item) => item.code);

const GeneralLedgerDetails = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [mobileOpen, setMobileOpen] = useState(false);
  const inputRefs = useRef([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [glAccounts, setGlAccounts] = useState([]);
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

  const handleKeyNavigation = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const next = inputRefs.current[index + 1];
      if (next) next.focus();
    } else if (e.key === "Backspace" && e.target.value === "") {
      const prev = inputRefs.current[index - 1];
      if (prev) prev.focus();
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

  const [plAccountTypes, setPlAccountTypes] = useState([]);

  useEffect(() => {
    const fetchPlAccountTypes = async () => {
      try {
        const res = await axios.get(
          "http://192.168.0.235:8000/conf/pl_account_type"
        );
        setPlAccountTypes(res.data);
      } catch (err) {
        console.error("Failed to fetch P&L account types", err);
      }
    };

    fetchPlAccountTypes();
  }, []);

  const [AccountTypes, setAccountTypes] = useState([]);

  useEffect(() => {
    const fetchAccountTypes = async () => {
      try {
        const res = await axios.get(
          "http://192.168.0.235:8000/conf/account_type_indicator"
        );
        setAccountTypes(res.data);
      } catch (err) {
        console.error("Failed to fetch account types", err);
      }
    };

    fetchAccountTypes();
  }, []);

  const [AuthorizationGroups, setAuthorizationGroups] = useState([]);

  useEffect(() => {
    const fetchAuthorizationGroups = async () => {
      try {
        const res = await axios.get(
          "http://192.168.0.235:8000/conf/authorization_group"
        );
        setAuthorizationGroups(res.data);
      } catch (err) {
        console.error("Failed to fetch authorization groups", err);
      }
    };

    fetchAuthorizationGroups();
  }, []);

  const filteredGLAccounts = glAccounts.filter((item) => {
    const formattedDate = new Date(item.created_at).toLocaleDateString("en-GB"); // DD/MM/YYYY
    return (
      item.gl_account_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.short_text?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formattedDate.includes(searchTerm)
    );
  });

  const [formData, setFormData] = useState({
    gl_account_number: "",
    short_text: "",
    long_text: "",
    account_group: "",
    pl_account_type: "",
    account_type_indicator: "",
    group_account_number: "",
    blocked: false,
    reconciliation_account: false,
    field_status_group: "",
    sort_key: "",
    tax_category: "",
    open_item_management: false,
    line_item_display: false,
    authorization_group: "",
    description: "",
  });

  useEffect(() => {
    fetchGLAccounts();
  }, []);

  const fetchGLAccounts = async () => {
    try {
      const response = await axios.get(
        "http://192.168.0.235:8000/conf/gl_account"
      );
      setGlAccounts(response.data); // Set response to state
    } catch (error) {
      console.error("Error fetching GL accounts:", error);
    }
  };

  const handleReviewById = async (glNumber) => {
    try {
      const response = await axios.get(
        `http://192.168.0.235:8000/conf/gl_account/${glNumber}`
      );
      setFormData(response.data); // Load form data
      toast.success("GL Account fetched!");
    } catch (error) {
      toast.error("Error fetching account");
      console.error("GET error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://192.168.0.235:8000/conf/gl_account",
        formData,
        {
          withCredentials: true, // to send cookies/session if needed
        }
      );
      toast.success("GL Account saved successfully!");
      console.log("Response:", response.data);
      // // Reset formData to initial empty state
      // setFormData({
      //   gl_account_number: "",
      //   short_text: "",
      //   long_text: "",
      //   account_group: "",
      //   pl_account_type: "",
      //   account_type_indicator: "",
      //   group_account_number: "",
      //   blocked: false,
      //   reconciliation_account: false,
      //   field_status_group: "",
      //   sort_key: "",
      //   tax_category: "",
      //   open_item_management: false,
      //   line_item_display: false,
      //   authorization_group: "",
      //description: "";
      // });
    } catch (error) {
      toast.success("GL Account Not Saved!");
      console.error("Submit failed:", error);
    }
  };

  const handlePark = async () => {
    const glNumber = formData.gl_account_number;

    if (!glNumber) {
      toast.error("Please enter GL Account Number!");
      return;
    }

    // STEP 1: If data not loaded, first GET the existing data
    if (!isDataLoaded) {
      try {
        const response = await axios.get(
          `http://192.168.0.235:8000/conf/gl_account/${glNumber}`
        );
        if (response.status === 200) {
          setFormData(response.data); // Fill the form
          setIsDataLoaded(true); // Now allow update
          toast.success(
            "GL Account data loaded. Edit fields and click Park again to update."
          );
        }
      } catch (err) {
        if (err.response?.status === 404) {
          toast.error("GL Account Number does not exist.");
        } else {
          toast.error("Failed to load GL Account data.");
          console.error("GET Error:", err);
        }
      }
      return; // return so that PUT doesn't run yet
    }

    // STEP 2: If already loaded, then PUT the updated form
    try {
      const response = await axios.put(
        `http://192.168.0.235:8000/conf/gl_account/${glNumber}`,
        formData
      );
      toast.success("GL Account updated successfully!");
      console.log("PUT Response:", response.data);
      // Reset formData to initial empty state
      setFormData({
        gl_account_number: "",
        short_text: "",
        long_text: "",
        account_group: "",
        pl_account_type: "",
        account_type_indicator: "",
        group_account_number: "",
        blocked: false,
        reconciliation_account: false,
        field_status_group: "",
        sort_key: "",
        tax_category: "",
        open_item_management: "",
        line_item_display: "",
        authorization_group: "",
        description: "",
      });
      setIsDataLoaded(false); // Optional: reset for next time
    } catch (err) {
      toast.error("Failed to update GL Account.");
      console.error("PUT Error:", err);
    }
  };

  const handleCancel = () => {
    setFormData({
      gl_account_number: "",
      short_text: "",
      long_text: "",
      account_group: "",
      pl_account_type: "",
      account_type_indicator: "",
      group_account_number: "",
      blocked: false,
      reconciliation_account: false,
      field_status_group: "",
      sort_key: "",
      tax_category: "",
      open_item_management: false,
      line_item_display: false,
      authorization_group: "",
      description: "",
    });
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
                <h1 className="font-bold uppercase">
                  G/L (POST / EDIT / DELETE)
                </h1>
              </div>
              <div>
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-1 justify-end lg:px-0">
                  {/* <button
                    onClick={() => {
                      setShowReviewPopup(true);
                      handleReview();
                    }}
                    className="relative px-4 bg-white border border-black hover:bg-amber-500 text-black text-sm cursor-pointer font-semibold text-center"
                    style={{
                      clipPath: "polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    }}
                  >
                    Review
                  </button> */}

                  {showReviewPopup && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30">
                      <div className="bg-white rounded-md shadow-lg p-6 w-fit h-fit max-w-screen-md ml-40 mt-30">
                        <div className="flex justify-end mb-4 w-full">
                          <button
                            onClick={() => {
                              setShowReviewPopup(false);
                              handleReviewById(formData.gl_account_number);
                            }}
                            className="bg-amber-400 hover:bg-amber-400 text-black text-sm p-1 rounded-full transition-colors duration-200"
                          >
                            <FaTimes className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Your full form content pasted below */}
                        <div className="flex flex-wrap justify-between items-center p-2 rounded lg:p-4 lg:mt-5">
                          {/* Paste your existing form content from <div className="w-full h-[360px] overflow-y-scroll"> onwards here */}
                          <div className="w-[750px] h-[250px] overflow-y-scroll pr-4">
                            <div className="flex flex-col lg:flex-row gap-6 lg:px-0 mb-5">
                              {/* Left Column */}
                              <div className="flex flex-col gap-4 w-full lg:w-1/2">
                                <div className="flex items-center gap-2">
                                  <label
                                    htmlFor="gl_account_number"
                                    className="w-[210px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                                  >
                                    G/L Account Number
                                    <span className="text-amber-500"> *</span>
                                  </label>
                                  <input
                                    type="text"
                                    id="gl_account_number"
                                    name="gl_account_number"
                                    placeholder="100000"
                                    value={formData.gl_account_number}
                                    onChange={handleChange}
                                    readOnly
                                    ref={(el) => (inputRefs.current[0] = el)}
                                    onKeyDown={(e) => handleKeyNavigation(e, 0)}
                                    className="w-[65px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <label
                                    htmlFor="short_text"
                                    className="w-[210px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                                  >
                                    Short Text
                                    <span className="text-amber-500"> *</span>
                                  </label>
                                  <input
                                    type="text"
                                    id="short_text"
                                    name="short_text"
                                    maxLength={16}
                                    placeholder="Sales Revenue"
                                    value={formData.short_text}
                                    onChange={handleChange}
                                    readOnly
                                    ref={(el) => (inputRefs.current[1] = el)}
                                    onKeyDown={(e) => handleKeyNavigation(e, 1)}
                                    className="w-[130px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                                  />
                                </div>
                                <div className="flex items-start gap-2">
                                  <label
                                    htmlFor="long_text"
                                    className="w-[210px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                                  >
                                    Long Text
                                    <span className="text-amber-500"> *</span>
                                  </label>
                                  <textarea
                                    id="long_text"
                                    name="long_text"
                                    ref={(el) => {
                                      inputRefs.current[2] = el;
                                      description1Ref.current = el;
                                    }}
                                    placeholder="Domestic Sales Revenue"
                                    value={formData.long_text}
                                    onChange={handleChange}
                                    readOnly
                                    onFocus={() => autoResize(description1Ref)}
                                    onInput={() => autoResize(description1Ref)}
                                    onBlur={() =>
                                      collapseResize(description1Ref)
                                    }
                                    onKeyDown={(e) => handleKeyNavigation(e, 2)}
                                    className="w-[130px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400 resize-none overflow-hidden transition-all duration-200"
                                  />
                                </div>

                                <div className="flex items-center gap-2">
                                  <label
                                    htmlFor="account_group"
                                    className="w-[210px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                                  >
                                    Account Group
                                    <span className="text-amber-500"> *</span>
                                  </label>
                                  <input
                                    type="text"
                                    id="account_group"
                                    name="account_group"
                                    placeholder="REVN"
                                    value={formData.account_group}
                                    onChange={handleChange}
                                    readOnly
                                    ref={(el) => (inputRefs.current[3] = el)}
                                    onKeyDown={(e) => handleKeyNavigation(e, 3)}
                                    className="w-[55px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <label
                                    htmlFor="pl_account_type"
                                    className="w-[210px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                                  >
                                    Account Type
                                    <span className="text-amber-500"> *</span>
                                  </label>
                                  <select
                                    id="pl_account_type"
                                    name="pl_account_type"
                                    value={formData.pl_account_type}
                                    onChange={handleChange}
                                    readOnly
                                    ref={(el) => (inputRefs.current[4] = el)}
                                    onKeyDown={(e) => handleKeyNavigation(e, 4)}
                                    className="w-[130px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                                  >
                                    <option value="">Select</option>
                                    {plAccountTypes.map((item, index) => (
                                      <option
                                        key={index}
                                        value={item.pl_account_type}
                                      >
                                        {item.pl_account_type} -{" "}
                                        {item.description}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="flex items-center gap-2">
                                  <label
                                    htmlFor="account_type_indicator"
                                    className="w-[210px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                                  >
                                    Account Type Indicator
                                    <span className="text-amber-500"> *</span>
                                  </label>
                                  <select
                                    id="account_type_indicator"
                                    name="account_type_indicator"
                                    value={formData.account_type_indicator}
                                    onChange={handleChange}
                                    readOnly
                                    ref={(el) => (inputRefs.current[5] = el)}
                                    onKeyDown={(e) => handleKeyNavigation(e, 5)}
                                    className="w-[130px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                                  >
                                    <option value="">Select</option>
                                    {AccountTypes.map((item, index) => (
                                      <option
                                        key={index}
                                        value={item.account_type_indicator}
                                      >
                                        {item.account_type_indicator} -{" "}
                                        {item.description}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <div className="flex items-center gap-2">
                                  <label
                                    htmlFor="group_account_number"
                                    className="w-[210px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                                  >
                                    Group Account Number
                                    <span className="text-amber-500"> *</span>
                                  </label>
                                  <input
                                    type="text"
                                    id="group_account_number"
                                    name="group_account_number"
                                    placeholder="400100"
                                    value={formData.group_account_number}
                                    onChange={handleChange}
                                    readOnly
                                    ref={(el) => (inputRefs.current[6] = el)}
                                    onKeyDown={(e) => handleKeyNavigation(e, 6)}
                                    className="w-[65px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <label
                                    htmlFor="blocked"
                                    className="w-[210px] h-7 px-2 py-0.5 text-sm font-semibold text-black"
                                  >
                                    Blocked/Deleted
                                    <span className="text-amber-500"> *</span>
                                  </label>

                                  <div className="flex items-center gap-4">
                                    {/* Yes */}
                                    <label className="flex items-center gap-1 text-sm text-black">
                                      <input
                                        type="radio"
                                        id="blocked-yes"
                                        name="blocked"
                                        value="true"
                                        checked={formData.blocked === "true"}
                                        onChange={handleChange}
                                        readOnly
                                        ref={(el) =>
                                          (inputRefs.current[7] = el)
                                        }
                                        onKeyDown={(e) =>
                                          handleKeyNavigation(e, 7)
                                        }
                                      />
                                      Yes
                                    </label>

                                    {/* No */}
                                    <label className="flex items-center gap-1 text-sm text-black">
                                      <input
                                        type="radio"
                                        id="blocked-no"
                                        name="blocked"
                                        value="false"
                                        checked={formData.blocked === "false"}
                                        onChange={handleChange}
                                        readOnly
                                        onKeyDown={(e) =>
                                          handleKeyNavigation(e, 7)
                                        }
                                      />
                                      No
                                    </label>
                                  </div>
                                </div>
                              </div>

                              {/* Right Column */}
                              <div className="flex flex-col gap-4 w-full lg:w-1/2">
                                <div className="flex items-center gap-2">
                                  <label
                                    htmlFor="reconciliation_account"
                                    className="w-[210px] h-7 px-2 py-0.5 text-sm font-semibold text-black"
                                  >
                                    Reconciliation Account
                                    <span className="text-amber-500"> *</span>
                                  </label>

                                  <div className="flex items-center gap-4">
                                    {/* Yes */}
                                    <label className="flex items-center gap-1 text-sm text-black">
                                      <input
                                        type="radio"
                                        id="reconciliation_account-yes"
                                        name="reconciliation_account"
                                        value="true"
                                        checked={
                                          formData.reconciliation_account ===
                                          "true"
                                        }
                                        onChange={handleChange}
                                        readOnly
                                        ref={(el) =>
                                          (inputRefs.current[8] = el)
                                        }
                                        onKeyDown={(e) =>
                                          handleKeyNavigation(e, 8)
                                        }
                                      />
                                      Yes
                                    </label>

                                    {/* No */}
                                    <label className="flex items-center gap-1 text-sm text-black">
                                      <input
                                        type="radio"
                                        id="reconciliation_account-no"
                                        name="reconciliation_account"
                                        value="false"
                                        checked={
                                          formData.reconciliation_account ===
                                          "false"
                                        }
                                        onChange={handleChange}
                                        readOnly
                                        onKeyDown={(e) =>
                                          handleKeyNavigation(e, 8)
                                        }
                                      />
                                      No
                                    </label>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <label
                                    htmlFor="field_status_group"
                                    className="w-[210px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                                  >
                                    Field Status Group
                                    <span className="text-amber-500"> *</span>
                                  </label>
                                  <input
                                    type="text"
                                    id="field_status_group"
                                    name="field_status_group"
                                    placeholder="G001"
                                    value={formData.field_status_group}
                                    onChange={handleChange}
                                    readOnly
                                    ref={(el) => (inputRefs.current[9] = el)}
                                    onKeyDown={(e) => handleKeyNavigation(e, 9)}
                                    className="w-[50px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <label
                                    htmlFor="sort_key"
                                    className="w-[210px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                                  >
                                    Sort Key
                                    <span className="text-amber-500"> *</span>
                                  </label>
                                  <input
                                    type="text"
                                    id="sort_key"
                                    name="sort_key"
                                    placeholder="001 (Posting date)"
                                    value={formData.sort_key}
                                    onChange={handleChange}
                                    readOnly
                                    ref={(el) => (inputRefs.current[10] = el)}
                                    onKeyDown={(e) =>
                                      handleKeyNavigation(e, 10)
                                    }
                                    className="w-[130px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <label
                                    htmlFor="tax_category"
                                    className="w-[210px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                                  >
                                    Tax Category
                                    <span className="text-amber-500"> *</span>
                                  </label>
                                  <input
                                    type="text"
                                    id="tax_category"
                                    name="tax_category"
                                    placeholder="V1"
                                    value={formData.tax_category}
                                    onChange={handleChange}
                                    readOnly
                                    ref={(el) => (inputRefs.current[11] = el)}
                                    onKeyDown={(e) =>
                                      handleKeyNavigation(e, 11)
                                    }
                                    className="w-[35px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                                  />
                                </div>
                                {/* Open Item Management */}
                                <div className="flex items-center gap-2">
                                  <label
                                    htmlFor="open_item_management"
                                    className="w-[210px] h-7 px-2 py-0.5 text-sm font-semibold text-black"
                                  >
                                    Open Item Management
                                    <span className="text-amber-500"> *</span>
                                  </label>

                                  <div className="flex items-center gap-4">
                                    {/* Yes */}
                                    <label className="flex items-center gap-1 text-sm text-black">
                                      <input
                                        type="radio"
                                        id="open_item_management-yes"
                                        name="open_item_management"
                                        value="true"
                                        checked={
                                          formData.open_item_management ===
                                          "true"
                                        }
                                        onChange={handleChange}
                                        readOnly
                                        ref={(el) =>
                                          (inputRefs.current[12] = el)
                                        }
                                        onKeyDown={(e) =>
                                          handleKeyNavigation(e, 12)
                                        }
                                      />
                                      Yes
                                    </label>

                                    {/* No */}
                                    <label className="flex items-center gap-1 text-sm text-black">
                                      <input
                                        type="radio"
                                        id="open_item_management-no"
                                        name="open_item_management"
                                        value="false"
                                        checked={
                                          formData.open_item_management ===
                                          "false"
                                        }
                                        onChange={handleChange}
                                        readOnly
                                        onKeyDown={(e) =>
                                          handleKeyNavigation(e, 12)
                                        }
                                      />
                                      No
                                    </label>
                                  </div>
                                </div>

                                {/* Line Item Display */}
                                <div className="flex items-center gap-2">
                                  <label
                                    htmlFor="line_item_display"
                                    className="w-[210px] h-7 px-2 py-0.5 text-sm font-semibold text-black"
                                  >
                                    Line Item Display
                                    <span className="text-amber-500"> *</span>
                                  </label>

                                  <div className="flex items-center gap-4">
                                    {/* Yes */}
                                    <label className="flex items-center gap-1 text-sm text-black">
                                      <input
                                        type="radio"
                                        id="line_item_display-yes"
                                        name="line_item_display"
                                        value="true"
                                        checked={
                                          formData.line_item_display === "true"
                                        }
                                        onChange={handleChange}
                                        readOnly
                                        ref={(el) =>
                                          (inputRefs.current[13] = el)
                                        }
                                        onKeyDown={(e) =>
                                          handleKeyNavigation(e, 13)
                                        }
                                      />
                                      Yes
                                    </label>

                                    {/* No */}
                                    <label className="flex items-center gap-1 text-sm text-black">
                                      <input
                                        type="radio"
                                        id="line_item_display-no"
                                        name="line_item_display"
                                        value="false"
                                        checked={
                                          formData.line_item_display === "false"
                                        }
                                        onChange={handleChange}
                                        readOnly
                                        onKeyDown={(e) =>
                                          handleKeyNavigation(e, 13)
                                        }
                                      />
                                      No
                                    </label>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <label
                                    htmlFor="authorization_group"
                                    className="w-[210px] h-7 px-2 py-0.5 text-sm font-semibold rounded-sm text-black"
                                  >
                                    Authorization Group
                                    <span className="text-amber-500"> *</span>
                                  </label>

                                  <select
                                    id="authorization_group"
                                    name="authorization_group"
                                    value={formData.authorization_group}
                                    onChange={handleChange}
                                    readOnly
                                    ref={(el) => (inputRefs.current[14] = el)}
                                    onKeyDown={(e) =>
                                      handleKeyNavigation(e, 14)
                                    }
                                    className="w-[150px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                                  >
                                    <option value="">Select</option>
                                    {AuthorizationGroups.map((item, index) => (
                                      <option key={index} value={item.code}>
                                        {item.code} - {item.description}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="flex items-start gap-2">
                                  <textarea
                                    id="description"
                                    name="description"
                                    placeholder="Description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    ref={(el) => {
                                      description1Ref.current = el;
                                      inputRefs.current[15] = el;
                                    }}
                                    onKeyDown={(e) =>
                                      handleKeyNavigation(e, 15)
                                    }
                                    onFocus={() => autoResize(description1Ref)}
                                    onInput={() => autoResize(description1Ref)}
                                    onBlur={() =>
                                      collapseResize(description1Ref)
                                    }
                                    className="w-[317px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400 resize-none overflow-hidden transition-all duration-200"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* 
                  <button
                    onClick={handlePark}
                    className="relative px-4 bg-white border border-black hover:bg-amber-500 text-black cursor-pointer text-sm font-semibold text-center"
                    style={{
                      clipPath: "polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    }}
                  >
                    Park
                  </button>

                  <button
                    onClick={handleSubmit}
                    className="relative px-4 bg-white border border-black hover:bg-amber-500 text-black cursor-pointer text-sm font-semibold text-center"
                    style={{
                      clipPath: "polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    }}
                  >
                    Post
                  </button> 
                  <button
                    onClick={handleCancel}
                    className="relative px-4 bg-white border border-black hover:bg-amber-500 text-black cursor-pointer text-sm font-semibold text-center"
                    style={{
                      clipPath: "polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    }}
                  >
                    Cancel
                  </button> */}
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                      🔍
                    </span>
                    <input
                      type="text"
                      placeholder="Search GL No / Short Text / Date"
                      className="pl-7 pr-2 py-0.5 text-sm border-l border-r border-gray-400 rounded w-[260px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
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
            <div className="w-full h-[360px] overflow-y-scroll">
              {/* Table */}
              <div className="p-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full border text-sm text-left">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="px-3 py-0.5 border text-center whitespace-nowrap">
                          GL. No
                        </th>
                        <th className="px-3 py-0.5 border text-center whitespace-nowrap">
                          Short Text
                        </th>
                        <th className="px-3 py-0.5 border text-center whitespace-nowrap">
                          Date
                        </th>
                        <th className="px-3 py-0.5 border text-center whitespace-nowrap">
                          Ac. Type
                        </th>
                        <th className="px-3 py-0.5 border text-center whitespace-nowrap">
                          Ac. Id
                        </th>
                        <th className="px-3 py-0.5 border text-center whitespace-nowrap">
                          Desc.
                        </th>
                        <th className="px-3 py-0.5 border text-center whitespace-nowrap">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredGLAccounts.length > 0 ? (
                        filteredGLAccounts.map((item, index) => (
                          <tr key={index} className="bg-white hover:bg-gray-50">
                            <td className="px-3 py-1 w-[80px] border text-blue-600 cursor-pointer whitespace-nowrap">
                              <a
                                onClick={() => {
                                  handleReviewById(item.gl_account_number);
                                  setShowReviewPopup(true);
                                }}
                              >
                                {item.gl_account_number}
                              </a>
                            </td>
                            <td className="px-2 w-[180px] py-0.5 border whitespace-nowrap">
                              {item.short_text}
                            </td>
                            <td className="px-2 py-0.5 w-[100px] border whitespace-nowrap">
                              {item.created_at}
                            </td>
                            <td className="px-2 py-0.5 w-[35px] text-center border whitespace-nowrap">
                              {item.pl_account_type}
                            </td>
                            <td className="px-2 py-0.5 w-[35px] text-center border whitespace-nowrap">
                              {item.account_type_indicator}
                            </td>
                            <td className="px-2 py-0.5 border whitespace-nowrap">
                              {item.description}
                            </td>
                            <td className="px-2 py-0.5 w-[140px] border whitespace-nowrap">
                              <button
                                className="relative px-4 bg-white border border-black text-sm cursor-pointer font-semibold text-center text-white bg-gradient-to-tr from-gray-800 to-gray-400 mr-2"
                                style={{
                                  clipPath:
                                    "polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)",
                                }}
                              >
                                Post
                              </button>
                              <button
                                className="relative px-4 bg-white border border-black text-sm cursor-pointer font-semibold text-center text-white bg-gradient-to-tr from-gray-800 to-gray-400 mr-2"
                                style={{
                                  clipPath:
                                    "polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)",
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="relative px-4 bg-white border border-black text-sm cursor-pointer font-semibold text-center text-white bg-gradient-to-tr from-gray-800 to-gray-400 mr-2"
                                style={{
                                  clipPath:
                                    "polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)",
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="7"
                            className="text-center py-4 text-gray-500"
                          >
                            No GL Accounts Found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default GeneralLedgerDetails;
