import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { register } from "../api/api";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [organization_name, setOrganization] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    setErrors({}); // resetting errors

    if (password !== passwordRepeat) {
      setErrors({ message: "Password does not match" });
      return;
    }

    try {
      const response = await register(
        username,
        email,
        password,
        organization_name
      );
      console.log("Registration successful", response);
      navigate("/login");
    } catch (error) {
      // Backend validation errors
      if (error.username) {
        setErrors({ message: "Username already exists" });
      } else if (error.organization_name) {
        setErrors({ message: "Organization does not exist" });
      } else if (error.email) {
        setErrors({ message: "Email already exists" });
      } else if (error.detail) {
        setErrors({ message: error.detail }); // General server error message
      } else {
        setErrors({ message: "An unknown error occurred. Please try again." });
      }
    }
  };

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
        <form action="" className="space-y-4" onSubmit={handleRegistration}>
          <div className="">
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full p-3 border border-collapse border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full p-3 border border-collapse border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="">
            <input
              type="text"
              name="organization_name"
              value={organization_name}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="Organization"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-1">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="passwordRepeat"
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
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
        {/* Display error message*/}
        {errors.message && (
          <div className="mt-4 text-red-500 text-center bg-rose-200 rounded-md w-full py-3">
            <p>{errors.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
