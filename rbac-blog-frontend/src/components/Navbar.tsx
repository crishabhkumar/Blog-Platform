import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  // TEMP: decode role from token (real version uses context or better logic)
  const isAdmin =
    token && JSON.parse(atob(token.split(".")[1])).role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/loginsignup");
    window.location.reload(); // Reload to reset the state
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">
        RBAC Blog
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-controls="navbarNav"
        aria-expanded={!isCollapsed}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className={`collapse navbar-collapse ${isCollapsed ? "" : "show"}`}
        id="navbarNav"
      >
        <ul className="navbar-nav me-auto">
          {isAdmin && (
            <li className="nav-item">
              <Link className="nav-link" to="/admin">
                Admin
              </Link>
            </li>
          )}
        </ul>

        <ul className="navbar-nav ms-auto">
          {!isLoggedIn ? (
            <li className="nav-item">
              <Link className="nav-link" to="/loginsignup">
                Login
              </Link>
            </li>
          ) : (
            <li className="nav-item">
              <button className="btn btn-outline-light" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
