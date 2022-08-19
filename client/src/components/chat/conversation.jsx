import React, { useState, useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
import { io } from "socket.io-client";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';




// const { io } = require('socket.io-client');
// const socket = io.connect('http://localhost:3001');


function Conversation({currentUser, currentChat, setMessages, messages}) {
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messageReceived, setmessageReceived] = useState('');
  // const [messages, setMessages] = useState([]);
  const [conversation_id, setConversationId] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();

  // const user = props.currentUser;
  // const currentChat = props.currentChat;

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", currentUser._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        users.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [currentUser]);


  // useEffect(() => {
  //   const currentChat = props.currentChat;
  //   arrivalMessage &&
  //     currentChat?.members.includes(arrivalMessage.sender) &&
  //     props.setMessages((prev) => [...prev, arrivalMessage]);
  // }, [arrivalMessage, currentChat]);



  // const sendMessage = (event) => {
  //   event.preventDefault();

  //   const messageObj = {
  //     sender: props.currentUser._id,
  //     text: message,
  //     conversationId:  props.currentChat._id,
  //   }



  //   // socket.emit('send_message', {
  //   //   text: message,
  //   //   sender: props.currentUser._id,
  //   //   conversationId: props.currentChat._id,
  //   // });



  //   axios.post('/messages', messageObj).then((res) => {
  //      props.setMessages(props.messages.concat(res.data));
  //      props.setMessages((prev) => [...prev, res.data]);
  //     console.log(res)
  //   })
  //   setMessage();
  //   event.target.reset();
  // };
  // useEffect(() => {
  //   socket.on('receive_message', (data) => {
  //     setmessageReceived(data.message);
  //     console.log('data bounced back', data)
  //     // props.setMessages(props.messages.concat(data))

  //   });
  // }, [socket]);

  ///////////////////


  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?.conversation_id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [setMessages, currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: currentUser._id,
      text: newMessage,
      conversationId: currentChat.conversation_id,
    };

    const receiverId = currentChat._id
    console.log('re', receiverId)


    // const receiverId = currentChat.members.find(
    //   (member) => member !== currentUser._id
    // );

    socket.current.emit("sendMessage", {
        senderId: currentUser._id,
      receiverId,
      text: newMessage,

    });
  //   senderId: user._id,
  //   receiverId,
  //   text: newMessage,
  // }
    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          placeholder="send message..."
          size="small"
          onChange={(e) => {
            setNewMessage(e.target.value);
          }}
        ></TextField>
        <Button type="submit" variant="outlined">Send</Button>
      </form>
    </div>
  );
}

export default Conversation;
