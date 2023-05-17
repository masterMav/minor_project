import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RatingFrequency from "./utils/RatingFrequency";
import TagsFrequency from "./utils/TagsFrequency";
import AdminCards from "./utils/AdminCards";
import AsgList from "./utils/AsgList";
import {
  calcRatingDistribution,
  calcTagsDistribution,
  calcTotalSolved,
  calcContestSolves,
  calcWA,
  updateRank,
} from "./utils/userUtils";

function Userdashboard() {
  const [rating, setRating] = useState("");
  const [friends, setFriends] = useState("");
  const [contribution, setContribution] = useState("");
  const [rank, setRank] = useState("");
  const [maxrating, setMaxrating] = useState("");
  const [maxrank, setMaxrank] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");
  const [ratingWise, setRatingWise] = useState([]);
  const [tagWise, setTagWise] = useState([]);
  const [totalSolved, setTotalSolved] = useState("");
  const [contestSolves, setContestSolves] = useState("");
  const [wa, setWa] = useState("");
  const [asg, setAsg] = useState([]);

  const location = useLocation();
  let handle;
  if (location.state) {
    handle = location.state.username;
    localStorage.setItem("handle", handle);
  } else handle = localStorage.getItem("handle");

  useEffect(() => {
    // get user info

    setError("");

    fetch(`https://codeforces.com/api/user.info?handles=${handle}`)
      .then((res) => {
        if (!res.ok) throw Error("CF API ERROR");
        return res.json();
      })
      .then((data) => {
        // get data
        setRating(data.result[0].rating);
        setFriends(data.result[0].friendOfCount);
        setContribution(data.result[0].contribution);
        setRank(data.result[0].rank);
        setMaxrating(data.result[0].maxRating);
        setMaxrank(data.result[0].maxRank);
        setAvatar(data.result[0].titlePhoto);

        // update rank in backend for leaderboard.
        updateRank(data.result[0].rank, data.result[0].rating);
      })
      .catch((err) => setError(err.message));

    // Get submissions

    fetch(`https://codeforces.com/api/user.status?handle=${handle}`)
      .then((res) => {
        if (!res.ok) throw Error("CF API ERROR");
        return res.json();
      })
      .then((data) => {
        setRatingWise(calcRatingDistribution(data.result));
        setTagWise(calcTagsDistribution(data.result));
        setTotalSolved(calcTotalSolved(data.result));
        setContestSolves(calcContestSolves(data.result));
        setWa(calcWA(data.result));
      })
      .catch((err) => setError(err.message));

    // Get assignments

    const token = localStorage.getItem("token");

    fetch("https://minor-project-cxop.onrender.com/api/getasg", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        if (result.status === "error") {
          throw result.error;
        }
        setAsg(result.data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  return (
    <div className="d-flex">
      {/* Sidebar */}

      <div className="d-flex justify-content-end mt-3" style={{ width: "20%" }}>
        {/* User info card */}

        <div className="card" style={{ width: "17rem" }}>
          <img
            src={avatar}
            className="card-img-top mx-auto d-block image-fluid"
            alt="..."
          />
          <div className="card-body">
            <div className="card-text">
              <div className="d-inline-flex">
                <p className="fw-bold me-2">User:</p>
                {handle}
              </div>
              <br />

              <div className="d-inline-flex">
                <p className="fw-bold me-2">Rating:</p>
                {rating}
              </div>
              <br />

              <div className="d-inline-flex">
                <p className="fw-bold me-2">Rank:</p>
                {rank}
              </div>
              <br />

              <div className="d-inline-flex">
                <p className="fw-bold me-2">Friends:</p>
                {friends}
              </div>
              <br />

              <div className="d-inline-flex">
                <p className="fw-bold me-2">Contribution:</p>
                {contribution}
              </div>
              <br />

              <div className="d-inline-flex">
                <p className="fw-bold me-2">Max Rating:</p>
                {maxrating}
              </div>
              <br />

              <div className="d-inline-flex">
                <p className="fw-bold me-2">Max Rank:</p>
                {maxrank}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main menu */}

      <div style={{ width: "80%" }}>
        {/* Errors */}

        {error && (
          <div className="badge rounded-pill bg-danger" id="formError">
            {error}
          </div>
        )}

        {totalSolved && (
          <AdminCards
            totalSolved={totalSolved}
            contestSolves={contestSolves}
            wa={wa}
          />
        )}

        {/* Plot graphs */}

        <div className="row justify-content-center">
          <div className="col-5 text-center p-3 me-4 card custom-card">
            <div className="card-body text-center">
              <h2>Frequency Vs Ratings</h2>
              {ratingWise.length !== 0 && <RatingFrequency data={ratingWise} />}
            </div>
          </div>

          <div className="col-5 text-center p-3 card custom-card">
            <div className="card-body text-center">
              <h2>Frequency Vs Tags</h2>
              {tagWise.length !== 0 && <TagsFrequency data={tagWise} />}
            </div>
          </div>
        </div>

        {/* Assignments */}

        {asg.length !== 0 && <AsgList asgslist={asg} />}
      </div>
    </div>
  );
}

export default Userdashboard;
