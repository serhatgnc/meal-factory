import { motion as m } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className="nav">
        <div className="nav-left">
          <h2>Meal Factory</h2>
          <i className="fas fa-utensils fa-lg"></i>
        </div>
        <div className="nav-right">
          <Link to="/">
            <m.button whileTap={{ scale: 0.9 }}>Home</m.button>
          </Link>
          <Link to="/all">
            <m.button whileTap={{ scale: 0.9 }}>List All</m.button>
          </Link>
          <Link to="/random">
            <m.button whileTap={{ scale: 0.9 }}>Random Meal</m.button>
          </Link>
          <Link to="/about">
            <m.button whileTap={{ scale: 0.9 }}>About</m.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
