import React, { useState } from "react";
import { addDevice } from "../api/deviceApi";
import { useNavigate } from "react-router-dom";

export default function DeviceForm() {
  const initialFormData = {
    name: "",
    description: "",
    location: "",
    assigned_to: "",
    warranty_date: "",
    status: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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

      const response = await addDevice(formDataToSend);
      console.log("Organization created successfully", response);

      // Redirect upon success
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding device", error);

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
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-white p-12 border shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          Add a New Device
        </h2>
        <form action="" className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Device Name"
              onChange={handleChange}
              className="input-element"
            />
          </div>

          <div>
            <textarea
              type="text"
              name="description"
              placeholder="Enter a Device description"
              value={formData.description}
              onChange={handleChange}
              className="input-element"
            />
          </div>

          <div>
            <input
              type="text"
              name="location"
              placeholder="Enter the Site where the Device is"
              value={formData.location}
              onChange={handleChange}
              className="input-element"
            />
          </div>

          <div>
            <input
              type="text"
              name="assigned_to"
              placeholder="Who is the Device assigned to"
              value={formData.assigned_to}
              onChange={handleChange}
              className="input-element"
            />
          </div>

          <div className="">
            <label htmlFor="" className="text-gray-400">
              Warranty Date
            </label>
            <input
              type="date"
              name="warranty_date"
              value={formData.warranty_date}
              onChange={handleChange}
              className="input-element"
            />
          </div>

          <div>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select an Industry</option>

              <option value={formData.status}>Active</option>
              <option value={formData.status}>Maintenance</option>
              <option value={formData.status}>Retired</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full p-3 bg-green-600 text-white r hover:bg-green-700 transition duration-300"
            >
              Add a
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
