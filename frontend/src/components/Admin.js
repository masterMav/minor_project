import { useEffect, useState } from "react";
import Datacards from "./utils/Datacards";
import adminImage from "../images/setting.png";

function Admin() {
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState("");
  const [qn, setQn] = useState("");
  const [userCount, setUserCount] = useState("");
  const [avgRating, setAvgRating] = useState("");

  useEffect(() => {
    fetch("https://minor-project-cxop.onrender.com/api/admindata")
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        // After recieving & parsing server reponse.

        if (result.status === "error") {
          throw result.error;
        }

        setUserCount(result.data.count);
        setAvgRating(result.data.RoundedAvgRating);
      })
      .catch((err) => {
        // Login form error handling.

        setError(err);
      });
  }, []);

  const handleSubmit = (e) => {
    // reset state variables.

    e.preventDefault();
    setIsPending(true);

    // Post request to backend.

    fetch("https://minor-project-cxop.onrender.com/api/assign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qn }),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        // After recieving & parsing server reponse.

        if (result.status === "error") {
          throw result.error;
        }

        // Assignment posted successfully.

        setIsPending(false);
        setError("");
      })
      .catch((err) => {
        // form error handling.

        setIsPending(false);
        setError(err);
      });
  };

  return (
    <div>
      <h1 className="text-center mt-2 mb-4">Admin Dashboard</h1>
      {userCount && <Datacards userCount={userCount} avgRating={avgRating} />}
      <div className="position-relative">
        <img
          src={adminImage}
          alt="adminImage"
          className="adminImage position-absolute bottom-2 start-2 ms-5"
        />
        <form
          className="mx-auto mt-5"
          onSubmit={handleSubmit}
          style={{ width: "30%" }}
        >
          <h3 className="mx-auto mb-5 text-center">Assignments form</h3>
          {/* Input fields */}
          <textarea
            type="text"
            placeholder="Enter the assignment."
            required
            rows={6}
            cols={55}
            value={qn}
            onChange={(e) => setQn(e.target.value)}
          />
          {/* Error message */}
          {error && (
            <div className="badge rounded-pill bg-danger" id="formError">
              {error}
            </div>
          )}
          {/* Submit buttons */}
          {!isPending && <button className="submit">Post Assignment</button>}
          {isPending && (
            <button className="submit" disabled>
              Posting....
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Admin;
