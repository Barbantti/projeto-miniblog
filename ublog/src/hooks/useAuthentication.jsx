import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // cleanup
  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  // Register
  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName,
      });

      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage;

      if (error.message.includes("Password")) {
        systemErrorMessage = "Password should be at least 6 characters";
      } else if (error.message.includes("email-already.")) {
        systemErrorMessage = "Another account is using the same email.";
      } else {
        systemErrorMessage = "Error: try again later";
      }

      setError(systemErrorMessage);
    }

    setLoading(false);
  };

  // Logout - sign out
  const logout = () => {
    checkIfIsCancelled();

    signOut(auth);
  };

  // Login - sign in
  const login = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(false);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);
      console.log(error.message.includes("user-not"));

      let systemErrorMessage;

      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "User not found.";
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Wrong password.";
      } else {
        systemErrorMessage = "Error: try again later";
      }

      setError(systemErrorMessage);
    }

    setLoading(false);
  };

  // Reset password
  const resetPassword = async (email) => {
    checkIfIsCancelled();
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.log(error.message);
      setError("Error sending password reset email");
    }

    setLoading(false);
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    logout,
    login,
    loading,
    resetPassword,
  };
};
