import React, { useState } from "react";
import { flight_assets } from "../assets/assets";

const Login = () => {
  const [isEmail, setIsEmail] = useState(true); // Toggle between email and mobile
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Logged in with:", isEmail ? email : mobile, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-cover bg-center" style={{ backgroundImage: `url(${flight_assets.flight})` }}>
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-black">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Toggle option between Email and Mobile */}
          <div className="flex justify-center gap-2 items-center">
            <button
              type="button"
              onClick={() => setIsEmail(true)}
              className={`px-4 py-2 cursor-pointer text-sm font-medium border border-purple-500 rounded-md ${isEmail ? "bg-purple-500 text-white" : "text-purple-500"}`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => setIsEmail(false)}
              className={`px-4 py-2 cursor-pointer text-sm font-medium border border-purple-500 rounded-md ${!isEmail ? "bg-purple-500 text-white" : "text-purple-500"}`}
            >
              Mobile
            </button>
          </div>

          {/* Email input field */}
          {isEmail && (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your email"
              />
            </div>
          )}

          {/* Mobile Number input field */}
          {!isEmail && (
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-4 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your mobile number"
              />
            </div>
          )}

          {/* Password input field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full cursor-pointer py-2 text-white bg-purple-500 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
