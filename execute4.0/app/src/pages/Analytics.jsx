import ChartGenerator from "../components/ChartGenerator";

const Analytics = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-4xl mx-auto bg-slate-900 p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500">
          Analytics Dashboard
        </h1>
        <p className="text-gray-400 mt-2">
          Select data columns and generate visual insights.
        </p>

        <div className="mt-6">
          <ChartGenerator />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
