import { useState } from "react";
import { IoMdCreate, IoMdSave } from "react-icons/io";
import { MdCancelScheduleSend, MdOutlinePreview } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import { IoIosPrint } from "react-icons/io";

const DisplayGLBalances = () => {
  const [formData, setFormData] = useState({
    company_code: "",
    fiscal_year: "",
    gl_account: "",
    period_range: "",
    currency: "",
    balance_type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    // You can connect to API or backend here
  };

  return (
    <div>
      <div className="flex flex-col min-h-screen w-full bg-gray-50 font-sans text-xs">
        <div className="flex-grow w-full bg-[#f0f4f8] text-sm font-sans flex flex-col">
          <form onSubmit={handleSubmit}>
            <div className="h-full w-full bg-gray-100 shadow-md border border-gray-300 rounded-sm flex flex-col">
              {/* Top Action Bar */}
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
                      className="flex items-center space-x-1 cursor-pointer hover:text-blue-600"
                    >
                      <IoMdSave />
                      <span className="mr-5">Save</span>
                    </button>
                    <button
                      type="button"
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
                  {/* Form Fields */}
                  <div className="p-4 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <label
                          htmlFor="company_code"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Company Code
                        </label>
                        <input
                          type="text"
                          id="company_code"
                          name="company_code"
                          value={formData.company_code}
                          onChange={handleChange}
                          className="w-60 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        />
                      </div>
                      <div className="flex items-center">
                        <label
                          htmlFor="fiscal_year"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Fiscal Year
                        </label>
                        <input
                          type="text"
                          id="fiscal_year"
                          name="fiscal_year"
                          value={formData.fiscal_year}
                          onChange={handleChange}
                          className="w-60 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        />
                      </div>
                      <div className="flex items-center">
                        <label
                          htmlFor="gl_account"
                          className="w-64 text-left text-xs font-medium"
                        >
                          G/L Account
                        </label>
                        <input
                          type="text"
                          id="gl_account"
                          name="gl_account"
                          value={formData.gl_account}
                          onChange={handleChange}
                          className="w-60 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        />
                      </div>
                      <div className="flex items-center">
                        <label
                          htmlFor="period_range"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Period Range
                        </label>
                        <input
                          type="text"
                          id="period_range"
                          name="period_range"
                          value={formData.period_range}
                          onChange={handleChange}
                          className="w-60 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        />
                      </div>
                      <div className="flex items-center">
                        <label
                          htmlFor="currency"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Currency
                        </label>
                        <input
                          type="text"
                          id="currency"
                          name="currency"
                          value={formData.currency}
                          onChange={handleChange}
                          className="w-60 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        />
                      </div>

                      <div className="flex items-center">
                        <label
                          htmlFor="balance_type"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Balance Type
                        </label>
                        <input
                          type="text"
                          id="balance_type"
                          name="balance_type"
                          value={formData.balance_type}
                          onChange={handleChange}
                          className="w-60 h-5 border rounded px-1 py-0.5 text-xs bg-white"
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
                      Display G/L Balances allows users to view the current
                      balances of general ledger accounts over a specified
                      period. This includes opening balances, total debits,
                      total credits, and closing balances. It provides essential
                      insight into financial positions and supports audit,
                      reconciliation, and financial analysis processes.
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

export default DisplayGLBalances;
