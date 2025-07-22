import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditDeleteViewCompany = () => {
  const [formData, setFormData] = useState({
    company_code: "",
    company_name: "",
    company_name_short: "",
    street: "",
    po_box: "",
    postal_code: "",
    country: "",
    state: "",
    city: "",
    language: "",
    currency: "INR",
    description: "",
  });

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [companies, setCompanies] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${backendUrl}api/company`);
        setCompanies(res.data);
      } catch {
        toast.error("Failed to fetch company data.");
      }
    };
    fetchData();
  }, []);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditClick = (item) => {
    setEditingId(item.id);
    setEditData(item);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`${backendUrl}api/company/${editingId}`, editData, {
        withCredentials: true,
      });
      toast.success("Updated successfully!");
      const res = await axios.get(`${backendUrl}api/company`);
      setCompanies(res.data);
      setEditingId(null);
    } catch {
      toast.error("Update failed.");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this company?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(`${backendUrl}api/company/${id}/`, {
        withCredentials: true,
      });
      toast.success("Deleted successfully!");
      const res = await axios.get(`${backendUrl}api/company`);
      setCompanies(res.data);
    } catch {
      toast.error("Delete failed.");
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Action Bar */}
      <div className="mb-4 flex justify-between items-center bg-white p-2 rounded shadow text-sm">
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/create-company")}
            className="text-green-600 hover:underline"
          >
            + Create Company
          </button>
        </div>
      </div>

      {/* Company Table */}
      <div class="bg-white shadow-md rounded-md p-4 w-full max-w-[927px]">
        <div class="overflow-x-auto">
          <div class="max-h-[400px] overflow-y-auto">
            <table class="min-w-[1200px] w-full divide-y divide-gray-300 text-sm">
              <thead class="sticky top-0 bg-gray-100 z-10">
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
                {companies.map((company, index) => (
                  <tr
                    key={company.id || index}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="p-1 text-center border-r border-gray-200">
                      {index + 1}
                    </td>
                    {editingId === company.id ? (
                      <>
                        <td className="p-1 border-r border-gray-200">
                          <input
                            type="text"
                            name="company_code"
                            value={editData.company_code}
                            onChange={handleEditChange}
                            className="w-full border border-gray-300 h-5 rounded px-1 py-0.5"
                            maxLength={4}
                          />
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          <input
                            type="text"
                            name="company_name"
                            value={editData.company_name}
                            onChange={handleEditChange}
                            className="w-full border border-gray-300 h-5 rounded px-1 py-0.5"
                          />
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          <input
                            type="text"
                            name="company_name_short"
                            value={editData.company_name_short}
                            onChange={handleEditChange}
                            className="w-full border border-gray-300 h-5 rounded px-1 py-0.5"
                          />
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          <input
                            type="text"
                            name="street"
                            value={editData.street}
                            onChange={handleEditChange}
                            className="w-full border border-gray-300 h-5 rounded px-1 py-0.5"
                          />
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          <input
                            type="text"
                            name="po_box"
                            value={editData.po_box}
                            onChange={handleEditChange}
                            className="w-full border border-gray-300 h-5 rounded px-1 py-0.5"
                          />
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          <input
                            type="text"
                            name="postal_code"
                            value={editData.postal_code}
                            onChange={handleEditChange}
                            className="w-full border border-gray-300 h-5 rounded px-1 py-0.5"
                          />
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          <input
                            type="text"
                            name="country"
                            value={editData.country}
                            onChange={handleEditChange}
                            className="w-full border border-gray-300 h-5 rounded px-1 py-0.5"
                          />
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          <input
                            type="text"
                            name="state"
                            value={editData.state}
                            onChange={handleEditChange}
                            className="w-full border border-gray-300 h-5 rounded px-1 py-0.5"
                          />
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          <input
                            type="text"
                            name="city"
                            value={editData.city}
                            onChange={handleEditChange}
                            className="w-full border border-gray-300 h-5 rounded px-1 py-0.5"
                          />
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          <input
                            type="text"
                            name="language"
                            value={editData.language}
                            onChange={handleEditChange}
                            className="w-full border border-gray-300 h-5 rounded px-1 py-0.5"
                          />
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          <input
                            type="text"
                            name="currency"
                            value={editData.currency}
                            onChange={handleEditChange}
                            className="w-full border border-gray-300 h-5 rounded px-1 py-0.5"
                            maxLength={3}
                          />
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          <input
                            type="text"
                            name="description"
                            value={editData.description}
                            onChange={handleEditChange}
                            className="w-full border border-gray-300 h-5 rounded px-1 py-0.5"
                            maxLength={25}
                          />
                        </td>
                        <td className="flex p-1 text-center space-x-1">
                          <button
                            onClick={handleSaveEdit}
                            className="text-green-600 hover:underline"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="text-red-600 hover:underline"
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-1 border-r border-gray-200">
                          {company.company_code}
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          {company.company_name}
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          {company.company_name_short}
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          {company.street}
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          {company.po_box}
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          {company.postal_code}
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          {company.country}
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          {company.state}
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          {company.city}
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          {company.language}
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          {company.currency}
                        </td>
                        <td className="p-1 border-r border-gray-200">
                          {company.description}
                        </td>
                        <td className="flex p-1 text-center space-x-2">
                          <button
                            className="text-indigo-600 hover:underline"
                            onClick={() => handleEditClick(company)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-600 hover:underline"
                            onClick={() => handleDelete(company.id)}
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
