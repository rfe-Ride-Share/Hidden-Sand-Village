import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const { io } = require('socket.io-client');
const socket = io.connect('http://localhost:3001');


function Conversation(props) {

  const currUser = props.user;
  console.log(currUser)
  const [message, setMessage] = useState('');
  const [messageReceived, setmessageReceived] = useState('');

  const [conversation_id, setConversationId] = useState('');

  const sendMessage = (event) => {
    event.preventDefault();
    socket.emit('send_message', {
      message: message,
      sender: props.currentUser._id,
      conversation_id: '2',
      photo: props.currentUser.user_photo,
      createdAt: new Date(),

    });

    event.target.reset();
  };
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setmessageReceived(data.message);
      console.log('data bounced back', data)
      props.setMessages(props.messages.concat(data))

    });
  }, [socket]);

  return (
    <div>
      <div>{messageReceived}</div>
      <form onSubmit={sendMessage}>
        <input
          placeholder="send message..."
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></input>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Conversation;
