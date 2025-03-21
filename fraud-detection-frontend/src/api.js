import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Update when backend is ready

// ✅ Fraud Detection API (Single Transaction)
export const detectFraud = async (transaction) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          transaction_id: transaction.transaction_id,
          is_fraud: transaction.amount > 1000, // Simulating fraud detection based on amount
          fraud_source: "model",
          fraud_reason: transaction.amount > 1000 ? "High-risk transaction pattern" : "Low-risk transaction",
          fraud_score: transaction.amount > 1000 ? 0.92 : 0.10
        }
      });1
    }, 1000); // Simulating network delay
  });
};

// ✅ Batch Fraud Detection API (Multiple Transactions)
export const batchDetectFraud = async (transactions) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = {};
      transactions.forEach((tx) => {
        results[tx.transaction_id] = {
          is_fraud: tx.amount > 1000,
          fraud_reason: tx.amount > 1000 ? "High-risk transaction" : "Low-risk transaction",
          fraud_score: tx.amount > 1000 ? 0.92 : 0.10
        };
      });
      resolve({ data: results });
    }, 1500);
  });
};

// ✅ Fraud Reporting API (Report Fraud)
export const reportFraud = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          transaction_id: data.transaction_id,
          reporting_acknowledged: true
        }
      });
    }, 1000);
  });
};
