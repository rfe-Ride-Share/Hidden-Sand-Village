import React, { useState, useEffect } from 'react';
const { io } = require('socket.io-client');
const socket = io.connect('http://localhost:3001');

function Conversation() {
  const [message, setMessage] = useState('');
  const [messageReceived, setmessageReceived] = useState('');

  const sendMessage = (event) => {
    event.preventDefault();
    socket.emit('send_message', {
      message: message,
    });
    event.target.reset();
  };
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setmessageReceived(data.message);
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
