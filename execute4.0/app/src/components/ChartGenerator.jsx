import { useState, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import api from "../services/api";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const ChartGenerator = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [chartType, setChartType] = useState("bar");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/data");
        setData(response.data);
        setColumns(Object.keys(response.data[0] || {}));
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const chartData = {
    labels: data.map((row) => row[xAxis]),
    datasets: [
      {
        label: yAxis,
        data: data.map((row) => row[yAxis]),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Generate Chart</h2>
      <label>X-Axis: </label>
      <select onChange={(e) => setXAxis(e.target.value)}>
        <option value="">Select Column</option>
        {columns.map((col) => (
          <option key={col} value={col}>{col}</option>
        ))}
      </select>
      <label>Y-Axis: </label>
      <select onChange={(e) => setYAxis(e.target.value)}>
        <option value="">Select Column</option>
        {columns.map((col) => (
          <option key={col} value={col}>{col}</option>
        ))}
      </select>
      <label>Chart Type: </label>
      <select onChange={(e) => setChartType(e.target.value)}>
        <option value="bar">Bar</option>
        <option value="line">Line</option>
        <option value="pie">Pie</option>
      </select>

      {xAxis && yAxis && (
        <div>
          {chartType === "bar" && <Bar data={chartData} />}
          {chartType === "line" && <Line data={chartData} />}
          {chartType === "pie" && <Pie data={chartData} />}
        </div>
      )}
    </div>
  );
};

export default ChartGenerator;