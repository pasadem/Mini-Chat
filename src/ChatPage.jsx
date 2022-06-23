// @ts-check

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import routes from './routes.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const ChatPage = () => {
// BEGIN (write your solution here)
  const [user, setUserId] = useState(['user']);
  console.log('user')
  
    return (
      <>
        <div>
          {'user'}
        </div>
      </>
    )
  }
// END


export default ChatPage;
