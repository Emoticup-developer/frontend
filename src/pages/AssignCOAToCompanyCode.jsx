import { useState } from "react";
import { IoMdCreate, IoMdSave } from "react-icons/io";
import { MdCancelScheduleSend, MdOutlinePreview } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import { IoIosPrint } from "react-icons/io";

const AssignCOAToCompanyCode = () => {
  const [formData, setFormData] = useState({
    companyCode: "",
    chartOfAccounts: "",
    yearDependentFiscal: false,
    groupChartOfAccounts: "",
    alternativeCoa: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace this with your actual API POST call
    console.log("Submitted data:", formData);
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
                      {/* Company Code */}
                      <div className="flex items-center">
                        <label
                          htmlFor="companyCode"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Company Code
                        </label>
                        <input
                          type="text"
                          id="companyCode"
                          name="companyCode"
                          placeholder="IN01"
                          value={formData.companyCode}
                          onChange={handleChange}
                          className="w-10 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        />
                      </div>

                      {/* Chart of Accounts */}
                      <div className="flex items-center">
                        <label
                          htmlFor="chartOfAccounts"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Chart of Accounts
                        </label>
                        <input
                          type="text"
                          id="chartOfAccounts"
                          name="chartOfAccounts"
                          placeholder="INCO"
                          value={formData.chartOfAccounts}
                          onChange={handleChange}
                          className="w-10 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        />
                      </div>

                      {/* Year-Dependent Fiscal Year Variant */}
                      <div className="flex items-center">
                        <label
                          htmlFor="yearDependentFiscal"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Yr-dependent fiscal year variant
                        </label>
                        <input
                          type="checkbox"
                          id="yearDependentFiscal"
                          name="yearDependentFiscal"
                          checked={formData.yearDependentFiscal}
                          onChange={handleChange}
                          className="w-4 h-4 border rounded text-blue-600 focus:ring-blue-500"
                        />
                      </div>

                      {/* Group Chart of Accounts */}
                      <div className="flex items-center">
                        <label
                          htmlFor="groupChartOfAccounts"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Group Chart of Accounts
                        </label>
                        <input
                          type="text"
                          id="groupChartOfAccounts"
                          name="groupChartOfAccounts"
                          placeholder="GR01"
                          value={formData.groupChartOfAccounts}
                          onChange={handleChange}
                          className="w-10 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        />
                      </div>

                      {/* Alternative CoA */}
                      <div className="flex items-center">
                        <label
                          htmlFor="alternativeCoa"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Alternative CoA
                        </label>
                        <input
                          type="text"
                          id="alternativeCoa"
                          name="alternativeCoa"
                          placeholder="ALT01"
                          value={formData.alternativeCoa}
                          onChange={handleChange}
                          className="w-10 h-5 border rounded px-1 py-0.5 text-xs bg-white"
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
                      This assignment links a company code with a specific Chart
                      of Accounts (CoA). It ensures consistent financial data
                      structure across the organization, supporting financial
                      reporting and compliance. The group and alternative CoAs
                      help align multiple codes or country-specific needs.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
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

              {/* Form Fields */}
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  {/* Company Code */}
                  <div className="flex items-center">
                    <label
                      htmlFor="companyCode"
                      className="w-56 text-left text-xs font-medium"
                    >
                      Company Code
                    </label>
                    <input
                      type="text"
                      id="companyCode"
                      name="companyCode"
                      placeholder="IN01"
                      value={formData.companyCode}
                      onChange={handleChange}
                      className="w-10 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                    />
                  </div>

                  {/* Chart of Accounts */}
                  <div className="flex items-center">
                    <label
                      htmlFor="chartOfAccounts"
                      className="w-56 text-left text-xs font-medium"
                    >
                      Chart of Accounts
                    </label>
                    <input
                      type="text"
                      id="chartOfAccounts"
                      name="chartOfAccounts"
                      placeholder="INCO"
                      value={formData.chartOfAccounts}
                      onChange={handleChange}
                      className="w-10 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                    />
                  </div>

                  {/* Year-Dependent Fiscal Year Variant */}
                  <div className="flex items-center">
                    <label
                      htmlFor="yearDependentFiscal"
                      className="w-56 text-left text-xs font-medium"
                    >
                      Yr-dependent fiscal year variant
                    </label>
                    <input
                      type="checkbox"
                      id="yearDependentFiscal"
                      name="yearDependentFiscal"
                      checked={formData.yearDependentFiscal}
                      onChange={handleChange}
                      className="w-4 h-4 border rounded text-blue-600 focus:ring-blue-500"
                    />
                  </div>

                  {/* Group Chart of Accounts */}
                  <div className="flex items-center">
                    <label
                      htmlFor="groupChartOfAccounts"
                      className="w-56 text-left text-xs font-medium"
                    >
                      Group Chart of Accounts
                    </label>
                    <input
                      type="text"
                      id="groupChartOfAccounts"
                      name="groupChartOfAccounts"
                      placeholder="GR01"
                      value={formData.groupChartOfAccounts}
                      onChange={handleChange}
                      className="w-10 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                    />
                  </div>

                  {/* Alternative CoA */}
                  <div className="flex items-center">
                    <label
                      htmlFor="alternativeCoa"
                      className="w-56 text-left text-xs font-medium"
                    >
                      Alternative CoA
                    </label>
                    <input
                      type="text"
                      id="alternativeCoa"
                      name="alternativeCoa"
                      placeholder="ALT01"
                      value={formData.alternativeCoa}
                      onChange={handleChange}
                      className="w-10 h-5 border rounded px-1 py-0.5 text-xs bg-white"
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
                  This assignment links a company code with a specific Chart of
                  Accounts (CoA). It ensures consistent financial data structure
                  across the organization, supporting financial reporting and
                  compliance. The group and alternative CoAs help align multiple
                  codes or country-specific needs.
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssignCOAToCompanyCode;
