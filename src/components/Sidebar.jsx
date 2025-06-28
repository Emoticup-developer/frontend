import React, { useState, useRef, useEffect } from "react";
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
import loadingAnimation from "../assets/success.json";

const Sidebar = () => {
  const [employeeOpen, setEmployeeOpen] = useState(false);
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [redirectMessage, setRedirectMessage] = useState("");
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const isResizing = useRef(false);
  const navigate = useNavigate();

  // Handle window resizing
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isResizing.current) {
        const newWidth = Math.max(180, Math.min(e.clientX, 500));
        setSidebarWidth(newWidth);
      }
    };

    const stopResize = () => {
      isResizing.current = false;
      document.body.style.cursor = "default";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopResize);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopResize);
    };
  }, []);

  const startResize = () => {
    isResizing.current = true;
    document.body.style.cursor = "ew-resize";
  };

  const toggleEmployeeMenu = () => setEmployeeOpen(!employeeOpen);

  const handleRoute = (e, path, pageName) => {
    e.preventDefault();
    setRedirectMessage(`Redirecting to ${pageName}...`);
    setLoadingRoute(true);
    setTimeout(() => {
      setLoadingRoute(false);
      navigate(path);
    }, 2000);
  };

  const linkStyle =
    "w-full flex items-center px-4 py-3 hover:bg-amber-400 cursor-pointer whitespace-nowrap";
  const subLinkStyle =
    "w-full flex items-center py-2 pl-4 hover:bg-amber-400 cursor-pointer whitespace-nowrap";

  return (
    <>
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

      <aside
        className="h-screen bg-amber-500 text-black fixed top-0 left-0 border-r border-gray-300 z-40 overflow-x-auto overflow-y-auto"
        style={{ width: sidebarWidth }}
      >
        <ul className="flex flex-col min-w-max">
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
              <ul className="pl-6">
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

        {/* Drag Handle */}
        <div
          onMouseDown={startResize}
          className="absolute right-0 top-0 h-full w-2 bg-gray-300 hover:bg-gray-500 cursor-ew-resize"
        />
      </aside>
    </>
  );
};

export default Sidebar;
