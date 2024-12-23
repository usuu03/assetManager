import React, { useState } from "react";
import { addDevice } from "../api/deviceApi";
import { useNavigate } from "react-router-dom";

export default function LicenseForm() {
  const initialFormData = {
    name: "",
    purchase_date: "",
    vendor: "",
    provider: "",
    expiration_date: "",
    quantity: 1,
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
    <div className="flex justify-center items-center min-h-screen bg-gray-200 pb-80">
      <div className="bg-white p-12 border shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          Add a New Software Subscription
        </h2>

        {/* Form for Subscription Creation */}
        <form action="" className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Subscription Name"
              onChange={handleChange}
              className="input-element"
            />
          </div>

          <div>
            <input
              type="date"
              name="purchase_date"
              value={formData.purchase_date}
              onChange={handleChange}
              className="input-element"
            />
          </div>

          <div>
            <input
              type="text"
              name="vendor"
              placeholder="Enter the Subscription's Vendor"
              value={formData.vendor}
              onChange={handleChange}
              className="input-element"
            />
          </div>

          <div>
            <input
              type="text"
              name="location"
              placeholder="Enter the Subscription's Provider"
              value={formData.provider}
              onChange={handleChange}
              className="input-element"
            />
          </div>

          <div>
            <input
              type="date"
              name="expiration_date"
              value={formData.expiration_date}
              onChange={handleChange}
              className="input-element"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full p-3 bg-green-600 text-white r hover:bg-green-700 transition duration-300"
            >
              Create a new License
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
