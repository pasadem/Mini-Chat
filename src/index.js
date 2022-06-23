// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';

import ReactDOM from 'react-dom';
import Component from './App.jsx';
import React from 'react'

const runApp = () => {
  const container = document.querySelector('#chat');

  // const InitiatedApp = init(socketClient());

  ReactDOM.render(
    <Component />,
    container,
  );
};

runApp();

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}


