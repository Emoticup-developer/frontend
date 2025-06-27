import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.png";
import { FaBell, FaCog, FaSignOutAlt, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const Topbar = ({ onMenuClick, isMobile }) => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const changeLanguage = (lng) => i18n.changeLanguage(lng);
  const username = "Guest";

  const handleLogout = () => {
    console.log("Logging out...");
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-200 text-black shadow-sm h-16 flex items-center px-4 justify-between">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <Link to="/dashboard">
          <img src={logo} alt="Logo" className="h-10 cursor-pointer" />
        </Link>
      </div>

      {/* Center: Title */}
      {!isMobile && (
        <div className="text-lg font-semibold text-center flex-1">
          {t("welcome")}
        </div>
      )}

      {/* Right: Language & Icons */}
      <div className="flex items-center gap-3">
        {isMobile && (
          <button onClick={onMenuClick} className="text-black text-xl ml-2">
            <FaBars />
          </button>
        )}
        {/* Language Switcher */}
        <select
          defaultValue="en"
          onChange={(e) => changeLanguage(e.target.value)}
          className="text-sm px-1 py-0.5 border border-black rounded"
        >
          <option value="en">EN</option>
          <option value="kn">KN</option>
          <option value="hi">HI</option>
        </select>

        {/* Notification */}
        <button className="text-gray-800 text-xl">
          <FaBell />
        </button>

        {/* Settings */}
        <button className="text-gray-800 text-xl">
          <FaCog />
        </button>

        {/* Avatar */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-7 h-7 bg-yellow-400 text-black rounded-full flex items-center justify-center text-xl font-bold"
          >
            J
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow z-50 text-sm">
              <div className="px-4 py-2 border-b">Hello! {username}</div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100"
              >
                <FaSignOutAlt className="text-xs" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
