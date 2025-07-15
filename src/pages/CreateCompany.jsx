import { useState } from "react";
import { FaSave } from "react-icons/fa";

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
              <div className="bg-blue-200/80 p-2">
                <h2 className="text-sm font-sans">
                  New Entries: Details of Added Entries
                </h2>
              </div>

              <div className="bg-blue-100/80 p-1 flex items-center gap-2">
                <button
                  type="submit"
                  className="text-blue-600 py-0.5 text-md rounded"
                >
                  <FaSave className="ml-3" />
                </button>
              </div>

              <div className="p-4 space-y-4">
                {/* Top Section */}
                <div className="space-y-2">
                  {/* Company */}
                  <div className="flex items-center">
                    <label
                      htmlFor="company"
                      className="w-44 text-left text-xs font-medium"
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
                      className="w-44 text-left text-xs font-medium"
                    >
                      Company name
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

                  {/* Name of company 2 */}
                  <div className="flex items-center">
                    <label
                      htmlFor="companyName2"
                      className="w-44 text-left text-xs font-medium"
                    >
                      Name of company 2
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
                </div>

                {/* Detailed Information Section */}
                <div className="border border-blue-300 rounded-sm">
                  <div className="bg-blue-200/80 px-3 py-1.5 border-b border-blue-300">
                    <h3 className="text-sm font-sans">Detailed information</h3>
                  </div>
                  <div className="p-4 bg-blue-50/30 space-y-2">
                    {/* Street */}
                    <div className="flex items-center">
                      <label
                        htmlFor="street"
                        className="w-40 text-left text-xs font-medium"
                      >
                        Street
                      </label>
                      <input
                        type="text"
                        id="street"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        className="w-40 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                      />
                    </div>

                    {/* PO Box */}
                    <div className="flex items-center">
                      <label
                        htmlFor="poBox"
                        className="w-40 text-left text-xs font-medium"
                      >
                        PO Box
                      </label>
                      <input
                        type="text"
                        id="poBox"
                        name="poBox"
                        value={formData.poBox}
                        onChange={handleChange}
                        className="w-13 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                      />
                    </div>

                    {/* Postal Code */}
                    <div className="flex items-center">
                      <label
                        htmlFor="postalCode"
                        className="w-40 text-left text-xs font-medium"
                      >
                        Postal code
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="w-13 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                      />
                    </div>

                    {/* City */}
                    <div className="flex items-center">
                      <label
                        htmlFor="city"
                        className="w-40 text-left text-xs font-medium"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-20 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                      />
                    </div>

                    {/* Country */}
                    <div className="flex items-center">
                      <label
                        htmlFor="country"
                        className="w-40 text-left text-xs font-medium"
                      >
                        Country
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-20 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                      />
                    </div>

                    {/* Language Key */}
                    <div className="flex items-center">
                      <label
                        htmlFor="languageKey"
                        className="w-40 text-left text-xs font-medium"
                      >
                        Language Key
                      </label>
                      <input
                        type="text"
                        id="languageKey"
                        name="languageKey"
                        value={formData.languageKey}
                        onChange={handleChange}
                        className="w-6 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                      />
                    </div>

                    {/* Currency */}
                    <div className="flex items-center">
                      <label
                        htmlFor="currency"
                        className="w-40 text-left text-xs font-medium"
                      >
                        Currency
                      </label>
                      <input
                        type="text"
                        id="currency"
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        className="w-8 h-5 border rounded px-1 py-0.5 text-xs bg-white"
                      />
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
