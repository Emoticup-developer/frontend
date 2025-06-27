import { useState, useEffect } from "react";
import {
  FaShoppingCart,
  FaBoxOpen,
  FaStore,
  FaMoneyBillWave,
} from "react-icons/fa";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

const DashboardPage = () => {
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

  const stats = [
    {
      label: "Total Sales",
      icon: <FaMoneyBillWave className="text-xl" />,
      count: 2450,
    },
    {
      label: "Total Products",
      icon: <FaBoxOpen className="text-xl" />,
      count: 120,
    },
    {
      label: "Total Inventory",
      icon: <FaStore className="text-xl" />,
      count: 78,
    },
    {
      label: "Total Purchase",
      icon: <FaShoppingCart className="text-xl" />,
      count: 310,
    },
  ];

  const username = "Guest";

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Topbar onMenuClick={handleDrawerToggle} isMobile={isMobile} />

      {/* Sidebar */}
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
      )}

      {/* Main content */}
      <main className="flex-1 p-4 lg:p-8 mt-16">
        <p className="mb-4 text-gray-700">Hello! {username}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-4 justify-items-center">
          {stats.map((item, index) => (
            <div
              key={index}
              className="w-full h-full lg:w-[225px] lg:h-[90px] cursor-pointer bg-white border-l-4 border-amber-500 rounded-md shadow-sm flex flex-col justify-between p-3"
            >
              <div className="flex items-center text-sm lg:text-xl gap-2">
                {item.icon}
                <span className="font-semibold truncate">{item.label}</span>
              </div>
              <div className="text-center">
                <p className="text-sm lg:text-xl font-bold mt-1">
                  {item.count}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
