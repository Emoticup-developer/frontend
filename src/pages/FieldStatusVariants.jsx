import { useState } from "react";
import { IoMdCreate, IoMdSave } from "react-icons/io";
import { MdCancelScheduleSend, MdOutlinePreview } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import { IoIosPrint } from "react-icons/io";

const FieldStatusVariants = () => {
  const [formData, setFormData] = useState({
    field_status_variant_id: "",
    field_status_groups: "",
    assign_company_code: "",
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
                  {/* Field Status Variant ID */}
                  <div className="flex items-center">
                    <label
                      htmlFor="field_status_variant_id"
                      className="w-56 text-left text-xs font-medium"
                    >
                      Field Status Variant ID
                    </label>
                    <input
                      type="text"
                      id="field_status_variant_id"
                      name="field_status_variant_id"
                      placeholder="e.g. 0001"
                      value={formData.field_status_variant_id}
                      onChange={handleChange}
                      className="w-16 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                    />
                  </div>

                  {/* Field Status Groups */}
                  <div className="flex items-center">
                    <label
                      htmlFor="field_status_groups"
                      className="w-56 text-left text-xs font-medium"
                    >
                      Field Status Groups
                    </label>
                    <input
                      type="text"
                      id="field_status_groups"
                      name="field_status_groups"
                      placeholder="Enter group names"
                      value={formData.field_status_groups}
                      onChange={handleChange}
                      className="w-60 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                    />
                  </div>

                  {/* Assign Company Code */}
                  <div className="flex items-center">
                    <label
                      htmlFor="assign_company_code"
                      className="w-56 text-left text-xs font-medium"
                    >
                      Assign Company Code
                    </label>
                    <input
                      type="text"
                      id="assign_company_code"
                      name="assign_company_code"
                      placeholder="1000"
                      value={formData.assign_company_code}
                      onChange={handleChange}
                      className="w-16 h-5 border rounded px-1 py-0.5 text-xs bg-white"
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

export default FieldStatusVariants;
