import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  // TEMP: decode role from token (real version uses context or better logic)
  const isAdmin =
    token && JSON.parse(atob(token.split(".")[1])).role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">
        RBAC Blog
      </Link>

      <div className="collapse navbar-collapse">
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
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  Signup
                </Link>
              </li>
            </>
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
