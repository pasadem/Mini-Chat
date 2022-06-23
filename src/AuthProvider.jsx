import React, { useState, useMemo, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import authContext from './contexts/index.jsx';

const AuthProvider = ({ children }) => {
  const { token, username } = JSON.parse(localStorage.getItem('user')) || {};
  const [loggedIn, setLoggedIn] = useState(!!token);

  const logIn = () => {
    localStorage.setItem('user', JSON.stringify({ token, username }));
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  const value = useMemo(() => ({
    loggedIn,
    token,
    username,
    logIn,
    logOut,
  }), [loggedIn, token, username, logIn, logOut]);

  return (
    <authContext.Provider value={value}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
