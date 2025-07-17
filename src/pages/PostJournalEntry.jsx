import { useState } from "react";
import { IoMdCreate, IoMdSave } from "react-icons/io";
import { MdCancelScheduleSend, MdOutlinePreview } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import { IoIosPrint } from "react-icons/io";

const PostJournalEntry = () => {
  const [formData, setFormData] = useState({
    document_date: "",
    posting_date: "",
    document_type: "",
    gl_account: "",
    debit_credit_amount: "",
    cost_center: "",
    profit_center: "",
    text: "",
    reference_number: "",
    currency: "",
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
                          htmlFor="document_date"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Document Date
                        </label>
                        <input
                          type="date"
                          id="document_date"
                          name="document_date"
                          value={formData.document_date}
                          onChange={handleChange}
                          className="w-60 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        />
                      </div>
                      <div className="flex items-center">
                        <label
                          htmlFor="posting_date"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Posting Date
                        </label>
                        <input
                          type="date"
                          id="posting_date"
                          name="posting_date"
                          value={formData.posting_date}
                          onChange={handleChange}
                          className="w-60 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        />
                      </div>
                      <div className="flex items-center">
                        <label
                          htmlFor="document_type"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Document Type
                        </label>
                        <input
                          type="text"
                          id="document_type"
                          name="document_type"
                          value={formData.document_type}
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
                          htmlFor="debit_credit_amount"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Debit / Credit Amount
                        </label>
                        <input
                          type="text"
                          id="debit_credit_amount"
                          name="debit_credit_amount"
                          value={formData.debit_credit_amount}
                          onChange={handleChange}
                          className="w-60 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        />
                      </div>
                      <div className="flex items-center">
                        <label
                          htmlFor="cost_center"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Cost Center
                        </label>
                        <input
                          type="text"
                          id="cost_center"
                          name="cost_center"
                          value={formData.cost_center}
                          onChange={handleChange}
                          className="w-60 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        />
                      </div>

                      <div className="flex items-center">
                        <label
                          htmlFor="profit_center"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Profit Center
                        </label>
                        <input
                          type="text"
                          id="profit_center"
                          name="profit_center"
                          value={formData.profit_center}
                          onChange={handleChange}
                          className="w-60 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        />
                      </div>
                      <div className="flex items-center">
                        <label
                          htmlFor="text"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Text
                        </label>
                        <input
                          type="text"
                          id="text"
                          name="text"
                          value={formData.text}
                          onChange={handleChange}
                          className="w-60 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        />
                      </div>
                      <div className="flex items-center">
                        <label
                          htmlFor="reference_number"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Reference Number
                        </label>
                        <input
                          type="text"
                          id="reference_number"
                          name="reference_number"
                          value={formData.reference_number}
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
                    </div>
                  </div>

                  {/* Information Section */}
                  <div className="p-4">
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Information:
                    </label>
                    <div className="w-full border border-gray-300 rounded-sm bg-white p-2 text-xs leading-relaxed text-gray-800">
                      Posting a journal entry involves recording financial
                      transactions by debiting and crediting appropriate general
                      ledger accounts. Each entry must include key details such
                      as posting date, document type, amount, currency, and a
                      clear description. This ensures accurate financial
                      reporting and helps maintain the integrity of the
                      accounting records.
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

export default PostJournalEntry;
