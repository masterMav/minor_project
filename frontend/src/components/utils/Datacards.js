const DataCards = ({ userCount, avgRating }) => {
    return (
      <div className="AdminCards mt-3">
        <div className="d-flex justify-content-center">
          {/* User card */}
          <div className="col-xl-3 col-lg-6 me-5 pe-5">
            <div className="card l-bg-cherry">
              <div className="card-statistic-3 p-4">
                <div className="mb-4">
                  <h5 className="card-title mb-0">Total Number of Users:</h5>
                </div>
                <div className="col-8">
                  <h2 className="d-flex align-items-center mb-0">{userCount}</h2>
                </div>
              </div>
            </div>
          </div>
  
          {/* Avg time card */}
          <div className="col-xl-3 col-lg-6 ms-5 ps-5">
            <div className="card l-bg-blue-dark">
              <div className="card-statistic-3 p-4">
                <div className="mb-4">
                  <h5 className="card-title mb-0">Average Rating of all users:</h5>
                </div>
                <div className="col-8">
                  <h2 className="d-flex align-items-center mb-0">{avgRating}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default DataCards;
  