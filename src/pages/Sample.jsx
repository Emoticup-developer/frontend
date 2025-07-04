import React, { useState } from "react";

const Sample = () => {
  const [header, setHeader] = useState({
    documentDate: "",
    postingDate: "",
    companyCode: "",
    reference: "",
  });

  const [lineItems, setLineItems] = useState([
    { glAccount: "", debit: 0, credit: 0, text: "" },
  ]);

  const [totalDebit, setTotalDebit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);

  const updateLineItem = (index, field, value) => {
    const updated = [...lineItems];
    updated[index][field] = value;
    setLineItems(updated);
    calculateTotals(updated);
  };

  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      { glAccount: "", debit: 0, credit: 0, text: "" },
    ]);
  };

  const removeLineItem = (index) => {
    const updated = lineItems.filter((_, i) => i !== index);
    setLineItems(updated);
    calculateTotals(updated);
  };

  const calculateTotals = (items) => {
    const debit = items.reduce((sum, i) => sum + (i.debit || 0), 0);
    const credit = items.reduce((sum, i) => sum + (i.credit || 0), 0);
    setTotalDebit(debit);
    setTotalCredit(credit);
  };

  const handlePost = async () => {
    if (totalDebit !== totalCredit) {
      alert("Debit and Credit totals must match");
      return;
    }
    try {
      const payload = {
        ...header,
        entries: lineItems,
        status: "posted",
      };
      await axios.post("http://192.168.0.235:8000/conf/journal_entry", payload);
      alert("Journal Posted");
    } catch (error) {
      console.error(error);
      alert("Error Posting");
    }
  };

  const handlePark = async () => {
    const payload = {
      ...header,
      entries: lineItems,
      status: "parked",
    };
    await axios.post(
      "http://192.168.0.235:8000/conf/journal_entry_temp",
      payload
    );
    alert("Journal Parked");
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded shadow">
        <input
          placeholder="Document Date"
          type="date"
          onChange={(e) =>
            setHeader({ ...header, documentDate: e.target.value })
          }
        />
        <input
          placeholder="Posting Date"
          type="date"
          onChange={(e) =>
            setHeader({ ...header, postingDate: e.target.value })
          }
        />
        <input
          placeholder="Company Code"
          onChange={(e) =>
            setHeader({ ...header, companyCode: e.target.value })
          }
        />
        <input
          placeholder="Reference"
          onChange={(e) => setHeader({ ...header, reference: e.target.value })}
        />
      </div>
      <table className="w-full mt-4 border">
        <thead>
          <tr>
            <th>GL Account</th>
            <th>Debit</th>
            <th>Credit</th>
            <th>Text</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {lineItems.map((item, idx) => (
            <tr key={idx}>
              <td>
                <input
                  value={item.glAccount}
                  onChange={(e) =>
                    updateLineItem(idx, "glAccount", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.debit}
                  onChange={(e) =>
                    updateLineItem(
                      idx,
                      "debit",
                      parseFloat(e.target.value) || 0
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.credit}
                  onChange={(e) =>
                    updateLineItem(
                      idx,
                      "credit",
                      parseFloat(e.target.value) || 0
                    )
                  }
                />
              </td>
              <td>
                <input
                  value={item.text}
                  onChange={(e) => updateLineItem(idx, "text", e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => removeLineItem(idx)}>Delete</button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="5">
              <button onClick={addLineItem}>+ Add Line</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-between p-4 bg-gray-100 mt-4">
        <div>
          <p>Total Debit: ₹{totalDebit}</p>
          <p>Total Credit: ₹{totalCredit}</p>
        </div>
        <div className="space-x-2">
          <button
            className="bg-green-600 text-white px-3 py-1"
            onClick={handlePost}
          >
            Post
          </button>
          <button
            className="bg-yellow-500 text-white px-3 py-1"
            onClick={handlePark}
          >
            Park
          </button>
          <button
            className="bg-gray-500 text-white px-3 py-1"
            onClick={() => setLineItems([])}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sample;
