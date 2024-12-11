import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../api/api";

export default function LoginPage() {
  const [errors, setErrors] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({}); //Resetting errors
    try {
      const response = await login(username, password);
      console.log("Login successful", response);

      // navigate("/dashboard")
    } catch (error) {
      console.error("Login failed:", error);
      setErrors({
        password: error.message || "Invalid Credentials, Please try again.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4">
          Sign in to Asset Tracker
        </h2>
        <p className="text-center mb-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Sign Up
          </Link>
        </p>
        <form action="" className="space-y-4" onSubmit={handleLogin}>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div>
              <button className="w-full p-3 mt-5 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300">
                Login
              </button>
            </div>
          </div>
        </form>
        {/* Display error message*/}
        {errors.password && (
          <div className="mt-4 text-red-500 text-center bg-rose-200 rounded-md w-full py-3">
            <p>{errors.password}</p>
          </div>
        )}
      </div>
    </div>
  );
}
