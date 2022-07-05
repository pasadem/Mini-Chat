/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import {
  Card, Button, Form, Container, Row, Col
} from 'react-bootstrap';
import { Formik, Field, useFormik } from 'formik';
import axios from 'axios';
import { Link, useLocation, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/index.js';
import routes from '../routes.js';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);
  const location = useLocation();
  
  const f = useFormik({
    initialValues: { username: '', password: ''},
  
  onSubmit: async (values) => {
    const { username, password } = values;
    try {
      setAuthFailed(false)
      const res = await axios.post(routes.loginPath(), { username, password });
      const { data: { token }} = res;
      console.log(token)
      auth.logIn({ token, username });
      f.resetForm();

    } catch (err) {
      if (err.code === 'ERR_BAD_REQUEST' && err.response.status === 401) {
        setAuthFailed(true);
        auth.logOut();
      } if (err.code === 'ERR_NETWORK') {
        toast.error(t('errors.networkError'))
        } 
      }
    }
  });

  return (
    <Form onSubmit={f.handleSubmit}>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>{t('nickname')}</Form.Label>
        <Form.Control
          name="username"
          placeholder={t('username')}
          autoComplete="username"
          onChange={f.handleChange}
          value={f.values.username}
          isInvalid={authFailed}
          disabled={f.isSubmitting}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>{t('password')}</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder={t('password')}
          autoComplete="current-password"
          onChange={f.handleChange}
          value={f.values.password}
          isInvalid={authFailed}
          disabled={f.isSubmitting}
          required
        />
        {authFailed && <Form.Control.Feedback type="invalid">{t('errors.invalidCredentials')}</Form.Control.Feedback>}
      </Form.Group>
      <Button type="submit" variant="outline-primary" disabled={f.isSubmitting}>{t('enter')}</Button>
    </Form>
  );
}

function Login() {
  const auth = useAuth();
  const { t } = useTranslation();
  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col md={8} xl={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>{t('login')}</Card.Title>
              <LoginForm />
            </Card.Body>
            <Card.Footer className="text-center">
              <Card.Link as={Link} to={routes.signupPagePath()}>{t('registration')}</Card.Link>
            </Card.Footer>
          </Card>
          {auth.user && <Redirect to={routes.homePagePath()} />}
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
