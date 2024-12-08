import React from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300">
      <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-lg">
        <h2 className="text-center mb-4 text-2xl font-bold">
          Sign Up for the Stock Tracker Platform
        </h2>
        <p className="text-center mb-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Sign In
          </Link>
        </p>
        <form action="" className="space-y-4">
          <div className="flex space-x-1">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="w-full p-3 border border-collapse border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="w-full p-3 border border-collapse border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full p-3 border border-collapse border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="">
            <input
              type="text"
              name="companyName"
              placeholder="Organization"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-1">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="passwordRepeat"
              placeholder="Repeat Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <button className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
