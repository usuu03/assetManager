import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import RegisterPage from "./pages/RegisterPage";
import OrganizationSignUp from "./pages/OrganizationSignUp";
import DeviceForm from "./pages/DeviceForm";

function App() {
  return (
    <Router>
      <div className="">
        <Header />
        <Routes>
          <Route path="*" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/organization" element={<OrganizationSignUp />} />
          <Route path="/add-device" element={<DeviceForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
