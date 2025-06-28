import { useState, useEffect } from "react";
import ResizableSAPSidebar from "./TreeItem";
import { FaBell, FaUser } from "react-icons/fa";

const SampleForm = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [mobileOpen, setMobileOpen] = useState(false);

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
      {/* <Topbar onMenuClick={handleDrawerToggle} isMobile={isMobile} /> */}

      {isMobile ? (
        mobileOpen && (
          <div className="fixed inset-0 z-40 flex">
            <div className="w-[300px] bg-white shadow-lg z-50">
              <ResizableSAPSidebar />
            </div>
            <div
              className="flex-1 bg-black opacity-50"
              onClick={handleDrawerToggle}
            ></div>
          </div>
        )
      ) : (
        <div className="w-[300px] bg-white border-r">
          <ResizableSAPSidebar />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 max-w-6xl h-screen bg-[#151b54] border bg-gradient-to-b from-blue-[#151b54] to-blue-500 border-black lg:p-0 p-4">
        <form onSubmit={handleSubmit}>
          {/* Top Info Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 lg:px-4">
            {/* Left: Logo + Name + Role */}
            <div className="flex items-start gap-3 mt-5">
              <div className="w-[50px] h-[50px] bg-black flex items-center justify-center">
                <div className="w-[50px] h-[50px] bg-white flex items-center justify-center rounded-sm">
                  <div className="w-[42px] h-[42px] bg-black rounded-full flex items-center justify-center">
                    <FaUser className="text-white w-5 h-5" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-white">
                    Name:
                  </label>
                  <span className="text-sm text-white">Arun</span>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-white">
                    Role:
                  </label>
                  <span className="text-sm ml-2 text-white">Admin</span>
                </div>
              </div>
            </div>

            {/* Right: Help above, T Code below */}
            <div className="flex flex-col items-start sm:items-end gap-2 mt-5">
              <div className="flex gap-2">
                <button className="h-7 px-1 rounded text-amber-500">
                  <FaBell />
                </button>
                <button className="text-sm h-7 px-2 py-0.5 rounded bg-white border cursor-pointer border-black text-black">
                  Logout
                </button>
              </div>
              <div className="flex items-center gap-2">
                <label
                  htmlFor="company_code"
                  className="w-[63px] h-7 px-2 py-0.5 text-sm text-white rounded-sm"
                >
                  Code:<span className="text-amber-500"> *</span>
                </label>
                <input
                  type="text"
                  id="company_code"
                  name="company_code"
                  placeholder="007"
                  required
                  className="w-[60px] h-7 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Tabs Section - Full Width */}
          <div className="w-full bg-blue-100 border-2 border-white">
            <div className="flex justify-between items-center px-3">
              <div className="bg-amber-500 rounded-md bg-gradient-to-b from-amber-500 to-white">
                <h1 className="font-bold">INVOICE POSTING</h1>
              </div>
              <div>
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-1 justify-end lg:px-0">
                  <button
                    className="relative px-4 bg-white border border-black hover:bg-amber-500 text-black text-sm cursor-pointer font-semibold text-center"
                    style={{
                      clipPath: "polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    }}
                  >
                    Review
                  </button>

                  <button
                    className="relative px-4 bg-white border border-black hover:bg-amber-500 text-black cursor-pointer text-sm font-semibold text-center"
                    style={{
                      clipPath: "polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    }}
                  >
                    Park
                  </button>

                  <button
                    className="relative px-4 bg-white border border-black hover:bg-amber-500 text-black cursor-pointer text-sm font-semibold text-center"
                    style={{
                      clipPath: "polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    }}
                  >
                    Post
                  </button>
                  <button
                    className="relative px-4 bg-white border border-black hover:bg-amber-500 text-black cursor-pointer text-sm font-semibold text-center"
                    style={{
                      clipPath: "polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    }}
                  >
                    Cancel
                  </button>
                  <a
                    href="#"
                    className="bg-amber-500 ml-5 rounded-md bg-gradient-to-b from-amber-500 to-white relative px-4 border border-black text-black cursor-pointer text-sm font-semibold text-center"
                    style={{
                      clipPath: "polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    }}
                  >
                    Back
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center p-2 rounded lg:p-4 lg:mt-5">
            {/* Scrollable Form Container */}
            <div
              className="w-full overflow-y-scroll"
              style={{ maxHeight: "calc(100vh - 250px)" }}
            >
              {/* Top Input Rows */}
              <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 lg:px-4 mb-5">
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="company_code"
                    className="w-[130px] h-7 px-2 py-0.5 text-sm text-white rounded-sm"
                  >
                    Company Code<span className="text-amber-500"> *</span>
                  </label>
                  <input
                    type="text"
                    id="company_code"
                    name="company_code"
                    placeholder="0007"
                    required
                    className="w-[60px] h-7 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400 px-2 py-0.5"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label
                    htmlFor="invoice_type"
                    className="w-[130px] h-7 p-2 ml-5 text-sm font-medium text-white rounded-sm"
                  >
                    Invoice Type<span className="text-amber-500"> *</span>
                  </label>
                  <input
                    type="text"
                    id="invoice_type"
                    name="invoice_type"
                    placeholder="Sales Invoice"
                    required
                    className="w-[100px] h-7 p-2 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label
                    htmlFor="invoice_date"
                    className="w-[130px] h-7 p-2 ml-8 text-sm font-medium text-white rounded-sm"
                  >
                    Invoice Date<span className="text-amber-500"> *</span>
                  </label>
                  <input
                    type="date"
                    id="invoice_date"
                    name="invoice_date"
                    required
                    className="w-[122px] h-7 p-2 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label
                    htmlFor="posting_date"
                    className="w-[130px] h-7 p-2 text-sm font-medium text-white rounded-sm"
                  >
                    Posting Date<span className="text-amber-500"> *</span>
                  </label>
                  <input
                    type="date"
                    id="posting_date"
                    name="posting_date"
                    required
                    className="w-[122px] h-7 p-2 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label
                    htmlFor="month"
                    className="w-[130px] h-7 p-2 ml-5 text-sm font-medium text-white rounded-sm"
                  >
                    Month<span className="text-amber-500"> *</span>
                  </label>
                  <input
                    type="text"
                    id="month"
                    name="month"
                    placeholder="June"
                    required
                    className="w-[100px] h-7 p-2 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label
                    htmlFor="year"
                    className="w-[126px] h-7 p-2 ml-8 text-sm font-medium text-white rounded-sm"
                  >
                    Year<span className="text-amber-500"> *</span>
                  </label>
                  <input
                    type="text"
                    id="year"
                    name="year"
                    placeholder="2025"
                    required
                    className="w-[65px] h-7 p-2 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                  />
                </div>

                <div className="flex items-center gap-2 col-span-2">
                  {/* Description */}
                  <button
                    type="submit"
                    className="w-[562px] h-7 border border-gray-500 rounded-sm text-sm text-black bg-white"
                  >
                    Description
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <label
                    htmlFor="invoice_number"
                    className="w-[128px] h-7 p-2 ml-8 text-sm font-medium text-white rounded-sm"
                  >
                    Invoice Number<span className="text-amber-500"> *</span>
                  </label>
                  <input
                    type="text"
                    id="invoice_number"
                    name="invoice_number"
                    placeholder="123458"
                    required
                    className="w-[65px] h-7 p-2 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                  />
                </div>
              </div>

              {/* Top Input Rows */}
              <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4 lg:px-4 mb-5">
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="debt"
                    className="w-[130px] h-7 p-2 text-sm font-medium text-white rounded-sm"
                  >
                    Debt<span className="text-amber-500"> *</span>
                  </label>
                  <input
                    type="text"
                    id="debt"
                    name="debt"
                    placeholder="D1"
                    required
                    className="w-[40px] h-7 p-2 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label
                    htmlFor="gl_account"
                    className="w-[130px] h-7 p-2 text-sm font-medium text-white rounded-sm"
                  >
                    GL Account<span className="text-amber-500"> *</span>
                  </label>
                  <input
                    type="text"
                    id="gl_account"
                    name="gl_account"
                    placeholder="000001"
                    required
                    className="w-[65px] h-7 p-2 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label
                    htmlFor="debt_amount"
                    className="w-[130px] h-7 p-2 text-sm font-medium text-white rounded-sm"
                  >
                    Amount<span className="text-amber-500"> *</span>
                  </label>
                  <input
                    type="text"
                    id="debt_amount"
                    name="debt_amount"
                    placeholder="10000"
                    required
                    className="w-[90px] h-7 p-2 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                  />
                </div>

                <div className="flex items-center gap-2">
                  {/* Description */}
                  <button
                    type="submit"
                    className="w-full h-7 border border-gray-500 rounded-sm text-sm text-black bg-white"
                  >
                    Description
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <label
                    htmlFor="cred"
                    className="w-[130px] h-7 p-2 text-sm font-medium text-white rounded-sm"
                  >
                    Cred<span className="text-amber-500"> *</span>
                  </label>
                  <input
                    type="text"
                    id="cred"
                    name="cred"
                    placeholder="C1"
                    required
                    className="w-[40px] h-7 p-2 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label
                    htmlFor="cred_gl_account"
                    className="w-[130px] h-7 p-2 text-sm font-medium text-white rounded-sm"
                  >
                    GL Account<span className="text-amber-500"> *</span>
                  </label>
                  <input
                    type="text"
                    id="cred_gl_account"
                    name="cred_gl_account"
                    placeholder="000002"
                    required
                    className="w-[65px] h-7 p-2 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label
                    htmlFor="cred_amount"
                    className="w-[130px] h-7 p-2 text-sm font-medium text-white rounded-sm"
                  >
                    Amount<span className="text-amber-500"> *</span>
                  </label>
                  <input
                    type="text"
                    id="cred_amount"
                    name="cred_amount"
                    placeholder="10000"
                    required
                    className="w-[90px] h-7 p-2 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
                  />
                </div>

                <div className="flex items-center gap-2">
                  {/* Description */}
                  <button
                    type="submit"
                    className="w-full h-7 border border-gray-500 rounded-sm text-sm text-black bg-white"
                  >
                    Description
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SampleForm;
