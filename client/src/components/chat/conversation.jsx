import React, { useState, useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const { io } = require('socket.io-client');
// const socket = io.connect('http://localhost:3001');

function Conversation(props) {
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messageReceived, setmessageReceived] = useState('');
  // const [messages, setMessages] = useState([]);
  const [conversation_id, setConversationId] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();

  const user = props.currentUser;
  const currentChat = props.currentChat;

  useEffect(() => {
    socket.current = io('ws://localhost:8900');
    socket.current.on('getMessage', (data) => {
      console.log('message receive', data);
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      props.setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  const sendMessage = (event) => {
    event.preventDefault();

    const messageObj = {
      sender: props.currentUser._id,
      text: message,
      conversationId: props.currentChat._id,
    };

    // socket.emit('send_message', {
    //   text: message,
    //   sender: props.currentUser._id,
    //   conversationId: props.currentChat._id,
    // });

    axios
      .post('/messages', messageObj)
      .then((res) => {
        props.setMessages(props.messages.concat(res.data));
        console.log(res);
      })
      .catch((err) => console.error(err));
    setMessage();
    event.target.reset();
  };
  // useEffect(() => {
  //   socket.on('receive_message', (data) => {
  //     setmessageReceived(data.message);
  //     console.log('data bounced back', data)
  //     // props.setMessages(props.messages.concat(data))

  //   });
  // }, [socket]);

  return (
    <div>
      <form onSubmit={sendMessage}>
        <TextField
          placeholder="send message..."
          size="small"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></TextField>
        <Button type="submit" variant="outlined">
          Send
        </Button>
      </form>
    </div>
  );
}

export default Conversation;
