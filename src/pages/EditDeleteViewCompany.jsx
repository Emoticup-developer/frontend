import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditDeleteViewCompany = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [companies, setCompanies] = useState([]);
  const [editingCode, setEditingCode] = useState(null);
  const [formValues, setFormValues] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await axios.get(`${backendUrl}api/company`);
      setCompanies(res.data);
    } catch {
      toast.error("Failed to fetch company data.");
    }
  };

  const handleEditClick = (item) => {
    setEditingCode(item.company_code);
    setFormValues({ ...item });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`${backendUrl}api/company/${editingCode}`, formValues, {
        withCredentials: true,
      });
      toast.success("Company updated successfully");

      // Update local state instead of refetching
      setCompanies((prev) =>
        prev.map((comp) =>
          comp.company_code === editingCode ? { ...formValues } : comp
        )
      );

      setEditingCode(null);
      setFormValues({});
    } catch {
      toast.error("Failed to update company");
    }
  };

  const handleCancel = () => {
    setEditingCode(null);
    setFormValues({});
  };

  const handleDelete = async (company_code) => {
    const confirm = window.confirm("Are you sure you want to delete this?");
    if (!confirm) return;

    try {
      await axios.delete(`${backendUrl}api/company/${company_code}`, {
        withCredentials: true,
      });
      toast.success("Company deleted successfully");
      setCompanies((prev) =>
        prev.filter((item) => item.company_code !== company_code)
      );
    } catch {
      toast.error("Failed to delete company");
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Action Bar */}
      <div className="mb-4 flex justify-between items-center bg-white p-2 rounded shadow text-sm">
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/create-company")}
            className="text-gray-600 border border-black bg-gray-50 px-2 rounded-sm py-0.5 text-xs"
          >
            + Create Company
          </button>
        </div>
      </div>

      {/* Company Table */}
      <div className="bg-white shadow-md rounded-md p-4 w-full max-w-[927px]">
        <div className="overflow-x-auto">
          <div className="max-h-[400px] overflow-y-auto">
            <table className="min-w-[1200px] w-full divide-y divide-gray-300 text-sm">
              <thead className="sticky top-0 bg-gray-100 z-10">
                <tr>
                  <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600">
                    Sl No.
                  </th>
                  <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600">
                    Company Code
                  </th>
                  <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600">
                    Company Name
                  </th>
                  <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600">
                    Short Name
                  </th>
                  <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600">
                    Street
                  </th>
                  <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600">
                    PO Box
                  </th>
                  <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600">
                    Postal Code
                  </th>
                  <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600">
                    Country
                  </th>
                  <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600">
                    State
                  </th>
                  <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600">
                    City
                  </th>
                  <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600">
                    Language
                  </th>
                  <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600">
                    Currency
                  </th>
                  <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600">
                    Description
                  </th>
                  <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white text-xs">
                {companies.map((item, index) => (
                  <tr
                    key={item.company_code}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="p-1 text-center border-r border-gray-200">
                      {index + 1}
                    </td>
                    {editingCode === item.company_code ? (
                      <>
                        <td className="p-1 border-r border-gray-200">
                          <input
                            type="text"
                            name="company_code"
                            value={formValues.company_code}
                            onChange={handleChange}
                            className="w-full border border-gray-300 h-5 rounded px-1 py-0.5"
                            maxLength={4}
                          />
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          <input
                            type="text"
                            name="company_name"
                            value={formValues.company_name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 h-5 rounded px-1 py-0.5"
                          />
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          <input
                            type="text"
                            name="company_name_short"
                            value={formValues.company_name_short}
                            onChange={handleChange}
                            className="w-full border border-gray-300 h-5 rounded px-1 py-0.5"
                          />
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          <input
                            type="text"
                            name="street"
                            value={formValues.street}
                            onChange={handleChange}
                            className="w-full border border-gray-300 h-5 rounded px-1 py-0.5"
                          />
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          <input
                            type="text"
                            name="po_box"
                            value={formValues.po_box}
                            onChange={handleChange}
                            className="w-full border border-gray-300 h-5 rounded px-1 py-0.5"
                          />
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          <input
                            type="text"
                            name="postal_code"
                            value={formValues.postal_code}
                            onChange={handleChange}
                            className="w-full border border-gray-300 h-5 rounded px-1 py-0.5"
                          />
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          <input
                            type="text"
                            name="country"
                            value={formValues.country}
                            onChange={handleChange}
                            className="w-full border border-gray-300 h-5 rounded px-1 py-0.5"
                          />
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          <input
                            type="text"
                            name="state"
                            value={formValues.state}
                            onChange={handleChange}
                            className="w-full border border-gray-300 h-5 rounded px-1 py-0.5"
                          />
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          <input
                            type="text"
                            name="city"
                            value={formValues.city}
                            onChange={handleChange}
                            className="w-full border border-gray-300 h-5 rounded px-1 py-0.5"
                          />
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          <input
                            type="text"
                            name="language"
                            value={formValues.language}
                            onChange={handleChange}
                            className="w-full border border-gray-300 h-5 rounded px-1 py-0.5"
                          />
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          <input
                            type="text"
                            name="currency"
                            value={formValues.currency}
                            onChange={handleChange}
                            className="w-full border border-gray-300 h-5 rounded px-1 py-0.5"
                            maxLength={3}
                          />
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          <input
                            type="text"
                            name="description"
                            value={formValues.description}
                            onChange={handleChange}
                            className="w-full border border-gray-300 h-5 rounded px-1 py-0.5"
                            maxLength={25}
                          />
                        </td>
                        <td className="flex p-1 text-center space-x-1">
                          <button
                            onClick={handleSave}
                            className="text-green-600 hover:underline"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            className="text-red-600 hover:underline"
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-1 border-r border-gray-200">
                          {item.company_code}
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          {item.company_name}
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          {item.company_name_short}
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          {item.street}
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          {item.po_box}
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          {item.postal_code}
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          {item.country}
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          {item.state}
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          {item.city}
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          {item.language}
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          {item.currency}
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          {item.description}
                        </td>
                        <td className="flex p-1 text-center space-x-2">
                          <button
                            className="text-indigo-600 hover:underline"
                            onClick={() => handleEditClick(item)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-600 hover:underline"
                            onClick={() => handleDelete(item.company_code)}
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
                {companies.length === 0 && (
                  <tr>
                    <td colSpan="14" className="text-center p-4 text-gray-500">
                      No companies found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDeleteViewCompany;
