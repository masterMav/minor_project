import { useEffect, useState } from "react";
import RatingFrequency from "./utils/RatingFrequency";
import {
  calcRatingDistribution,
  calcTagsDistribution,
} from "./utils/userUtils";
import TagsFrequency from "./utils/TagsFrequency";

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

  // #
  const handle = "everule";
  useEffect(() => {
    // get user info

    setError("");

    fetch(`https://codeforces.com/api/user.info?handles=${handle}`)
      .then((res) => {
        if (!res.ok) throw Error("CF API ERROR");
        return res.json();
      })
      .then((data) => {
        setRating(data.result[0].rating);
        setFriends(data.result[0].friendOfCount);
        setContribution(data.result[0].contribution);
        setRank(data.result[0].rank);
        setMaxrating(data.result[0].maxRating);
        setMaxrank(data.result[0].maxRank);
        setAvatar(data.result[0].titlePhoto);
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
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="d-flex">
      {/* Sidebar */}

      <div className="d-flex justify-content-end mt-5" style={{ width: "20%" }}>
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

        {/* Plot graphs */}

        <div className="row justify-content-center mt-5">
          <div className="col-5 text-center p-3 me-2 card custom-card">
            <div class="card-body text-center">
              <h2>Frequency Vs Ratings</h2>
              {ratingWise.length !== 0 && <RatingFrequency data={ratingWise} />}
            </div>
          </div>

          <div className="col-5 text-center p-3 card custom-card">
            <div class="card-body text-center">
              <h2>Frequency Vs Tags</h2>
              {tagWise.length !== 0 && <TagsFrequency data={tagWise} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userdashboard;
