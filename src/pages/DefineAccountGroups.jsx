import { useState } from "react";
import { IoMdCreate, IoMdSave } from "react-icons/io";
import { MdCancelScheduleSend, MdOutlinePreview } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import { IoIosPrint } from "react-icons/io";

const DefineAccountGroups = () => {
  const [formData, setFormData] = useState({
    chart_of_accounts: "",
    account_group: "",
    name: "",
    number_range: "",
    field_status_group: "",
    blocked: false, // changed from string to boolean
  });

  const payload = {
    ...formData,
    blocked: formData.blocked ? "Yes" : "No",
  };

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
                      {/* Chart of Accounts */}
                      <div className="flex items-center">
                        <label className="w-64 text-left text-xs font-medium">
                          Chart of Accounts
                        </label>
                        <input
                          type="text"
                          name="chart_of_accounts"
                          placeholder="IN01"
                          value={formData.chart_of_accounts}
                          onChange={handleChange}
                          className="w-10 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        />
                      </div>

                      {/* Account Group */}
                      <div className="flex items-center">
                        <label className="w-64 text-left text-xs font-medium">
                          Account Group
                        </label>
                        <input
                          type="text"
                          name="account_group"
                          placeholder="ASST"
                          value={formData.account_group}
                          onChange={handleChange}
                          className="w-10 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        />
                      </div>

                      {/* Name (Dropdown) */}
                      <div className="flex items-center">
                        <label className="w-64 text-left text-xs font-medium">
                          Name
                        </label>
                        <select
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-48 h-5 border rounded px-1 text-xs bg-white"
                        >
                          <option value="">------</option>
                          <option value="Assets">Assets</option>
                          <option value="Liabilities">Liabilities</option>
                          <option value="Revenues">Revenues</option>
                          <option value="Expenses">Expenses</option>
                          <option value="Bank Accounts">Bank Accounts</option>
                          <option value="Cash Accounts">Cash Accounts</option>
                          <option value="Equity Accounts">
                            Equity Accounts
                          </option>
                          <option value="Tax Accounts">Tax Accounts</option>
                          <option value="Adjustment Accounts">
                            Adjustment Accounts
                          </option>
                          <option value="Inventory/Stock Accounts">
                            Inventory/Stock Accounts
                          </option>
                          <option
                            value="Fixed Asset
                        Clearing Accounts"
                          >
                            Fixed Asset Clearing Accounts
                          </option>
                        </select>
                      </div>

                      {/* Number Range */}
                      <div className="flex items-center">
                        <label className="w-64 text-left text-xs font-medium">
                          Number Range
                        </label>
                        <input
                          type="text"
                          name="number_range"
                          placeholder="100000-199999"
                          value={formData.number_range}
                          onChange={handleChange}
                          className="w-40 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        />
                      </div>

                      {/* Field Status Group */}
                      <div className="flex items-center">
                        <label className="w-64 text-left text-xs font-medium">
                          Field Status Group
                        </label>
                        <input
                          type="text"
                          name="field_status_group"
                          placeholder="OBC4"
                          value={formData.field_status_group}
                          onChange={handleChange}
                          className="w-16 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        />
                      </div>

                      {/* Blocked (Checkbox) */}
                      <div className="flex items-center">
                        <label className="w-64 text-left text-xs font-medium">
                          Blocked
                        </label>
                        <input
                          type="checkbox"
                          name="blocked"
                          checked={formData.blocked}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              blocked: e.target.checked,
                            }))
                          }
                          className="w-4 h-4 border rounded text-blue-600 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="p-4">
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Information:
                    </label>
                    <div className="w-full border border-gray-300 rounded-sm bg-white p-2 text-xs leading-relaxed text-gray-800">
                      Defining account groups allows classification of G/L
                      accounts, assigns number ranges, and controls field status
                      during their creation.
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

export default DefineAccountGroups;
