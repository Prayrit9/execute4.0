import { useState } from "react";

export default function RuleConfig() {
  const [rules, setRules] = useState({
    amountThreshold: 100000,
    blacklistedPayees: "",
    highRiskCountries: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/rules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rules),
    });
    alert(response.ok ? "Rules updated!" : "Failed to update rules.");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-slate-900 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-white mb-4">Rule Engine Config</h2>
      <form onSubmit={handleSubmit}>
        {/* Transaction Amount Limit */}
        <label className="block text-white mb-1">
          Transaction Amount Limit (₹)
        </label>
        <input
          type="number"
          value={rules.amountThreshold}
          onChange={(e) =>
            setRules({ ...rules, amountThreshold: e.target.value })
          }
          className="w-full p-3 mb-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Blacklisted Payees */}
        <label className="block text-white mb-3">
          Blacklisted Payees (comma-separated)
        </label>
        <textarea
          value={rules.blacklistedPayees}
          onChange={(e) =>
            setRules({ ...rules, blacklistedPayees: e.target.value })
          }
          className="w-full p-2 mb-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* High-Risk Countries Toggle */}
        <label className="flex items-center space-x-2 text-white">
          <input
            type="checkbox"
            checked={rules.highRiskCountries}
            onChange={(e) =>
              setRules({ ...rules, highRiskCountries: e.target.checked })
            }
            className="w-5 h-5 rounded focus:ring-2 focus:ring-blue-500"
          />
          <span>Enable High-Risk Country Detection</span>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-7 w-full p-2 bg-white text-slate-900 font-semibold rounded-md transition duration-200"
        >
          Save Rules
        </button>
      </form>
    </div>
  );
}
