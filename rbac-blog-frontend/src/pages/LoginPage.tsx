import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      alert("Login Successful!");
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      console.error(err);
      alert("Login Failed!");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Email
          </span>
          <input
            type="email"
            value={email}
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Password
          </span>
          <input
            type="password"
            value={password}
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
