// CSS
import styles from "./About.module.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className={styles.about}>
      <h2>
        About the U <span>Blog</span>
      </h2>
      <p>
        this project consists of a new concept social media, the front-end was
        developed with React and back-end with Google&apos;s Firebase.
      </p>
      <Link to="/post/create">Create new post</Link>
    </div>
  );
};

export default About;
