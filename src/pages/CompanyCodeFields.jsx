import { useState } from "react";
import { IoMdCreate, IoMdSave } from "react-icons/io";
import { MdCancelScheduleSend, MdOutlinePreview } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import { IoIosPrint } from "react-icons/io";

const CompanyCodeFields = () => {
  const [formData, setFormData] = useState({
    currency: "",
    tax_category: "",
    reconciliation_account: "",
    open_item_management: "",
    line_item_display: "",
    blocked_for_posting: "",
    field_status_group: "",
    interest_calculation: "",
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
                        placeholder="INR"
                      />
                    </div>
                    <div className="flex items-center">
                      <label
                        htmlFor="tax_category"
                        className="w-64 text-left text-xs font-medium"
                      >
                        Tax Category
                      </label>
                      <input
                        type="text"
                        id="tax_category"
                        name="tax_category"
                        value={formData.tax_category}
                        onChange={handleChange}
                        className="w-60 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        placeholder="TX1"
                      />
                    </div>
                    <div className="flex items-center">
                      <label
                        htmlFor="reconciliation_account"
                        className="w-64 text-left text-xs font-medium"
                      >
                        Reconciliation Account
                      </label>
                      <input
                        type="text"
                        id="reconciliation_account"
                        name="reconciliation_account"
                        value={formData.reconciliation_account}
                        onChange={handleChange}
                        className="w-60 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        placeholder="Yes / No"
                      />
                    </div>
                    <div className="flex items-center">
                      <label
                        htmlFor="open_item_management"
                        className="w-64 text-left text-xs font-medium"
                      >
                        Open Item Management
                      </label>
                      <input
                        type="text"
                        id="open_item_management"
                        name="open_item_management"
                        value={formData.open_item_management}
                        onChange={handleChange}
                        className="w-60 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        placeholder="(e.g. for bank, payables)"
                      />
                    </div>
                    <div className="flex items-center">
                      <label
                        htmlFor="line_item_display"
                        className="w-64 text-left text-xs font-medium"
                      >
                        Line Item Display
                      </label>
                      <input
                        type="text"
                        id="line_item_display"
                        name="line_item_display"
                        value={formData.line_item_display}
                        onChange={handleChange}
                        className="w-60 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                      />
                    </div>
                    <div className="flex items-center">
                      <label
                        htmlFor="blocked_for_posting"
                        className="w-64 text-left text-xs font-medium"
                      >
                        Blocked for Posting
                      </label>
                      <input
                        type="text"
                        id="blocked_for_posting"
                        name="blocked_for_posting"
                        value={formData.blocked_for_posting}
                        onChange={handleChange}
                        className="w-60 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                      />
                    </div>
                    <div className="flex items-center">
                      <label
                        htmlFor="field_status_group"
                        className="w-64 text-left text-xs font-medium"
                      >
                        Field Status Group
                      </label>
                      <input
                        type="text"
                        id="field_status_group"
                        name="field_status_group"
                        value={formData.field_status_group}
                        onChange={handleChange}
                        className="w-60 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                      />
                    </div>
                    <div className="flex items-center">
                      <label
                        htmlFor="interest_calculation"
                        className="w-64 text-left text-xs font-medium"
                      >
                        Interest Calculation
                      </label>
                      <input
                        type="text"
                        id="interest_calculation"
                        name="interest_calculation"
                        value={formData.interest_calculation}
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
                    G/L Account Master Control includes key fields such as
                    account number, descriptions, account group, and P&L account
                    type. These define the structure, classification, and
                    financial reporting behavior of each general ledger account
                    in the system.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyCodeFields;
