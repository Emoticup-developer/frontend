import { useState } from "react";
import axios from "axios";

export default function FieldTableForm() {
  const [rows, setRows] = useState([
    {
      field: "",
      suffix: "",
      start_from: "",
      end_to: "",
      description: "",
      is_blocked: false,
      year: 2025,
    },
  ]);

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
        field: "",
        suffix: "",
        start_from: "",
        end_to: "",
        description: "",
        is_blocked: false,
        year: 2025,
      },
    ]);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://192.168.0.235:8000/api/record_range",
        rows
      );
      console.log("Data saved:", response.data);
      alert("Data submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="p-4">
      <table className="table-auto border w-full text-xs">
        <thead>
          <tr className="bg-gray-200">
            <th>Field</th>
            <th>Suffix</th>
            <th>Start From</th>
            <th>End To</th>
            <th>Description</th>
            <th>Is Blocked</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
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
              <td>
                <input
                  name="year"
                  type="number"
                  value={row.year}
                  onChange={(e) => handleChange(index, e)}
                  className="border p-1 w-full"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex gap-4">
        <button
          onClick={addRow}
          className="bg-green-500 text-white px-4 py-1 rounded"
        >
          Add Row
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
