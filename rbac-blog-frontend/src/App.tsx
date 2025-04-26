import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import LoginSignPage from "./pages/LoginSignPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loginsignup" element={<LoginSignPage />} />
        <Route
          path="/admin"
          element={
            localStorage.getItem("token") &&
            JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]))
              .role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
