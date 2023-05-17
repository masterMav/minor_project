import { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [recOTP, setRecOTP] = useState("");
  const [senderOTP, setSenderOTP] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const history = useHistory();
  let OTP;

  // after submitting email.

  const handleSubmit = (e) => {
    // prevent page refresh & reset state variables.
    e.preventDefault();
    setIsPending(true);
    setError("");

    // set OTP
    OTP = Math.floor(Math.random() * 1000000) % 1000000;
    setSenderOTP(OTP);

    // request node backend to send verification emails

    fetch("https://minor-project-cxop.onrender.com/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, OTP }),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        // catch mailing errors if any.

        if (result.status === "error") {
          throw result.error;
        }

        // Verification email sent successfully.

        setShowOTP(true);
        setIsPending(false);
        setError("");
      })
      .catch((err) => {
        // Catching internal server errors.

        setIsPending(false);
        setError(err);
      });
  };

  // after submitting OTP.

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    setError("");

    // match OTP.

    if (recOTP === senderOTP.toString()) {
      // OTPs matched. Email verified successfully.

      history.push({
        pathname: "/create",
        state: { email },
      });
    } else {
      // OTPs didn't match.

      setError("Invalid OTP.");
    }
  };

  return (
    <div className="l-login">
      <div className="login-container">
        <p className="title">Sign Up</p>
        <p className="welcome-message">
          By signing up, you'll have access to all the amazing features and
          benefits of our platform. We promise to keep your information safe and
          secure, and we'll never share it with anyone.
        </p>

        <form
          className="login-form"
          onSubmit={showOTP ? handleOTPSubmit : handleSubmit}
        >
          {showOTP ? (
            <>
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  required
                  value={recOTP}
                  onChange={(e) => setRecOTP(e.target.value)}
                />
                <i className="fas fa-lock"></i>
              </div>

              {error && (
                <div className="badge rounded-pill bg-danger" id="formError">
                  {error}
                </div>
              )}

              <button className="submit">Enter OTP</button>
            </>
          ) : (
            <>
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Enter email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <i className="fas fa-user"></i>
              </div>

              {error && (
                <div className="badge rounded-pill bg-danger" id="formError">
                  {error}
                </div>
              )}

              {!isPending && <button className="submit">Verify email</button>}
              {isPending && (
                <button className="submit" disabled>
                  Verifying....
                </button>
              )}
            </>
          )}
        </form>

        <div className="additional-action">
          <Link to="/login" className="linkStyle">
            <p>Already have an account? Login</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
