import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios'




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

    const messageObj = {
      sender: props.currentUser._id,
      text: message,
      conversationId: props.currentChat._id,
    }



    socket.emit('send_message', {
      message: message,
      sender: props.currentUser._id,
      conversation_id: '2',
      photo: props.currentUser.user_photo,
      createdAt: new Date(),

    });

    axios.post('/messages', messageObj).then((res) => {
      // props.setMessages([...props.messages, res.data]);
      console.log(res)
    })
    event.target.reset();
  };
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setmessageReceived(data.message);
      console.log('data bounced back', data)
      // props.setMessages(props.messages.concat(data))

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
