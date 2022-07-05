// @ts-check

import React from 'react';

import {
  BrowserRouter as Router,
  // @ts-ignore
  Navigate,
  Route,
  Link,
  Switch,
  // @ts-ignore
  Redirect,
} from 'react-router-dom';

import {
  Navbar, Nav, Container, Button,
} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/index.js';
import toastParams from './toastParams.js';
import Login from './Login.jsx';
import Home from './Home.jsx';
// @ts-ignore
import NotFound from './NotFound.jsx';
import SignUp from './SignUp.jsx';
import LanguageSelect from './LanguageSelect.jsx';

import routes from '../routes.js';
import AuthProvider from './providers/AuthProvider.jsx';

function PrivateRoute({ children }) {
  const auth = useAuth();
  return (auth.user ? children : <Redirect to={routes.loginPagePath()} />);
}

function LogOutButton() {
  const { t } = useTranslation();
  const auth = useAuth();
  return auth.user && <Button onClick={auth.logOut} className="text-nowrap">{t('logout')}</Button>;
}

function App() {
  const { t } = useTranslation();
  return (
    <AuthProvider>
    <Router>
      <Container fluid className="d-flex flex-column p-0 h-100">
        <Navbar collapseOnSelect expand="md" bg="white" className="mb-3 shadow-sm px-2">
          <Container>
            <Navbar.Brand as={Link} to={routes.homePagePath()}>{t('appName')}</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
              <Nav>
                <LanguageSelect />
                <Nav.Link as={Link} to={routes.homePagePath()} className="text-nowrap">{t('home')}</Nav.Link>
                <Nav.Link as={Link} to={routes.loginPagePath()} className="text-nowrap">{t('login')}</Nav.Link>
                <Nav.Link as={Link} to={routes.signupPagePath()} className="text-nowrap">{t('registration')}</Nav.Link>
                <LogOutButton />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Container>
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
    pauseOnHover/>
  </AuthProvider>
  );
}
export default App;
