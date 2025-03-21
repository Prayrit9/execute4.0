import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import BatchUploadPage from "./pages/BatchUploadPage";
import FraudGraphsPage from "./pages/FraudGraphsPage";
import FraudReportPage from "./pages/FraudReportPage";
import RuleConfigPage from "./pages/RuleConfigPage";
import FraudFormPage from "./pages/FraudFormPage";
import { Colors } from "chart.js";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-slate-950 to-slate-700 text-gray-200">
        {/* Navbar */}
        <nav className="bg-gradient-to-r from-blue-400 to-pink-300 shadow-md py-4 sticky top-0 z-50">
          <div className="max-w-[90vw] mx-auto px-[1vw] flex justify-between items-center">
            <h1 className="text-2xl font-light text-black">Fraud Detection</h1>
            <ul className="flex space-x-6 font-light">
              {[
                { path: "/batch-upload", label: "Batch Upload" },
                { path: "/fraud-graphs", label: "Fraud Graphs" },
                { path: "/fraud-report", label: "Report Fraud" },
                { path: "/rule-config", label: "Rule Config" },
                { path: "/fraud-form", label: "Fraud Form" },
              ].map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `text-white transition ${
                        isActive ? "text-[#FACC15] font-normal" : "hover:text-[#FACC15]"
                      }`
                    }
                    style={{ color: "black" }} 
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Page Content */}
        <div className="max-w-5xl mx-auto px-6 py-8">
          <Routes>
            <Route path="/batch-upload" element={<BatchUploadPage />} />
            <Route path="/fraud-graphs" element={<FraudGraphsPage />} />
            <Route path="/fraud-report" element={<FraudReportPage />} />
            <Route path="/rule-config" element={<RuleConfigPage />} />
            <Route path="/fraud-form" element={<FraudFormPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
