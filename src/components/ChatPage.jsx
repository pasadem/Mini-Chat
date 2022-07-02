// @ts-check

import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { fetchInitialData, selectors as channelsSelectors } from '../slices/channelsSlice.js';
import { selectors as messagesSelectors } from '../slices/messagesSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { actions as uiActions } from '../slices/uiSlice.js';
import useAuth from '../hooks/useAuth.jsx';
import { useSelector, useDispatch } from 'react-redux';
import getModal from './modals/index.jsx'
import { Container, Row, Col } from 'react-bootstrap';
import ChatButton from './ChatButton.jsx'
import routes from '../routes.js';
import ChatMessage from './ChatMessage.jsx';
import NewChatMessage from './NewChatMessage.jsx';
import { toast } from 'react-toastify';
import toastParams from './toastParams.js';
import { useTranslation } from 'react-i18next';
import fetcheData from '../slices/fetcheData.js'

const renderModal = ({ modalInfo, hideModal }) => {
  if (!modalInfo.type) {
    return null;
  }
  const Component = getModal(modalInfo.type)
  return (
    <Component modalInfo={modalInfo} onHide={hideModal} />
  );
};

const ChatPage = () => {
  const auth = useAuth();
  const dispatch = useDispatch();

  const channels = useSelector(channelsSelectors.selectAll);
  console.log(channels)

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchInitialData());
  }, []);
      
  

  const handleClick = (channel) => {
    dispatch(uiActions.setCurrentChannelId(channel.id))
  };

  // const messages = useSelector((state) => Object.values(state.messagesReducer.entities));
  const messages = useSelector(messagesSelectors.selectAll)
  const currChannelMessages = messages.filter((message) => message.channelId === currentChannelId);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [currChannelMessages]);
  
  const [modalInfo, setModalInfo] = useState({ type: null, channel: null });
  const hideModal = () => setModalInfo({ type: null, channel: null });
  const showModal = (type, channel = null) => setModalInfo({ type, channel })

  // const channels = useSelector((state) => Object.values(state.channelsReducer.entities))

  const { currentChannelId } = useSelector((state) => state.channels.currChannelIdx )
  const currChannel = channels.find((channel) => channel.id === currentChannelId);
  console.log(channels)
  
    return (
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
      <Col xs={4} md="2" className="border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>
              {'channels'}
            </span>
            <button onClick={() => showModal('adding')} type="button" className="p-0 text-primary btn btn-group-vertical">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
              <span className="visually-hidden">+</span>
            </button>
          </div>
          <ul className="nav flex-column nav-pills nav-fill px-2">
            {channels.map((channel) => (
              <li className="nav-item w-100" key={channel.id}>
                <ChatButton
                  channel={channel}
                  handleClick={handleClick}
                  showModal={showModal}
                />
              </li>
            ))}
          </ul>
        </Col>
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>
                  #&nbsp;
                  {currChannel ? currChannel.name : ''}
                </b>
              </p>
              <span className="text-muted">
                { currChannelMessages.length }
              </span>
            </div>
            <div className="chat-messages overflow-auto px-5 " id="messages-box">
              {currChannelMessages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
            <NewChatMessage currChannelId={currChannel ? currChannel.id : ''} username={auth.username} />
          </div>
        </Col>
      </Row>
      {renderModal({ modalInfo, hideModal })}
    </Container>
  );
};

export default ChatPage;
