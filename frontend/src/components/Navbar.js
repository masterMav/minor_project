import { Link, useHistory } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  // After clicking the logout button.

  const history = useHistory();
  const logoutHandler = () => {
    // Clear localStorage

    localStorage.removeItem("token");
    localStorage.setItem("isAuthenticated", JSON.stringify(false));
    setIsAuthenticated(false);

    // Redirect to home.

    history.push("/");
  };

  return (
    <nav className="navbar pt-2 px-5 mx-5">
      <h1 className="ps-5 ms-5">The Autotelic Society</h1>
      <div className="links d-inline-flex pe-5 me-5">
        <Link to="/">Home </Link>
        <Link
          to={{
            pathname:
              "https://docs.google.com/document/d/1eDYfXd1SPbv8zvQhn6-eF_qDwDQayZX_TvLl_Ttg_s4/edit?usp=sharing",
          }}
          target="_blank"
        >
          About{" "}
        </Link>
        <Link to="/leaderboard">Leaderboard </Link>

        {/* Login or logout */}
        {isAuthenticated ? (
          <button
            onClick={logoutHandler}
            className="ms-4 btn btn-outline-danger"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" id="loginLink" className="pe-1">
              Login
            </Link>
            <Link to="/register" id="regLink">
              | Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
