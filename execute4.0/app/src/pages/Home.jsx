import { Link } from "react-router-dom";
import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white px-6">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500">
        Welcome to the Business Intelligence App
      </h1>
      <p className="mt-4 text-lg text-gray-300 text-center max-w-lg">
        Upload your business data and generate insightful visualizations effortlessly.
      </p>

      <div className="mt-8 space-y-4 flex flex-col sm:flex-row sm:space-y-0 sm:space-x-4">
        <Link to="/dashboard">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-medium transition">
            Go to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
