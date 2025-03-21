import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">MOOLI-BI</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/upload" className="hover:underline">Upload Data</Link>
          <Link to="/analytics" className="hover:underline">Analytics</Link>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Welcome to your Dashboard
        </h2>

        {/* Cards Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700">Total Sales</h3>
            <p className="text-3xl font-bold text-blue-600">₹1,20,000</p>
          </div>

          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700">Total Customers</h3>
            <p className="text-3xl font-bold text-green-600">450</p>
          </div>

          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700">Pending Orders</h3>
            <p className="text-3xl font-bold text-red-600">18</p>
          </div>
        </div>

        {/* Upload Data Button */}
        <div className="mt-8 flex justify-center">
          <Link to="/upload">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-600">
              Upload Business Data
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
