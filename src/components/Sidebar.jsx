import { useRef, useState, useEffect } from "react";
import { FiChevronRight, FiChevronDown, FiChevronLeft } from "react-icons/fi";
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
} from "react-icons/fa";

const Sidebar = ({ isActiveTab }) => {
  const appRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showApp, setShowApp] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const scrollRef = useRef(null);
  const [activeTab, setActiveTab] = useState("Type Description");
  const [showScrollButton, setShowScrollButton] = useState(false);

  const tabNames = [
    { name: "Type Description", id: "type-description" },
    { name: "Control Data", id: "control-data" },
    { name: "Create/bank/interest", id: "create-bank-interest" },
    { name: "Key word/translation", id: "keyword-translation" },
    { name: "Information(C/A)", id: "info-ca" },
    { name: "Information(CoCd)", id: "info-cocd" },
  ];

  // Individual disabled state for each tab
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

  // Disable all, then enable activeTab after delay
  useEffect(() => {
    setDisabledStates((prev) => {
      const updated = { ...prev };
      tabNames.forEach((tab) => (updated[tab] = true));
      return updated;
    });

    const timeout = setTimeout(() => {
      setDisabledStates((prev) => ({
        ...prev,
        [activeTab]: false,
      }));
    }, 2000);

    return () => clearTimeout(timeout);
  }, [activeTab]);

  const handleTabClick = (tabName, index, event) => {
    event.preventDefault();
    setActiveTab(tabName); // match by name
    const tabEl = scrollRef.current?.children[index];
    tabEl?.scrollIntoView({ behavior: "smooth", inline: "center" });
  };

  const disabled = disabledStates[activeTab];

  // Show or hide scroll button
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
      case "Type Description":
        return (
          <section
            id="type-description"
            className="p-4 border border-gray-300 bg-white w-full h-[299px] overflow-y-auto"
          >
            <div>
              <p className="mb-2">
                Control in Chart of Accounts YCOA Standard Chart of Accounts
              </p>

              <div className="border border-gray-200 p-3 w-[800px] text-center">
                <div className="flex items-center justify-center mb-2">
                  <label htmlFor="gl-type" className="w-40 text-right mr-4">
                    G/L Account Type:
                  </label>
                  <select
                    id="gl-type"
                    name="gl-type"
                    disabled={disabled}
                    className={`border border-gray-200 p-1 rounded w-37  ${
                      disabled ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                  >
                    <option value="">-- Select Type --</option>
                    <option value="balance-sheet">Balance Sheet Account</option>
                    <option value="profit-loss">Profit & Loss Account</option>
                    <option value="reconciliation">
                      Reconciliation Account
                    </option>
                    <option value="non-operating">Non-operating Account</option>
                  </select>
                </div>

                <div className="flex items-center justify-center">
                  <label
                    htmlFor="account-group"
                    className="w-40 text-right mr-4"
                  >
                    Account Group:
                  </label>
                  <select
                    id="account-group"
                    name="account-group"
                    disabled={disabled}
                    className={`border border-gray-200 p-1 rounded w-37 ${
                      disabled ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                  >
                    <option value="">-- Select Group --</option>
                    <option value="1000">1000 – Assets</option>
                    <option value="2000">2000 – Liabilities</option>
                    <option value="3000">3000 – Revenues</option>
                    <option value="4000">4000 – Expenses</option>
                  </select>
                </div>

                <div className="text-left">
                  <p className="mb-2 mt-1">
                    Detailed Control for P&L Statement Accounts
                  </p>
                  <div className="border border-gray-200 pt-3">
                    <div className="flex items-center justify-center mb-2">
                      <label
                        htmlFor="functional_area"
                        className="w-40 text-right mr-4"
                      >
                        Functional Area:
                      </label>
                      <input
                        id="functional_area"
                        name="functional_area"
                        disabled={disabled}
                        className={`border border-gray-200 p-1 rounded w-37 ${
                          disabled ? "bg-gray-100 cursor-not-allowed" : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-left w-[800px]">
                <p className="mb-3 mt-3">Description</p>
                <div className="border border-gray-200 pt-3">
                  <div>
                    <div className="flex items-center justify-center mb-2">
                      <label
                        htmlFor="short_text"
                        className="w-40 text-right mr-4"
                      >
                        G/L Short Text:
                      </label>
                      <input
                        id="short_text"
                        name="short_text"
                        disabled={disabled}
                        className={`border border-gray-200 p-1 rounded w-37 ${
                          disabled ? "bg-gray-100 cursor-not-allowed" : ""
                        }`}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center mb-2">
                      <label
                        htmlFor="long_text"
                        className="w-40 text-right mr-4"
                      >
                        G/L Long Text:
                      </label>
                      <input
                        id="long_text"
                        name="long_text"
                        disabled={disabled}
                        className={`border border-gray-200 p-1 rounded w-37 ${
                          disabled ? "bg-gray-100 cursor-not-allowed" : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-left w-[800px]">
                <p className="mb-3 mt-3">
                  Consolidation Data in Chart of Accounts YCOA Standard Chart of
                  Accounts
                </p>
                <div className="border border-gray-200 pt-3">
                  <div>
                    <div className="flex items-center justify-center mb-2">
                      <label
                        htmlFor="trading_partner_no"
                        className="w-40 text-right mr-4"
                      >
                        Trading Partner No:
                      </label>
                      <input
                        id="trading_partner_no"
                        name="trading_partner_no"
                        disabled={disabled}
                        className={`border border-gray-200 p-1 rounded w-16 mr-21 ${
                          disabled ? "bg-gray-100 cursor-not-allowed" : ""
                        }`}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center mb-2">
                      <label
                        htmlFor="group_account_number"
                        className="w-40 text-right mr-4 ml-22"
                      >
                        Group Account Number:
                      </label>
                      <div className="flex items-center">
                        <input
                          id="group_account_number"
                          name="group_account_number"
                          disabled={disabled}
                          className={`border border-gray-200 p-1 rounded w-37 mr-2 ${
                            disabled ? "bg-gray-100 cursor-not-allowed" : ""
                          }`}
                        />
                        <p>Sales of goods</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      case "Control Data":
        return (
          <section
            id="control-data"
            className="p-4 border border-gray-300 bg-white w-full h-[299px] overflow-y-auto"
          >
            <p className="font-medium mb-3">Account Control in Company Code</p>
            <div className="border border-gray-200 p-3 w-[800px] text-center">
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
                  className={`border border-gray-200 p-1 rounded w-12 ${
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
                  className={`w-4 h-4 border border-gray-200 p-1 rounded ${
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
                  className={`border border-gray-200 p-1 rounded w-12 mr-2 ${
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
                  className="border border-gray-300 px-2 py-1 w-40"
                  placeholder=""
                />
              </div>
            </div>
            <p className="font-medium mb-3 mt-3">
              Account Management in Company Code
            </p>
            <div className="border border-gray-200 p-3 w-[800px] text-center">
              {/* Account Currency */}
              <div className="flex items-center mb-2">
                <label className="w-60 text-right pr-4">Sort Key:</label>
                <input
                  type="text"
                  disabled={disabled}
                  className={`border border-gray-200 p-1 rounded w-12 ${
                    disabled ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              </div>
            </div>
            {/* Account Settings in Controlling Area A000 */}
            <p className="font-medium mb-3 mt-3">
              Account Settings in Controlling Area A000 Controlling Area A000
            </p>
            <div className="border border-gray-200 p-3 w-[800px] text-center">
              {/* CElEm Category */}
              <div className="flex items-center mb-2">
                <label className="w-60 text-right pr-4">*CElEm category:</label>
                <input
                  type="text"
                  placeholder="11"
                  disabled={disabled}
                  className={`border border-gray-300 px-2 py-1 w-12 rounded ${
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
            <div className="border border-gray-200 p-3 w-[800px] text-center">
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
      case "Create/bank/interest":
        return (
          <section
            id="create-bank-interest"
            className="p-4 border border-gray-300 bg-white w-full h-[299px] overflow-y-auto"
          >
            <p className="font-medium mb-3">
              Control of document creation in company code
            </p>
            <div className="border border-gray-200 p-3 w-[800px] text-center">
              {/* Field Status Group */}
              <div className="flex items-center mb-2">
                <label className="w-60 text-right pr-4">
                  Field status group:
                </label>
                <input
                  type="text"
                  placeholder="YB29"
                  disabled={disabled}
                  className={`border border-gray-300 px-2 py-1 w-20 rounded ${
                    disabled ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
                <span className="ml-4">Revenue accounts</span>
              </div>

              {/* Post Automatically Only */}
              <div className="flex items-center mb-2">
                <label className="w-60 text-right pr-4">
                  Post Automatically Only:
                </label>
                <input
                  type="checkbox"
                  disabled={disabled}
                  className="w-4 h-4"
                />
              </div>

              {/* Supplement Auto. Postings */}
              <div className="flex items-center">
                <label className="w-60 text-right pr-4">
                  Supplement Auto. Postings:
                </label>
                <input
                  type="checkbox"
                  disabled={disabled}
                  className="w-4 h-4"
                />
              </div>
            </div>

            <p className="font-medium mb-3 mt-3">
              Bank/financial details in company code
            </p>
            <div className="border border-gray-200 p-3 w-[800px] text-center">
              {/* Planning Level */}
              <div className="flex items-center mb-2">
                <label className="w-60 text-right pr-4">Planning Level:</label>
                <input
                  type="text"
                  placeholder="F0"
                  disabled={disabled}
                  className={`border border-gray-300 px-2 py-1 w-16 rounded ${
                    disabled ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
                <span className="ml-4">Posting to bank account</span>
              </div>

              {/* Relevant to Cash Flow */}
              <div className="flex items-center">
                <label className="w-60 text-right pr-4">
                  Relevant to Cash Flow:
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
      case "Key word/translation":
        return (
          <section
            id="keyword-translation"
            className="p-4 mt-4 border rounded bg-white"
          >
            <p>Keyword and translation details go here.</p>
          </section>
        );
      case "Information(C/A)":
        return (
          <section id="info-ca" className="p-4 mt-4 border rounded bg-white">
            <p>Chart of Account information and configuration notes.</p>
          </section>
        );
      case "Information(CoCd)":
        return (
          <section id="info-cocd" className="p-4 mt-4 border rounded bg-white">
            <p>Company Code level information displayed here.</p>
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
    <div
      ref={appRef}
      className="w-screen h-screen bg-gray-100 overflow-hidden flex flex-col font-sans font-semibold"
    >
      {/* Top Menu Bar */}
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
        {/* Left - AERP */}
        <h1 className="text-black font-bold text-3xl">AERP</h1>

        {/* Center - Dev.Cust */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-black text-xl font-semibold">
          Main Portal
        </h1>
      </div>
      {/* Toolbar below top menu 
      <div className="bg-[#f5fbff] text-black font-semibold p-1 text-xs shadow-md flex justify-between items-center">
  
        <div className="flex items-center gap-2 mr-4">
    
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

        <div className="relative flex items-center ml-4">
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
        {isSidebarVisible && (
          <div
            className="min-h-full bg-gradient-to-b from-blue-50 to-white border-r shadow-md overflow-auto resize-x"
            style={{
              resize: "vertically",
              overflow: "auto",
              minWidth: "250px",
              maxWidth: "600px",
              width: "300px",
            }}
          >
            
            <div className="p-2 text-[#151b54] text-sm h-full overflow-auto">
              <ul className="text-xs text-blue-900 pl-6 space-y-0">
          
                <li>
                  <div
                    onClick={() => toggleMenu("devcust")}
                    className="flex items-center justify-between hover:bg-gray-200 pt-2 px-2 rounded cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      {openMenus.devcust ? <FaFolderOpen /> : <FaFolder />}
                      <span>Dev.Cust</span>
                    </div>
                    {openMenus.devcust ? <FiChevronDown /> : <FiChevronRight />}
                  </div>

                  {openMenus.devcust && (
                    <ul className="pl-6 mt-1 text-blue-900 space-y-0">
                  
                      <li>
                        <div
                          onClick={() => toggleMenu("masterdata")}
                          className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                        >
                          <div className="flex items-center space-x-2">
                            {openMenus.masterdata ? (
                              <FaFolderOpen />
                            ) : (
                              <FaFolder />
                            )}
                            <span>Favourites</span>
                          </div>
                          {openMenus.masterdata ? (
                            <FiChevronDown />
                          ) : (
                            <FiChevronRight />
                          )}
                        </div>

                        {openMenus.masterdata && (
                          <ul className="pl-6 mt-1 space-y-1">
                            <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                              Customers
                            </li>
                            <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                              Vendors
                            </li>
                          </ul>
                        )}
                      </li>

          
                      <li>
                        <div
                          onClick={() => toggleMenu("aerp")}
                          className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                        >
                          <div className="flex items-center space-x-2">
                            {openMenus.aerp ? <FaFolderOpen /> : <FaFolder />}
                            <span>AERP Menu</span>
                          </div>
                          {openMenus.aerp ? (
                            <FiChevronDown />
                          ) : (
                            <FiChevronRight />
                          )}
                        </div>

                        {openMenus.aerp && (
                          <ul className="pl-6 mt-1 space-y-1">
                    
                            <li>
                              <div
                                onClick={() => toggleMenu("client")}
                                className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 rounded cursor-pointer"
                              >
                                <div className="flex items-center space-x-2">
                                  {openMenus.client ? (
                                    <FaFolderOpen />
                                  ) : (
                                    <FaFolder />
                                  )}
                                  <span>Client</span>
                                </div>
                                {openMenus.client ? (
                                  <FiChevronDown />
                                ) : (
                                  <FiChevronRight />
                                )}
                              </div>

                              {openMenus.client && (
                                <ul className="pl-6 mt-1 space-y-1">
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Client Details
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Preferences
                                  </li>
                                </ul>
                              )}
                            </li>

                  
                            <li>
                              <div
                                onClick={() => toggleMenu("accounting")}
                                className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 rounded cursor-pointer"
                              >
                                <div className="flex items-center space-x-2">
                                  {openMenus.accounting ? (
                                    <FaFolderOpen />
                                  ) : (
                                    <FaFolder />
                                  )}
                                  <span>Accounting</span>
                                </div>
                                {openMenus.accounting ? (
                                  <FiChevronDown />
                                ) : (
                                  <FiChevronRight />
                                )}
                              </div>

                              {openMenus.accounting && (
                                <ul className="pl-6 space-y-0">
                      
                                  <li>
                                    <div
                                      onClick={() => toggleMenu("financial")}
                                      className="flex items-center justify-between hover:bg-gray-100 p-1 rounded cursor-pointer"
                                    >
                                      <div className="flex items-center space-x-2">
                                        {openMenus.financial ? (
                                          <FaFolderOpen />
                                        ) : (
                                          <FaFolder />
                                        )}
                                        <span>Financial Accounting</span>
                                      </div>
                                      {openMenus.financial ? (
                                        <FiChevronDown />
                                      ) : (
                                        <FiChevronRight />
                                      )}
                                    </div>

                                    {openMenus.financial && (
                                      <ul className="pl-6 space-y-0">
                          
                                        <li>
                                          <div
                                            onClick={() => toggleMenu("ledger")}
                                            className="flex items-center justify-between hover:bg-gray-100 p-1 rounded cursor-pointer"
                                          >
                                            <div className="flex items-center space-x-2">
                                              {openMenus.ledger ? (
                                                <FaFolderOpen />
                                              ) : (
                                                <FaFolder />
                                              )}
                                              <span>General Ledger</span>
                                            </div>
                                            {openMenus.ledger ? (
                                              <FiChevronDown />
                                            ) : (
                                              <FiChevronRight />
                                            )}
                                          </div>

                                          {openMenus.ledger && (
                                            <ul className="pl-6 space-y-0">
                                              <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                Document Entry
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                Document
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                Account
                                              </li>
                                              <li>
                                                <div
                                                  onClick={() =>
                                                    toggleMenu("masterRecord")
                                                  }
                                                  className="flex items-center justify-between hover:bg-gray-100 p-1 rounded cursor-pointer"
                                                >
                                                  <div className="flex items-center space-x-2">
                                                    {openMenus.masterRecord ? (
                                                      <FaFolderOpen />
                                                    ) : (
                                                      <FaFolder />
                                                    )}
                                                    <span>Master Record</span>
                                                  </div>
                                                  {openMenus.masterRecord ? (
                                                    <FiChevronDown />
                                                  ) : (
                                                    <FiChevronRight />
                                                  )}
                                                </div>

                                                {openMenus.masterRecord && (
                                                  <ul className="pl-6 space-y-0">
                                                    <li>
                                                      <div
                                                        onClick={() =>
                                                          toggleMenu(
                                                            "glAccount"
                                                          )
                                                        }
                                                        className="flex items-center justify-between hover:bg-gray-100 p-1 rounded cursor-pointer"
                                                      >
                                                        <div className="flex items-center space-x-2">
                                                          {openMenus.glAccount ? (
                                                            <FaFolderOpen />
                                                          ) : (
                                                            <FaFolder />
                                                          )}
                                                          <span>
                                                            G L Account
                                                          </span>
                                                        </div>
                                                        {openMenus.glAccount ? (
                                                          <FiChevronDown />
                                                        ) : (
                                                          <FiChevronRight />
                                                        )}
                                                      </div>

                                                      {openMenus.glAccount && (
                                                        <ul className="pl-6 space-y-0">
                                                          <li>
                                                            <div
                                                              onClick={() =>
                                                                toggleMenu(
                                                                  "individualProcessing"
                                                                )
                                                              }
                                                              className="flex items-center justify-between hover:bg-gray-100 p-1 rounded cursor-pointer"
                                                            >
                                                              <div className="flex items-center space-x-2">
                                                                {openMenus.individualProcessing ? (
                                                                  <FaFolderOpen />
                                                                ) : (
                                                                  <FaFolder />
                                                                )}
                                                                <span>
                                                                  Individual
                                                                  Processing
                                                                </span>
                                                              </div>
                                                              {openMenus.individualProcessing ? (
                                                                <FiChevronDown />
                                                              ) : (
                                                                <FiChevronRight />
                                                              )}
                                                            </div>

                                                            {openMenus.individualProcessing && (
                                                              <ul className="pl-6 space-y-0">
                                                                <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                                  <a href="/centrally">
                                                                    Centrally
                                                                  </a>
                                                                </li>
                                                                <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                                  In Chart of
                                                                  Accounts
                                                                </li>
                                                                <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                                  In Company
                                                                  Code
                                                                </li>
                                                              </ul>
                                                            )}
                                                          </li>
                                                          <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                            Collective
                                                            Processing
                                                          </li>
                                                          <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                            Display Charges
                                                          </li>
                                                          <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                            Compare Company Code
                                                          </li>
                                                          <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                            Sample Account
                                                          </li>
                                                        </ul>
                                                      )}
                                                    </li>
                                                    <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                      Profit Center
                                                    </li>
                                                  </ul>
                                                )}
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                Stastical Key Figures
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                Periodic Processing
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                Corrections
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                Reporting
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                Information System
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                Environment
                                              </li>
                                            </ul>
                                          )}
                                        </li>

                                  
                                        <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                          Statistical Key Figures
                                        </li>
                                        <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                          Periodic Processing
                                        </li>
                                        <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                          Corrections
                                        </li>
                                        <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                          Reporting
                                        </li>
                                        <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                          Information System
                                        </li>
                                        <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                          Environment
                                        </li>
                                      </ul>
                                    )}
                                  </li>

                                  
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Accounts Payable
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Accounts Receivable
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Asset Accounting
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Bank Ledger
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Special Purpose Ledger
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Travel Management
                                  </li>
                                </ul>
                              )}
                            </li>
                          </ul>
                        )}
                      </li>
                    </ul>
                  )}
                </li>

    
                <li>
                  <div
                    onClick={() => toggleMenu("imgfunc")}
                    className="flex items-center justify-between hover:bg-gray-200 pt-2 px-2 rounded cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      {openMenus.imgfunc ? <FaFolderOpen /> : <FaFolder />}
                      <span>IMG-Functionality</span>
                    </div>
                    {openMenus.imgfunc ? <FiChevronDown /> : <FiChevronRight />}
                  </div>

                  {openMenus.imgfunc && (
                    <ul className="pl-6 mt-1 space-y-1 text-blue-900">
                      <li>
                        <div
                          onClick={() => toggleMenu("imgsub")}
                          className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                        >
                          <div className="flex items-center space-x-2">
                            {openMenus.imgsub ? <FaFolderOpen /> : <FaFolder />}
                            <span>Configuration</span>
                          </div>
                          {openMenus.imgsub ? (
                            <FiChevronDown />
                          ) : (
                            <FiChevronRight />
                          )}
                        </div>

                        {openMenus.imgsub && (
                          <ul className="pl-6 mt-1 space-y-1">
                            <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                              System Setup
                            </li>
                            <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                              Integration
                            </li>
                          </ul>
                        )}
                      </li>

                      <li className="hover:bg-gray-100 p-1 rounded cursor-pointer flex items-center space-x-2">
                        <FaFolder />
                        <span>Transport</span>
                      </li>
                    </ul>
                  )}
                </li>

    
                <li>
                  <div
                    onClick={() => toggleMenu("quickaccess")}
                    className="flex items-center justify-between hover:bg-gray-200 pt-2 px-2 rounded cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      {openMenus.quickaccess ? <FaFolderOpen /> : <FaFolder />}
                      <span>Quick Access</span>
                    </div>
                    {openMenus.quickaccess ? (
                      <FiChevronDown />
                    ) : (
                      <FiChevronRight />
                    )}
                  </div>

                  {openMenus.quickaccess && (
                    <ul className="pl-6 mt-1 space-y-1 text-blue-900">
                      <li className="hover:bg-gray-100 p-1 rounded cursor-pointer flex items-center space-x-2">
                        <FaFolder />
                        <span>Recent Items</span>
                      </li>
                      <li className="hover:bg-gray-100 p-1 rounded cursor-pointer flex items-center space-x-2">
                        <FaFolder />
                        <span>Frequently Used</span>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            </div>
          </div>
        )} */}

      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto font-sans text-xs bg-gray-50 space-y-2">
        <div className="bg-[#e5f3fd] p-6">
          {/* G/L Account Row */}
          <div className="flex items-center space-x-2 space-y-2">
            <label
              htmlFor="glAccount"
              className="w-32 text-right text-xs font-medium"
            >
              G/L Account <span className="text-amber-500 text-xs">*</span>
            </label>
            <input
              id="glAccount"
              name="glAccount"
              type="text"
              className="w-24 h-5 border rounded px-1 py-0.5 text-xs"
            />
            <FaSearch className="text-gray-600 cursor-pointer" />
            <p className="text-xs whitespace-nowrap">Receivables Domestic</p>
          </div>

          {/* Company Code Row */}
          <div className="flex items-center space-x-2">
            <label
              htmlFor="company_code"
              className="w-32 text-right text-xs font-medium"
            >
              Company Code <span className="text-amber-500 text-xs">*</span>
            </label>
            <input
              id="company_code"
              name="company_code"
              type="text"
              className="w-12 h-5 border rounded px-1 py-0.5 text-xs"
            />
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
      {/* </div>  */}
    </div>
  );
};

export default Sidebar;
