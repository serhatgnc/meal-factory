import { motion as m } from "framer-motion";
import { RefObject, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const homeRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLButtonElement | null>(null);
  const randomRef = useRef<HTMLButtonElement | null>(null);
  const aboutRef = useRef<HTMLButtonElement | null>(null);
  const [previous, setPrevious] = useState<HTMLButtonElement | null>(null);

  const onThisPage = (elm: RefObject<HTMLButtonElement>) => {
    const x = elm?.current as HTMLButtonElement;
    if (previous) {
      previous.style.borderBottom = "";
      previous.style.color = "";
    }
    x.style.borderBottom = "2px solid #ff725f";
    x.style.color = "#ff725f";
    setPrevious(x);
  };

  return (
    <div>
      <div className="nav">
        <div className="nav-left">
          <h2>Meal Factory</h2>
          <i className="fas fa-utensils fa-lg"></i>
        </div>
        <div className="nav-right">
          <Link to="/">
            <m.button
              ref={homeRef}
              onClick={() => onThisPage(homeRef)}
              whileTap={{ scale: 0.9 }}
            >
              Home
            </m.button>
          </Link>
          <Link to="/all">
            <m.button
              ref={listRef}
              onClick={() => onThisPage(listRef)}
              whileTap={{ scale: 0.9 }}
            >
              List All
            </m.button>
          </Link>
          <Link to="/random">
            <m.button
              ref={randomRef}
              onClick={() => onThisPage(randomRef)}
              whileTap={{ scale: 0.9 }}
            >
              Random Meal
            </m.button>
          </Link>
          <Link to="/about">
            <m.button
              ref={aboutRef}
              onClick={() => onThisPage(aboutRef)}
              whileTap={{ scale: 0.9 }}
            >
              About
            </m.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
