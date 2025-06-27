import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaBoxOpen,
  FaCog,
  FaUserPlus,
  FaEye,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/success.json"; // Update path if needed

const Sidebar = () => {
  const [employeeOpen, setEmployeeOpen] = useState(false);
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [redirectMessage, setRedirectMessage] = useState("");
  const navigate = useNavigate();

  const toggleEmployeeMenu = () => setEmployeeOpen(!employeeOpen);

  const handleRoute = (e, path, pageName) => {
    e.preventDefault(); // Prevent default anchor tag behavior
    setRedirectMessage(`Redirecting to ${pageName}...`);
    setLoadingRoute(true);
    setTimeout(() => {
      setLoadingRoute(false);
      navigate(path);
    }, 2000); // Adjust delay as per your Lottie duration
  };

  const linkStyle =
    "w-full flex items-center px-4 py-3 hover:bg-amber-400 cursor-pointer";
  const subLinkStyle =
    "w-full flex items-center py-2 hover:bg-amber-400 cursor-pointer";

  return (
    <>
      {/* Lottie Loader Overlay */}
      {loadingRoute && (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-50 flex flex-col items-center justify-center">
          <div className="w-56">
            <Lottie animationData={loadingAnimation} loop />
          </div>
          <p className="text-lg font-semibold text-gray-700">
            {redirectMessage}
          </p>
        </div>
      )}

      <aside className="w-full mt-5 lg:w-[300px] h-screen bg-amber-500 text-black fixed top-0 left-0 pt-16 border-r border-gray-300 overflow-y-auto">
        <ul className="flex flex-col">
          <li>
            <a
              href="/dashboard"
              onClick={(e) => handleRoute(e, "/dashboard", "Dashboard")}
              className={linkStyle}
            >
              <FaTachometerAlt className="mr-3 text-xl" />
              <span>Dashboard</span>
            </a>
          </li>

          <li>
            <a
              onClick={(e) => {
                e.preventDefault();
                toggleEmployeeMenu();
              }}
              className={linkStyle}
              href="#"
            >
              <FaUsers className="mr-3 text-xl" />
              <span className="flex-1 text-left">Employees</span>
              {employeeOpen ? (
                <FaChevronDown className="ml-auto text-xl" />
              ) : (
                <FaChevronRight className="ml-auto text-xl" />
              )}
            </a>

            {employeeOpen && (
              <ul className="pl-12">
                <li>
                  <a
                    href="/employees/create"
                    onClick={(e) =>
                      handleRoute(e, "/employees/create", "Create Employee")
                    }
                    className={subLinkStyle}
                  >
                    <FaUserPlus className="mr-2 text-xl" />
                    <span>Create Employee</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/employees/view"
                    onClick={(e) =>
                      handleRoute(e, "/employees/view", "View Employee")
                    }
                    className={subLinkStyle}
                  >
                    <FaEye className="mr-2 text-xl" />
                    <span>View Employee</span>
                  </a>
                </li>
              </ul>
            )}
          </li>

          <li>
            <a
              href="/inventory"
              onClick={(e) => handleRoute(e, "/inventory", "Inventory")}
              className={linkStyle}
            >
              <FaBoxOpen className="mr-3 text-xl" />
              <span>Inventory</span>
            </a>
          </li>

          <li>
            <a
              href="/settings"
              onClick={(e) => handleRoute(e, "/settings", "Settings")}
              className={linkStyle}
            >
              <FaCog className="mr-3 text-xl" />
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
