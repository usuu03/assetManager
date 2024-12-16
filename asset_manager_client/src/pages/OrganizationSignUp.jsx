import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createOrganization } from "../api/organizationApi";
import industries from "../utils/industryList";

export default function OrganizationSignUp() {
  const navigate = useNavigate();

  // Define initial form data structure
  const initialFormData = {
    name: "",
    description: "",
    email: "",
    phone_number: "",
    website: "",
    industry: "",
    logo: null, // File for the organization logo
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  // Handle input changes (text fields, dropdowns)
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? e.target.files[0] : value, // Handle file input
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear any existing errors

    try {
      // Create FormData to send as `multipart/form-data`
      const formDataToSend = new FormData();
      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await createOrganization(formDataToSend);
      console.log("Organization created successfully", response);

      // Redirect upon success
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating organization", error);

      // Capture and display error messages
      const backendErrors = error.response?.data || {};
      const errorMessage =
        backendErrors.name?.[0] ||
        backendErrors.detail ||
        "An unknown error occurred. Please try again.";
      setErrors({ message: errorMessage });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          Register your Organization
        </h2>
        <p className="text-center mb-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Log In
          </Link>
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Organization Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Organization Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Organization Description */}
          <div>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Organization Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Organization Logo */}
          <div>
            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleChange} // Automatically handles file input
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Organization Phone Number */}
          <div>
            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Organization Website */}
          <div>
            <input
              type="url"
              name="website"
              placeholder="Company's Website"
              value={formData.website}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Organization Industry Dropdown */}
          <div>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select an Industry</option>
              {industries.map((ind, index) => (
                <option key={index} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
            >
              Create Organization
            </button>
          </div>
        </form>

        {/* Display Error Message */}
        {errors.message && (
          <div className="mt-4 text-red-500 text-center bg-rose-200 rounded-md w-full py-3">
            <p>{errors.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
