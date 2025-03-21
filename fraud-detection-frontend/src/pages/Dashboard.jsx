import { useState } from "react";
import FraudForm from "../components/FraudForm";
import FraudStats from "../components/FraudStats";
import FraudGraphs from "../components/FraudGraphs";
import RuleConfig from "../components/RuleConfig";
import BatchUpload from "../components/BatchUpload";
import FraudReport from "../components/FraudReport";

export default function Dashboard() {
  const [filters, setFilters] = useState({ date: "", payerId: "", payeeId: "" });
  const [activeTab, setActiveTab] = useState("stats");

  const tabs = [
    { id: "stats", label: "Overview", icon: "📊" },
    { id: "single", label: "Single Transaction", icon: "🔍" },
    { id: "bulk", label: "Bulk Processing", icon: "📦" },
    { id: "report", label: "Report Fraud", icon: "🚨" },
    { id: "rules", label: "Rule Engine", icon: "⚙️" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "stats":
        return (
          <div className="space-y-6">
            <div className="p-5 bg-white rounded-md">
              <h2 className="text-lg font-medium text-gray-700 mb-4">Fraud Statistics</h2>
              <FraudStats filters={filters} />
            </div>
            <div className="p-5 bg-white rounded-md">
              <h2 className="text-lg font-medium text-gray-700 mb-4">Fraud Analysis</h2>
              <FraudGraphs filters={filters} />
            </div>
          </div>
        );
      case "single":
        return (
          <div className="p-5 bg-white rounded-md">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Check Transaction</h2>
            <FraudForm />
          </div>
        );
      case "bulk":
        return (
          <div className="p-5 bg-white rounded-md">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Process Multiple Transactions</h2>
            <BatchUpload />
          </div>
        );
      case "report":
        return (
          <div className="p-5 bg-white rounded-md">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Report Suspicious Activity</h2>
            <FraudReport />
          </div>
        );
      case "rules":
        return (
          <div className="p-5 bg-white rounded-md">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Configure Detection Rules</h2>
            <RuleConfig />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-medium text-gray-700">Fraud Detection</h1>
            <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md text-sm hover:bg-blue-100 focus:outline-none">
              New Report
            </button>
          </div>
        </header>

        {/* Filter Bar */}
        <div className="mb-6 p-4 bg-white rounded-md">
          <div className="flex flex-wrap gap-3">
            <div className="flex-1 min-w-[200px]">
              <input
                type="date"
                placeholder="Filter by date"
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                className="w-full p-2 bg-gray-50 text-gray-700 rounded-md border border-gray-100 focus:border-blue-200 focus:outline-none"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Payer ID"
                value={filters.payerId}
                onChange={(e) => setFilters({ ...filters, payerId: e.target.value })}
                className="w-full p-2 bg-gray-50 text-gray-700 rounded-md border border-gray-100 focus:border-blue-200 focus:outline-none"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Payee ID"
                value={filters.payeeId}
                onChange={(e) => setFilters({ ...filters, payeeId: e.target.value })}
                className="w-full p-2 bg-gray-50 text-gray-700 rounded-md border border-gray-100 focus:border-blue-200 focus:outline-none"
              />
            </div>
            <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md text-sm hover:bg-gray-200 focus:outline-none">
              Apply
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-100">
            <nav className="flex space-x-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    py-3 px-1 border-b-2 font-medium text-sm
                    ${
                      activeTab === tab.id
                        ? "border-blue-400 text-blue-600"
                        : "border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-200"
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <main>{renderTabContent()}</main>
      </div>
    </div>
  );
}