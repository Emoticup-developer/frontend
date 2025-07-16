import { useState } from "react";
import { IoMdCreate, IoMdSave } from "react-icons/io";
import { MdCancelScheduleSend, MdOutlinePreview } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import { IoIosPrint } from "react-icons/io";

const CreateCompanyCode = () => {
  const [formData, setFormData] = useState({
    companyCode: "",
    companyName: "",
    city: "",
    country: "",
    currency: "",
    language: "",
    chartOfAccounts: "",
    fiscalYearVariant: "",
    fieldStatusVariant: "",
    postingPeriodVariant: "",
    countrySettings: "",
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
    // Add your API call here
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
                      placeholder="1000"
                      value={formData.companyCode}
                      onChange={handleChange}
                      className="w-10 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                    />
                  </div>

                  {/* Company Name */}
                  <div className="flex items-center">
                    <label
                      htmlFor="companyName"
                      className="w-56 text-left text-xs font-medium"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      placeholder="Unitech Ltd."
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-60 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                    />
                  </div>

                  {/* City */}
                  <div className="flex items-center">
                    <label
                      htmlFor="city"
                      className="w-56 text-left text-xs font-medium"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="Bangalore"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-18 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                    />
                  </div>

                  {/* Country */}
                  <div className="flex items-center">
                    <label
                      htmlFor="country"
                      className="w-56 text-left text-xs font-medium"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      placeholder="IN"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-7 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                    />
                  </div>

                  {/* Currency */}
                  <div className="flex items-center">
                    <label
                      htmlFor="currency"
                      className="w-56 text-left text-xs font-medium"
                    >
                      Currency
                    </label>
                    <input
                      type="text"
                      id="currency"
                      name="currency"
                      placeholder="INR"
                      value={formData.currency}
                      onChange={handleChange}
                      className="w-9 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                    />
                  </div>

                  {/* Language */}
                  <div className="flex items-center">
                    <label
                      htmlFor="language"
                      className="w-56 text-left text-xs font-medium"
                    >
                      Language
                    </label>
                    <input
                      type="text"
                      id="language"
                      name="language"
                      placeholder="EN"
                      value={formData.language}
                      onChange={handleChange}
                      className="w-7 h-5 border rounded px-1 py-0.5 text-xs bg-white"
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
                      placeholder="INT1"
                      value={formData.chartOfAccounts}
                      onChange={handleChange}
                      className="w-9 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                    />
                  </div>

                  {/* Fiscal Year Variant */}
                  <div className="flex items-center">
                    <label
                      htmlFor="fiscalYearVariant"
                      className="w-56 text-left text-xs font-medium"
                    >
                      Fiscal Year Variant
                    </label>
                    <input
                      type="text"
                      id="fiscalYearVariant"
                      name="fiscalYearVariant"
                      placeholder="K4"
                      value={formData.fiscalYearVariant}
                      onChange={handleChange}
                      className="w-6 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                    />
                  </div>

                  {/* Field Status Variant */}
                  <div className="flex items-center">
                    <label
                      htmlFor="fieldStatusVariant"
                      className="w-56 text-left text-xs font-medium"
                    >
                      Field Status Variant
                    </label>
                    <input
                      type="text"
                      id="fieldStatusVariant"
                      name="fieldStatusVariant"
                      placeholder="0001"
                      value={formData.fieldStatusVariant}
                      onChange={handleChange}
                      className="w-10 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                    />
                  </div>

                  {/* Posting Period Variant */}
                  <div className="flex items-center">
                    <label
                      htmlFor="postingPeriodVariant"
                      className="w-56 text-left text-xs font-medium"
                    >
                      Posting Period Variant
                    </label>
                    <input
                      type="text"
                      id="postingPeriodVariant"
                      name="postingPeriodVariant"
                      placeholder="0001"
                      value={formData.postingPeriodVariant}
                      onChange={handleChange}
                      className="w-10 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                    />
                  </div>

                  {/* Country-Specific Settings */}
                  <div className="flex items-center">
                    <label
                      htmlFor="countrySettings"
                      className="w-56 text-left text-xs font-medium"
                    >
                      Country-Specific Settings
                    </label>
                    <input
                      type="text"
                      id="countrySettings"
                      name="countrySettings"
                      placeholder="Localization"
                      value={formData.countrySettings}
                      onChange={handleChange}
                      className="w-18 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Information Box */}
              <div className="p-4">
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Information:
                </label>
                <div className="w-full border border-gray-300 rounded-sm bg-white p-2 text-xs leading-relaxed text-gray-800">
                  This form assigns critical financial and organizational
                  configuration to a company code. These settings are essential
                  for financial reporting, legal compliance, and system
                  behavior. It includes localization, fiscal periods, and
                  account structures.
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCompanyCode;
