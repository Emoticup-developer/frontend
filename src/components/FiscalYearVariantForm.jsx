import React, { useEffect, useState } from "react";
import { FaPlus, FaSave } from "react-icons/fa";
import axios from "axios";

const FiscalYearVariantForm = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://192.168.0.235:8000/api/fiscal_year")
      .then((res) => {
        setData(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching fiscal year data:", err);
        setLoading(false);
      });
  }, []);

  const handleTableChange = (index, field, value) => {
    const updated = [...data];
    updated[index][field] = value;
    setData(updated);
  };

  const handleCheckbox = (index, field) => {
    const updated = [...data];
    updated[index][field] = !updated[index][field];
    setData(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your save logic here
    console.log("Saving fiscal year variants", data);
  };

  return (
    <div>
      <div className="flex flex-col min-h-screen bg-[#e5f3fd] w-full font-sans text-xs">
        <div className="flex-grow w-full text-sm font-sans flex flex-col">
          <div className="h-full w-full flex flex-col">
            {/* 🔷 Top Header */}
            <div className="bg-blue-200/80 p-2">
              <h2 className="text-sm font-sans">Fiscal Year Variants</h2>
            </div>

            {/* ➕ New Entries Link */}
            <div className="bg-blue-100/80 p-1">
              <h2 className="text-xs font-sans">
                <a
                  href="/create-fiscal-year"
                  className="flex items-center border border-black bg-gray-50 w-[100px] ml-3 mt-1 rounded text-center px-2 py-0.5"
                >
                  <FaPlus className="mr-1 text-xs" />
                  <span className="text-xs">New Entries</span>
                </a>
              </h2>
            </div>

            {/* 📋 Table Layout */}
            <div className="overflow-y-auto max-h-[600px] p-4">
              <table className="w-full min-w-[800px] table-fixed border-collapse bg-white">
                <thead className="bg-[#dfe6ed] font-semibold">
                  <tr>
                    <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600 min-w-[50px] w-[50px] truncate">
                      FV
                    </th>
                    <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600 min-w-[150px] truncate">
                      Description
                    </th>
                    <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600 min-w-[110px] w-[110px] truncate">
                      Year Dependent
                    </th>
                    <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600 min-w-[110px] w-[110px] truncate">
                      Calendar Year
                    </th>
                    <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600 min-w-[110px] w-[110px] truncate">
                      Posting Periods
                    </th>
                    <th className="p-2 border-b border-gray-300 text-center text-xs font-bold text-gray-600 min-w-[110px] w-[110px] truncate">
                      Special Periods
                    </th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {loading ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-4 text-gray-500"
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : data.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center text-xs py-4 text-gray-400 font-medium"
                      >
                        No Fiscal Year available!
                      </td>
                    </tr>
                  ) : (
                    data.map((row, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-2 py-0.5 text-center border-r border-gray-200 font-mono">
                          {row.fv}
                        </td>
                        <td className="px-2 py-0.5 border-r border-gray-200">
                          {row.description}
                        </td>
                        <td className="px-2 py-0.5 text-center border-r border-gray-200">
                          <input
                            type="checkbox"
                            checked={row.yearDependent}
                            readOnly
                          />
                        </td>
                        <td className="px-2 py-0.5 text-center border-r border-gray-200">
                          <input
                            type="checkbox"
                            checked={row.calendarYear}
                            readOnly
                          />
                        </td>
                        <td className="px-2 py-0.5 text-center border-r border-gray-200">
                          {row.postingPeriods}
                        </td>
                        <td className="px-2 py-0.5 text-center border-r border-gray-200">
                          {row.specialPeriods}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {/* Footer Section */}
              <div className="flex items-center justify-between bg-white px-2 py-1 border-t border-gray-300 text-xs">
                <button className="bg-gray-200 px-2 py-0.5 border border-gray-400 shadow hover:bg-gray-300">
                  Position...
                </button>
                <span>Entry 1 of {data.length || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiscalYearVariantForm;
