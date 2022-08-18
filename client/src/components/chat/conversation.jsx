import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const { io } = require('socket.io-client');
const socket = io.connect('http://localhost:3001');


function Conversation(props) {
  const [message, setMessage] = useState('');
  const [messageReceived, setmessageReceived] = useState('');
  const { user } = useAuth0();
  const [conversation_id, setConversationId] = useState('');

  const sendMessage = (event) => {
    event.preventDefault();
    socket.emit('send_message', {
      message: message,
      sender: 'Whoever is logged in',
      conversation_id: '2',
      photo: 'https://res.cloudinary.com/dr8hijrgb/image/upload/v1660703247/C547C05C-D21D-47E6-9916-1C2A1C8DE2F7_1_105_c_i9v47y.jpg',
      createdAt: new Date(),
      user_id: '1'
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
