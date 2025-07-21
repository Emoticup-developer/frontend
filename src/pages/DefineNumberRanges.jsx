import { useEffect, useState } from "react";
import { IoMdSave } from "react-icons/io";
import { MdCancelScheduleSend, MdOutlinePreview } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";
import { IoIosPrint } from "react-icons/io";

const DefineNumberRanges = () => {
  const [formData, setFormData] = useState({
    field: "",
    suffix: "",
    start_from: "",
    end_to: "",
    year: "",
    description: "",
    is_blocked: false,
  });

  const [years, setYears] = useState([]);
  const [recordRanges, setRecordRanges] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [yearsRes, recordsRes] = await Promise.all([
          axios.get("http://192.168.0.237:8000/api/years"),
          axios.get("http://192.168.0.237:8000/api/record_range"),
        ]);
        setYears(yearsRes.data);
        setRecordRanges(recordsRes.data);
      } catch {
        toast.error("Failed to fetch data.");
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCancel = async (e) => {
    e.preventDefault();

    setFormData({
      field: "",
      suffix: "",
      start_from: "",
      end_to: "",
      year: "",
      description: "",
      is_blocked: false,
    });
  };

  const handleEditClick = (item) => {
    setEditingId(item.id);
    setEditData(item);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `http://192.168.0.237:8000/api/record_range/${editingId}`,
        editData,
        {
          withCredentials: true,
        }
      );
      toast.success("Updated successfully!");
      const res = await axios.get("http://192.168.0.237:8000/api/record_range");
      setRecordRanges(res.data);
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
      "Are you sure you want to delete this entry?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(`http://192.168.0.237:8000/api/record_range/${id}`, {
        withCredentials: true,
      });
      toast.success("Deleted successfully!");
      const res = await axios.get("http://192.168.0.237:8000/api/record_range");
      setRecordRanges(res.data);
    } catch {
      toast.error("Delete failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://192.168.0.237:8000/api/record_range", formData, {
        withCredentials: true,
      });
      toast.success("Created successfully!");
      setFormData({
        field: "",
        suffix: "",
        start_from: "",
        end_to: "",
        year: "",
        description: "",
        is_blocked: false,
      });
      const res = await axios.get("http://192.168.0.237:8000/api/record_range");
      setRecordRanges(res.data);
    } catch {
      toast.error("Create failed.");
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Action Bar */}
      <div className="mb-4 flex justify-between items-center bg-white p-2 rounded shadow text-sm">
        <div className="flex space-x-4">
          <button
            type="submit"
            form="rangeForm"
            className="flex items-center cursor-pointer space-x-1 text-green-600"
          >
            <IoMdSave />
            <span>Create</span>
          </button>
          <button
            className="flex items-center cursor-pointer space-x-1 text-gray-600"
            onClick={handleCancel}
          >
            <MdCancelScheduleSend />
            <span>Cancel</span>
          </button>
          <button className="flex items-center cursor-pointer space-x-1 text-indigo-600">
            <MdOutlinePreview />
            <span>Review</span>
          </button>
        </div>
        <div className="flex space-x-2">
          <IoIosPrint className="cursor-pointer" />
          <a href="/home" className="text-blue-500">
            Exit
          </a>
        </div>
      </div>

      {/* Input Row for Adding or Editing a Range */}
      <form id="rangeForm" onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-2 mb-4 bg-white p-4 rounded shadow text-xs">
          {/* Field Name Input */}
          <input
            type="text"
            name="field"
            placeholder="Field"
            value={formData.field}
            onChange={handleChange}
            className="w-40 h-5 border rounded px-1 py-0.5 bg-white"
          />

          {/* Suffix Input */}
          <input
            type="text"
            name="suffix"
            placeholder="Suffix"
            value={formData.suffix}
            maxLength={4}
            onChange={handleChange}
            className="w-20 h-5 border rounded px-1 py-0.5 bg-white"
          />

          {/* Start From Input */}
          <input
            type="text"
            name="start_from"
            placeholder="Start From"
            value={formData.start_from}
            maxLength={12}
            onChange={handleChange}
            className="w-24 h-5 border rounded px-1 py-0.5 bg-white"
          />

          {/* End To Input */}
          <input
            type="text"
            name="end_to"
            placeholder="End To"
            value={formData.end_to}
            maxLength={12}
            onChange={handleChange}
            className="w-24 h-5 border rounded px-1 py-0.5 bg-white"
          />

          {/* Dropdown for Year Selection (fetched from API) */}
          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-24 h-5 border rounded px-1 py-0.5 bg-white"
          >
            <option value="">Year</option>
            {years.map((y) => (
              <option key={y.year} value={y.year}>
                {y.year}
              </option>
            ))}
          </select>

          {/* Description Field: Max 25 characters, free text input */}
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            maxLength={25}
            className="w-40 h-5 border rounded px-1 py-0.5 bg-white"
          />

          {/* Blocked Checkbox */}
          <label className="flex items-center space-x-1 text-gray-700">
            <input
              type="checkbox"
              name="is_blocked"
              checked={formData.is_blocked}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span>Blocked</span>
          </label>
        </div>
      </form>

      <div className="overflow-y-auto max-h-[290px]">
        <table className="w-full min-w-[800px] table-fixed border-collapse">
          <thead className="sticky top-0 z-10 bg-gray-50">
            <tr>
              <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600 overflow-hidden min-w-[50px] w-[50px] whitespace-nowrap truncate">
                Sl No.
              </th>
              <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600 resize-x overflow-hidden min-w-[150px] w-[150px] whitespace-nowrap truncate">
                Field
              </th>
              <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600 overflow-hidden min-w-[45px] w-[45px] whitespace-nowrap truncate">
                Suffix
              </th>
              <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600 resize-x overflow-hidden min-w-[80px] w-[80px] whitespace-nowrap truncate">
                Start
              </th>
              <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600 resize-x overflow-hidden min-w-[80px] w-[80px] whitespace-nowrap truncate">
                End
              </th>
              <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600 overflow-hidden min-w-[40px] w-[40px] whitespace-nowrap truncate">
                Year
              </th>
              <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600 resize-x overflow-hidden min-w-[180px] w-[180px] whitespace-nowrap truncate">
                Description
              </th>
              <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600 overflow-hidden min-w-[55px] w-[55px] whitespace-nowrap truncate">
                Blocked
              </th>
              <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600 overflow-hidden min-w-[65px] w-[65px] whitespace-nowrap truncate">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white text-xs">
            {recordRanges.map((item, index) => (
              <tr
                key={item.id || index}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="p-1 text-center border-r border-gray-200">
                  {index + 1}
                </td>
                {editingId === item.id ? (
                  <>
                    <td className="p-1 border-r border-gray-200">
                      <input
                        type="text"
                        name="field"
                        value={editData.field}
                        onChange={handleEditChange}
                        className="w-full border border-gray-300 h-5 rounded px-1 py-0.5"
                      />
                    </td>
                    <td className="p-1 border-r border-gray-200">
                      <input
                        type="text"
                        name="suffix"
                        value={editData.suffix}
                        maxLength={4}
                        onChange={handleEditChange}
                        className="w-full border border-gray-300 h-5 rounded px-1 py-0.5"
                      />
                    </td>
                    <td className="p-1 border-r border-gray-200">
                      <input
                        type="text"
                        name="start_from"
                        value={editData.start_from}
                        maxLength={12}
                        onChange={handleEditChange}
                        className="w-full border border-gray-300 h-5 rounded px-1 py-0.5"
                      />
                    </td>
                    <td className="p-1 border-r border-gray-200">
                      <input
                        type="text"
                        name="end_to"
                        value={editData.end_to}
                        onChange={handleEditChange}
                        maxLength={12}
                        className="w-full border border-gray-300 h-5 rounded px-1 py-0.5"
                      />
                    </td>
                    <td className="p-1 border-r border-gray-200">
                      <select
                        name="year"
                        value={editData.year}
                        onChange={handleEditChange}
                        className="w-full border border-gray-300 h-5 rounded px-1 py-0.5"
                      >
                        <option value="">----</option>
                        {years.map((y) => (
                          <option key={y.year} value={y.year}>
                            {y.year}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-1 border-r border-gray-200">
                      <input
                        type="text"
                        name="description"
                        value={editData.description}
                        onChange={handleEditChange}
                        maxLength={25}
                        className="w-full border border-gray-300 h-5 rounded px-1 py-0.5"
                      />
                    </td>
                    <td className="p-1 text-center border-r border-gray-200">
                      <input
                        type="checkbox"
                        name="is_blocked"
                        checked={editData.is_blocked}
                        onChange={handleEditChange}
                        className="w-4 h-4 border border-gray-300 rounded"
                      />
                    </td>
                    <td className="p-1 text-center space-x-1">
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
                      {item.field}
                    </td>
                    <td className="p-1 border-r border-gray-200">
                      {item.suffix}
                    </td>
                    <td className="p-1 border-r border-gray-200">
                      {item.start_from}
                    </td>
                    <td className="p-1 border-r border-gray-200">
                      {item.end_to}
                    </td>
                    <td className="p-1 border-r border-gray-200">
                      {item.year}
                    </td>
                    <td className="p-1 border-r border-gray-200">
                      {item.description}
                    </td>
                    <td className="p-1 text-center border-r border-gray-200">
                      <input
                        type="checkbox"
                        checked={item.is_blocked}
                        onChange={(e) =>
                          handleCheckboxChange(index, e.target.checked)
                        }
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </td>

                    <td className="p-1 text-center space-x-2">
                      <button
                        className="text-indigo-600 hover:underline"
                        onClick={() => handleEditClick(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
            {recordRanges.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center p-4 text-gray-500">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DefineNumberRanges;
