import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register chart components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FraudStats = ({ data = [] }) => {
  // Ensure 'data' is an array before mapping
  if (!Array.isArray(data) || data.length === 0) {
    return <p className="text-center text-red-500">No data available</p>;
  }

  const chartData = {
    labels: data.map((item) => item.label || "Unknown"),
    datasets: [
      {
        label: "Fraud Cases",
        data: data.map((item) => item.value || 0),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default FraudStats;
