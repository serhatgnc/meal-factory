import { motion as m } from "framer-motion";
import { pageTransition } from "src/utils/constants";

const About = () => {
  return (
    <m.div
      className="about"
      initial="hidden"
      animate="visible"
      variants={pageTransition}
    >
      <m.div
        className="about-content"
        initial="hidden"
        animate="visible"
        variants={pageTransition}
      >
        <h1>About me</h1>
        <br />
        <br />
        <h3>
          Hello! My name is Serhat Genç. I am a front-end developer who is
          passionate about learning new things.
        </h3>
        <br />
        <br />
        <h4>
          These are the links to follow me, see my other projects and reaching
          me.
        </h4>
        <div className="socialLinks">
          <a
            href="https://github.com/SerhatG35"
            target="_blank"
            rel="noreferrer"
          >
            <i
              className="fab fa-github-square fa-2x"
              style={{ color: "#24292e" }}
            ></i>
            Github
          </a>
          <a
            href="https://www.linkedin.com/in/serhat-genc/"
            target="_blank"
            rel="noreferrer"
          >
            <i
              className="fab fa-linkedin fa-2x"
              style={{ color: "#0e76a8" }}
            ></i>
            LinkedIn
          </a>
          <a
            href="mailto: genc.serhat97@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <i
              className="fas fa-envelope-square fa-2x"
              style={{ color: "#360A14" }}
            ></i>
            Email
          </a>
        </div>
      </m.div>
    </m.div>
  );
};

export default About;
