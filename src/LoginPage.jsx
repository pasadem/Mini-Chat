import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container, Row, Col, Card, Form, Button,
} from 'react-bootstrap';
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
  const auth = useAuth();
  let navigate = useNavigate();
  const [authFailed, setAuthFailed] = useState(false);

  const handleSubmit = async (values) => {
    try {
      const { data } = await axios.post(routes.loginPath(), values);
      const { token, username } = data;
      console.log(username)
      auth.logIn(token, username);
      navigate('/');
    } catch (error) {
      
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
                <h2 className="text-center mb-4">{'Войти'}</h2>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    name="username"
                    autoComplete="username"
                    required
                    placeholder={'Ваш ник'}
                    id="username"
                    isInvalid={authFailed}
                    onChange={f.handleChange}
                    value={f.values.username}
                    autoFocus
                  />
                  <Form.Label htmlFor="username">
                    {'Ваш ник'}
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
                    placeholder={'Пароль'}
                  />
                  <Form.Label htmlFor="password">
                    {'Пароль'}
                  </Form.Label>
                  {authFailed && <Form.Control.Feedback type="invalid" className="invalid-tooltip">{'Неверный пароль или логин'}</Form.Control.Feedback>}
                </Form.Group>
                <Button variant="outline-primary" type="submit" className="w-100 mb-3">{'Войти'}</Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <Link to="/signup">{'Зарегистрироваться'}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
