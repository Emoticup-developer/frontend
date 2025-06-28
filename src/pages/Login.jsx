import React from "react";
import Lottie from "lottie-react";
import banner from "../assets/banner.json";
import logo from "../assets/logo.png";

export default function LoginScreen() {
  return (
    <div className="flex-1 h-screen overflow-y-hidden bg-[#151b54] border bg-gradient-to-b from-blue-[#151b54] to-blue-500 border-black lg:p-0 p-4">
      <div className="flex justify-between">
        <div>
          {/* Logo */}
          <div className="my-2 ml-3 rounded-md px-4 py-1">
            <img src={logo} alt="logoImg" className="w-[160px] h-[100px]" />
          </div>

          {/* Login Form */}
          <div className="mt-5 ml-4 flex flex-col gap-4 w-full max-w-xs">
            {/* Client */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="client"
                className="w-[150px] h-5 px-2 py-0.5 text-sm text-white rounded-sm"
              >
                Client
              </label>
              <input
                type="text"
                id="client"
                name="client"
                placeholder="007"
                required
                className="w-[50px] h-5 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
              />
            </div>

            {/* User */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="user"
                className="w-[150px] h-5 px-2 py-0.5 text-sm text-white rounded-sm"
              >
                User
              </label>
              <input
                type="text"
                id="user"
                name="user"
                placeholder="AXB"
                required
                className="w-[140px] h-5 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
              />
            </div>

            {/* Password */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="password"
                className="w-[150px] h-5 px-2 py-0.5 text-sm text-white rounded-sm"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="********"
                required
                className="w-[140px] h-5 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
              />
            </div>

            {/* Language */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="language"
                className="w-[150px] h-5 px-2 py-0.5 text-sm text-white rounded-sm"
              >
                Language
              </label>
              <input
                type="text"
                id="language"
                name="language"
                placeholder="EN"
                required
                className="w-[34px] h-5 px-2 py-0.5 border border-gray-500 rounded-sm text-sm text-black bg-white hover:bg-amber-400"
              />
            </div>

            {/* Login Button */}
            <div className="ml-[158px] mt-1">
              <button className="bg-amber-500 font-bold h-5 text-black px-2 py-0.5 border border-black text-xs">
                LOGIN
              </button>
            </div>

            <hr className="border-white border w-[600px]" />

            <div className="w-[600px] h-16 text-white mt-5">
              Welcome to AERP — Intelligent Partner in Unifying Finance, Sales,
              and Operations for Seamless Process Optimization.
            </div>

            {/* Footer */}
            <div className="mt-8 text-xs text-white">
              Copyright All Rights Reserved © 2025 emoticup.com
            </div>
          </div>
        </div>

        <div>
          <div className="w-[500px] h-[500px] mt-24 -ml-20">
            <Lottie animationData={banner} loop={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
