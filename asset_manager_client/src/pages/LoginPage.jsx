import React from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
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
        <form action="" className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Email Address"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div>
              <button className="w-full p-3 mt-5 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
