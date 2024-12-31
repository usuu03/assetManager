import { Card } from "@blueprintjs/core";
import React from "react";

export default function StarterSection() {
  return (
    <div className="grid grid-cols-3  gap-3 py-4">
      {/* Hardware Devices Card */}
      <div className="bg-red-500 p-6 shadow-md hover:shadow-lg transition duration-300">
        <h3 className="text-white text-xl font-bold mb-2">Hardware Assets</h3>
        <p className="text-white text-lg font-semibold">29</p>
      </div>

      {/* Software Subscriptions Card */}
      <div className="bg-blue-500 p-6 shadow-md hover:shadow-lg transition duration-300">
        <h3 className="text-white text-xl font-bold mb-2">
          Software Subscriptions
        </h3>
        <p className="text-white text-lg font-semibold">15</p>
      </div>

      {/* Number of Employees Card */}
      <div className="bg-green-500 p-6 shadow-md hover:shadow-lg transition duration-300">
        <h3 className="text-white text-xl font-bold mb-2">
          Number of Employees
        </h3>
        <p className="text-white text-lg font-semibold">10</p>
      </div>
    </div>
  );
}
