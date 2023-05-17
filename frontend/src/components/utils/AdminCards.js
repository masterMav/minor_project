const AdminCards = ({ totalSolved, contestSolves, wa }) => {
  return (
    <div className="AdminCards mt-3">
      <div className="row d-flex justify-content-center">
        {/* User card */}
        <div className="col-xl-3 col-lg-6">
          <div className="card l-bg-cherry">
            <div className="card-statistic-3 p-4">
              <div className="mb-4">
                <h5 className="card-title mb-0">Total Solved</h5>
              </div>
              <div className="col-8">
                <h2 className="d-flex align-items-center mb-0">{totalSolved}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Avg time card */}
        <div className="col-xl-3 col-lg-6">
          <div className="card l-bg-blue-dark">
            <div className="card-statistic-3 p-4">
              <div className="mb-4">
                <h5 className="card-title mb-0">Contest solves</h5>
              </div>
              <div className="col-8">
                <h2 className="d-flex align-items-center mb-0">{contestSolves}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Avg attempts */}
        <div className="col-xl-3 col-lg-6">
          <div className="card l-bg-green-dark">
            <div className="card-statistic-3 p-4">
              <div className="mb-4">
                <h5 className="card-title mb-0">Wrong attempts</h5>
              </div>
              <div className="col-8">
                <h2 className="d-flex align-items-center mb-0">
                  {wa}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCards;
