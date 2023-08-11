// CSS
import styles from "./Navbar.module.css";

import { NavLink } from "react-router-dom";

import { useAuthentication } from "../../hooks/useAuthentication";

import { useAuthValue } from "../../context/AuthContext";

const Navbar = () => {
  const { logout } = useAuthentication();
  const { user } = useAuthValue();
  /* const { emailAuth } = EmailAuthentication(); */

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        U <span>Blog</span>
      </NavLink>
      <ul className={styles.links_list}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Sign in
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Register
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink
                to="/post/create"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                New post
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Dashboard
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            About Us
          </NavLink>
        </li>
        {user && (
          <li>
            <button onClick={logout}>Sign out</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
