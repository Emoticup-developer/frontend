import { useEffect, useState } from "react";
import { IoMdCreate, IoMdSave } from "react-icons/io";
import {
  MdCancelScheduleSend,
  MdOutlineError,
  MdOutlinePreview,
} from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import { IoIosPrint } from "react-icons/io";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import axios from "axios";

const DefineNumberRanges = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [yearOptions, setYearOptions] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.0.235:8000/api/years", { withCredentials: true })
      .then((res) => {
        setYearOptions(res.data); // assuming API returns an array of years
      })
      .catch((err) => {
        console.error("Failed to fetch years:", err);
      });
  }, []);

  const [lineItems, setLineItems] = useState(
    Array.from({ length: 1 }, () => ({
      field: "",
      suffix: "",
      start_from: "",
      end_to: "",
      year: "",
      description: "",
      is_blocked: false,
    }))
  );

  const addNewLine = () => {
    setLineItems([
      ...lineItems,
      {
        field: "",
        suffix: "",
        start_from: "",
        end_to: "",
        year: "",
        description: "",
        is_blocked: false,
      },
    ]);
  };

  const updateLineItem = (index, field, value) => {
    const updatedItems = [...lineItems];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };
    setLineItems(updatedItems);
  };

  const [formData, setFormData] = useState({
    field: "",
    suffix: "",
    start_from: "",
    end_to: "",
    year: "",
    description: "",
    is_blocked: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://192.168.0.235:8000/api/record_range",
        lineItems,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success("Number ranges submitted successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error posting data:", error);
      if (error.response && error.response.data) {
        toast.error(
          `Submission failed: ${error.response.data.message || "Bad Request"}`
        );
      } else {
        toast.error("Submission failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50 font-sans text-xs">
      <div className="flex-grow w-full bg-[#f0f4f8] text-sm font-sans flex flex-col">
        <form onSubmit={handleSubmit}>
          <div className="h-full w-full bg-gray-100 shadow-md border border-gray-300 rounded-sm flex flex-col">
            {/* Top Action Bar */}
            <div className="bg-gray-50 border-b border-gray-300 p-2">
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
                    onSubmit={handleSubmit}
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
                <div className="max-h-[230px] overflow-y-auto">
                  <table className="w-full min-w-[800px] table-fixed border-separate border-spacing-0">
                    <thead className="sticky top-0 z-10 bg-gray-50">
                      <tr>
                        <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600 min-w-[30px] w-[30px] whitespace-nowrap truncate">
                          Del
                        </th>
                        <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600 min-w-[40px] w-[40px] whitespace-nowrap truncate">
                          S. No
                        </th>
                        <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600 resize-x min-w-[180px] w-[180px] whitespace-nowrap truncate">
                          Field
                        </th>
                        <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600 min-w-[45px] w-[45px] whitespace-nowrap truncate">
                          Suffix
                        </th>
                        <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600 resize-x min-w-[70px] w-[70px] whitespace-nowrap truncate">
                          From
                        </th>
                        <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600 resize-x min-w-[70px] w-[70px] whitespace-nowrap truncate">
                          To
                        </th>
                        <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600 resize-x min-w-[50px] w-[50px] whitespace-nowrap truncate">
                          Year
                        </th>
                        <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600 resize-x min-w-[180px] w-[180px] whitespace-nowrap truncate">
                          Description
                        </th>
                        <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600 resize-x min-w-[50px] w-[50px] whitespace-nowrap truncate">
                          Blocked
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {lineItems.map((item, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-200 hover:bg-gray-50"
                        >
                          {/* Select Checkbox */}
                          <td className="p-1 text-center border border-gray-200">
                            <input
                              type="checkbox"
                              checked={selectedRows.includes(index)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedRows([...selectedRows, index]);
                                } else {
                                  setSelectedRows(
                                    selectedRows.filter((i) => i !== index)
                                  );
                                }
                              }}
                              className="w-4 h-4 border-gray-300 border rounded"
                            />
                          </td>

                          {/* Serial Number */}
                          <td className="p-1 text-center border border-gray-200">
                            {index + 1}
                          </td>

                          {/* Field */}
                          <td className="p-1 border border-gray-200">
                            <input
                              type="text"
                              name="field"
                              value={item.field}
                              onChange={(e) =>
                                updateLineItem(index, "field", e.target.value)
                              }
                              className="w-full border border-gray-300 h-5 rounded px-1 py-0.5 text-xs"
                            />
                          </td>

                          {/* Suffix */}
                          <td className="p-1 border border-gray-200">
                            <input
                              type="text"
                              name="suffix"
                              value={item.suffix}
                              onChange={(e) =>
                                updateLineItem(index, "suffix", e.target.value)
                              }
                              className="w-full border border-gray-300 h-5 rounded px-1 py-0.5 text-xs"
                            />
                          </td>

                          {/* From */}
                          <td className="p-1 border border-gray-200">
                            <input
                              type="text"
                              name="start_from"
                              value={item.start_from}
                              onChange={(e) =>
                                updateLineItem(
                                  index,
                                  "start_from",
                                  e.target.value
                                )
                              }
                              className="w-full border border-gray-300 h-5 rounded px-1 py-0.5 text-xs bg-white"
                            />
                          </td>

                          {/* To */}
                          <td className="p-1 border border-gray-200">
                            <input
                              type="text"
                              name="end_to"
                              value={item.end_to}
                              onChange={(e) =>
                                updateLineItem(index, "end_to", e.target.value)
                              }
                              className="w-full border border-gray-300 h-5 rounded px-1 py-0.5 text-xs bg-white"
                            />
                          </td>

                          {/* Year Dropdown */}
                          <td className="p-1 border border-gray-200">
                            <select
                              name="year"
                              value={item.year}
                              onChange={(e) =>
                                updateLineItem(index, "year", e.target.value)
                              }
                              className="w-full border border-gray-300 h-5 rounded px-1 py-0.5 text-xs bg-white"
                            >
                              <option value="">----</option>
                              {yearOptions.map((obj) => (
                                <option key={obj.year} value={obj.year}>
                                  {obj.year}
                                </option>
                              ))}
                            </select>
                          </td>

                          {/* Description */}
                          <td className="p-1 border border-gray-200">
                            <input
                              type="text"
                              name="description"
                              value={item.description}
                              onChange={(e) =>
                                updateLineItem(
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
                              className="w-full border border-gray-300 h-5 rounded px-1 py-0.5 text-xs"
                            />
                          </td>

                          {/* Blocked */}
                          <td className="p-1 text-center border border-gray-200">
                            <input
                              type="checkbox"
                              name="is_blocked"
                              checked={item.is_blocked}
                              onChange={(e) =>
                                updateLineItem(
                                  index,
                                  "is_blocked",
                                  e.target.checked
                                )
                              }
                              className="w-4 h-4 border-gray-300 border rounded"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Buttons */}
                <div className="flex justify-between items-center mt-2 px-4 py-2">
                  {/* Left Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={addNewLine}
                      className="flex items-center space-x-1 cursor-pointer hover:text-blue-600"
                    >
                      <FaPlusCircle className="text-sm" />
                      <span className="mr-2"> Add Line</span>
                    </button>
                    <button
                      onClick={() => {
                        if (selectedRows.length > 0) setShowDeleteModal(true);
                      }}
                      className="flex items-center space-x-1 cursor-pointer hover:text-blue-600"
                    >
                      <FaMinusCircle />
                      <span className="mr-2"> Delete Line</span>
                    </button>
                  </div>
                </div>

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                  <div className="fixed inset-0 bg-opacity-20 backdrop-blur-[2px] flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg text-center w-[300px]">
                      <div className="flex justify-center text-black text-4xl mb-2">
                        <MdOutlineError />
                      </div>
                      <p className="text-gray-700 font-semibold mb-4">
                        Are you sure you want to delete?
                      </p>
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => {
                            const updated = lineItems.filter(
                              (_, i) => !selectedRows.includes(i)
                            );
                            setLineItems(updated);
                            setSelectedRows([]);
                            setShowDeleteModal(false);
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setShowDeleteModal(false)}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-1 rounded"
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Information Section */}
                <div className="p-4">
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Information:
                  </label>
                  <div className="w-full border border-gray-300 rounded-sm bg-white p-2 text-xs leading-relaxed text-gray-800">
                    Number Ranges define the intervals for document numbers.
                    Each interval can be linked to specific document types and
                    can be set as year-dependent for flexibility in financial
                    postings across fiscal years.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DefineNumberRanges;
