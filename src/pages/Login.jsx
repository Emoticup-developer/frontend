import { useState, useEffect } from "react";
import { FaList } from "react-icons/fa";
import Lottie from "lottie-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import banner from "../assets/banner.json";
import logo from "../assets/logoaerp.png";

const Login = () => {
  const [languageList, setLanguageList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    client_id: "",
    username: "",
    password: "",
    language: "EN",
  });

  useEffect(() => {
    const savedClient = Cookies.get("client");
    if (savedClient) navigate("/client");
  }, [navigate]);

  // Fetch all languages
  useEffect(() => {
    axios
      .get("http://192.168.0.235:8000/api/language")
      .then((res) => {
        const langSet = new Set();
        res.data.forEach((country) => {
          if (country.languages) {
            Object.values(country.languages).forEach((lang) =>
              langSet.add(lang)
            );
          }
        });
        setLanguageList(Array.from(langSet).sort());
      })
      .catch(() => toast.error("Failed to fetch languages"));
  }, []);

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const handleLanguageSelect = (lang) => {
    setFormData({ ...formData, language: lang });
    setShowDropdown(false);
  };
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://192.168.0.235:8000/api/login",
        formData
      );

      if (res.status === 200) {
        Cookies.set("client_id", formData.client_id, { expires: 1 });
        Cookies.set("username", formData.username, { expires: 1 });
        Cookies.set("language", formData.language, { expires: 1 }); // Save selected language

        toast.success("Login successful!");

        setTimeout(() => {
          navigate("/client");
        }, 1000);
      }
    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.error || "";

      if (
        status === 404 &&
        message === "Client does not exist" &&
        formData.client
      ) {
        toast.error(`Client does not exist!`);
      } else {
        toast.error(`Invalid credentials!`);
      }
    }
  };

  return (
    <div className="flex-1 h-screen overflow-y-hidden bg-[#d2ecf7] border bg-gradient-to-b from-blue-[#d2ecf7] to-blue-[#d2ecf7] border-black lg:p-0 p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between">
          {/* Left Side */}
          <div>
            {/* Logo */}
            <div className="my-2 ml-3 px-4 py-1">
              <img src={logo} alt="logoImg" className="w-[220px] h-[130px]" />
            </div>

            {/* Login Form */}
            <div className="mt-5 ml-4 flex flex-col gap-4 w-full max-w-xs">
              {/* Client */}
              <div className="flex items-center gap-2">
                <label
                  htmlFor="client_id"
                  className="w-[150px] text-sm font-semibold rounded-sm text-black"
                >
                  Client
                </label>
                <input
                  type="text"
                  id="client_id"
                  name="client_id"
                  value={formData.client_id}
                  onChange={handleChange}
                  placeholder="C001"
                  className={`w-[50px] h-5 px-2 border border-gray-500 rounded-sm text-sm text-black ${
                    formData.client_id ? "bg-amber-500" : "bg-white"
                  }`}
                />
              </div>

              {/* User */}
              <div className="flex items-center gap-2">
                <label
                  htmlFor="username"
                  className="w-[150px] text-sm font-semibold rounded-sm text-black"
                >
                  User
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="AXB"
                  className={`w-[140px] h-5 px-2 border border-gray-500 rounded-sm text-sm text-black ${
                    formData.username ? "bg-amber-500" : "bg-white"
                  }`}
                />
              </div>

              {/* Password */}
              <div className="flex items-center gap-2">
                <label
                  htmlFor="password"
                  className="w-[150px] text-sm font-semibold rounded-sm text-black"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="********"
                  className={`w-[140px] h-5 px-2 border border-gray-500 rounded-sm text-sm text-black ${
                    formData.password ? "bg-amber-500" : "bg-white"
                  }`}
                />
              </div>

              {/* Language */}

              <div className="flex items-center gap-2">
                <label
                  htmlFor="language"
                  className="w-[150px] text-sm font-semibold rounded-sm text-black"
                >
                  Language<span className="text-amber-500"> *</span>
                </label>
                <input
                  type="text"
                  id="language"
                  name="language"
                  value={formData.language}
                  readOnly
                  className={`w-[35px] h-5 px-2 border border-gray-500 rounded-sm text-sm text-black ${
                    formData.client_id ? "bg-amber-500" : "bg-white"
                  }`}
                />
                <button
                  type="button"
                  onClick={toggleDropdown}
                  className="w-4 h-4 flex items-center justify-center bg-white border border-gray-500 rounded hover:bg-amber-400"
                >
                  <FaList className="text-black text-[7px]" />
                </button>
              </div>

              {showDropdown && (
                <ul className="absolute z-10 mt-1 ml-[172px] w-[160px] bg-white border border-gray-400 rounded shadow-md max-h-40 overflow-auto">
                  {languageList.map((lang) => (
                    <li
                      key={lang}
                      onClick={() => handleLanguageSelect(lang)}
                      className="px-3 py-1 text-sm hover:bg-amber-200 cursor-pointer"
                    >
                      {lang}
                    </li>
                  ))}
                </ul>
              )}

              {/* Login Button */}
              <div className="ml-[158px] mt-1">
                <button
                  type="submit"
                  className="bg-amber-500 cursor-pointer font-bold h-5 text-black px-2 border border-black text-xs"
                >
                  LOGIN
                </button>
              </div>

              <hr className="border-[#031015] border w-[600px]" />

              <div className="w-[600px] h-16 font-semibold rounded-sm text-black mt-5">
                Welcome to AERP — Intelligent Partner in Unifying Finance,
                Sales, and Operations for Seamless Process Optimization.
              </div>

              <div className="mt-8 text-xs font-semibold rounded-sm text-black">
                Copyright All Rights Reserved © 2025 emoticup.com
              </div>
            </div>
          </div>

          {/* Right Side - Banner */}
          <div>
            <div className="w-[500px] h-[500px] mt-24 -ml-20">
              <Lottie animationData={banner} loop={true} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
