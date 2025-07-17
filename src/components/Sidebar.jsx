import { useEffect, useState } from "react";
import { FaCube, FaFolder, FaFolderOpen } from "react-icons/fa";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { useSearch } from "../context/SearchContext";

const Sidebar = () => {
  const { searchTarget } = useSearch();

  useEffect(() => {
    if (searchTarget === "G001") {
      // Expand the relevant parent menu, e.g., 'accounting'
      setOpenMenus((prev) => ({ ...prev, accounting: true }));
    }
  }, [searchTarget]);

  const [openMenus, setOpenMenus] = useState({
    devcust: false,
    masterdata: false,
    aerp: false,
    client: false,
    settings: false,
    accounting: false,
    imgfunc: false,
    imgsub: false,
    quickaccess: false,
    financial: false,
    ledger: false,
    masterRecord: false,
    glAccount: false,
    individualProcessing: false,
    documentEntry: false,
    documentMenu: false,

    // img guide
    enterprise: false,
    fiSettings: false,
    glConfig: false,
    accountsPayable: false,
    accountsReceivable: false,
    assetAccounting: false,
    controlling: false,
    taxation: false,
    travelManagement: false,
    specialPurposeLedger: false,
    reportingConfiguration: false,
    userRoles: false,
    systemSettings: false,
    fieldStatus: false,
    chartOfAccounts: false,
    documentControl: false,
    glMasterControl: false,

    // quick access
    quickMaster: false,
    quickFinance: false,
    quickReporting: false,
    quickSpecial: false,
    quickUtilities: false,
    financeGL: false,
    financeAP: false,
    financeAR: false,
    financeAsset: false,
    financeBank: false,
    financeTravel: false,

    // Enterprise Structure
    enterpriseStructure: false,
    def: false, // Definition
    fi: false, // Financial Accounting
    co: false, // Controlling
    lo: false, // Logistics - General
    sd: false, // Sales & Distribution
    mm: false, // Material Management
    pm: false, // Plant Maintenance
    hr: false, // Human Resource Management
  });

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };
  return (
    <div className="min-h-full w-80 bg-gradient-to-b from-blue-50 to-white border-r shadow-md overflow-x-auto overflow-y-auto resize-x">
      <div className="min-w-[300px] p-2 text-[#151b54] text-sm">
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
                      {openMenus.masterdata ? <FaFolderOpen /> : <FaFolder />}
                      <span>Favourites</span>
                    </div>
                    {openMenus.masterdata ? (
                      <FiChevronDown />
                    ) : (
                      <FiChevronRight />
                    )}
                  </div>

                  {openMenus.masterdata && (
                    <ul className="pl-6 mt-1 space-y-0">
                      <li className="hover:bg-gray-100 p-1 rounded flex items-center gap-2 cursor-pointer">
                        <FaCube /> Customers
                      </li>
                      <li className="hover:bg-gray-100 p-1 rounded flex items-center gap-2 cursor-pointer">
                        <FaCube /> Vendors
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
                    {openMenus.aerp ? <FiChevronDown /> : <FiChevronRight />}
                  </div>

                  {openMenus.aerp && (
                    <ul className="pl-6 mt-1 space-y-1">
                      <li>
                        <div
                          onClick={() => toggleMenu("client")}
                          className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 rounded cursor-pointer"
                        >
                          <div className="flex items-center space-x-2">
                            {openMenus.client ? <FaFolderOpen /> : <FaFolder />}
                            <span>Client</span>
                          </div>
                          {openMenus.client ? (
                            <FiChevronDown />
                          ) : (
                            <FiChevronRight />
                          )}
                        </div>

                        {openMenus.client && (
                          <ul className="pl-6 mt-1 space-y-0">
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="/client-profile">Client Details</a>
                            </li>
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              Preferences
                            </li>
                          </ul>
                        )}
                      </li>
                      <li>
                        <div
                          onClick={() => toggleMenu("settings")}
                          className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 rounded cursor-pointer"
                        >
                          <div className="flex items-center space-x-2">
                            {openMenus.settings ? (
                              <FaFolderOpen />
                            ) : (
                              <FaFolder />
                            )}
                            <span>Settings</span>
                          </div>
                          {openMenus.settings ? (
                            <FiChevronDown />
                          ) : (
                            <FiChevronRight />
                          )}
                        </div>

                        {openMenus.settings && (
                          <ul className="pl-6 mt-1 space-y-1">
                            {/* <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                              Client Details
                            </li>
                            <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                              Preferences
                            </li> */}
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
                                className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
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
                                      className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
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
                                        <li>
                                          <div
                                            onClick={() =>
                                              toggleMenu("documentEntry")
                                            }
                                            className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                                          >
                                            <div className="flex items-center space-x-2">
                                              {openMenus.documentEntry ? (
                                                <FaFolderOpen />
                                              ) : (
                                                <FaFolder />
                                              )}
                                              <span>Document Entry</span>
                                            </div>
                                            {openMenus.documentEntry ? (
                                              <FiChevronDown />
                                            ) : (
                                              <FiChevronRight />
                                            )}
                                          </div>

                                          {openMenus.documentEntry && (
                                            <ul className="pl-6 mt-1 space-y-0 text-xs text-blue-900">
                                              <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                                <FaCube />
                                                <a href="/gl-account-document">
                                                  Enter G/L Account
                                                </a>
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                                <FaCube />
                                                <a href="#">
                                                  Enter G/L Account Document for
                                                  Ledger Group
                                                </a>
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                                <FaCube />
                                                <a href="#">General Posting</a>
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                                <FaCube />
                                                <a href="#">
                                                  Enter General Posting for
                                                  Ledger Group
                                                </a>
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                                <FaCube />
                                                <a href="#">
                                                  Edit or Park G/L Document
                                                </a>
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                                <FaCube />
                                                <a href="#">
                                                  Park G/L Account Document for
                                                  Ledger Group
                                                </a>
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                                <FaCube />
                                                <a href="#">
                                                  General Document Parking
                                                </a>
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                                <FaCube />
                                                <a href="#">
                                                  Post with Clearing
                                                </a>
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                                <FaCube />
                                                <a href="#">
                                                  Incoming Payments
                                                </a>
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                                <FaCube />
                                                <a href="#">
                                                  Outgoing Payments
                                                </a>
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                                <FaCube />
                                                <a href="#">
                                                  Cash Journal Posting
                                                </a>
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                                <FaCube />
                                                <a href="#">
                                                  Valuate Foriegn Currency
                                                </a>
                                              </li>
                                            </ul>
                                          )}
                                        </li>

                                        <li>
                                          <div
                                            onClick={() =>
                                              toggleMenu("documentMenu")
                                            }
                                            className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                                          >
                                            <div className="flex items-center space-x-2">
                                              {openMenus.documentMenu ? (
                                                <FaFolderOpen />
                                              ) : (
                                                <FaFolder />
                                              )}
                                              <span>Document</span>
                                            </div>
                                            {openMenus.documentMenu ? (
                                              <FiChevronDown />
                                            ) : (
                                              <FiChevronRight />
                                            )}
                                          </div>

                                          {openMenus.documentMenu && (
                                            <ul className="pl-6 mt-1 space-y-0 text-xs text-blue-900">
                                              <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                                <FaCube />
                                                <a href="#">Change</a>
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                                <FaCube />
                                                <a href="#">
                                                  Change Line of Items
                                                </a>
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                                <FaCube />
                                                <a href="#">Display</a>
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                                <FaCube />
                                                <a href="#">
                                                  Display in Ledger View
                                                </a>
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                                <FaCube />
                                                <a href="#">Display Changes</a>
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                                <FaCube />
                                                <a href="#">
                                                  Reset Cleared Items
                                                </a>
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                                <FaCube />
                                                <a href="#">Parked Documents</a>
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                                <FaCube />
                                                <a href="#">
                                                  Reference Documents
                                                </a>
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                                <FaCube />
                                                <a href="#">
                                                  Cross Company Code
                                                  Transactions
                                                </a>
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                                <FaCube />
                                                <a href="#">Reverse</a>
                                              </li>
                                            </ul>
                                          )}
                                        </li>

                                        <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                          <FaCube />
                                          <a href="#">Account</a>
                                        </li>
                                        <li>
                                          <div
                                            onClick={() =>
                                              toggleMenu("masterRecord")
                                            }
                                            className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
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
                                                    toggleMenu("glAccount")
                                                  }
                                                  className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                                                >
                                                  <div className="flex items-center space-x-2">
                                                    {openMenus.glAccount ? (
                                                      <FaFolderOpen />
                                                    ) : (
                                                      <FaFolder />
                                                    )}
                                                    <span>G L Account</span>
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
                                                        className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
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
                                                          <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                                            <FaCube />
                                                            <a href="/centrally">
                                                              Centrally
                                                            </a>
                                                          </li>
                                                          <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                                            <FaCube />
                                                            <a href="#">
                                                              In Chart of
                                                              Accounts
                                                            </a>
                                                          </li>
                                                          <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                                            <FaCube />
                                                            <a href="#">
                                                              In Company Code
                                                            </a>
                                                          </li>
                                                        </ul>
                                                      )}
                                                    </li>
                                                    <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                                      <FaCube />
                                                      <a href="#">
                                                        Collective Processing
                                                      </a>
                                                    </li>
                                                    <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                                      <FaCube />
                                                      <a href="#">
                                                        Display Charges
                                                      </a>
                                                    </li>
                                                    <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                                      <FaCube />
                                                      <a href="#">
                                                        Compare Company Code
                                                      </a>
                                                    </li>
                                                    <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                                      <FaCube />
                                                      <a href="#">
                                                        Sample Account
                                                      </a>
                                                    </li>
                                                  </ul>
                                                )}
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                                <FaCube />
                                                <a href="#">Profit Center</a>
                                              </li>
                                            </ul>
                                          )}
                                        </li>
                                        <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                          <FaCube />
                                          <a href="#">Stastical Key Figures</a>
                                        </li>
                                        <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                          <FaCube />
                                          <a href="#">Periodic Processing</a>
                                        </li>
                                        <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                          <FaCube />
                                          <a href="#">Corrections</a>
                                        </li>
                                        <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                          <FaCube />
                                          <a href="#">Reporting</a>
                                        </li>
                                        <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                          <FaCube />
                                          <a href="#">Information System</a>
                                        </li>
                                        <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                          <FaCube />
                                          <a href="#">Environment</a>
                                        </li>
                                      </ul>
                                    )}
                                  </li>

                                  {/* <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
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
                                  </li> */}
                                </ul>
                              )}
                            </li>

                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="#">Accounts Payable</a>
                            </li>
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="#">Accounts Receivable</a>
                            </li>
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="#">Asset Accounting</a>
                            </li>
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="#">Bank Ledger</a>
                            </li>
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="#">Special Purpose Ledger</a>
                            </li>
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="#">Travel Management</a>
                            </li>
                          </ul>
                        )}
                      </li>

                      <li>
                        <div
                          onClick={() => toggleMenu("enterpriseStructure")}
                          className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                        >
                          <div className="flex items-center space-x-2">
                            {openMenus.enterpriseStructure ? (
                              <FaFolderOpen />
                            ) : (
                              <FaFolder />
                            )}
                            <span>Enterprise Structure</span>
                          </div>
                          {openMenus.enterpriseStructure ? (
                            <FiChevronDown />
                          ) : (
                            <FiChevronRight />
                          )}
                        </div>

                        {openMenus.enterpriseStructure && (
                          <ul className="pl-6 space-y-0">
                            {/* Definition */}
                            <li>
                              <div
                                onClick={() => toggleMenu("def")}
                                className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                              >
                                <div className="flex items-center space-x-2">
                                  {openMenus.def ? (
                                    <FaFolderOpen />
                                  ) : (
                                    <FaFolder />
                                  )}
                                  <span>Definition</span>
                                </div>
                                {openMenus.def ? (
                                  <FiChevronDown />
                                ) : (
                                  <FiChevronRight />
                                )}
                              </div>

                              {openMenus.def && (
                                <ul className="pl-6 mt-1 space-y-0 text-xs text-blue-900">
                                  {/* <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Define [Item 1]
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Define [Item 2]
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Define [Item 3]
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Define [Item 4]
                                  </li> */}
                                </ul>
                              )}
                            </li>

                            {/* FI (Financial Accounting) */}
                            <li>
                              <div
                                onClick={() => toggleMenu("fi")}
                                className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                              >
                                <div className="flex items-center space-x-2">
                                  {openMenus.fi ? (
                                    <FaFolderOpen />
                                  ) : (
                                    <FaFolder />
                                  )}
                                  <span>FI (Financial Accounting)</span>
                                </div>
                                {openMenus.fi ? (
                                  <FiChevronDown />
                                ) : (
                                  <FiChevronRight />
                                )}
                              </div>
                              {openMenus.fi && (
                                <ul className="pl-6 mt-1 space-y-0 text-xs text-blue-900">
                                  <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                    <FaCube />
                                    <a href="/define-company">Define Company</a>
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                    <FaCube />
                                    <a href="#">Define Company Code</a>
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                    <FaCube />
                                    <a href="/assign-company-to-company-code">
                                      Assign Company Code to Company
                                    </a>
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                    <FaCube />
                                    <a href="#">Define Business Area</a>
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                    <FaCube />
                                    <a href="#">Define Functional Area</a>
                                  </li>
                                </ul>
                              )}
                            </li>

                            {/* CO (Controlling) */}
                            <li>
                              <div
                                onClick={() => toggleMenu("co")}
                                className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                              >
                                <div className="flex items-center space-x-2">
                                  {openMenus.co ? (
                                    <FaFolderOpen />
                                  ) : (
                                    <FaFolder />
                                  )}
                                  <span>CO (Controlling)</span>
                                </div>
                                {openMenus.co ? (
                                  <FiChevronDown />
                                ) : (
                                  <FiChevronRight />
                                )}
                              </div>
                              {openMenus.co && (
                                <ul className="pl-6 mt-1 space-y-0 text-xs text-blue-900">
                                  <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                    <FaCube />
                                    <a href="#">Define Controlling Area</a>
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                    <FaCube />
                                    <a href="#">
                                      Assign Company Code to Controlling Area
                                    </a>
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                    <FaCube />
                                    <a href="#">
                                      Maintain Controlling Settings
                                    </a>
                                  </li>
                                </ul>
                              )}
                            </li>

                            {/* LO (Logistics General) */}
                            <li>
                              <div
                                onClick={() => toggleMenu("lo")}
                                className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                              >
                                <div className="flex items-center space-x-2">
                                  {openMenus.lo ? (
                                    <FaFolderOpen />
                                  ) : (
                                    <FaFolder />
                                  )}
                                  <span>LO (Logistics - General)</span>
                                </div>
                                {openMenus.lo ? (
                                  <FiChevronDown />
                                ) : (
                                  <FiChevronRight />
                                )}
                              </div>
                              {openMenus.lo && (
                                <ul className="pl-6 mt-1 space-y-0 text-xs text-blue-900">
                                  <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                    <FaCube />
                                    <a href="#">Define Division</a>
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                    <FaCube />
                                    <a href="#">Define Distribution Channel</a>
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                    <FaCube />
                                    <a href="#">Define Sales Organization</a>
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                    <FaCube />
                                    <a href="#">
                                      Assign Sales Org to Company Code
                                    </a>
                                  </li>
                                </ul>
                              )}
                            </li>

                            {/* SD (Sales & Distribution) */}
                            <li>
                              <div
                                onClick={() => toggleMenu("sd")}
                                className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                              >
                                <div className="flex items-center space-x-2">
                                  {openMenus.sd ? (
                                    <FaFolderOpen />
                                  ) : (
                                    <FaFolder />
                                  )}
                                  <span>SD (Sales & Distribution)</span>
                                </div>
                                {openMenus.sd ? (
                                  <FiChevronDown />
                                ) : (
                                  <FiChevronRight />
                                )}
                              </div>
                              {openMenus.sd && (
                                <ul className="pl-6 mt-1 space-y-0 text-xs text-blue-900">
                                  <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                    <FaCube />
                                    <a href="#">Define Sales Office</a>
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                    <FaCube />
                                    <a href="#">Define Sales Group</a>
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                    <FaCube />
                                    <a href="#">
                                      Assign Sales Office to Sales Org
                                    </a>
                                  </li>
                                </ul>
                              )}
                            </li>

                            {/* MM (Material Management) */}
                            <li>
                              <div
                                onClick={() => toggleMenu("mm")}
                                className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                              >
                                <div className="flex items-center space-x-2">
                                  {openMenus.mm ? (
                                    <FaFolderOpen />
                                  ) : (
                                    <FaFolder />
                                  )}
                                  <span>MM (Materials Management)</span>
                                </div>
                                {openMenus.mm ? (
                                  <FiChevronDown />
                                ) : (
                                  <FiChevronRight />
                                )}
                              </div>
                              {openMenus.mm && (
                                <ul className="pl-6 mt-1 space-y-0 text-xs text-blue-900">
                                  <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                    <FaCube />
                                    <a href="#">Define Plant</a>
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                    <FaCube />
                                    <a href="#">Define Storage Location</a>
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                    <FaCube />
                                    <a href="#">
                                      Define Purchasing Organization
                                    </a>
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                    <FaCube />
                                    <a href="#">
                                      Assign Purchasing Org to Plant
                                    </a>
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                    <FaCube />
                                    <a href="#">Assign Plant to Company Code</a>
                                  </li>
                                </ul>
                              )}
                            </li>

                            {/* PM (Plant Maintenance) */}
                            <li>
                              <div
                                onClick={() => toggleMenu("pm")}
                                className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                              >
                                <div className="flex items-center space-x-2">
                                  {openMenus.pm ? (
                                    <FaFolderOpen />
                                  ) : (
                                    <FaFolder />
                                  )}
                                  <span>PM (Plant Maintenance)</span>
                                </div>
                                {openMenus.pm ? (
                                  <FiChevronDown />
                                ) : (
                                  <FiChevronRight />
                                )}
                              </div>
                              {openMenus.pm && (
                                <ul className="pl-6 mt-1 space-y-0 text-xs text-blue-900">
                                  <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                    <FaCube />
                                    <a href="#">Define Maintenance Plant</a>
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                    <FaCube />
                                    <a href="#">Assign Planning Plant</a>
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                    <FaCube />
                                    <a href="#">
                                      Set Maintenance Planning Data
                                    </a>
                                  </li>
                                </ul>
                              )}
                            </li>

                            {/* HR (Human Resource Management) */}
                            <li>
                              <div
                                onClick={() => toggleMenu("hr")}
                                className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                              >
                                <div className="flex items-center space-x-2">
                                  {openMenus.hr ? (
                                    <FaFolderOpen />
                                  ) : (
                                    <FaFolder />
                                  )}
                                  <span>HR (Human Resource Management)</span>
                                </div>
                                {openMenus.hr ? (
                                  <FiChevronDown />
                                ) : (
                                  <FiChevronRight />
                                )}
                              </div>
                              {openMenus.hr && (
                                <ul className="pl-6 mt-1 space-y-0 text-xs text-blue-900">
                                  <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                    <FaCube />
                                    <a href="#">Define Personnel Area</a>
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                    <FaCube />
                                    <a href="#">Define Personnel Subarea</a>
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                                    <FaCube />
                                    <a href="#">
                                      Assign Company Code to Personnel Area
                                    </a>
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
                {/* 🔻 Enterprise Structure Configuration */}
                <li>
                  <div
                    onClick={() => toggleMenu("enterprise")}
                    className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      {openMenus.enterprise ? <FaFolderOpen /> : <FaFolder />}
                      <span>Enterprise Structure Configuration</span>
                    </div>
                    {openMenus.enterprise ? (
                      <FiChevronDown />
                    ) : (
                      <FiChevronRight />
                    )}
                  </div>

                  {openMenus.enterprise && (
                    <ul className="pl-6 mt-1 space-y-0">
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="/create-company">Define Company</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="/create-company-code">Define Company Code</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="/assign-company-to-company-code">
                          Assign Company Code to Company
                        </a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Define Business Area</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">
                          Define Plant, Storage Location, Sales Org, Purchasing
                          Org
                        </a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Assign Org Units</a>
                      </li>
                    </ul>
                  )}
                </li>
                {/* 🔻 Financial Accounting Settings (FI) */}
                <li>
                  <div
                    onClick={() => toggleMenu("fiSettings")}
                    className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      {openMenus.fiSettings ? <FaFolderOpen /> : <FaFolder />}
                      <span>Financial Accounting Settings (FI)</span>
                    </div>
                    {openMenus.fiSettings ? (
                      <FiChevronDown />
                    ) : (
                      <FiChevronRight />
                    )}
                  </div>

                  {openMenus.fiSettings && (
                    <ul className="pl-6 mt-1 space-y-0">
                      {/* Chart of Accounts */}
                      <li>
                        <div
                          onClick={() => toggleMenu("chartOfAccounts")}
                          className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                        >
                          <div className="flex items-center space-x-2">
                            {openMenus.chartOfAccounts ? (
                              <FaFolderOpen />
                            ) : (
                              <FaFolder />
                            )}
                            <span>Chart of Accounts</span>
                          </div>
                          {openMenus.chartOfAccounts ? (
                            <FiChevronDown />
                          ) : (
                            <FiChevronRight />
                          )}
                        </div>

                        {openMenus.chartOfAccounts && (
                          <ul className="pl-6 mt-1 space-y-0">
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="/charts-of-accounts">
                                Define Chart of Accounts
                              </a>
                            </li>
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="/assign-coa-to-company-code">
                                Assign CoA to Company Code
                              </a>
                            </li>
                          </ul>
                        )}
                      </li>

                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="/define-account-groups">
                          Define Account Groups
                        </a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="/field-status-variants">
                          Field Status Variants
                        </a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="/posting-period-variant">
                          Posting Period Variant
                        </a>
                      </li>

                      <li>
                        <div
                          onClick={() => toggleMenu("documentControl")}
                          className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                        >
                          <div className="flex items-center space-x-2">
                            {openMenus.documentControl ? (
                              <FaFolderOpen />
                            ) : (
                              <FaFolder />
                            )}
                            <span>Document Types & Number Ranges</span>
                          </div>
                          {openMenus.documentControl ? (
                            <FiChevronDown />
                          ) : (
                            <FiChevronRight />
                          )}
                        </div>

                        {openMenus.documentControl && (
                          <ul className="pl-6 mt-1 space-y-0">
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="/document-types">Document Types</a>
                            </li>
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="/number-ranges">Number Ranges</a>
                            </li>
                          </ul>
                        )}
                      </li>

                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="/define-tolerance-groups">
                          Define Tolerance Groups for Employees
                        </a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="/tax-on-sales-and-purchase">
                          Tax on Sales & Purchases (Define Tax Codes)
                        </a>
                      </li>
                    </ul>
                  )}
                </li>
                {/* 🔻 General Ledger Configuration */}
                <li>
                  <div
                    onClick={() => toggleMenu("glConfig")}
                    className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      {openMenus.glConfig ? <FaFolderOpen /> : <FaFolder />}
                      <span>General Ledger Configuration</span>
                    </div>
                    {openMenus.glConfig ? (
                      <FiChevronDown />
                    ) : (
                      <FiChevronRight />
                    )}
                  </div>

                  {openMenus.glConfig && (
                    <ul className="pl-6 mt-1 space-y-0">
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="/define-gl-account-types">
                          Define G/L Account Types
                        </a>
                      </li>
                      {/* G/L Account Master Control */}
                      <li>
                        <div
                          onClick={() => toggleMenu("glMasterControl")}
                          className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                        >
                          <div className="flex items-center space-x-2">
                            {openMenus.glMasterControl ? (
                              <FaFolderOpen />
                            ) : (
                              <FaFolder />
                            )}
                            <span>G/L Account Master Control</span>
                          </div>
                          {openMenus.glMasterControl ? (
                            <FiChevronDown />
                          ) : (
                            <FiChevronRight />
                          )}
                        </div>

                        {openMenus.glMasterControl && (
                          <ul className="pl-6 mt-1 space-y-0">
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="/charts-of-accounts-level-fields">
                                Chart of Accounts Level Fields
                              </a>
                            </li>
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="/company-code-level-fields">
                                Company Code Level Fields
                              </a>
                            </li>
                          </ul>
                        )}
                      </li>

                      {/* Parallel Accounting / Ledgers (T-Code: FINSC_LEDGER) */}
                      <li>
                        <div
                          onClick={() => toggleMenu("parallelLedger")}
                          className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                        >
                          <div className="flex items-center space-x-2">
                            {openMenus.parallelLedger ? (
                              <FaFolderOpen />
                            ) : (
                              <FaFolder />
                            )}
                            <span>Parallel Accounting / Ledgers</span>
                          </div>
                          {openMenus.parallelLedger ? (
                            <FiChevronDown />
                          ) : (
                            <FiChevronRight />
                          )}
                        </div>

                        {openMenus.parallelLedger && (
                          <ul className="pl-6 mt-1 space-y-0">
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="/ledger-definition-fields">
                                Ledger Definition Fields
                              </a>
                            </li>
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="#">Ledger Relationship Fields</a>
                            </li>
                          </ul>
                        )}
                      </li>
                    </ul>
                  )}
                </li>
                {/* 🔻 Accounts Payable */}
                <li>
                  <div
                    onClick={() => toggleMenu("accountsPayable")}
                    className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      {openMenus.accountsPayable ? (
                        <FaFolderOpen />
                      ) : (
                        <FaFolder />
                      )}
                      <span>Accounts Payable</span>
                    </div>
                    {openMenus.accountsPayable ? (
                      <FiChevronDown />
                    ) : (
                      <FiChevronRight />
                    )}
                  </div>

                  {openMenus.accountsPayable && (
                    <ul className="pl-6 mt-1 space-y-0">
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Vendor Account Groups</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Number Ranges for Vendors</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Dunning Configuration</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Payment Terms / Methods</a>
                      </li>
                    </ul>
                  )}
                </li>
                {/* 🔻 Accounts Receivable */}
                <li>
                  <div
                    onClick={() => toggleMenu("accountsReceivable")}
                    className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      {openMenus.accountsReceivable ? (
                        <FaFolderOpen />
                      ) : (
                        <FaFolder />
                      )}
                      <span>Accounts Receivable</span>
                    </div>
                    {openMenus.accountsReceivable ? (
                      <FiChevronDown />
                    ) : (
                      <FiChevronRight />
                    )}
                  </div>

                  {openMenus.accountsReceivable && (
                    <ul className="pl-6 mt-1 space-y-0">
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Customer Account Groups</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Credit Management Settings</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Customer Number Ranges</a>
                      </li>
                    </ul>
                  )}
                </li>
                {/* 🔻 Asset Accounting */}
                <li>
                  <div
                    onClick={() => toggleMenu("assetAccounting")}
                    className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      {openMenus.assetAccounting ? (
                        <FaFolderOpen />
                      ) : (
                        <FaFolder />
                      )}
                      <span>Asset Accounting</span>
                    </div>
                    {openMenus.assetAccounting ? (
                      <FiChevronDown />
                    ) : (
                      <FiChevronRight />
                    )}
                  </div>

                  {openMenus.assetAccounting && (
                    <ul className="pl-6 mt-1 space-y-0">
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Define Chart of Depreciation</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Asset Classes</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Depreciation Areas</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Integration with GL</a>
                      </li>
                    </ul>
                  )}
                </li>
                {/* 🔻 Controlling (CO) */}
                <li>
                  <div
                    onClick={() => toggleMenu("controlling")}
                    className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      {openMenus.controlling ? <FaFolderOpen /> : <FaFolder />}
                      <span>Controlling (CO)</span>
                    </div>
                    {openMenus.controlling ? (
                      <FiChevronDown />
                    ) : (
                      <FiChevronRight />
                    )}
                  </div>

                  {openMenus.controlling && (
                    <ul className="pl-6 mt-1 space-y-0">
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Define Controlling Area</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Assign Company Codes to CO Area</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Cost Center/Profit Center Hierarchy</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Define Secondary Cost Elements</a>
                      </li>
                    </ul>
                  )}
                </li>
                {/* 🔻 Taxation */}
                <li>
                  <div
                    onClick={() => toggleMenu("taxation")}
                    className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      {openMenus.taxation ? <FaFolderOpen /> : <FaFolder />}
                      <span>Taxation</span>
                    </div>
                    {openMenus.taxation ? (
                      <FiChevronDown />
                    ) : (
                      <FiChevronRight />
                    )}
                  </div>

                  {openMenus.taxation && (
                    <ul className="pl-6 mt-1 space-y-0">
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Define Tax Jurisdictions</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Maintain Tax Codes</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">GST/VAT Setup</a>
                      </li>
                    </ul>
                  )}
                </li>
                {/* 🔻 Travel Management */}
                <li>
                  <div
                    onClick={() => toggleMenu("travelManagement")}
                    className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      {openMenus.travelManagement ? (
                        <FaFolderOpen />
                      ) : (
                        <FaFolder />
                      )}
                      <span>Travel Management</span>
                    </div>
                    {openMenus.travelManagement ? (
                      <FiChevronDown />
                    ) : (
                      <FiChevronRight />
                    )}
                  </div>

                  {openMenus.travelManagement && (
                    <ul className="pl-6 mt-1 space-y-0">
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Define Travel Types</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Approval Workflow Setup</a>
                      </li>
                    </ul>
                  )}
                </li>
                {/* 🔻 Special Purpose Ledger (SPL) */}
                <li>
                  <div
                    onClick={() => toggleMenu("specialPurposeLedger")}
                    className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      {openMenus.specialPurposeLedger ? (
                        <FaFolderOpen />
                      ) : (
                        <FaFolder />
                      )}
                      <span>Special Purpose Ledger (SPL)</span>
                    </div>
                    {openMenus.specialPurposeLedger ? (
                      <FiChevronDown />
                    ) : (
                      <FiChevronRight />
                    )}
                  </div>

                  {openMenus.specialPurposeLedger && (
                    <ul className="pl-6 mt-1 space-y-0">
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Ledger Definition</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Transfer Rules</a>
                      </li>
                    </ul>
                  )}
                </li>
                {/* 🔻 Reporting Configuration */}
                <li>
                  <div
                    onClick={() => toggleMenu("reportingConfiguration")}
                    className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      {openMenus.reportingConfiguration ? (
                        <FaFolderOpen />
                      ) : (
                        <FaFolder />
                      )}
                      <span>Reporting Configuration</span>
                    </div>
                    {openMenus.reportingConfiguration ? (
                      <FiChevronDown />
                    ) : (
                      <FiChevronRight />
                    )}
                  </div>

                  {openMenus.reportingConfiguration && (
                    <ul className="pl-6 mt-1 space-y-0">
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Report Painter/Writer Setup</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Financial Statement Versions</a>
                      </li>
                    </ul>
                  )}
                </li>
                {/* 🔻 User Roles and Authorizations */}
                <li>
                  <div
                    onClick={() => toggleMenu("userRoles")}
                    className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      {openMenus.userRoles ? <FaFolderOpen /> : <FaFolder />}
                      <span>User Roles and Authorizations</span>
                    </div>
                    {openMenus.userRoles ? (
                      <FiChevronDown />
                    ) : (
                      <FiChevronRight />
                    )}
                  </div>

                  {openMenus.userRoles && (
                    <ul className="pl-6 mt-1 space-y-0">
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Define Roles</a>
                      </li>

                      <li>
                        <div
                          onClick={() => toggleMenu("fieldStatus")}
                          className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                        >
                          <div className="flex items-center space-x-2">
                            {openMenus.fieldStatus ? (
                              <FaFolderOpen />
                            ) : (
                              <FaFolder />
                            )}
                            <span>Field Status Groups</span>
                          </div>
                          {openMenus.fieldStatus ? (
                            <FiChevronDown />
                          ) : (
                            <FiChevronRight />
                          )}
                        </div>

                        {openMenus.fieldStatus && (
                          <ul className="pl-6 mt-1 space-y-0">
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="/field-status-groups">
                                Define Field Status Groups
                              </a>
                            </li>
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="/typical-field-groups">
                                Typical Field Groups
                              </a>
                            </li>
                          </ul>
                        )}
                      </li>
                    </ul>
                  )}
                </li>
                {/* 🔻 System Settings */}
                <li>
                  <div
                    onClick={() => toggleMenu("systemSettings")}
                    className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      {openMenus.systemSettings ? (
                        <FaFolderOpen />
                      ) : (
                        <FaFolder />
                      )}
                      <span>System Settings</span>
                    </div>
                    {openMenus.systemSettings ? (
                      <FiChevronDown />
                    ) : (
                      <FiChevronRight />
                    )}
                  </div>

                  {openMenus.systemSettings && (
                    <ul className="pl-6 mt-1 space-y-0">
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="/define-fiscal-year">
                          Define Fiscal Year Variant
                        </a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="/assign-fiscal-year">
                          Assign Fiscal Year Variant to Company Code
                        </a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="/define-currency-and-exchange-rate-types">
                          Define Currency & Exchange Rate Types
                        </a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Time Zone Settings</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Backup/Restore Parameters</a>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>

          {/* 🔻 Quick Access */}
          <li>
            <div
              onClick={() => toggleMenu("quickaccess")}
              className="flex items-center justify-between hover:bg-gray-200 pt-2 px-2 rounded cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                {openMenus.quickaccess ? <FaFolderOpen /> : <FaFolder />}
                <span>Quick Access</span>
              </div>
              {openMenus.quickaccess ? <FiChevronDown /> : <FiChevronRight />}
            </div>

            {openMenus.quickaccess && (
              <ul className="pl-6 mt-1 space-y-1 text-blue-900">
                {/* 1. Master Data Maintenance */}
                <li>
                  <div
                    onClick={() => toggleMenu("quickMaster")}
                    className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      {openMenus.quickMaster ? <FaFolderOpen /> : <FaFolder />}
                      <span>Master Data Maintenance</span>
                    </div>
                    {openMenus.quickMaster ? (
                      <FiChevronDown />
                    ) : (
                      <FiChevronRight />
                    )}
                  </div>
                  {openMenus.quickMaster && (
                    <ul className="pl-6 mt-1 space-y-0">
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Vendor Master (Create/Change/Display)</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Customer Master (Create/Change/Display)</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">GL Account Master</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Asset Master</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Cost Center / Profit Center</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Bank Master</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Employee Travel Profiles</a>
                      </li>
                    </ul>
                  )}
                </li>

                {/* 2. Financial Transactions */}
                <li>
                  <div
                    onClick={() => toggleMenu("quickFinance")}
                    className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      {openMenus.quickFinance ? <FaFolderOpen /> : <FaFolder />}
                      <span>Financial Transactions</span>
                    </div>
                    {openMenus.quickFinance ? (
                      <FiChevronDown />
                    ) : (
                      <FiChevronRight />
                    )}
                  </div>

                  {openMenus.quickFinance && (
                    <ul className="pl-6 mt-1 space-y-0">
                      {/* General Ledger */}
                      <li>
                        <div
                          onClick={() => toggleMenu("financeGL")}
                          className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                        >
                          <div className="flex items-center space-x-2">
                            {openMenus.financeGL ? (
                              <FaFolderOpen />
                            ) : (
                              <FaFolder />
                            )}
                            <span>General Ledger</span>
                          </div>
                          {openMenus.financeGL ? (
                            <FiChevronDown />
                          ) : (
                            <FiChevronRight />
                          )}
                        </div>
                        {openMenus.financeGL && (
                          <ul className="pl-6 mt-1 space-y-0">
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="/post-journal-entry">
                                Post Journal Entry
                              </a>
                            </li>
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="/display-gl-balances">
                                Display GL Balances
                              </a>
                            </li>
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="#">Display Line Items</a>
                            </li>
                          </ul>
                        )}
                      </li>

                      {/* Accounts Payable */}
                      <li>
                        <div
                          onClick={() => toggleMenu("financeAP")}
                          className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                        >
                          <div className="flex items-center space-x-2">
                            {openMenus.financeAP ? (
                              <FaFolderOpen />
                            ) : (
                              <FaFolder />
                            )}
                            <span>Accounts Payable</span>
                          </div>
                          {openMenus.financeAP ? (
                            <FiChevronDown />
                          ) : (
                            <FiChevronRight />
                          )}
                        </div>
                        {openMenus.financeAP && (
                          <ul className="pl-6 mt-1 space-y-0">
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="#">Enter Incoming Invoice</a>
                            </li>
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="#">Make Payment</a>
                            </li>
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="#">Display Vendor Line Items</a>
                            </li>
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="#">Dunning Run</a>
                            </li>
                          </ul>
                        )}
                      </li>

                      {/* Accounts Receivable */}
                      <li>
                        <div
                          onClick={() => toggleMenu("financeAR")}
                          className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                        >
                          <div className="flex items-center space-x-2">
                            {openMenus.financeAR ? (
                              <FaFolderOpen />
                            ) : (
                              <FaFolder />
                            )}
                            <span>Accounts Receivable</span>
                          </div>
                          {openMenus.financeAR ? (
                            <FiChevronDown />
                          ) : (
                            <FiChevronRight />
                          )}
                        </div>
                        {openMenus.financeAR && (
                          <ul className="pl-6 mt-1 space-y-0">
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="#">Create Outgoing Invoice</a>
                            </li>
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="#">Post Incoming Payment</a>
                            </li>
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="#">Display Customer Line Items</a>
                            </li>
                          </ul>
                        )}
                      </li>

                      {/* Asset Accounting */}
                      <li>
                        <div
                          onClick={() => toggleMenu("financeAsset")}
                          className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                        >
                          <div className="flex items-center space-x-2">
                            {openMenus.financeAsset ? (
                              <FaFolderOpen />
                            ) : (
                              <FaFolder />
                            )}
                            <span>Asset Accounting</span>
                          </div>
                          {openMenus.financeAsset ? (
                            <FiChevronDown />
                          ) : (
                            <FiChevronRight />
                          )}
                        </div>
                        {openMenus.financeAsset && (
                          <ul className="pl-6 mt-1 space-y-0">
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="#">Acquire Asset</a>
                            </li>
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="#">Retire Asset</a>
                            </li>
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="#">Run Depreciation</a>
                            </li>
                          </ul>
                        )}
                      </li>

                      {/* Bank Ledger */}
                      <li>
                        <div
                          onClick={() => toggleMenu("financeBank")}
                          className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                        >
                          <div className="flex items-center space-x-2">
                            {openMenus.financeBank ? (
                              <FaFolderOpen />
                            ) : (
                              <FaFolder />
                            )}
                            <span>Bank Ledger</span>
                          </div>
                          {openMenus.financeBank ? (
                            <FiChevronDown />
                          ) : (
                            <FiChevronRight />
                          )}
                        </div>
                        {openMenus.financeBank && (
                          <ul className="pl-6 mt-1 space-y-0">
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="#">Bank Statement Upload</a>
                            </li>
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="#">Manual Bank Entry</a>
                            </li>
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="#">Bank Reconciliation</a>
                            </li>
                          </ul>
                        )}
                      </li>

                      {/* Travel Management */}
                      <li>
                        <div
                          onClick={() => toggleMenu("financeTravel")}
                          className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                        >
                          <div className="flex items-center space-x-2">
                            {openMenus.financeTravel ? (
                              <FaFolderOpen />
                            ) : (
                              <FaFolder />
                            )}
                            <span>Travel Management</span>
                          </div>
                          {openMenus.financeTravel ? (
                            <FiChevronDown />
                          ) : (
                            <FiChevronRight />
                          )}
                        </div>
                        {openMenus.financeTravel && (
                          <ul className="pl-6 mt-1 space-y-0">
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="#">Create Travel Request</a>
                            </li>
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="#">Submit Expense Report</a>
                            </li>
                            <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                              <FaCube />
                              <a href="#">Approve Expenses</a>
                            </li>
                          </ul>
                        )}
                      </li>
                    </ul>
                  )}
                </li>

                {/* 3. Reporting */}
                <li>
                  <div
                    onClick={() => toggleMenu("quickReporting")}
                    className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      {openMenus.quickReporting ? (
                        <FaFolderOpen />
                      ) : (
                        <FaFolder />
                      )}
                      <span>Reporting</span>
                    </div>
                    {openMenus.quickReporting ? (
                      <FiChevronDown />
                    ) : (
                      <FiChevronRight />
                    )}
                  </div>
                  {openMenus.quickReporting && (
                    <ul className="pl-6 mt-1 space-y-0">
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Trial Balance</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Profit & Loss</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Balance Sheet</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">AP/AR Aging</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Tax Reports (GST/TDS)</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Asset Register</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Bank Reconciliation Report</a>
                      </li>
                    </ul>
                  )}
                </li>

                {/* 4. Special Purpose Reports */}
                <li>
                  <div
                    onClick={() => toggleMenu("quickSpecial")}
                    className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      {openMenus.quickSpecial ? <FaFolderOpen /> : <FaFolder />}
                      <span>Special Purpose Reports</span>
                    </div>
                    {openMenus.quickSpecial ? (
                      <FiChevronDown />
                    ) : (
                      <FiChevronRight />
                    )}
                  </div>
                  {openMenus.quickSpecial && (
                    <ul className="pl-6 mt-1 space-y-0">
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Ledger Comparison</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Forecast vs Actual</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Cost Element Reporting</a>
                      </li>
                    </ul>
                  )}
                </li>

                {/* 5. Utilities */}
                <li>
                  <div
                    onClick={() => toggleMenu("quickUtilities")}
                    className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      {openMenus.quickUtilities ? (
                        <FaFolderOpen />
                      ) : (
                        <FaFolder />
                      )}
                      <span>Utilities</span>
                    </div>
                    {openMenus.quickUtilities ? (
                      <FiChevronDown />
                    ) : (
                      <FiChevronRight />
                    )}
                  </div>
                  {openMenus.quickUtilities && (
                    <ul className="pl-6 mt-1 space-y-0">
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Import Master Data (Excel)</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">User Logs</a>
                      </li>
                      <li className="hover:bg-gray-100 p-1 flex items-center gap-2 rounded cursor-pointer">
                        <FaCube />
                        <a href="#">Password Reset</a>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
