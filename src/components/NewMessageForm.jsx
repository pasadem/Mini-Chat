import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useAuth, useApi } from '../hooks/index.js';


const NewMessageForm = ({ isLoading }) => {
  const messageInput = useRef();
  useEffect(() => {
    messageInput.current && messageInput.current.focus();
  });
  const api = useApi();
  const auth = useAuth();
  const { t } = useTranslation();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const f = useFormik({
    initialValues: {
      newMessage: '',
    },
    onSubmit: (values) => {
      const { newMessage } = values;
      const { username } = auth;
      const channelId = currentChannelId;
      const newPromise = new Promise((resolve) => {
        const message = {
          text: newMessage,
          username,
          channelId,
          timeStamp: Date.now(),
        };
        api.sendNewMessage(message, (res) => {
          if (res.status === 'ok') {
            f.resetForm();
            resolve();
          }
        });
      });
      return newPromise;
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={f.handleSubmit}>
        <Form.Group className="d-flex" controlId="newMessage">
          <Form.Label
            className="visually-hidden"
          >
            {t('newMessage')}
          </Form.Label>
          <Form.Control
            type="text"
            ref={messageInput}
            placeholder={t('messagePrompt')}
            value={f.values.newMessage}
            onChange={f.handleChange}
            autoComplete="off"
            disabled={f.isSubmitting || isLoading}
            aria-label={t('newMessage')}
          />
          <Button type="submit" className="mx-2" disabled={f.isSubmitting || isLoading}>
          {t('send')}
        </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default NewMessageForm;
