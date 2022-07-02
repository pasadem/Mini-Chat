// @ts-check

import React, { useState, useMemo, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Container, Button, Navbar, Nav } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';


import Login from './LoginPage.jsx';
import Signup from './Signup.jsx';
import ChatPage from './ChatPage.jsx';
import NoMatch from './NoMatch.jsx';
import useAuth from '../hooks/useAuth.jsx';
import AuthProvider from '../contexts/AuthProvider.jsx';
import LogOutBtn from './LogOutBtn.jsx';
import { useTranslation } from 'react-i18next';
import routes from '../routes.js';

const LoginVerification = () => {
  const { loggedIn } = useAuth();
  console.log(loggedIn)
  if (loggedIn) {
    return <Navigate to="/" />;
  }
  return <Login />;
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
     auth.loggedIn
        ? children
        : <Navigate to="/login"  state={{ from: location }} />
  );
};

const App = () => {
  
  const { t } = useTranslation();

  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column h-100">
          <Navbar className="bg-white shadow-sm">
            <Container>
            <Navbar.Brand>
              <NavLink className="navbar-brand" to="/">{t('header.brand')}</NavLink>
            </Navbar.Brand>
              <LogOutBtn />
            </Container>
          </Navbar>
          <Routes>
            <Route path={routes.loginPage()} element={<LoginVerification />} />
            <Route path={routes.signupPage()} element={<Signup />} />
          <Route
            path={routes.mainPage()}
            element={(
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            )}
          />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </div>
        </Router>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AuthProvider>
  );
};

export default App;
