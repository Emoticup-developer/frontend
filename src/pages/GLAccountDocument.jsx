import { useRef, useState, useEffect } from "react";
import { FiChevronRight, FiChevronDown, FiChevronLeft } from "react-icons/fi";
import { RiSideBarFill } from "react-icons/ri";
import { BsCreditCardFill } from "react-icons/bs";
import { IoIosPrint } from "react-icons/io";
import { MdOutlineError } from "react-icons/md";

import {
  FaFolderOpen,
  FaFolder,
  FaExpand,
  FaCompress,
  FaTimes,
  FaBars,
  FaMinus,
  FaLockOpen,
  FaLock,
  FaSearch,
  FaList,
  FaCircle,
  FaRegHandPaper,
  FaPlay,
  FaRegBookmark,
  FaEdit,
  FaPaperPlane,
  FaMinusCircle,
  FaPlusCircle,
  FaHome,
} from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import { MdCancelScheduleSend } from "react-icons/md";

const GLAccountDocument = ({ isActiveTab }) => {
  const appRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showApp, setShowApp] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const scrollRef = useRef(null);
  const [activeTab, setActiveTab] = useState("Basic Data");
  const [showScrollButton, setShowScrollButton] = useState(false);
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

  const tabNames = [
    { name: "Basic Data", id: "basic-data" },
    { name: "Details", id: "details" },
  ];

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

  const handleTabClick = (tabName, index, event) => {
    event.preventDefault();
    setActiveTab(tabName);
    const tabEl = document.getElementById(
      tabName.toLowerCase().replace(/ /g, "-")
    );
    if (tabEl) {
      const offset = 100; // Adjust according to your header height
      const top = tabEl.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const disabled = disabledStates[activeTab];

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
          <section
            id="basic-data"
            className="border border-gray-300 bg-white w-full scroll-mt-[100px]"
          >
            <div className="bg-[#e5f3fd] p-4 rounded shadow-md">
              <div className="grid grid-cols-3 gap-x-6 gap-y-4 items-center">
                {/* Form fields remain unchanged */}
                <div className="flex items-center">
                  <label
                    htmlFor="invoice_date"
                    className="w-40 text-right text-xs font-medium"
                  >
                    Invoice / Document Date
                    <span className="text-amber-500 mr-2">*</span>
                  </label>
                  <input
                    id="invoice_date"
                    type="date"
                    className="w-28 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                  />
                </div>
                <div className="flex items-center">
                  <label
                    htmlFor="posting_date"
                    className="w-40 text-right text-xs font-medium"
                  >
                    Posting Date <span className="text-amber-500 mr-2">*</span>
                  </label>
                  <input
                    id="posting_date"
                    type="date"
                    className="w-28 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                  />
                </div>
                <div className="flex items-center">
                  <label
                    htmlFor="invoice_type"
                    className="w-40 text-right text-xs font-medium"
                  >
                    Type <span className="text-amber-500 mr-2">*</span>
                  </label>
                  <select
                    id="invoice_type"
                    className="w-28 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                  >
                    <option value="">--Select--</option>
                    <option value="sales_invoice">Sales Invoice</option>
                    <option value="purchase_order">Purchase Order</option>
                    <option value="petty_cash">Petty Cash</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <label
                    htmlFor="doc_header"
                    className="w-40 text-right text-xs font-medium"
                  >
                    Document Header Text
                    <span className="text-amber-500 mr-2">*</span>
                  </label>
                  <input
                    id="doc_header"
                    type="text"
                    className="w-28 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                  />
                </div>
                <div className="flex items-center">
                  <label
                    htmlFor="reference"
                    className="w-40 text-right text-xs font-medium"
                  >
                    Reference <span className="text-amber-500 mr-2">*</span>
                  </label>
                  <input
                    id="reference"
                    type="text"
                    className="w-28 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                  />
                </div>
                <div className="flex items-center">
                  <label
                    htmlFor="company_code"
                    className="w-40 text-right text-xs font-medium"
                  >
                    Company Code <span className="text-amber-500 mr-2">*</span>
                  </label>
                  <input
                    id="company_code"
                    type="text"
                    className="w-28 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                  />
                </div>
                <div className="flex items-center">
                  <label
                    htmlFor="currency"
                    className="w-40 text-right text-xs font-medium"
                  >
                    Currency <span className="text-amber-500 mr-2">*</span>
                  </label>
                  <input
                    id="currency"
                    type="text"
                    className="w-28 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                  />
                </div>
                <div className="flex items-center mb-2">
                  <label
                    htmlFor="month"
                    className="w-40 text-right text-xs font-medium"
                  >
                    Month <span className="text-amber-500 mr-2">*</span>
                  </label>
                  <select
                    id="month"
                    name="month"
                    className="w-28 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                  >
                    <option value="">--Select--</option>
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <label
                    htmlFor="year"
                    className="w-40 text-right text-xs font-medium"
                  >
                    Year <span className="text-amber-500 mr-2">*</span>
                  </label>
                  <select
                    id="year"
                    name="year"
                    className="w-28 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                  >
                    <option value="">--Select--</option>
                    {Array.from({ length: 5 }, (_, i) => {
                      const year = 2025 + i; // Start from 2025
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>

            {/* Table Header */}
            <div className="bg-gray-200 p-2 border-b border-gray-300 flex justify-between items-center font-bold text-xs">
              <div>
                <span>0 Items</span>
              </div>

              <div>
                <div className="flex items-center">
                  <label
                    htmlFor="month"
                    className="w-40 text-right text-xs font-medium"
                  >
                    Invoice No <span className="text-amber-500 mr-2">*</span>
                  </label>
                  <input
                    id="month"
                    type="text"
                    className="w-14 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Balance Status Indicators */}
                <div className="flex items-center gap-2">
                  <span
                    title={
                      balanceStatus === "unbalanced"
                        ? "Error: Totals do not match"
                        : "Status Indicator"
                    }
                    className={`w-3 h-3 rounded-full border border-gray-400 transition-colors ${
                      balanceStatus === "unbalanced" ? "bg-red-500" : "bg-white"
                    }`}
                  ></span>
                  <span
                    title={
                      balanceStatus === "balanced"
                        ? "Success: Totals are balanced"
                        : "Status Indicator"
                    }
                    className={`w-3 h-3 rounded-full border border-gray-400 transition-colors ${
                      balanceStatus === "balanced" ? "bg-green-500" : "bg-white"
                    }`}
                  ></span>
                </div>
                <label>Total Dr:</label>
                <input
                  type="text"
                  value={totalDebit.toFixed(2)}
                  readOnly
                  className="w-[80px] border border-gray-400 rounded px-1 py-0.5 text-right bg-gray-100"
                />
                <span>INR</span>
                <label>Total Cr:</label>
                <input
                  type="text"
                  value={totalCredit.toFixed(2)}
                  readOnly
                  className="w-[80px] border border-gray-400 rounded px-1 py-0.5 text-right bg-gray-100"
                />
                <span>INR</span>
              </div>
            </div>

            <div className="overflow-y-auto max-h-[155px]">
              <table className="w-full min-w-[800px] table-fixed">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600 overflow-hidden min-w-[50px] w-[50px] whitespace-nowrap truncate">
                      Del
                    </th>

                    <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600 overflow-hidden min-w-[30px] w-[30px] whitespace-nowrap truncate">
                      St
                    </th>
                    <th className="p-2 border-b border-gray-300 text-left text-xs font-bold text-gray-600 resize-x overflow-hidden min-w-[120px] whitespace-nowrap truncate">
                      G/L acct
                    </th>
                    <th className="p-2 border-b border-gray-300 text-left text-xs font-bold text-gray-600 resize-x overflow-hidden min-w-[120px] whitespace-nowrap truncate">
                      Short Text
                    </th>
                    <th className="p-2 border-b border-gray-300 text-left text-xs font-bold text-gray-600 resize-x overflow-hidden min-w-[60px] w-[60px] whitespace-nowrap truncate">
                      D/C
                    </th>
                    <th className="p-2 border-b border-gray-300 text-left text-xs font-bold text-gray-600 resize-x overflow-hidden min-w-[110px] w-[110px] whitespace-nowrap truncate">
                      Amount in doc.curr.
                    </th>
                    <th className="p-2 border-b border-gray-300 text-left text-xs font-bold text-gray-600 resize-x overflow-hidden min-w-[110px] w-[110px] whitespace-nowrap truncate">
                      Loc.curr.amount
                    </th>
                    <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600 overflow-hidden min-w-[40px] w-[40px] whitespace-nowrap truncate">
                      Tax
                    </th>
                    <th className="p-2 border-b border-gray-300 text-left text-xs font-bold text-gray-600 resize-x overflow-hidden min-w-[160px] whitespace-nowrap truncate">
                      Tax jurisdiction
                    </th>
                    <th className="p-2 border-b border-gray-300 text-left text-xs font-bold text-gray-600 resize-x overflow-hidden min-w-[160px] whitespace-nowrap truncate">
                      Assignment no.
                    </th>
                    <th className="p-2 border-b border-gray-300 text-left text-xs font-bold text-gray-600 resize-x overflow-hidden min-w-[160px] whitespace-nowrap truncate">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {lineItems.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="p-1 text-center border-r border-gray-200">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(index)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedRows([...selectedRows, index]);
                            } else {
                              setSelectedRows(
                                selectedRows.filter((i) => i !== index)
                              );
                            }
                          }}
                          className="w-4 h-4 border-gray-300 border rounded"
                        />
                      </td>

                      <td className="p-1 text-center border-r border-gray-200">
                        <input
                          type="checkbox"
                          checked={item.s}
                          onChange={(e) =>
                            updateLineItem(index, "s", e.target.checked)
                          }
                          className="w-4 h-4 border-gray-300 border rounded"
                        />
                      </td>
                      <td className="p-1 border-r border-gray-200">
                        <input
                          type="text"
                          value={item.glAccount}
                          onChange={(e) =>
                            updateLineItem(index, "glAccount", e.target.value)
                          }
                          className="w-full border border-gray-300 h-5 rounded px-1 py-0.5 text-xs"
                        />
                      </td>
                      <td className="p-1 border-r border-gray-200">
                        <input
                          type="text"
                          value={item.shortText}
                          onChange={(e) =>
                            updateLineItem(index, "shortText", e.target.value)
                          }
                          className="w-full border border-gray-300 h-5 rounded px-1 py-0.5 text-xs"
                        />
                      </td>
                      <td className="p-1 border-r border-gray-200">
                        <select
                          value={item.dc}
                          onChange={(e) =>
                            updateLineItem(index, "dc", e.target.value)
                          }
                          className="w-full border border-gray-300 appearance-none h-5 rounded px-1 py-0.5 text-xs"
                        >
                          <option>-----</option>
                          <option>Debit</option>
                          <option>Credit</option>
                        </select>
                      </td>
                      <td className="p-1 border-r border-gray-200">
                        <input
                          type="text"
                          inputMode="decimal"
                          placeholder="0.00"
                          value={item.amount}
                          onChange={(e) =>
                            updateLineItem(index, "amount", e.target.value)
                          }
                          className="w-full border border-gray-300 h-5 rounded px-1 py-0.5 text-xs text-right"
                        />
                      </td>
                      <td className="p-1 border-r border-gray-200">
                        <input
                          type="text"
                          inputMode="decimal"
                          placeholder="0.00"
                          value={item.locCurrAmount}
                          onChange={(e) =>
                            updateLineItem(
                              index,
                              "locCurrAmount",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 h-5 rounded px-1 py-0.5 text-xs text-right"
                        />
                      </td>
                      <td className="p-1 text-center border-r border-gray-200">
                        <input
                          type="checkbox"
                          checked={item.tax}
                          onChange={(e) =>
                            updateLineItem(index, "tax", e.target.checked)
                          }
                          className="w-4 h-4 border-gray-300 border rounded"
                        />
                      </td>
                      <td className="p-1 border-r border-gray-200">
                        <input
                          type="text"
                          value={item.taxJurisdiction}
                          onChange={(e) =>
                            updateLineItem(
                              index,
                              "taxJurisdiction",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 h-5 rounded px-1 py-0.5 text-xs"
                        />
                      </td>
                      <td className="p-1 border-r border-gray-200">
                        <input
                          type="text"
                          value={item.assignmentNo}
                          onChange={(e) =>
                            updateLineItem(
                              index,
                              "assignmentNo",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 h-5 rounded px-1 py-0.5 text-xs"
                        />
                      </td>
                      <td className="p-1 border-r border-gray-200">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) =>
                            updateLineItem(index, "description", e.target.value)
                          }
                          className="w-full border border-gray-300 h-5 rounded px-1 py-0.5 text-xs"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center mt-2 px-4 py-2">
              {/* Left Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={addNewLine}
                  className="flex items-center space-x-1 cursor-pointer hover:text-blue-600"
                >
                  <FaPlusCircle className="text-sm" />
                  <span className="mr-2"> Add Line</span>
                </button>
                <button
                  onClick={() => {
                    if (selectedRows.length > 0) setShowDeleteModal(true);
                  }}
                  className="flex items-center space-x-1 cursor-pointer hover:text-blue-600"
                >
                  <FaMinusCircle />
                  <span className="mr-2"> Delete Line</span>
                </button>
              </div>

              {/* Right Buttons */}
              <div className="flex gap-2">
                <button className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
                  <FaPaperPlane />
                  <span className="mr-2">Post</span>
                </button>
                <button className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
                  <MdCancelScheduleSend />
                  <span className="mr-2">Cancel</span>
                </button>
              </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
              <div className="fixed inset-0 bg-opacity-20 backdrop-blur-[2px] flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded shadow-lg text-center w-[300px]">
                  <div className="flex justify-center text-black text-4xl mb-2">
                    <MdOutlineError />
                  </div>
                  <p className="text-gray-700 font-semibold mb-4">
                    Are you sure you want to delete?
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => {
                        const updated = lineItems.filter(
                          (_, i) => !selectedRows.includes(i)
                        );
                        setLineItems(updated);
                        setSelectedRows([]);
                        setShowDeleteModal(false);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-1 rounded"
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        );
      case "Details":
        return (
          <section
            id="details"
            className="p-5 border border-gray-300 bg-white w-full scroll-mt-[100px] h-[365px] overflow-y-auto"
          >
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
            <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
              <BsCreditCardFill />
              <span className="mr-5">Hold</span>
            </div>
            <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
              <RiSideBarFill />
              <span className="mr-5">Simulate</span>
            </div>
            <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
              <FaRegBookmark />
              <span className="mr-5">Park</span>
            </div>
            <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
              <FaEdit />
              <span className="mr-5">Editing Options</span>
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

      <div className="w-full">
        {/* Tabs */}
        <div className="p-2 flex items-center">
          <div
            ref={scrollRef}
            className="flex space-x-1 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          >
            {tabNames.map((tab, index) => (
              <a
                key={tab.name}
                href={`#${tab.id}`} // use tab.id here
                onClick={(e) => handleTabClick(tab.name, index, e)}
                className={`snap-start px-3 py-0.5 whitespace-nowrap text-xs font-medium border-b-2 ${
                  activeTab === tab.name
                    ? "text-blue-900 border-blue-900"
                    : "text-gray-700 border-transparent"
                }`}
              >
                {tab.name}
              </a>
            ))}
          </div>

          {showScrollButton && (
            <button
              onClick={() =>
                scrollRef.current?.scrollBy({
                  left: 120,
                  behavior: "smooth",
                })
              }
              className="ml-2 p-1 bg-white rounded shadow hover:bg-gray-100"
            >
              <FiChevronRight size={16} />
            </button>
          )}
        </div>

        {/* Optional message */}
        {disabled && (
          <div className="px-4 text-sm text-gray-500 mb-2">
            Unlocking inputs...
          </div>
        )}

        {/* Tab Section Content */}
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default GLAccountDocument;
