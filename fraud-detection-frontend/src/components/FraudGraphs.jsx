import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function FraudGraphs() {
  const [timeRange, setTimeRange] = useState("7d");
  const [fraudData, setFraudData] = useState({ categories: [], trends: [] });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch fraud data when time range changes
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/fraud/stats?timeRange=${timeRange}`);
        const data = await response.json();
        setFraudData(data);
      } catch (error) {
        console.error("Error fetching fraud data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [timeRange]);

  // Chart color scheme
  const colors = {
    predicted: "#3B82F6", // blue-500
    reported: "#F43F5E",  // rose-500
    axis: "#FFFFFF",      // white
    background: "transparent"
  };

  const timeRangeOptions = [
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "6m", label: "Last 6 Months" }
  ];

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-white">Fraud Analysis</h2>
        
        {/* Time Range Selector */}
        <div className="mt-2 sm:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-1 text-sm bg-gray-50 text-black rounded-md border border-gray-100 focus:outline-none"
          >
            {timeRangeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-white">Loading data...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Fraud Cases by Category (Bar Chart) */}
          <div>
            <h3 className="text-sm font-medium text-white mb-3">
              Fraud Cases by Category
            </h3>
            <div className="bg-gray-50 p-3 rounded-md">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={fraudData.categories} barSize={25}>
                  <XAxis 
                    dataKey="category" 
                    stroke={colors.axis}
                    tick={{ fill: colors.axis, fontSize: 12 }}
                    axisLine={{ stroke: colors.axis, strokeWidth: 0.5 }}
                  />
                  <YAxis 
                    stroke={colors.axis}
                    tick={{ fill: colors.axis, fontSize: 12 }}
                    axisLine={{ stroke: colors.axis, strokeWidth: 0.5 }}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', border: 'none' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: 12, color: colors.axis }}
                  />
                  <Bar 
                    dataKey="predicted" 
                    fill={colors.predicted} 
                    name="Predicted Fraud" 
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="reported" 
                    fill={colors.reported} 
                    name="Reported Fraud" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Time-Series Fraud Trend (Line Chart) */}
          <div>
            <h3 className="text-sm font-medium text-white mb-3">
              Fraud Trends Over Time
            </h3>
            <div className="bg-gray-50 p-3 rounded-md">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={fraudData.trends}>
                  <XAxis 
                    dataKey="date" 
                    stroke={colors.axis}
                    tick={{ fill: colors.axis, fontSize: 12 }}
                    axisLine={{ stroke: colors.axis, strokeWidth: 0.5 }}
                  />
                  <YAxis 
                    stroke={colors.axis}
                    tick={{ fill: colors.axis, fontSize: 12 }}
                    axisLine={{ stroke: colors.axis, strokeWidth: 0.5 }}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', border: 'none' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: 12, color: colors.axis }}
                  />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke={colors.predicted}
                    strokeWidth={2}
                    dot={{ fill: colors.predicted, r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Predicted Fraud"
                  />
                  <Line
                    type="monotone"
                    dataKey="reported"
                    stroke={colors.reported}
                    strokeWidth={2}
                    dot={{ fill: colors.reported, r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Reported Fraud"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}