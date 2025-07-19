import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function FieldTableForm() {
  const [rows, setRows] = useState([
    {
      selected: false,
      field: "",
      suffix: "",
      start_from: "",
      end_to: "",
      description: "",
      is_blocked: false,
      year: "",
    },
  ]);

  const [years, setYears] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await axios.get("http://192.168.0.235:8000/api/years");
        setYears(response.data);
      } catch (error) {
        console.error("Error fetching years:", error);
      }
    };
    fetchYears();
  }, []);

  const handleChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = type === "checkbox" ? checked : value;
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        selected: false,
        field: "",
        suffix: "",
        start_from: "",
        end_to: "",
        description: "",
        is_blocked: false,
        year: "",
      },
    ]);
  };

  const openDeleteModal = () => {
    const selected = rows.filter((row) => row.selected);
    if (selected.length === 0) {
      toast.info("Please select at least one row to delete.");
    } else {
      setShowDeleteModal(true);
    }
  };

  const confirmDelete = () => {
    const updatedRows = rows.filter((row) => !row.selected);
    setRows(updatedRows);
    setShowDeleteModal(false);
    toast.success("Selected rows deleted.");
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://192.168.0.235:8000/api/record_range",
        rows,
        {
          withCredentials: true,
        }
      );
      toast.success("Data submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Failed to submit data.");
    }
  };

  return (
    <div className="p-4 relative">
      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-6 w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-1 rounded"
              >
                Yes
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-black px-4 py-1 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <table className="table-auto border w-full text-xs">
        <thead>
          <tr className="bg-gray-200">
            <th>Del</th>
            <th>Field</th>
            <th>Suffix</th>
            <th>Start From</th>
            <th>End To</th>
            <th>Year</th>
            <th>Description</th>
            <th>Is Blocked</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="text-center">
                <input
                  type="checkbox"
                  name="selected"
                  checked={row.selected}
                  onChange={(e) => handleChange(index, e)}
                />
              </td>
              <td>
                <input
                  name="field"
                  value={row.field}
                  onChange={(e) => handleChange(index, e)}
                  className="border p-1 w-full"
                />
              </td>
              <td>
                <input
                  name="suffix"
                  value={row.suffix}
                  onChange={(e) => handleChange(index, e)}
                  className="border p-1 w-full"
                />
              </td>
              <td>
                <input
                  name="start_from"
                  value={row.start_from}
                  onChange={(e) => handleChange(index, e)}
                  className="border p-1 w-full"
                />
              </td>
              <td>
                <input
                  name="end_to"
                  value={row.end_to}
                  onChange={(e) => handleChange(index, e)}
                  className="border p-1 w-full"
                />
              </td>
              <td>
                <select
                  name="year"
                  value={row.year}
                  onChange={(e) => handleChange(index, e)}
                  className="border p-1 w-full"
                >
                  <option value="">----</option>
                  {years.map((yearObj) => (
                    <option key={yearObj.year} value={yearObj.year}>
                      {yearObj.year}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  name="description"
                  value={row.description}
                  onChange={(e) => handleChange(index, e)}
                  className="border p-1 w-full"
                />
              </td>
              <td className="text-center">
                <input
                  name="is_blocked"
                  type="checkbox"
                  checked={row.is_blocked}
                  onChange={(e) => handleChange(index, e)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Action Buttons */}
      <div className="mt-4 flex gap-4">
        <button
          onClick={addRow}
          className="bg-green-500 text-white px-4 py-1 rounded"
        >
          Add Row
        </button>
        <button
          onClick={openDeleteModal}
          className="bg-red-500 text-white px-4 py-1 rounded"
        >
          Delete Selected
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
