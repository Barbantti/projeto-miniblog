// CSS
import styles from "./ResetUserPassword.module.css";

import React from "react";

import { Link } from "react-router-dom";

// Hooks
import { useAuthentication } from "../../hooks/useAuthentication";

const ResetUserPassword = () => {
  const { resetPassword } = useAuthentication();
  const [email, setEmail] = React.useState("");
  const [resetRequested, setResetRequested] = React.useState(false);
  const [setEmailError] = React.useState("");

  const handleResetPassword = async () => {
    if (!isValidEmail(email)) {
      setEmailError("Pease enter a valid email!");
      return;
    }

    await resetPassword(email);
    setResetRequested(true);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className={styles.reset_password}>
      <h3>Problems logging in?</h3>
      <p>
        Enter your email and we&apos;ll send you a link to access your account
        again.
      </p>
      {resetRequested ? (
        <p>Check your email for the reset link.</p>
      ) : (
        <>
          <div className={styles.input_container}>
            <label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </label>
          </div>
          <div className={styles.btn_container}>
            <label>
              {isValidEmail(email) && isValidEmail(email) ? (
                <button
                  onClick={handleResetPassword}
                  className={styles.btn_reset}
                >
                  Send reset link
                </button>
              ) : (
                <button
                  onClick={handleResetPassword}
                  className={styles.btn_reset_disable}
                  disabled
                >
                  Enter a valid email
                </button>
              )}
            </label>
          </div>
        </>
      )}
      <h4>OR</h4>
      {!isValidEmail(email) && !isValidEmail(email) ? (
        <p className={styles.p_link}>
          <Link to="/register">create new account</Link>
        </p>
      ) : (
        <p className={styles.p_link}>
          <Link to="/">Go to home</Link>
        </p>
      )}
    </div>
  );
};

export default ResetUserPassword;
