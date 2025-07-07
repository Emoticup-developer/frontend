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
  FaExclamationTriangle,
  FaSearch, // Import the warning icon
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const GeneralLedgerDetails = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [mobileOpen, setMobileOpen] = useState(false);
  const inputRefs = useRef([]);
  const [glAccounts, setGlAccounts] = useState([]); // State to hold table data
  const [showEditModal, setShowEditModal] = useState(false);
  const [editID, setEditID] = useState(null); // Stores gl_account_number of the item being edited
  const [searchTerm, setSearchTerm] = useState("");

  // --- New states for custom popups ---
  const [showDeleteConfirmPopup, setShowDeleteConfirmPopup] = useState(false);
  const [glToDelete, setGlToDelete] = useState(null); // Stores GL account to delete
  const [showErrorPopup, setShowErrorPopup] = useState(false); // For general errors
  const [errorMessageContent, setErrorMessageContent] = useState(""); // Content for general error popup
  // --- End new states ---

  const description1Ref = useRef(null);

  // Helper function to auto-resize textareas
  const autoResize = (ref) => {
    if (ref && ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  };

  // Helper function to collapse textareas to default height
  const collapseResize = (ref) => {
    if (ref && ref.current) {
      ref.current.style.height = "28px"; // Default collapsed height
    }
  };

  // Helper function to format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Keyboard navigation for form inputs (optional, but kept from original)
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

  // Handle window resize for mobile view
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle mobile sidebar
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // State and useEffect for P&L Account Types
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

  // State and useEffect for Account Types
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

  // State and useEffect for Authorization Groups
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

  // Filter GL Accounts based on search term
  const filteredGLAccounts = glAccounts.filter((item) => {
    const formattedDate = new Date(item.created_at).toLocaleDateString("en-GB");
    return (
      item.gl_account_number
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.short_text?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formattedDate.includes(searchTerm)
    );
  });

  // Fetch all GL accounts for the table
  const fetchGLAccounts = async () => {
    try {
      const response = await axios.get(
        "http://192.168.0.235:8000/conf/gl_account"
      );
      setGlAccounts(response.data);
    } catch (error) {
      console.error("Error fetching GL accounts:", error);
      toast.error("Failed to load GL Accounts."); // Keep toast for initial data load
    }
  };

  // Fetch GL accounts on component mount
  useEffect(() => {
    fetchGLAccounts();
  }, []);

  // Initial state for the form data (used for both creation and editing)
  const [formData, setFormData] = useState({
    gl_account_number: "",
    short_text: "",
    long_text: "",
    account_group: "",
    pl_account_type: "",
    account_type_indicator: "",
    group_account_number: "",
    blocked: "", // Using "" for default/initial state to match <option value="">
    reconciliation_account: "", // Using "" for default/initial state
    field_status_group: "",
    sort_key: "",
    tax_category: "",
    open_item_management: "", // Using "" for default/initial state
    line_item_display: "", // Using "" for default/initial state
    authorization_group: "",
    description: "",
  });

  // Destructuring for easier access in JSX
  const {
    gl_account_number,
    short_text,
    long_text,
    account_group,
    pl_account_type,
    account_type_indicator,
    group_account_number,
    blocked,
    reconciliation_account,
    field_status_group,
    sort_key,
    tax_category,
    open_item_management,
    line_item_display,
    authorization_group,
    description,
  } = formData;

  // Generic handleChange for all form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Helper function to convert string "true"/"false" to boolean true/false
  const convertToBoolean = (value) => {
    if (value === "true") return true;
    if (value === "false") return false;
    return null; // Or undefined, or false, depending on how your backend expects missing/unset boolean fields
  };

  // Function to open the edit modal and populate with data
  const handleOpenEditModal = async (glNumber) => {
    try {
      const res = await axios.get(
        `http://192.168.0.235:8000/conf/gl_account/${glNumber}`,
        { withCredentials: true }
      );

      // Map backend boolean values (true/false) to string "true"/"false" for select elements
      const fetchedData = {
        ...res.data,
        blocked: res.data.blocked ? "true" : "false",
        reconciliation_account: res.data.reconciliation_account
          ? "true"
          : "false",
        open_item_management: res.data.open_item_management ? "true" : "false",
        line_item_display: res.data.line_item_display ? "true" : "false",
        // Ensure authorization_group is correctly set from backend if it's an object with a code
        authorization_group:
          res.data.authorization_group?.authorization_group ||
          res.data.authorization_group ||
          "",
      };

      setFormData(fetchedData);
      setEditID(glNumber); // Store the GL account number for the PUT request
      setShowEditModal(true);
    } catch (error) {
      console.error("Failed to fetch for edit:", error);
      const msg =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Failed to fetch data for editing.";
      setErrorMessageContent(msg);
      setShowErrorPopup(true);
    }
  };

  // Function to handle the update operation
  const handleEditAndUpdate = async (e) => {
    e.preventDefault();

    // Prepare data for submission, converting select values to booleans
    const dataToSend = {
      ...formData,
      blocked: convertToBoolean(formData.blocked),
      reconciliation_account: convertToBoolean(formData.reconciliation_account),
      open_item_management: convertToBoolean(formData.open_item_management),
      line_item_display: convertToBoolean(formData.line_item_display),
    };

    try {
      const response = await axios.put(
        `http://192.168.0.235:8000/conf/gl_account/${editID}`,
        dataToSend, // Send the prepared data
        { withCredentials: true }
      );

      toast.success("GL Account updated successfully!");

      setGlAccounts((prevGlAccounts) =>
        prevGlAccounts.map((item) =>
          item.gl_account_number === editID ? response.data : item
        )
      );

      // Close modal and reset form data to initial empty state
      setShowEditModal(false);
      setFormData({
        gl_account_number: "",
        short_text: "",
        long_text: "",
        account_group: "",
        pl_account_type: "",
        account_type_indicator: "",
        group_account_number: "",
        blocked: "",
        reconciliation_account: "",
        field_status_group: "",
        sort_key: "",
        tax_category: "",
        open_item_management: "",
        line_item_display: "",
        authorization_group: "",
        description: "",
      });
      setEditID(null); // Clear edit ID
    } catch (error) {
      console.error(
        "Error updating GL account:",
        error.response?.data || error.message
      );
      const msg =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Failed to update GL Account.";
      setErrorMessageContent(msg);
      setShowErrorPopup(true);
    }
  };

  // --- New functions for custom delete popup ---

  // Function to trigger the custom delete confirmation popup
  const handleDeleteClick = (glNumber) => {
    setGlToDelete(glNumber);
    setShowDeleteConfirmPopup(true);
  };

  // Function to execute deletion after confirmation
  const confirmDeleteGLAccount = async () => {
    setShowDeleteConfirmPopup(false); // Close the confirmation popup
    if (!glToDelete) return; // Should not happen if triggered correctly

    try {
      await axios.delete(
        `http://192.168.0.235:8000/conf/gl_account/${glToDelete}`,
        {
          data: { deleted: true }, // Sending 'deleted: true' in the request body
          withCredentials: true,
        }
      );
      toast.success("GL Account marked as deleted successfully.");
      setGlAccounts((prevGlAccounts) =>
        prevGlAccounts.filter((item) => item.gl_account_number !== glToDelete)
      );
      setGlToDelete(null); // Clear the stored GL account
    } catch (error) {
      console.error("Delete failed:", error.response?.data || error.message);
      const msg =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Failed to mark GL Account as deleted.";
      setErrorMessageContent(msg);
      setShowErrorPopup(true); // Show general error popup for delete failures
    }
  };

  // Function to cancel deletion
  const cancelDeleteGLAccount = () => {
    setShowDeleteConfirmPopup(false);
    setGlToDelete(null);
  };
  // --- End new functions ---

  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = () => {
    Cookies.remove("client");
    Cookies.remove("user");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
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
                G/L (VIEW / EDIT / DELETE)
              </h1>
            </div>
            <div>
              <div className="flex flex-wrap gap-1 justify-end lg:px-0"></div>
            </div>
          </div>
        </div>

        {/* Search Bar Section */}
        <div className="flex justify-between items-center my-4 px-4">
          {/* Left: No. of Items text */}
          <div className="text-sm font-semibold text-gray-700">
            Line of Items: {filteredGLAccounts.length}
          </div>

          {/* Right: Search option with icon, now fixed width */}
          <div className="relative flex items-center w-[200px]">
            {" "}
            {/* Changed max-w-sm to fixed width w-[200px] */}
            <FaSearch className="absolute left-3 text-gray-400" />{" "}
            {/* Search icon */}
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
            />
          </div>
        </div>

        {/* GL Accounts Table */}
        <div className="px-4">
          <div className="overflow-x-auto bg-white shadow-md rounded-md">
            {/* Removed w-max from table */}
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-0.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    G/L Account Number
                  </th>
                  <th className="px-2 py-0.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Short Text
                  </th>
                  <th className="px-2 py-0.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Account Group
                  </th>
                  <th className="px-2 py-0.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    P&L Account Type
                  </th>
                  <th className="px-2 py-0.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Account Type Indicator
                  </th>
                  <th className="px-2 py-0.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Created At
                  </th>
                  <th className="px-2 py-0.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              {/* Removed w-max from tbody */}
              <tbody className="w-full bg-white divide-y divide-gray-200">
                {filteredGLAccounts.length > 0 ? (
                  filteredGLAccounts.map((account) => (
                    <tr key={account.gl_account_number}>
                      <td className="px-2 py-0.5 whitespace-nowrap text-sm font-medium text-gray-900">
                        {account.gl_account_number}
                      </td>
                      <td className="px-2 py-0.5 whitespace-nowrap text-sm text-gray-500">
                        {account.short_text}
                      </td>
                      <td className="px-2 py-0.5 whitespace-nowrap text-center text-sm text-gray-500">
                        {account.account_group}
                      </td>
                      <td className="px-2 py-0.5 whitespace-nowrap text-center text-sm text-gray-500">
                        {account.pl_account_type}
                      </td>
                      <td className="px-2 py-0.5 whitespace-nowrap text-center text-sm text-gray-500">
                        {account.account_type_indicator}
                      </td>
                      <td className="px-2 py-0.5 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(account.created_at)}
                      </td>
                      <td className="px-2 py-0.5 whitespace-nowrap text-center text-sm font-medium">
                        <button
                          onClick={() =>
                            handleOpenEditModal(account.gl_account_number)
                          }
                          className="text-indigo-600 hover:text-indigo-900 mr-2"
                          title="Edit"
                        >
                          <FaEdit className="inline-block" />
                        </button>
                        <button
                          onClick={
                            () => handleDeleteClick(account.gl_account_number) // Call the new handler
                          }
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <FaTrash className="inline-block" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                    >
                      No G/L Accounts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Modal (remains the same) */}
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4 border-b pb-3">
                <h2 className="text-2xl font-bold text-gray-800">
                  Edit G/L Account
                </h2>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setFormData({
                      gl_account_number: "",
                      short_text: "",
                      long_text: "",
                      account_group: "",
                      pl_account_type: "",
                      account_type_indicator: "",
                      group_account_number: "",
                      blocked: "",
                      reconciliation_account: "",
                      field_status_group: "",
                      sort_key: "",
                      tax_category: "",
                      open_item_management: "",
                      line_item_display: "",
                      authorization_group: "",
                      description: "",
                    });
                    setEditID(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleEditAndUpdate}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Left Column */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="gl_account_number"
                        className="w-[180px] text-sm font-semibold text-black"
                      >
                        G/L Account Number
                        <span className="text-amber-500"> *</span>
                      </label>
                      <input
                        type="text"
                        id="gl_account_number"
                        name="gl_account_number"
                        value={gl_account_number}
                        onChange={handleChange}
                        readOnly
                        className="flex-1 px-2 py-1 border border-gray-400 rounded-sm text-sm text-black bg-gray-100 cursor-not-allowed"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="short_text"
                        className="w-[180px] text-sm font-semibold text-black"
                      >
                        Short Text
                        <span className="text-amber-500"> *</span>
                      </label>
                      <input
                        type="text"
                        id="short_text"
                        name="short_text"
                        maxLength={16}
                        value={short_text}
                        onChange={handleChange}
                        className="flex-1 px-2 py-1 border border-gray-400 rounded-sm text-sm text-black"
                      />
                    </div>
                    <div className="flex items-start gap-2">
                      <label
                        htmlFor="long_text"
                        className="w-[180px] text-sm font-semibold text-black"
                      >
                        Long Text
                        <span className="text-amber-500"> *</span>
                      </label>
                      <textarea
                        id="long_text"
                        name="long_text"
                        value={long_text}
                        onChange={handleChange}
                        onFocus={() => autoResize(description1Ref)}
                        onInput={() => autoResize(description1Ref)}
                        onBlur={() => collapseResize(description1Ref)}
                        ref={description1Ref}
                        className="flex-1 px-2 py-1 border border-gray-400 rounded-sm text-sm text-black resize-none overflow-hidden transition-all duration-200 min-h-[30px]"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="account_group"
                        className="w-[180px] text-sm font-semibold text-black"
                      >
                        Account Group
                        <span className="text-amber-500"> *</span>
                      </label>
                      <input
                        type="text"
                        id="account_group"
                        name="account_group"
                        value={account_group}
                        onChange={handleChange}
                        className="flex-1 px-2 py-1 border border-gray-400 rounded-sm text-sm text-black"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="pl_account_type"
                        className="w-[180px] text-sm font-semibold text-black"
                      >
                        P&L Account Type
                        <span className="text-amber-500"> *</span>
                      </label>
                      <select
                        id="pl_account_type"
                        name="pl_account_type"
                        value={pl_account_type}
                        onChange={handleChange}
                        className="flex-1 px-2 py-1 border border-gray-400 rounded-sm text-sm text-black"
                      >
                        <option value="">Select</option>
                        {plAccountTypes.map((item, index) => (
                          <option key={index} value={item.pl_account_type}>
                            {item.pl_account_type} - {item.description}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="account_type_indicator"
                        className="w-[180px] text-sm font-semibold text-black"
                      >
                        Account Type Indicator
                        <span className="text-amber-500"> *</span>
                      </label>
                      <select
                        id="account_type_indicator"
                        name="account_type_indicator"
                        value={account_type_indicator}
                        onChange={handleChange}
                        className="flex-1 px-2 py-1 border border-gray-400 rounded-sm text-sm text-black"
                      >
                        <option value="">Select</option>
                        {AccountTypes.map((item, index) => (
                          <option
                            key={index}
                            value={item.account_type_indicator}
                          >
                            {item.account_type_indicator} - {item.description}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="group_account_number"
                        className="w-[180px] text-sm font-semibold text-black"
                      >
                        Group Account Number
                        <span className="text-amber-500"> *</span>
                      </label>
                      <input
                        type="text"
                        id="group_account_number"
                        name="group_account_number"
                        value={group_account_number}
                        onChange={handleChange}
                        className="flex-1 px-2 py-1 border border-gray-400 rounded-sm text-sm text-black"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="blocked"
                        className="w-[180px] text-sm font-semibold text-black"
                      >
                        Blocked / Deleted
                        <span className="text-amber-500"> *</span>
                      </label>
                      <select
                        id="blocked"
                        name="blocked"
                        value={blocked}
                        onChange={handleChange}
                        className="flex-1 px-2 py-1 border border-gray-400 rounded-sm text-sm text-black"
                      >
                        <option value="">Select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="reconciliation_account"
                        className="w-[180px] text-sm font-semibold text-black"
                      >
                        Reconciliation Account
                      </label>
                      <select
                        id="reconciliation_account"
                        name="reconciliation_account"
                        value={reconciliation_account}
                        onChange={handleChange}
                        className="flex-1 px-2 py-1 border border-gray-400 rounded-sm text-sm text-black"
                      >
                        <option value="">Select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="field_status_group"
                        className="w-[180px] text-sm font-semibold text-black"
                      >
                        Field Status Group
                      </label>
                      <input
                        type="text"
                        id="field_status_group"
                        name="field_status_group"
                        value={field_status_group}
                        onChange={handleChange}
                        className="flex-1 px-2 py-1 border border-gray-400 rounded-sm text-sm text-black"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="sort_key"
                        className="w-[180px] text-sm font-semibold text-black"
                      >
                        Sort Key
                      </label>
                      <input
                        type="text"
                        id="sort_key"
                        name="sort_key"
                        value={sort_key}
                        onChange={handleChange}
                        className="flex-1 px-2 py-1 border border-gray-400 rounded-sm text-sm text-black"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="tax_category"
                        className="w-[180px] text-sm font-semibold text-black"
                      >
                        Tax Category
                      </label>
                      <input
                        type="text"
                        id="tax_category"
                        name="tax_category"
                        value={tax_category}
                        onChange={handleChange}
                        className="flex-1 px-2 py-1 border border-gray-400 rounded-sm text-sm text-black"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex items-center gap-2 w-full md:w-1/2">
                    <label
                      htmlFor="open_item_management"
                      className="w-[180px] text-sm font-semibold text-black"
                    >
                      Open Item Management
                    </label>
                    <select
                      id="open_item_management"
                      name="open_item_management"
                      value={open_item_management}
                      onChange={handleChange}
                      className="flex-1 px-2 py-1 border border-gray-400 rounded-sm text-sm text-black"
                    >
                      <option value="">Select</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2 w-full md:w-1/2">
                    <label
                      htmlFor="line_item_display"
                      className="w-[180px] text-sm font-semibold text-black"
                    >
                      Line Item Display
                    </label>
                    <select
                      id="line_item_display"
                      name="line_item_display"
                      value={line_item_display}
                      onChange={handleChange}
                      className="flex-1 px-2 py-1 border border-gray-400 rounded-sm text-sm text-black"
                    >
                      <option value="">Select</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <label
                    htmlFor="authorization_group"
                    className="w-[180px] text-sm font-semibold text-black"
                  >
                    Authorization Group
                  </label>
                  <select
                    id="authorization_group"
                    name="authorization_group"
                    value={authorization_group}
                    onChange={handleChange}
                    className="flex-1 px-2 py-1 border border-gray-400 rounded-sm text-sm text-black"
                  >
                    <option value="">Select</option>
                    {AuthorizationGroups.map((item, index) => (
                      <option key={index} value={item.authorization_group}>
                        {item.authorization_group} - {item.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-start gap-2 mb-6">
                  <label
                    htmlFor="description"
                    className="w-[180px] text-sm font-semibold text-black"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={handleChange}
                    className="flex-1 px-2 py-1 border border-gray-400 rounded-sm text-sm text-black resize-y min-h-[60px]"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setFormData({
                        gl_account_number: "",
                        short_text: "",
                        long_text: "",
                        account_group: "",
                        pl_account_type: "",
                        account_type_indicator: "",
                        group_account_number: "",
                        blocked: "",
                        reconciliation_account: "",
                        field_status_group: "",
                        sort_key: "",
                        tax_category: "",
                        open_item_management: "",
                        line_item_display: "",
                        authorization_group: "",
                        description: "",
                      });
                      setEditID(null);
                    }}
                    className="flex items-center px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                  >
                    <FaTimes className="mr-2" /> Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center px-4 py-2 bg-amber-500 text-black rounded-md hover:bg-amber-600"
                  >
                    <FaSave className="mr-2" /> Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* --- Custom Delete Confirmation Popup --- */}
        {showDeleteConfirmPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-xs text-center">
              <div className="flex justify-center mb-4">
                <FaExclamationTriangle className="text-amber-500 text-5xl" />
              </div>
              <p className="text-gray-800 text-lg font-semibold mb-6">
                Are you sure you want to delete?
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={confirmDeleteGLAccount}
                  className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Yes
                </button>
                <button
                  onClick={cancelDeleteGLAccount}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- Custom Error Popup --- */}
        {showErrorPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full max-w-md"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline ml-2">
                {errorMessageContent}
              </span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <button
                  onClick={() => setShowErrorPopup(false)}
                  className="text-red-700 hover:text-red-900"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default GeneralLedgerDetails;
