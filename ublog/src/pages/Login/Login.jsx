// CSS
import styles from "./Login.module.css";

import { useAuthentication } from "../../hooks/useAuthentication";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ResetUserPassword from "../ResetUserPassword/ResetUserPassword";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      email,
      password,
    };

    const res = await login(user);

    console.log("User data: ", res);
  };

  /* const handleForgotPassword = () => {
    console.log("ResetUserPassword");
    <Link>
      <ResetUserPassword path="/reset-password" element={ResetUserPassword} />
    </Link>;
  }; */

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.login}>
      <h1 className="title">Log in</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          <span>Password:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        {!loading && <button className="btn">Advance</button>}
        {loading && <button className="btn">Wait</button>}
        {error && <p className="error">{error}</p>}
        <h4>OR</h4>
        <Link
          to="/reset-password"
          className="btn-forgot-password"
          onClick={() => (
            <Link>
              <ResetUserPassword
                path="/reset-password"
                element={ResetUserPassword}
              />
            </Link>
          )}
        >
          Forgot password?
        </Link>
        <p>
          Don&apos;t have an account?{" "}
          <Link to="/register" className="btn-blue">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
