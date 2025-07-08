import React from "react";

const GLAccountDocument = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans">
      <div className="bg-white rounded-lg shadow-md max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-xl font-bold border-b pb-2 mb-4">
          Enter G/L Account Document:{" "}
          <span className="text-blue-600">Company Code 8079</span>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 border-b mb-4">
          <button className="px-4 py-2 font-semibold text-blue-600 border-b-2 border-blue-600">
            Basic data
          </button>
          <button className="px-4 py-2 text-gray-600 hover:text-blue-600">
            Details
          </button>
        </div>

        {/* Top Section */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium">Document Date</label>
            <input
              type="date"
              defaultValue="2007-01-02"
              className="w-full border px-2 py-1 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Posting Date</label>
            <input
              type="date"
              defaultValue="2007-01-02"
              className="w-full border px-2 py-1 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Currency</label>
            <input
              type="text"
              value="USD"
              className="w-20 border px-2 py-1 rounded"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Reference</label>
            <input type="text" className="w-full border px-2 py-1 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Doc.Header Text</label>
            <input type="text" className="w-full border px-2 py-1 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Cross-CC no.</label>
            <input type="text" className="w-full border px-2 py-1 rounded" />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium">Company Code</label>
            <input
              type="text"
              value="8079   Cottonwood Dist., 8079 Red Bluff"
              className="w-full border px-2 py-1 rounded"
              readOnly
            />
          </div>

          {/* Amount Box */}
          <div className="border p-4 bg-gray-50 rounded">
            <div className="mb-4">
              <label className="block text-sm font-medium">Total deb.</label>
              <input
                type="text"
                value="0.00 USD"
                className="w-full border px-2 py-1 text-right rounded"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Total cred.</label>
              <input
                type="text"
                value="0.00 USD"
                className="w-full border px-2 py-1 text-right rounded"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto">
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-2 py-1">S. No.</th>
                <th className="border px-2 py-1">G/L acct</th>
                <th className="border px-2 py-1">Short Text</th>
                <th className="border px-2 py-1">D/C</th>
                <th className="border px-2 py-1">Amount in doc.curr.</th>
                <th className="border px-2 py-1">Loc.curr.amount</th>
                <th className="border px-2 py-1">Tax jurisdiction code</th>
                <th className="border px-2 py-1">Assignment no.</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, idx) => (
                <tr key={idx} className="bg-white">
                  <td className="border px-2 py-1 text-center">{idx + 1}</td>
                  <td className="border px-2 py-1">
                    <input className="w-full border px-1 py-0.5 rounded" />
                  </td>
                  <td className="border px-2 py-1">
                    <input className="w-full border px-1 py-0.5 rounded" />
                  </td>
                  <td className="border px-2 py-1">
                    <input className="w-full border px-1 py-0.5 rounded" />
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      className="w-full border px-1 py-0.5 text-right rounded"
                      defaultValue="0.00"
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      className="w-full border px-1 py-0.5 text-right rounded"
                      defaultValue="0.00"
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <input className="w-full border px-1 py-0.5 rounded" />
                  </td>
                  <td className="border px-2 py-1">
                    <input className="w-full border px-1 py-0.5 rounded" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GLAccountDocument;
