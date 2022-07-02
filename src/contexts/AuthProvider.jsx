import React, { useState, useMemo, createContext } from 'react';
import { Navigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { token, username } = JSON.parse(localStorage.getItem('userId')) || {};
  const [loggedIn, setLoggedIn] = useState(!!token);

  const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
      if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }
    return {};
  };

  const logIn = () => {
    localStorage.setItem('userId', JSON.stringify({ token, username }));
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const getUsername = () => userId.username;


  const value = useMemo(() => ({
    getAuthHeader,
    loggedIn,
    token,
    username,
    logIn,
    logOut,
  }), [loggedIn, token, username, getAuthHeader, getUsername, logIn, logOut]);

  return (
    <AuthContext.Provider value={{ loggedIn, token, username, getAuthHeader, getUsername, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
