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
} from "react-icons/fa";

const Centrally = () => {
  const appRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showApp, setShowApp] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const scrollRef = useRef(null);

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
      {/* Toolbar below top menu */}
      <div className="bg-[#f5fbff] text-black font-semibold p-1 text-xs shadow-md flex justify-between items-center">
        {/* Sidebar Toggle Buttons */}
        <div className="flex items-center gap-2 mr-4">
          {/* Hide Sidebar Button */}
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

          {/* Show Sidebar Button */}
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
        {/* Sidebar with horizontal resize */}
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
            {/* Sidebar Content */}
            <div className="p-2 text-[#151b54] text-sm h-full overflow-auto">
              <ul className="text-xs text-blue-900 pl-6 space-y-0">
                {/* Dev.Cust */}
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
                      {/* Favourites */}
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

                      {/* AERP Menu */}
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
                            {/* Client */}
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

                            {/* Accounting */}
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
                                  {/* Financial Accounting */}
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
                                        {/* General Ledger */}
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

                                        {/* Other Financial Accounting submenus */}
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

                                  {/* Other Accounting Submenus */}
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

                {/* IMG-Functionality */}
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

                {/* Quick Access */}
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
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-auto font-sans text-xs py-2 bg-gray-50 space-y-2">
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

          {/* Tab Menu Block */}
          <div className="mt-4 flex items-center">
            {/* Scrollable Tabs Container */}
            <div
              ref={scrollRef}
              className="flex space-x-1 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            >
              {[
                "Overview",
                "Details",
                "Analytics",
                "Settings",
                "Help",
                "Transactions",
                "Default",
                "Server",
                "Settings",
                "Settings",
                "Help",
                "Transactions",
                "Default",
                "Server",
                "Settings",
                "Settings",
                "Help",
                "Transactions",
                "Default",
                "Server",
                "Settings",
              ].map((tab) => (
                <button
                  key={tab}
                  className="snap-start px-3 py-1 whitespace-nowrap text-xs font-medium text-gray-700 hover:text-blue-600"
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Scroll‑Right Button */}
            <button
              onClick={() =>
                scrollRef.current?.scrollBy({ left: 120, behavior: "smooth" })
              }
              className="ml-2 p-1 bg-white rounded shadow hover:bg-gray-100"
              aria-label="Next tabs"
            >
              <FiChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Centrally;
