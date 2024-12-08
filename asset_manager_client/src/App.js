import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Router>
      <div className="">
        <Header />
        <Routes>
          <Route path="*" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
