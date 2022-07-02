import React, { createContext } from 'react';
import { useDispatch } from 'react-redux';
import { actions as channelsAction } from '../slices/channelsSlice.js';
import { actions as messagesAction } from '../slices/messagesSlice.js';
import { actions as currentChannelActions } from '../slices/uiSlice.js';

export const ChatContext = createContext({});

const chatApiProvider = ({ children, socket }) => {
    const dispatch = useDispatch();

    const addNewChannel = (channel) => socket.emit('newChannel', channel, (data) => {
       if (data.status === 'ok') {
           dispatch(currentChannelActions.setCurrentChannelId(data.data.id));
       }
    })

    socket.on('newChannel', (newchannel) => {
        dispatch(channelsAction.addChannel(newChannel));
    });
    
    const createNewChatMessage = (message) => socket.emit('newMessage', message, (data) => {
        console.log(data);
    });

    socket.on('newMessage', (message) => {
        dispatch(messagesAction.addMessage(message));
    });

    const renameChannel = (channel, input) => socket.emit(
        'renameChannel',
        { id: channel.id, name: input.name },
        (data) => {
            console.log(data);
        },
    );

    socket.on('renameChannel', (renamedChannel) => {
        dispatch(channelsAction.updateChannel({
           id: renamedChannel.id,
           changes: { ...renamedChannel, name: renamedChannel.id }
        }));
    });

    const removeChannel = (channel) => socket.emit(
        'removeChannel',
        { id: channel.id },
        (data) => {
            console.log(data)
        });

    socket.on('removeChannel', (removedChannel) => {
        dispatch(channelsAction.removeChannel(removedChannel.id));
    });
    
    return (
        <ChatContext.Provider value={{
            addNewChannel, createNewChatMessage, renameChannel, removeChannel
        }}
        >
            {children}
        </ChatContext.Provider>
    )
};

export default chatApiProvider;
