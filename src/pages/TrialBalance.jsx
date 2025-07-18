import { useState } from "react";
import { IoMdCreate, IoMdSave } from "react-icons/io";
import { MdCancelScheduleSend, MdOutlinePreview } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import { IoIosPrint } from "react-icons/io";

const TrialBalance = () => {
  const [formData, setFormData] = useState({
    company_code: "",
    fiscal_year: "",
    period_from_to: "",
    ledger: "",
    group_gl_account: "",
    output_format: "",
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
                          htmlFor="period_from_to"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Period From / To
                        </label>
                        <input
                          type="text"
                          id="period_from_to"
                          name="period_from_to"
                          value={formData.period_from_to}
                          onChange={handleChange}
                          className="w-60 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        />
                      </div>
                      <div className="flex items-center">
                        <label
                          htmlFor="ledger"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Ledger
                        </label>
                        <input
                          type="text"
                          id="ledger"
                          name="ledger"
                          value={formData.ledger}
                          onChange={handleChange}
                          className="w-60 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        />
                      </div>
                      <div className="flex items-center">
                        <label
                          htmlFor="group_gl_account"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Group G/L Account
                        </label>
                        <input
                          type="text"
                          id="group_gl_account"
                          name="group_gl_account"
                          value={formData.group_gl_account}
                          onChange={handleChange}
                          className="w-60 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        />
                      </div>
                      <div className="flex items-center">
                        <label
                          htmlFor="output_format"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Output Format
                        </label>
                        <input
                          type="text"
                          id="output_format"
                          name="output_format"
                          value={formData.output_format}
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
                      Display Line Items enables users to view individual
                      postings made to G/L accounts within a selected time
                      frame. It shows detailed entries including document
                      number, posting date, amount, and description. This
                      function is vital for transaction-level analysis,
                      troubleshooting discrepancies, and ensuring transparency
                      in financial reporting.
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

export default TrialBalance;
