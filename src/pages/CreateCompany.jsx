import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { IoIosPrint, IoMdCreate, IoMdSave } from "react-icons/io";
import { MdCancelScheduleSend, MdOutlinePreview } from "react-icons/md";

const CreateCompany = () => {
  const [formData, setFormData] = useState({
    company: "",
    companyName: "",
    companyName2: "",
    street: "",
    poBox: "",
    postalCode: "",
    city: "",
    country: "",
    languageKey: "",
    currency: "",
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
        "http://192.168.0.235:8000/api/companies",
        formData,
        { withCredentials: true }
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("Company data saved successfully!");
        setFormData({
          company: "",
          companyName: "",
          companyName2: "",
          street: "",
          poBox: "",
          postalCode: "",
          city: "",
          country: "",
          languageKey: "",
          currency: "",
        });
      } else {
        toast.error("Failed to save company data!");
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
              {/* 🔷 Header Action Bar (non-scrollable) */}
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
                  <div className="p-4 space-y-4">
                    <div className="space-y-2">
                      {/* Company */}
                      <div className="flex items-center">
                        <label
                          htmlFor="company"
                          className="w-56 text-left text-xs font-medium"
                        >
                          Company
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-9 h-5 border rounded px-1 py-0.5 text-xs bg-white"
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
                          value={formData.companyName}
                          onChange={handleChange}
                          className="w-80 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        />
                      </div>

                      {/* Name of Company 2 */}
                      <div className="flex items-center">
                        <label
                          htmlFor="companyName2"
                          className="w-56 text-left text-xs font-medium"
                        >
                          Name of Company 2
                        </label>
                        <input
                          type="text"
                          id="companyName2"
                          name="companyName2"
                          value={formData.companyName2}
                          onChange={handleChange}
                          className="w-80 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        />
                      </div>

                      {/* Street */}
                      <div className="flex items-center">
                        <label
                          htmlFor="street"
                          className="w-56 text-left text-xs font-medium"
                        >
                          Street
                        </label>
                        <input
                          type="text"
                          id="street"
                          name="street"
                          value={formData.street}
                          onChange={handleChange}
                          className="w-60 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        />
                      </div>

                      {/* PO Box */}
                      <div className="flex items-center">
                        <label
                          htmlFor="poBox"
                          className="w-56 text-left text-xs font-medium"
                        >
                          PO Box
                        </label>
                        <input
                          type="text"
                          id="poBox"
                          name="poBox"
                          value={formData.poBox}
                          onChange={handleChange}
                          className="w-32 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        />
                      </div>

                      {/* Postal Code */}
                      <div className="flex items-center">
                        <label
                          htmlFor="postalCode"
                          className="w-56 text-left text-xs font-medium"
                        >
                          Postal Code
                        </label>
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          className="w-32 h-5 border rounded px-1 py-0.5 text-xs bg-white"
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
                          value={formData.city}
                          onChange={handleChange}
                          className="w-40 h-5 border rounded px-1 py-0.5 text-xs bg-white"
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
                          value={formData.country}
                          onChange={handleChange}
                          className="w-40 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                        />
                      </div>

                      {/* Language Key */}
                      <div className="flex items-center">
                        <label
                          htmlFor="languageKey"
                          className="w-56 text-left text-xs font-medium"
                        >
                          Language Key
                        </label>
                        <input
                          type="text"
                          id="languageKey"
                          name="languageKey"
                          value={formData.languageKey}
                          onChange={handleChange}
                          className="w-20 h-5 border rounded px-1 py-0.5 text-xs bg-white"
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
                          value={formData.currency}
                          onChange={handleChange}
                          className="w-20 h-5 border rounded px-1 py-0.5 text-xs bg-white"
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
                      Creating a company involves entering key organizational
                      details such as its legal name, address, country, and
                      language. This information forms the foundation of
                      enterprise structure within the system and is essential
                      for legal reporting, financial integration, and business
                      operations. Currency and language settings ensure accurate
                      communication and transaction processing across modules.
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

export default CreateCompany;
