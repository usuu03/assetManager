import { Pie } from "react-chartjs-2";

const data = {
  labels: ["Hardware", "Software", "Services"],
  datasets: [
    {
      data: [29, 15, 8],
      backgroundColor: ["#ff6384", "#36a2eb", "#4bc0c0"],
    },
  ],
};

export default function AssetDistributionChart() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Asset Distribution</h3>
      <Pie data={data} />
    </div>
  );
}
