import cfLogo from "../images/cflogo.png";
import atcoder from "../images/atcoder.png";
import cc from "../images/cc.png";
import icpc from "../images/icpc.png";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/register");
  };

  return (
    <div className="home">
      <div className="showcase">
        <h6 className=" mb-3 text-muted text-center">Legend has it,</h6>
        <p className="text-center fw-bold theQuote">
          We are what we repeatedly do. Excellence, then, is not an act, but a
          habit.
        </p>
        <h6 className="mt-1 text-muted text-center">
          Join UIT's first-ever club dedicated to competitive programming. Sign
          up, compete with friends based on ratings and track your practice.
          Experience a visual representation of your progress for enhanced
          learning and growth.
        </h6>
        <div className="text-center">
          <button
            type="button"
            className="mt-4 btn col-3 btn-lg text-light headButton"
            onClick={handleClick}
          >
            Start here
          </button>
        </div>
      </div>
      <img src={cfLogo} alt="cflogo" className="cfLogo mt-5 pt-5" />
      <img src={atcoder} alt="atcoder" className="atcoder mt-5 pt-5" />
      <img src={cc} alt="cc" className="cc mt-5 pt-5" />
      <img src={icpc} alt="icpc" className="icpc mt-5 pt-5" />
      <div className="text-center text-muted homeFooter">
        <div>
          Made by Jayant, Lakshya and Manav.
          <a href="https://github.com/masterMav/minor_project">
            <p className="fa-brands fa-square-github ms-4 me-2 fs-4"></p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
