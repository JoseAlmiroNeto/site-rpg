import React, { useEffect, useState, createContext } from "react";
import { authConfig } from "./Config";
import Home from "../pages/Home";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  let url = window.location.href.split("/")[3];

  useEffect(() => {
    authConfig.auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  if (url !== "record" && url !== "section" && user) {
    return <Home auth={user} />;
  }

  if (loading) {
    return <React.Fragment>Loading...</React.Fragment>;
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
