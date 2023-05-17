import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();

  // After submitting login credentials.

  const handleSubmit = (e) => {
    // reset state variables.
    e.preventDefault();
    setIsPending(true);

    // send login request to backend.

    fetch("https://minor-project-cxop.onrender.com/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        // After recieving & parsing server reponse.

        if (result.status === "error") {
          throw result.error;
        }

        // Login successful.

        localStorage.setItem("token", result.data);
        setIsPending(false);
        setError("");
        setIsAuthenticated(true);

        // Store authentication status in local storage

        localStorage.setItem("isAuthenticated", JSON.stringify(true));

        // Redirect to either the admin dashboard or the user dashboard.

        if (username === "admin") history.push("/admin");
        else history.push("/userdashboard", { username });
      })
      .catch((err) => {
        // Login form error handling.

        setIsPending(false);
        setError(err);
      });
  };

  return (
    <div className="l-login">
      <div className="login-container">
        <p className="title">Login</p>
        <p className="welcome-message">
          Please enter your login details to continue exploring our platform. If
          you're new here, click on the Sign Up button to create an account.
          Thank you for choosing us!
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-control">
            <input
              type="text"
              placeholder="Username/Email"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <i className="fas fa-user"></i>
          </div>
          <div className="form-control">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="fas fa-lock"></i>
          </div>
          {error && (
            <div className="badge rounded-pill bg-danger" id="formError">
              {error}
            </div>
          )}
          {!isPending && <button className="submit">Login</button>}
          {isPending && (
            <button className="submit" disabled>
              Logging in....
            </button>
          )}
        </form>

        <div className="additional-action">
          <Link to="/register" className="linkStyle">
            <p>Need an account? Sign Up</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
