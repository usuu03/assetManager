import { useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OrganizationSignUp from "./pages/OrganizationSignUp";
import DeviceForm from "./pages/DeviceForm";
import LicenseForm from "./pages/LicenseForm";
import Dashboard from "./pages/Dashboard";

import Sidebar from "./components/Sidebar";
import PrivateRoute from "./components/PrivateRoute";

import { AuthProvider } from "./context/AuthContext";
import "@blueprintjs/core/lib/css/blueprint.css";

function App() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Router>
      <AuthProvider>
        <div className="flex h-screen">
          {/* Sidebar will be displayed only if the current route is not Login 
        or Register */}
          {window.location.pathname !== "/login" &&
            window.location.pathname !== "/register" && (
              <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
            )}

          <div
            className={`flex-grow transition-all duration-300 ease-in-out ${
              collapsed ? "ml-16" : "ml-64"
            }`}
          >
            <Routes>
              <Route path="*" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/organization" element={<OrganizationSignUp />} />
              <Route path="/add-device" element={<DeviceForm />} />
              <Route path="/add-license" element={<LicenseForm />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
