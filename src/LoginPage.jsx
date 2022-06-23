import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container, Row, Col, Card, Form, Button,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';

import routes from './routes.js';
import useAuth from './hooks/index.jsx';

const validationSchema = yup.object().shape({
  username: yup.string().trim().required(),
  password: yup.string().required(),
});

const Login = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  let navigate = useNavigate();
  const [authFailed, setAuthFailed] = useState(false);

  const handleSubmit = async (values) => {
    try {
      const { data } = await axios.post(routes.loginPath(), values);
      const { token, username } = data;
      console.log(username)
      auth.logIn(token, username);
      navigate('/chat');
    } catch (error) {
      if (!error.response) {
        toast(t('loginForm.toasts.connectionError'));
      }
      if (error.response.status === 401) {
        setAuthFailed(true);
      }
    }
  };

  const validate = async (values) => {
    const errors = {};
    setAuthFailed(false);
    await validationSchema.validate(values)
      .catch((err) => {
        errors[err.path] = err.message;
        setAuthFailed(true);
      });
    return errors;
  };

  const f = useFormik({
    onSubmit: handleSubmit,
    initialValues: {
      username: '',
      password: '',
    },
    validate,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card>
            <Card.Body className="p-5">
              <Form noValidate onSubmit={f.handleSubmit} className="col-md-6 mt-3 mb-0">
                <h2 className="text-center mb-4">{t('loginForm.header')}</h2>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    name="username"
                    autoComplete="username"
                    required
                    placeholder={t('loginForm.username')}
                    id="username"
                    isInvalid={authFailed}
                    onChange={f.handleChange}
                    value={f.values.username}
                    autoFocus
                  />
                  <Form.Label htmlFor="username">
                    {t('loginForm.username')}
                  </Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    autoComplete="password"
                    id="password"
                    name="password"
                    type="password"
                    required
                    isInvalid={authFailed}
                    onChange={f.handleChange}
                    value={f.values.password}
                    placeholder={t('loginForm.password')}
                  />
                  <Form.Label htmlFor="password">
                    {t('loginForm.password')}
                  </Form.Label>
                  {authFailed && <Form.Control.Feedback type="invalid" className="invalid-tooltip">{t('loginForm.errors.authFail')}</Form.Control.Feedback>}
                </Form.Group>
                <Button variant="outline-primary" type="submit" className="w-100 mb-3">{t('loginForm.submit')}</Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <Link to="/signup">{t('loginForm.signupLink')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
