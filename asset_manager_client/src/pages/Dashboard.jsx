import React from "react";
import StarterSection from "../components/_dashboard/basicData";
import AssetTable from "../components/_dashboard/assetTable";
import AssetDistributionChart from "../components/_dashboard/assetDistribution";

export default function Dashboard() {
  return (
    <div className="mx-6 py-4">
      <h3 className="text-2xl">Dashboard</h3>
      <StarterSection />

      <div className="grid grid-cols-2 gap-4 my-4">
        {/* Asset Distribution Chart */}
        {/* <AssetDistributionChart /> */}

        {/* Recent Activity  */}
        <div className="bg-gray-100 p-6 shadow-md">
          <h3 className="text-lg font-bold mb-2">Recent Activity</h3>
          <ul className="list-disc pl-4">
            <li>Added a New Laptop to Hardware Assets</li>
            <li>License for Zoom Renewed.</li>
            <li>John Doe logged in</li>
          </ul>
        </div>
      </div>

      {/* Asset Table */}
      <AssetTable />
    </div>
  );
}
