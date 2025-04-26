import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import API from "../services/api";

const LoginSignPage = () => {
  const [authMode, setAuthMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
    setEmail("");
    setPassword("");
    setName("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
      window.location.reload(); // Reload to reset the state
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Login Failed!",
        text: "Invalid email or password.",
        showConfirmButton: true,
      });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", { name, email, password });
      Swal.fire({
        icon: "success",
        title: "Signup Successful!",
        text: "Please login.",
        showConfirmButton: false,
        timer: 1500,
      });
      setAuthMode("signin");
      setEmail("");
      setPassword("");
      setName("");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Signup Failed!",
        text: "Email already exists.",
        showConfirmButton: true,
      });
    }
  };

  if (authMode === "signin") {
    return (
      <div className="auth-form-container">
        <form className="auth-form" onSubmit={handleLogin}>
          <div className="auth-form-content">
            <h3 className="auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control mt-1"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    );
  }
  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={handleSignup}>
        <div className="auth-form-content">
          <h3 className="auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginSignPage;
