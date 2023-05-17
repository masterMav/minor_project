import { useEffect, useState } from "react";

function Leaderboard() {
  const [error, setError] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    setError("");

    fetch("http://localhost:5000/api/ranklist")
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        // After recieving & parsing server reponse.

        if (result.status === "error") {
          throw result.error;
        }

        // Successfully fetched ranklist.

        let ranklist = result.users;
        ranklist.sort((a, b) => b.rating - a.rating);
        setUsersList(ranklist);
        setIsPending(false);
      })
      .catch((err) => {
        // Internal server error.

        console.log(err);
        setError(err);
        setIsPending(false);
      });
  }, []);

  // Iterate over usersList & print users inside table.

  const listItems = usersList.map((user, index) => {
    const rank = index + 1;

    return (
      <tr key={user.username}>
        <th scope="row">{rank}</th>
        <td>{user.username}</td>
        <td>{user.rank}</td>
        <td>{user.rating}</td>
      </tr>
    );
  });

  return (
    <div className="leaderboard text-center">
      {/* Errors */}

      {error && (
        <div className="badge rounded-pill bg-danger" id="formError">
          {error}
        </div>
      )}

      {/* Leaderboard */}

      {isPending ? (
        <h2>Fetching ranklist from DB....</h2>
      ) : (
        <>
          <h2 className="mt-3 mb-4">Users Leaderboard</h2>
          <div className="card custom-card py-2">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Username</th>
                  <th scope="col">Codeforces Rank</th>
                  <th scope="col">Codeforces Rating</th>
                </tr>
              </thead>
              <tbody>{listItems}</tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default Leaderboard;
