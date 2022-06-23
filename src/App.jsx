// @ts-check

import React, { useState, useMemo, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Container, Button, Navbar, Nav } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';


import LoginPage from './LoginPage.jsx';
import ChatPage from './ChatPage.jsx';
import NoMatch from './NoMatch.jsx';
import useAuth from './hooks/index.jsx';
import AuthProvider from './AuthProvider.jsx';

const LoginVerification = () => {
  const { loggedIn } = useAuth();
  console.log(loggedIn)
  if (loggedIn) {
    return <Navigate to="/" />;
  }
  return <LoginPage />;
};

const PrivateRoute = ({ children, path }) => {
  const auth = useAuth();

  return (
    <Route
      path={path}
      render={() => (auth.loggedIn
        ? children
        : <Navigate to="/login" />)}
    />
  );
};

const AuthButton = () => {
  const auth = useAuth();
  if (!auth.loggedIn) {
    return null;
  }
  return (<Button variant="outline-secondary" onClick={auth.logOut}>{'Выйти'}</Button>);
};

const App = () => {
  
  

  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column h-100">
          <Navbar className="bg-white shadow-sm">
            <Container>
              <Link to="/" className="navbar-brand">{'Чат'}</Link>
              <AuthButton />
            </Container>
          </Navbar>
          <Routes>
            <Route path="/login" element={<LoginVerification />} />
            {/* <Route path="/signup">
              <Signup />
            </Route> */}
            <Route
            path="/chat"
            element={(
              <PrivateRoute children={<ChatPage />} path="/chat" />
            )}
          />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </div>
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
};

export default App;


{/* const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const AuthButton = () => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Log out</Button>
      : <Button as={Link} to="/login" state={{ from: location }}>Log in</Button>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Chat</Navbar.Brand>
            <AuthButton />
        </Container>
      </Navbar>
        
      <div className="container p-3 h-100">
        <div id="chat" className="h-100">
          
            <h1 className="text-center mt-5 mb-4"></h1>
            <Routes>
              <Route path="/" element={null} />
              <Route path="/login" element={<LoginPage />} />
              {<Route
                path="/private"
                element={(
                  <PrivateRoute>
                    <PrivatePage />
                  </PrivateRoute>
                )}
              />}
            </Routes>
        </div>
      </div>
    </Router>
  </AuthProvider>
);

export default App;
                */}