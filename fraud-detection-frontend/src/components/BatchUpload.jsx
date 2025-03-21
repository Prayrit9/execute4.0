import { useState } from "react";

export default function BatchUpload() {
  const [transactions, setTransactions] = useState([]);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        setTransactions(JSON.parse(e.target.result));
      } catch (error) {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/fraud/batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactions),
      });
      const data = await response.json();
      setResults(Object.entries(data));
    } catch (error) {
      console.error("Error processing batch:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-full mx-auto">
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-4">
          Upload a JSON file containing transaction data for batch processing
        </p>

        {/* File Upload Section */}
        <div className="mb-4">
          <label 
            htmlFor="file-upload" 
            className="block w-full p-4 border border-gray-100 border-dashed rounded-md text-center text-gray-500 cursor-pointer hover:bg-slate-950"
          >
            <div className="flex flex-col items-center justify-center">
              <span className="text-gray-400 mb-2">Drop JSON file here or click to browse</span>
              <span className="text-sm text-gray-400">(.json)</span>
            </div>
            <input
              id="file-upload"
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* File Info */}
        {transactions.length > 0 && (
          <div className="mb-4 p-3 bg-blue-50 text-blue-600 rounded-md text-sm">
            {transactions.length} transactions loaded and ready for processing
          </div>
        )}

        {/* Submit Button */}
        <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={!transactions.length || isLoading}
          className={`w-1/3 px-4 py-2 rounded-md text-sm transition-colors ${
            transactions.length && !isLoading
              ? "bg-blue-50 text-blue-900 hover:bg-blue-100"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          {isLoading ? "Processing..." : "Process Transactions"}
        </button>
        </div>
      </div>

      {/* Results Table */}
      {results.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm text-gray-700 border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 border-b border-gray-100 text-left font-medium">ID</th>
                <th className="px-4 py-2 border-b border-gray-100 text-left font-medium">Status</th>
                <th className="px-4 py-2 border-b border-gray-100 text-left font-medium">Reason</th>
                <th className="px-4 py-2 border-b border-gray-100 text-left font-medium">Score</th>
              </tr>
            </thead>
            <tbody>
              {results.map(([id, { is_fraud, fraud_reason, fraud_score }]) => (
                <tr key={id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b border-gray-100">{id}</td>
                  <td className="px-4 py-3 border-b border-gray-100">
                    <span
                      className={`inline-flex px-2 py-1 text-xs rounded-full ${
                        is_fraud 
                          ? "bg-red-50 text-red-600" 
                          : "bg-green-50 text-green-600"
                      }`}
                    >
                      {is_fraud ? "Flagged" : "Clear"}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-b border-gray-100">{fraud_reason || "—"}</td>
                  <td className="px-4 py-3 border-b border-gray-100">{fraud_score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}