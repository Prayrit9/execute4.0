import { useState } from "react";
import { detectFraud } from "../api";

export default function FraudForm() {
  const [transaction, setTransaction] = useState({
    transaction_id: "",
    amount: "",
    payer_id: "",
    payee_id: "",
    payment_method: "",
  });
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await detectFraud(transaction);
      setResult(response.data);
    } catch (error) {
      console.error("Error detecting fraud:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fieldLabels = {
    transaction_id: "Transaction ID",
    amount: "Amount",
    payer_id: "Payer ID",
    payee_id: "Payee ID",
    payment_method: "Payment Method",
  };

  return (
    <div className="max-w-full mx-auto">
      <p className="text-sm text-white mb-4">
        Enter transaction details to check for potential fraud
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        {Object.keys(transaction).map((field) => (
          <div key={field} className="w-full">
            <label htmlFor={field} className="block text-xs text-white mb-1">
              {fieldLabels[field]}
            </label>
            <input
              id={field}
              type={field === "amount" ? "number" : "text"}
              name={field}
              value={transaction[field]}
              onChange={handleChange}
              className="w-full p-2 bg-gray-50 text-gray-700 rounded-md border border-gray-100 focus:border-blue-200 focus:outline-none"
              required
            />
          </div>
        ))}
        
        <div className="text-center">
            <button
          type="submit"
          disabled={isLoading}
          className="w-1/3 text-center mt-4 px-4 py-2 text-md rounded-md bg-blue-50 text-blue-950 hover:bg-blue-100 transition-colors focus:outline-none"
        >
          {isLoading ? "Processing..." : "Check Transaction"}
        </button>
        </div>
      </form>

      {result && (
        <div className="mt-6 p-4 rounded-md bg-gray-50 border border-gray-100">
          <div className="flex items-center mb-2">
            <span
              className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                result.is_fraud 
                  ? "bg-red-50 text-red-600" 
                  : "bg-green-50 text-green-600"
              }`}
            >
              {result.is_fraud ? "Potentially Fraudulent" : "Likely Legitimate"}
            </span>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-white">Reason:</span>
              <span className="text-gray-700">{result.fraud_reason || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white">Risk Score:</span>
              <span className="text-gray-700">{result.fraud_score}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}