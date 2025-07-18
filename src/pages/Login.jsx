import { useState, useEffect } from "react";
import { FaList, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import banner from "../assets/banner.json";
import logo from "../assets/logoaerp.png";

const Login = () => {
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

  const [languageList, setLanguageList] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // Fetch all languages
  const fetchLanguages = async () => {
    try {
      const res = await axios.get("http://192.168.0.235:8000/api/language");
      setLanguageList(res.data);
    } catch (err) {
      toast.error("Failed to fetch languages");
    }
  };

  // Select language for main input
  const handleLanguageSelect = (code) => {
    setFormData({ ...formData, language: code });
    setShowPopup(false);
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
        Cookies.set("client_id", formData.client_id, { expires: 7 });
        Cookies.set("username", formData.username, { expires: 7 });
        Cookies.set("language", formData.language, { expires: 7 }); // Save selected language

        toast.success("Login successful!");

        setTimeout(() => {
          navigate("/home");
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
    <div className="flex-1 h-screen overflow-y-hidden bg-[#e5f3fd] border bg-gradient-to-b from-blue-bg-[#e5f3fd] to-blue-[#d2ecf7] border-black lg:p-0 p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between">
          {/* Left Side */}
          <div>
            {/* Logo */}
            <div className="ml-3 px-4 py-1">
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
              <div className="flex items-center gap-2 relative">
                {/* Label */}
                <label
                  htmlFor="language"
                  className="w-[150px] text-sm font-semibold text-black"
                >
                  Language
                </label>

                {/* Readonly Input */}
                <input
                  type="text"
                  id="language"
                  name="language"
                  value={formData.language}
                  readOnly
                  className={`w-[40px] h-5 px-2 border border-gray-500 rounded-sm text-sm text-black ${
                    formData.language ? "bg-gray-200" : "bg-white"
                  }`}
                />

                {/* FaList Button */}
                <button
                  type="button"
                  onClick={() => {
                    fetchLanguages();
                    setShowPopup(true);
                  }}
                  className="w-4 h-4 flex items-center justify-center bg-white border border-gray-500 rounded hover:bg-amber-400"
                >
                  <FaList className="text-black text-[7px]" />
                </button>

                {/* Language Popup */}
                {showPopup && (
                  <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center bg-opacity-10">
                    <div className="bg-white w-[300px] h-[160px] pt-2 pb-0 pl-2 pr-2 rounded-md shadow-lg mb-40 ml-90">
                      {/* Header */}
                      <div className="flex justify-end items-center mb-2">
                        <button onClick={() => setShowPopup(false)}>
                          <FaTimes />
                        </button>
                      </div>

                      {/* Table (only Language Code + Name) */}
                      <div className="overflow-y-auto h-[112px]">
                        <table className="w-full border text-sm">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="p-2 border text-sm">Code</th>
                              <th className="p-2 border text-sm">Name</th>
                            </tr>
                          </thead>
                          <tbody>
                            {languageList.map((lang, index) => (
                              <tr
                                key={index}
                                className="hover:bg-amber-200 cursor-pointer h-[20px]"
                                onClick={() =>
                                  handleLanguageSelect(lang.language_code)
                                }
                              >
                                <td className="p-2 border">
                                  {lang.language_code}
                                </td>
                                <td className="p-2 border">
                                  {lang.language_name}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Login Button */}
              <div className="ml-[158px] mt-1 mb-6">
                <button
                  type="submit"
                  className="bg-amber-500 cursor-pointer font-bold h-5 text-black px-2 border border-black text-xs"
                >
                  LOGIN
                </button>
              </div>

              <hr className="border-[#031015] border w-[738px]" />

              <div className="w-[750px] h-16 font-semibold rounded-sm text-black mt-2">
                AERP - Accelerated Enterprise Resource Planning that integrates
                Business Process In Real Time
              </div>

              <div className="mt-8 text-xs font-semibold rounded-sm text-black">
                Copyright All Rights Reserved © 2025 emoticup.com
              </div>
            </div>
          </div>

          {/* Right Side - Banner */}
          <div>
            <div className="w-[600px] h-[600px] mt-24 -ml-20">
              <Lottie animationData={banner} loop={true} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
