import { useState } from "react";
import { IoMdCreate, IoMdSave } from "react-icons/io";
import { MdCancelScheduleSend, MdOutlinePreview } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import { IoIosPrint } from "react-icons/io";

const DefineCurrencyandExchangeRateTypes = () => {
  const [formData, setFormData] = useState({
    currency_type: "",
    exchange_rate_type: "",
    valid_from_date: "",
    source_target_currency: "",
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
                          htmlFor="currency_type"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Currency Type
                        </label>
                        <input
                          type="text"
                          id="currency_type"
                          name="currency_type"
                          value={formData.currency_type}
                          onChange={handleChange}
                          className="w-60 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        />
                      </div>
                      <div className="flex items-center">
                        <label
                          htmlFor="exchange_rate_type"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Exchange Rate Type
                        </label>
                        <input
                          type="text"
                          id="exchange_rate_type"
                          name="exchange_rate_type"
                          value={formData.exchange_rate_type}
                          onChange={handleChange}
                          className="w-60 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        />
                      </div>
                      <div className="flex items-center">
                        <label
                          htmlFor="valid_from_date"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Valid From Date
                        </label>
                        <input
                          type="text"
                          id="valid_from_date"
                          name="valid_from_date"
                          value={formData.valid_from_date}
                          onChange={handleChange}
                          className="w-60 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        />
                      </div>
                      <div className="flex items-center">
                        <label
                          htmlFor="source_target_currency"
                          className="w-64 text-left text-xs font-medium"
                        >
                          Source Target Currency
                        </label>
                        <input
                          type="text"
                          id="source_target_currency"
                          name="source_target_currency"
                          value={formData.source_target_currency}
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
                      Ledger Definition Fields are used to configure how
                      financial data is captured, stored, and reported in the
                      system. This includes parameters such as ledger type,
                      currency settings, fiscal year variant, and integration
                      indicators, which together define the operational scope
                      and reporting structure of each ledger.
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

export default DefineCurrencyandExchangeRateTypes;
