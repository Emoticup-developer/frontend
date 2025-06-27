import { useState, useEffect } from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import { FaUser } from "react-icons/fa";

const SampleForm = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Invoice");
  const tabs = ["Dashboard", "Invoice", "Master Setup", "Settings"];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    domain: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Topbar */}
      <Topbar onMenuClick={handleDrawerToggle} isMobile={isMobile} />

      {/* Sidebar 
      {isMobile ? (
        mobileOpen && (
          <div className="fixed inset-0 z-40 flex">
            <div className="w-[300px] bg-white shadow-lg z-50">
              <Sidebar />
            </div>
            <div
              className="flex-1 bg-black opacity-50"
              onClick={handleDrawerToggle}
            ></div>
          </div>
        )
      ) : (
        <div className="w-[300px] bg-white border-r">
          <Sidebar />
        </div>
      )} */}

      {/* Main Content */}
      <main className="flex-1 mt-20 lg:mb-5 lg:mx-5 bg-white text-black p-4">
        {/* Top Info Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 lg:px-4">
          {/* Left: Logo + Name + Role */}
          <div className="flex items-start gap-3">
            <div className="w-[50px] h-[50px] bg-black flex items-center justify-center">
              <div className="w-[50px] h-[50px] bg-white flex items-center justify-center rounded-sm">
                <div className="w-[42px] h-[42px] bg-black rounded-full flex items-center justify-center">
                  <FaUser className="text-white w-5 h-5" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Name:</label>
                <span className="text-sm">Arun</span>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Role:</label>
                <span className="text-sm">Admin</span>
              </div>
            </div>
          </div>

          {/* Right: Help above, T Code below */}
          <div className="flex flex-col items-start sm:items-end gap-2">
            <button className="bg-white text-black px-3 py-1 rounded">
              Help
            </button>
            <div className="flex items-center gap-2">
              <label
                htmlFor="company_code"
                className="w-full text-sm font-medium text-black bg-white p-2 rounded-sm"
              >
                T Code:<span className="text-red-500"> *</span>
              </label>
              <input
                type="text"
                id="company_code"
                name="company_code"
                placeholder="007"
                required
                className="w-full h-10 p-2 border border-gray-500 rounded-sm text-sm text-black bg-amber-400"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center bg-green-100 p-2 rounded mb-4 lg:mx-4">
          {/* Left Side Tabs */}
          <div className="flex gap-2 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded ${
                  activeTab === tab
                    ? "bg-white border border-black text-black"
                    : "text-black"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Back Button on Right */}
          <div className="mt-2 sm:mt-0">
            <button className="px-3 py-1 rounded bg-white border border-black text-black">
              Back
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-1 justify-end mb-5 lg:pr-4">
          <button
            className="relative px-4 bg-amber-400 text-black font-bold text-center"
            style={{
              clipPath: "polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }}
          >
            Review
          </button>

          <button
            className="relative px-4 bg-amber-400 text-black font-bold text-center"
            style={{
              clipPath: "polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }}
          >
            Park
          </button>

          <button
            className="relative px-4 bg-amber-400 text-black font-bold text-center"
            style={{
              clipPath: "polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }}
          >
            Post
          </button>
          <button
            className="relative px-4 bg-amber-400 text-black font-bold text-center"
            style={{
              clipPath: "polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }}
          >
            Cancel / Hold
          </button>
        </div>

        {/* Form Section */}
        <form className="space-y-4">
          {/* Top Input Rows */}
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 lg:px-4 mb-5">
            <div class="flex items-center gap-2">
              <label
                for="company_code"
                class="w-full text-sm font-medium text-black bg-white pt-2 pr-2 pb-2 rounded-sm"
              >
                Company Code<span class="text-red-500"> *</span>
              </label>
              <input
                type="text"
                id="company_code"
                name="company_code"
                placeholder="0007"
                required
                class="w-full h-10 p-2 border border-gray-500 rounded-sm text-sm text-black bg-amber-400"
              />
            </div>

            <div class="flex items-center gap-2">
              <label
                for="invoice_type"
                class="w-full text-sm font-medium text-black bg-white p-2 rounded-sm"
              >
                Invoice Type<span class="text-red-500"> *</span>
              </label>
              <input
                type="text"
                id="invoice_type"
                name="invoice_type"
                placeholder="Sales Invoice"
                required
                class="w-full h-10 p-2 border border-gray-500 rounded-sm text-sm text-black bg-amber-400"
              />
            </div>

            <div class="flex items-center gap-2">
              <label
                for="invoice_date"
                class="w-full text-sm font-medium text-black bg-white p-2 rounded-sm"
              >
                Invoice Date<span class="text-red-500"> *</span>
              </label>
              <input
                type="date"
                id="invoice_date"
                name="invoice_date"
                required
                class="w-full h-10 p-2 border border-gray-500 rounded-sm text-sm text-black bg-amber-400"
              />
            </div>

            <div class="flex items-center gap-2">
              <label
                for="posting_date"
                class="w-full text-sm font-medium text-black bg-white pt-2 pr-2 pb-2 rounded-sm"
              >
                Posting Date<span class="text-red-500"> *</span>
              </label>
              <input
                type="date"
                id="posting_date"
                name="posting_date"
                required
                class="w-full h-10 p-2 border border-gray-500 rounded-sm text-sm text-black bg-amber-400"
              />
            </div>

            <div class="flex items-center gap-2">
              <label
                for="month"
                class="w-full text-sm font-medium text-black bg-white p-2 rounded-sm"
              >
                Month<span class="text-red-500"> *</span>
              </label>
              <input
                type="text"
                id="month"
                name="month"
                placeholder="June"
                required
                class="w-full h-10 p-2 border border-gray-500 rounded-sm text-sm text-black bg-amber-400"
              />
            </div>

            <div class="flex items-center gap-2">
              <label
                for="year"
                class="w-full text-sm font-medium text-black bg-white p-2 rounded-sm"
              >
                Year<span class="text-red-500"> *</span>
              </label>
              <input
                type="text"
                id="year"
                name="year"
                placeholder="2025"
                required
                class="w-full h-10 p-2 border border-gray-500 rounded-sm text-sm text-black bg-amber-400"
              />
            </div>

            <div class="flex items-center gap-2">
              {/* Description */}
              <button
                type="submit"
                class="w-full h-10 p-2 border border-gray-500 rounded-sm text-sm text-black bg-white"
              >
                Description
              </button>
            </div>

            <div class="flex items-center gap-2">
              <label
                for="invoice_number"
                class="w-full text-sm font-medium text-black bg-white p-2 rounded-sm"
              >
                Invoice Number<span class="text-red-500"> *</span>
              </label>
              <input
                type="text"
                id="invoice_number"
                name="invoice_number"
                placeholder="123458"
                required
                class="w-full h-10 p-2 border border-gray-500 rounded-sm text-sm text-black bg-amber-400"
              />
            </div>
          </div>

          {/* Top Input Rows */}
          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4 lg:px-4 mb-5">
            <div class="flex items-center gap-2">
              <label
                for="debt"
                class="w-full text-sm font-medium text-black bg-white pt-2 pr-2 pb-2 rounded-sm"
              >
                Debt<span class="text-red-500"> *</span>
              </label>
              <input
                type="text"
                id="debt"
                name="debt"
                placeholder="D1"
                required
                class="w-full h-10 p-2 border border-gray-500 rounded-sm text-sm text-black bg-amber-400"
              />
            </div>

            <div class="flex items-center gap-2">
              <label
                for="gl_account"
                class="w-full text-sm font-medium text-black bg-white p-2 rounded-sm"
              >
                GL Account<span class="text-red-500"> *</span>
              </label>
              <input
                type="text"
                id="gl_account"
                name="gl_account"
                placeholder="000001"
                required
                class="w-full h-10 p-2 border border-gray-500 rounded-sm text-sm text-black bg-amber-400"
              />
            </div>

            <div class="flex items-center gap-2">
              <label
                for="debt_amount"
                class="w-full text-sm font-medium text-black bg-white p-2 rounded-sm"
              >
                Amount<span class="text-red-500"> *</span>
              </label>
              <input
                type="text"
                id="debt_amount"
                name="debt_amount"
                placeholder="10000"
                required
                class="w-full h-10 p-2 border border-gray-500 rounded-sm text-sm text-black bg-amber-400"
              />
            </div>

            <div class="flex items-center gap-2">
              {/* Description */}
              <button
                type="submit"
                class="w-full h-10 p-2 border border-gray-500 rounded-sm text-sm text-black bg-white"
              >
                Description
              </button>
            </div>

            <div class="flex items-center gap-2">
              <label
                for="debt"
                class="w-full text-sm font-medium text-black bg-white pt-2 pr-2 pb-2 rounded-sm"
              >
                Cred<span class="text-red-500"> *</span>
              </label>
              <input
                type="text"
                id="cred"
                name="cred"
                placeholder="C1"
                required
                class="w-full h-10 p-2 border border-gray-500 rounded-sm text-sm text-black bg-amber-400"
              />
            </div>

            <div class="flex items-center gap-2">
              <label
                for="cred_gl_account"
                class="w-full text-sm font-medium text-black bg-white p-2 rounded-sm"
              >
                GL Account<span class="text-red-500"> *</span>
              </label>
              <input
                type="text"
                id="cred_gl_account"
                name="cred_gl_account"
                placeholder="000002"
                required
                class="w-full h-10 p-2 border border-gray-500 rounded-sm text-sm text-black bg-amber-400"
              />
            </div>

            <div class="flex items-center gap-2">
              <label
                for="cred_amount"
                class="w-full text-sm font-medium text-black bg-white p-2 rounded-sm"
              >
                Amount<span class="text-red-500"> *</span>
              </label>
              <input
                type="text"
                id="cred_amount"
                name="cred_amount"
                placeholder="10000"
                required
                class="w-full h-10 p-2 border border-gray-500 rounded-sm text-sm text-black bg-amber-400"
              />
            </div>

            <div class="flex items-center gap-2">
              {/* Description */}
              <button
                type="submit"
                class="w-full h-10 p-2 border border-gray-500 rounded-sm text-sm text-black bg-white"
              >
                Description
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SampleForm;
