import { useRef, useState, useEffect } from "react";
import { FiChevronRight, FiChevronDown, FiChevronLeft } from "react-icons/fi";
import { RiSideBarFill } from "react-icons/ri";
import { BsCreditCardFill } from "react-icons/bs";
import { IoIosPrint } from "react-icons/io";
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
  FaPlusCircle,
  FaMinusCircle,
  FaPaperPlane,
  FaTimesCircle,
} from "react-icons/fa";
import Sidebar from "../components/Sidebar";

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
    const tabEl = scrollRef.current?.children[index];
    tabEl?.scrollIntoView({ behavior: "smooth", inline: "center" });
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

  const renderSectionContent = () => {
    switch (activeTab) {
      case "Basic Data":
        return (
          <section
            id="basic-data"
            className="border border-gray-300 bg-white w-full h-auto overflow-y-auto"
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
                    type="text"
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
                    type="text"
                    className="w-28 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                  />
                </div>
                <div className="flex items-center">
                  <label
                    htmlFor="invoice_type"
                    className="w-40 text-right text-xs font-medium"
                  >
                    Invoice Type <span className="text-amber-500 mr-2">*</span>
                  </label>
                  <input
                    id="invoice_type"
                    type="text"
                    className="w-28 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                  />
                </div>
                <div className="flex items-center">
                  <label
                    htmlFor="doc_header"
                    className="w-40 text-right text-xs font-medium"
                  >
                    Document Header Text{" "}
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
                <div className="flex items-center">
                  <label
                    htmlFor="month"
                    className="w-40 text-right text-xs font-medium"
                  >
                    Month <span className="text-amber-500 mr-2">*</span>
                  </label>
                  <input
                    id="month"
                    type="text"
                    className="w-28 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                  />
                </div>
                <div className="flex items-center">
                  <label
                    htmlFor="year"
                    className="w-40 text-right text-xs font-medium"
                  >
                    Year <span className="text-amber-500 mr-2">*</span>
                  </label>
                  <input
                    id="year"
                    type="text"
                    className="w-28 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-200 p-2 border-b border-gray-300 flex justify-between items-center font-bold text-xs">
              <div>
                <span>0 Items</span>
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
            <div className="overflow-y-auto max-h-[150px]">
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
                    <th className="p-2 border-b border-gray-300 text-left text-xs font-bold text-gray-600 resize-x overflow-hidden min-w-[60px] whitespace-nowrap truncate">
                      D/C
                    </th>
                    <th className="p-2 border-b border-gray-300 text-left text-xs font-bold text-gray-600 resize-x overflow-hidden min-w-[160px] whitespace-nowrap truncate">
                      Amount in doc.curr.
                    </th>
                    <th className="p-2 border-b border-gray-300 text-left text-xs font-bold text-gray-600 resize-x overflow-hidden min-w-[160px] whitespace-nowrap truncate">
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
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {lineItems.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="p-1 text-center">
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center mt-2 px-4 py-2">
              {/* Left Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={addNewLine}
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  <FaPlusCircle className="text-sm" />
                  Add Line
                </button>
                <button
                  onClick={() => {
                    if (selectedRows.length > 0) setShowDeleteModal(true);
                  }}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  <FaMinusCircle className="text-sm" />
                  Delete Line
                </button>
              </div>

              {/* Right Buttons */}
              <div className="flex gap-4">
                <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm">
                  <FaPaperPlane className="text-sm" />
                  Post
                </button>
                <button className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm">
                  <FaTimesCircle className="text-sm" />
                  Cancel
                </button>
              </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded shadow-lg text-center w-[300px]">
                  <div className="text-yellow-500 text-4xl mb-2">⚠️</div>
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
            className="p-4 border border-gray-300 bg-white w-full h-[299px] overflow-y-auto"
          >
            <p className="font-medium mb-3">Account Control in Company Code</p>
            {/* Details content remains unchanged */}
          </section>
        );
      default:
        return null;
    }
  };

  // The rest of the component remains the same
  useEffect(() => {
    const handleFullscreenChange = () =>
      setIsFullscreen(!!document.fullscreenElement);
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
    <div
      ref={appRef}
      className="w-screen h-screen bg-gray-100 overflow-hidden flex flex-col font-sans font-semibold"
    >
      <div className="bg-[#e5f3fd] p-1 text-xs shadow-md flex justify-between items-center">
        <div className="flex text-black">
          <FaBars className="mx-2 mt-1 text-xs cursor-pointer" title="Menu" />
          <h6 className="mx-2 text-sm">Menu</h6>
          <h6 className="mx-2 text-sm">Edit</h6>
          <h6 className="mx-2 text-sm">Favorites</h6>
          <h6 className="mx-2 text-sm">Extras</h6>
          <h6 className="mx-2 text-sm">System</h6>
          <h6 className="mx-2 text-sm">Help</h6>
        </div>
        <div className="flex items-center space-x-2 text-black">
          <h6 className="mx-2 text-sm">Admin</h6>
          <button
            onClick={toggleLock}
            title={isLocked ? "Unlock" : "Lock"}
            className="hover:bg-gray-200 p-1 rounded"
          >
            {isLocked ? <FaLock /> : <FaLockOpen />}
          </button>
          <button
            onClick={exitFullscreen}
            disabled={!isFullscreen || isLocked}
            className={`hover:bg-gray-200 p-1 rounded ${
              !isFullscreen || isLocked ? "opacity-50 cursor-not-allowed" : ""
            }`}
            title="Exit Fullscreen"
          >
            <FaMinus />
          </button>
          <button
            onClick={goFullscreen}
            disabled={isFullscreen || isLocked}
            className={`hover:bg-gray-200 p-1 rounded ${
              isFullscreen || isLocked ? "opacity-50 cursor-not-allowed" : ""
            }`}
            title="Fullscreen"
          >
            <FaExpand />
          </button>
          <button
            onClick={handleCloseApp}
            title="Close"
            className="hover:bg-gray-200 p-1 rounded"
          >
            <FaTimes />
          </button>
        </div>
      </div>
      <div className="relative flex items-center p-2 bg-[#9abddc] h-12">
        <h1 className="text-black font-bold text-3xl">AERP</h1>
      </div>
      <div className="relative bg-[#f5fbff] border border-gray-200 text-black font-semibold p-1 text-xs shadow-md flex justify-between items-center">
        <div className="flex items-center gap-2 mr-4 z-10">
          <button
            className={`p-1 ${
              isSidebarVisible
                ? "text-blue-600 hover:text-blue-800"
                : "text-gray-400 cursor-not-allowed"
            }`}
            onClick={() => isSidebarVisible && setIsSidebarVisible(false)}
            title="Hide Sidebar"
            disabled={!isSidebarVisible}
          >
            <FiChevronLeft size={18} />
          </button>
          <button
            className={`p-1 ${
              !isSidebarVisible
                ? "text-blue-600 hover:text-blue-800"
                : "text-gray-400 cursor-not-allowed"
            }`}
            onClick={() => !isSidebarVisible && setIsSidebarVisible(true)}
            title="Show Sidebar"
            disabled={isSidebarVisible}
          >
            <FiChevronRight size={18} />
          </button>
        </div>
        <p className="absolute left-1/2 transform -translate-x-1/2 text-[16px] font-semibold">
          Edit G/L Account Document
        </p>
        <div className="relative flex items-center ml-4 z-10">
          <input
            type="text"
            placeholder="Search..."
            className="pl-8 pr-2 py-0.5 rounded-sm border border-gray-300 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            style={{ width: "150px" }}
          />
          <FaSearch className="absolute left-2 text-gray-400 text-sm" />
        </div>
      </div>
      <div className="flex flex-grow overflow-hidden">
        {isSidebarVisible && <Sidebar />}
        <div className="flex-1 font-sans text-xs bg-gray-50">
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
                  <span className="px-2">Exit</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="p-2 flex items-center">
              <div
                ref={scrollRef}
                className="flex space-x-1 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
              >
                {tabNames.map((tab, index) => (
                  <a
                    key={tab.name}
                    href={`#${tab.id}`}
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
            {disabled && (
              <div className="px-4 text-sm text-gray-500 mb-2">
                Unlocking inputs...
              </div>
            )}
            {renderSectionContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GLAccountDocument;
