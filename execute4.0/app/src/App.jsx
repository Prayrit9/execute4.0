import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Analytics from "./pages/Analytics";
import UploadFile from "./components/UploadFile";
import DataTable from "./components/DataTable";
import ChartGenerator from "./components/ChartGenerator";
import { AuthProvider } from "./context/AuthContext.jsx"; 
import "./index.css";
import Logout from "./components/Logout";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/upload" element={<UploadFile />} />
          <Route path="/data" element={<DataTable />} />
          <Route path="/charts" element={<ChartGenerator />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
