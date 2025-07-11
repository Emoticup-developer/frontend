import { useEffect, useState } from "react";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
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
    enterpriseStructure: false,

    // Enterprise Structure submenus
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
    <div
      className="min-h-full bg-gradient-to-b from-blue-50 to-white border-r shadow-md overflow-x-auto overflow-y-auto resize-x"
      style={{
        minWidth: "250px",
        maxWidth: "600px",
        width: "400px",
      }}
    >
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
                            <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                              <a href="/client-profile">Client Details</a>
                            </li>
                            <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
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
                                        <li>
                                          <div
                                            onClick={() =>
                                              toggleMenu("documentEntry")
                                            }
                                            className="flex items-center justify-between hover:bg-gray-100 p-1 rounded cursor-pointer"
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
                                              <li className="hover:bg-gray-100 font-bold p-1 rounded cursor-pointer">
                                                <a href="/gl-account-document">
                                                  Enter G/L Account
                                                </a>
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                Enter G/L Account Document for
                                                Ledger Group
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                General Posting
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                Enter General Posting for Ledger
                                                Group
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                Edit or Park G/L Document
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                Park G/L Account Document for
                                                Ledger Group
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                General Document Parking
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                Post with Clearing
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                Incoming Payments
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                Outgoing Payments
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                Cash Journal Posting
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                Valuate Foriegn Currency
                                              </li>
                                            </ul>
                                          )}
                                        </li>

                                        <li>
                                          <div
                                            onClick={() =>
                                              toggleMenu("documentMenu")
                                            }
                                            className="flex items-center justify-between hover:bg-gray-100 p-1 rounded cursor-pointer"
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
                                              <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                Change
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                Change Line of Items
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                Display
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                Display in Ledger View
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                Display Changes
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                Reset Cleared Items
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                Parked Documents
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                Reference Documents
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                Cross Company Code Transactions
                                              </li>
                                              <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                Reverse
                                              </li>
                                            </ul>
                                          )}
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
                                                    toggleMenu("glAccount")
                                                  }
                                                  className="flex items-center justify-between hover:bg-gray-100 p-1 rounded cursor-pointer"
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
                                                          <li className="hover:bg-gray-100 font-bold p-1 rounded cursor-pointer">
                                                            <a href="/centrally">
                                                              Centrally
                                                            </a>
                                                          </li>
                                                          <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                            In Chart of Accounts
                                                          </li>
                                                          <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                            In Company Code
                                                          </li>
                                                        </ul>
                                                      )}
                                                    </li>
                                                    <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                      Collective Processing
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

                      <li>
                        <div
                          onClick={() => toggleMenu("enterpriseStructure")}
                          className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 rounded cursor-pointer"
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
                                className="flex items-center justify-between hover:bg-gray-100 p-1 rounded cursor-pointer"
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
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
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
                                  </li>
                                </ul>
                              )}
                            </li>

                            {/* FI (Financial Accounting) */}
                            <li>
                              <div
                                onClick={() => toggleMenu("fi")}
                                className="flex items-center justify-between hover:bg-gray-100 p-1 rounded cursor-pointer"
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
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Define Company
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Define Company Code
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Assign Company Code to Company
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Define Business Area
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Define Functional Area
                                  </li>
                                </ul>
                              )}
                            </li>

                            {/* CO (Controlling) */}
                            <li>
                              <div
                                onClick={() => toggleMenu("co")}
                                className="flex items-center justify-between hover:bg-gray-100 p-1 rounded cursor-pointer"
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
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Define Controlling Area
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Assign Company Code to Controlling Area
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Maintain Controlling Settings
                                  </li>
                                </ul>
                              )}
                            </li>

                            {/* LO (Logistics General) */}
                            <li>
                              <div
                                onClick={() => toggleMenu("lo")}
                                className="flex items-center justify-between hover:bg-gray-100 p-1 rounded cursor-pointer"
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
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Define Division
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Define Distribution Channel
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Define Sales Organization
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Assign Sales Org to Company Code
                                  </li>
                                </ul>
                              )}
                            </li>

                            {/* SD (Sales & Distribution) */}
                            <li>
                              <div
                                onClick={() => toggleMenu("sd")}
                                className="flex items-center justify-between hover:bg-gray-100 p-1 rounded cursor-pointer"
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
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Define Sales Office
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Define Sales Group
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Assign Sales Office to Sales Org
                                  </li>
                                </ul>
                              )}
                            </li>

                            {/* MM (Material Management) */}
                            <li>
                              <div
                                onClick={() => toggleMenu("mm")}
                                className="flex items-center justify-between hover:bg-gray-100 p-1 rounded cursor-pointer"
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
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Define Plant
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Define Storage Location
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Define Purchasing Organization
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Assign Purchasing Org to Plant
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Assign Plant to Company Code
                                  </li>
                                </ul>
                              )}
                            </li>

                            {/* PM (Plant Maintenance) */}
                            <li>
                              <div
                                onClick={() => toggleMenu("pm")}
                                className="flex items-center justify-between hover:bg-gray-100 p-1 rounded cursor-pointer"
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
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Define Maintenance Plant
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Assign Planning Plant
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Set Maintenance Planning Data
                                  </li>
                                </ul>
                              )}
                            </li>

                            {/* HR (Human Resource Management) */}
                            <li>
                              <div
                                onClick={() => toggleMenu("hr")}
                                className="flex items-center justify-between hover:bg-gray-100 p-1 rounded cursor-pointer"
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
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Define Personnel Area
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Define Personnel Subarea
                                  </li>
                                  <li className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                    Assign Company Code to Personnel Area
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
                <li>
                  <div
                    onClick={() => toggleMenu("imgsub")}
                    className="flex items-center justify-between hover:bg-gray-100 pl-1 pr-2 py-1 rounded cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      {openMenus.imgsub ? <FaFolderOpen /> : <FaFolder />}
                      <span>Configuration</span>
                    </div>
                    {openMenus.imgsub ? <FiChevronDown /> : <FiChevronRight />}
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
              {openMenus.quickaccess ? <FiChevronDown /> : <FiChevronRight />}
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
  );
};

export default Sidebar;
