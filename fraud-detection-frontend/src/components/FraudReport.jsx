import { useState } from "react";

export default function FraudReport() {
  const [formData, setFormData] = useState({
    transaction_id: "",
    reporting_entity_id: "",
    fraud_details: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    alert(response.ok ? "Fraud reported successfully!" : "Failed to report fraud.");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-slate-900 rounded-lg shadow-xl border border-slate-700">
      <h1 className="text-2xl font-bold mb-6 text-white flex items-center">
        <span className="mr-2"></span> Report Fraud
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="transaction_id" className="block mb-2 text-sm font-medium text-gray-300">
            Transaction ID
          </label>
          <input
            id="transaction_id"
            type="text"
            value={formData.transaction_id}
            onChange={(e) => 
              setFormData({ ...formData, transaction_id: e.target.value })}
            className="w-full p-3 bg-slate-800 text-gray-200 rounded-md border border-slate-600 focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label htmlFor="reporting_entity_id" className="block mb-2 text-sm font-medium text-gray-300">
            Reporting Entity ID
          </label>
          <input
            id="reporting_entity_id"
            type="text"
            value={formData.reporting_entity_id}
            onChange={(e) => 
              setFormData({ ...formData, reporting_entity_id: e.target.value })}
            className="w-full p-3 bg-slate-800 text-gray-200 rounded-md border border-slate-600 focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label htmlFor="fraud_details" className="block mb-2 text-sm font-medium text-gray-300">
            Fraud Details
          </label>
          <textarea
            id="fraud_details"
            value={formData.fraud_details}
            onChange={(e) => 
              setFormData({ ...formData, fraud_details: e.target.value })}
            className="w-full p-3 bg-slate-800 text-gray-200 rounded-md border border-slate-600 focus:ring-2 focus:ring-indigo-400 focus:border-transparent h-24 resize-none"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full px-4 py-3 mt-2 font-semibold rounded-md shadow-md transition-all duration-200 bg-white text-slate-900"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
}
