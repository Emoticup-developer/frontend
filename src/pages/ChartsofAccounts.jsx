import { useState } from "react";
import { FaEdit, FaPaperPlane, FaRegBookmark } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { RiSideBarFill } from "react-icons/ri";
import { FiChevronDown } from "react-icons/fi";
import { IoIosPrint, IoMdCreate, IoMdSave } from "react-icons/io";
import { MdCancelScheduleSend, MdOutlinePreview } from "react-icons/md";
import { BsCreditCardFill } from "react-icons/bs";

const ChartsofAccounts = () => {
  const [formData, setFormData] = useState({
    chartOfAccounts: "",
    name: "",
    language: "",
    glLength: "",
    groupChartOfAccounts: "",
    blockIndicator: "",
    manualCostElements: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://192.168.0.235:8000/api/chartsofaccounts",
        formData,
        { withCredentials: true }
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("Chart of Accounts saved successfully!");
        setFormData({
          chartOfAccounts: "",
          name: "",
          language: "",
          glLength: "",
          groupChartOfAccounts: "",
          blockIndicator: "",
          manualCostElements: "",
        });
      } else {
        toast.error("Failed to save Chart of Accounts!");
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error("An error occurred while saving data!");
    }
  };

  return (
    <div>
      <div className="flex flex-col min-h-screen w-full bg-gray-50 font-sans text-xs">
        <div className="flex-grow w-full bg-[#f0f4f8] text-sm font-sans flex flex-col">
          <form onSubmit={handleSubmit}>
            <div className="h-full w-full bg-gray-100 shadow-md border border-gray-300 rounded-sm flex flex-col">
              <div className="bg-gray-50 p-2">
                <div className="flex justify-between space-x-6 text-sm text-gray-700">
                  <div className="flex px-2">
                    <button className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
                      <IoMdCreate />
                      <span className="mr-5">Edit</span>
                    </button>
                    <button className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
                      <IoMdSave />
                      <span className="mr-5">Save</span>
                    </button>
                    <button className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
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
                      value={formData.chartOfAccounts}
                      placeholder="IN01"
                      onChange={handleChange}
                      className="w-10 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                    />
                  </div>

                  {/* Name */}
                  <div className="flex items-center">
                    <label
                      htmlFor="name"
                      className="w-56 text-left text-xs font-medium"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="India Local CoA"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-80 h-5 border rounded px-1 py-0.5 text-xs bg-white"
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

                  {/* Length of G/L Account Number */}
                  <div className="flex items-center">
                    <label
                      htmlFor="glLength"
                      className="w-56 text-left text-xs font-medium"
                    >
                      Length of G/L Account Number
                    </label>
                    <input
                      type="text"
                      id="glLength"
                      name="glLength"
                      placeholder="0"
                      value={formData.glLength}
                      onChange={handleChange}
                      className="w-4 h-5 border rounded px-1 py-0.5 text-xs bg-white"
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

                  {/* Block Indicator */}
                  <div className="flex items-center">
                    <label
                      htmlFor="blockIndicator"
                      className="w-56 text-left text-xs font-medium"
                    >
                      Block Indicator
                    </label>
                    <input
                      type="checkbox"
                      id="blockIndicator"
                      name="blockIndicator"
                      checked={formData.blockIndicator === "Yes"}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          blockIndicator: e.target.checked ? "Yes" : "No",
                        }))
                      }
                      className="w-4 h-4 border rounded text-blue-600 focus:ring-blue-500"
                    />
                  </div>

                  {/* Manual Creation of Cost Elements */}
                  <div className="flex items-center">
                    <label
                      htmlFor="manualCostElements"
                      className="w-56 text-left text-xs font-medium"
                    >
                      Manual Creation of Cost Elements
                    </label>
                    <select
                      id="manualCostElements"
                      name="manualCostElements"
                      value={formData.manualCostElements}
                      onChange={handleChange}
                      className="w-18 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                    >
                      <option value="">--------</option>
                      <option value="Manual">Manual</option>
                      <option value="Auto">Auto</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Information:
                </label>
                <div className="w-full border border-gray-300 rounded-sm bg-white p-2 text-xs leading-relaxed text-gray-800">
                  A Chart of Accounts (CoA) is a structured list of all general
                  ledger (G/L) accounts used by a company to record financial
                  transactions. It serves as the backbone of the accounting
                  system, enabling consistent classification of revenues,
                  expenses, assets, liabilities, and equity.
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChartsofAccounts;
