import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const GLAccountCRUD = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    gl_account_number: "",
    short_text: "",
    long_text: "",
    account_group: "",
    group_account_number: "",
    blocked: false,
    deleted: false,
    reconciliation_account: false,
    field_status_group: "",
    sort_key: "",
    tax_category: "",
    open_item_management: false,
    line_item_display: false,
    description: "",
    pl_account_type: "",
    account_type_indicator: "",
    authorization_group: "",
  });
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "select-one" ? value === "true" : value,
    });
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("http://192.168.0.235:8000/conf/gl_account");
      setData(res.data);
    } catch (error) {
      toast.error("Failed to fetch GL Accounts");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(
          `http://192.168.0.235:8000/conf/gl_account/${formData.gl_account_number}`,
          formData
        );
        toast.success("GL Account updated successfully");
      } else {
        await axios.post(
          "http://192.168.0.235:8000/conf/gl_account/",
          formData
        );
        toast.success("GL Account created successfully");
      }
      setFormData({
        gl_account_number: "",
        short_text: "",
        long_text: "",
        account_group: "",
        group_account_number: "",
        blocked: false,
        deleted: false,
        reconciliation_account: false,
        field_status_group: "",
        sort_key: "",
        tax_category: "",
        open_item_management: false,
        line_item_display: false,
        description: "",
        pl_account_type: "",
        account_type_indicator: "",
        authorization_group: "",
      });
      setEditMode(false);
      fetchData();
    } catch (error) {
      toast.error("Submit failed");
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditMode(true);
  };

  const handleDelete = async (gl_account_number) => {
    try {
      await axios.delete(
        `http://192.168.0.235:8000/conf/gl_account/${gl_account_number}`,
        { deleted: true }
      );
      toast.success("GL Account deleted");
      fetchData();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4 mb-4">
        <input
          name="gl_account_number"
          value={formData.gl_account_number}
          onChange={handleChange}
          placeholder="GL Account No"
          disabled={editMode}
          className="border p-1"
          required
        />
        <input
          name="short_text"
          value={formData.short_text}
          onChange={handleChange}
          placeholder="Short Text"
          className="border p-1"
        />
        <input
          name="long_text"
          value={formData.long_text}
          onChange={handleChange}
          placeholder="Long Text"
          className="border p-1"
        />
        <input
          name="account_group"
          value={formData.account_group}
          onChange={handleChange}
          placeholder="Account Group"
          className="border p-1"
        />
        <input
          name="group_account_number"
          value={formData.group_account_number}
          onChange={handleChange}
          placeholder="Group Acc No"
          className="border p-1"
        />
        <input
          name="field_status_group"
          value={formData.field_status_group}
          onChange={handleChange}
          placeholder="Field Status Group"
          className="border p-1"
        />
        <input
          name="sort_key"
          value={formData.sort_key}
          onChange={handleChange}
          placeholder="Sort Key"
          className="border p-1"
        />
        <input
          name="tax_category"
          value={formData.tax_category}
          onChange={handleChange}
          placeholder="Tax Category"
          className="border p-1"
        />
        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-1"
        />
        <input
          name="pl_account_type"
          value={formData.pl_account_type}
          onChange={handleChange}
          placeholder="PL Type"
          className="border p-1"
        />
        <input
          name="account_type_indicator"
          value={formData.account_type_indicator}
          onChange={handleChange}
          placeholder="Acc Type Ind"
          className="border p-1"
        />
        <input
          name="authorization_group"
          value={formData.authorization_group}
          onChange={handleChange}
          placeholder="Auth Group"
          className="border p-1"
        />

        <label>
          Blocked
          <select
            name="blocked"
            value={formData.blocked}
            onChange={handleChange}
            className="border p-1"
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </label>
        <label>
          Reconciliation
          <select
            name="reconciliation_account"
            value={formData.reconciliation_account}
            onChange={handleChange}
            className="border p-1"
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </label>
        <label>
          Open Item
          <select
            name="open_item_management"
            value={formData.open_item_management}
            onChange={handleChange}
            className="border p-1"
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </label>
        <label>
          Line Item
          <select
            name="line_item_display"
            value={formData.line_item_display}
            onChange={handleChange}
            className="border p-1"
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </label>

        <button type="submit" className="col-span-3 p-2 bg-blue-600 text-white">
          {editMode ? "Update" : "Create"}
        </button>
      </form>

      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2">GL No</th>
            <th className="border px-2">Short Text</th>
            <th className="border px-2">Blocked</th>
            <th className="border px-2">Reconciliation</th>
            <th className="border px-2">PL Type</th>
            <th className="border px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((d) => !d.deleted)
            .map((item) => (
              <tr key={item.gl_account_number}>
                <td className="border px-2">{item.gl_account_number}</td>
                <td className="border px-2">{item.short_text}</td>
                <td className="border px-2">{item.blocked ? "Yes" : "No"}</td>
                <td className="border px-2">
                  {item.reconciliation_account ? "Yes" : "No"}
                </td>
                <td className="border px-2">{item.pl_account_type}</td>
                <td className="border px-2 space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 px-2 text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.gl_account_number)}
                    className="bg-red-500 px-2 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default GLAccountCRUD;
