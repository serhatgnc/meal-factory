import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav">
      <div className="nav-left">
        <h2>Meal Factory</h2>
        <i className="fas fa-utensils fa-lg"></i>
      </div>
      <div className="nav-right">
        <Link to="/">Home</Link>
        <Link to="/all">List All</Link>
        <Link to="/random">Random Meal</Link>
        <Link to="/about">About</Link>
      </div>
    </div>
  );
};

export default Navbar;
