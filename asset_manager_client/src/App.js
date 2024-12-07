import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div className="">
        <Header />
        <Routes>
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
