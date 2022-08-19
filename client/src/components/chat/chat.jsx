import React, { useState, useEffect } from 'react';
import Message from './message.jsx';
import Conversation from './conversation.jsx';
import styled from 'styled-components';
import axios from 'axios';
import ChatList from './chat-list/chat-list.jsx';
import Chatbox from './chatbox.jsx';
import Group from './group.jsx';
import { useAuth0 } from '@auth0/auth0-react';
import {io} from 'socket.io-client';

//user details from auth//
// email: "cheyenne.cornett22@gmail.com"
// email_verified: true
// family_name: "Cornett"
// given_name: "Cheyenne"
// locale: "en"
// name: "Cheyenne Cornett"
// nickname: "cheyenne.cornett22"
// picture: "https://lh3.googleusercontent.com/a-/AFdZucojswNawy0dwX6pmXOHeM7Ma4LsPaGkHznF0F7jyw=s96-c"
// sub: "google-oauth2|103152931685808757218"
// updated_at: "2022-08-17T20:32:24.841Z"

function Chat() {
  const { user } = useAuth0();

  // console.log(user);

  //grab details from useEffect db GET
  const [currentUser, setCurrentUser] = useState('');

  console.log('currentUser', currentUser);

  const [tripConversations, setTripConversations] = useState(null);
  const [currentChat, setCurrentChat] = useState('');

  console.log('current chat', currentChat)

  const [friend, setFriend] = useState({first_name: '',
  last_name: '',
  user_photo: '',
});

  useEffect(() => {
    const getTripConversations = async () => {
      try {
        const res = await axios.get('/conversations/' + currentUser._id);
        // console.log(res);
        setTripConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getTripConversations();
  }, [currentUser._id]);

  console.log('tripConvos', tripConversations);

  useEffect(() => {
    axios
      .get(`/userr?email=${user.email}`)
      .then((res) => {
        console.log('res from email is', res);
        setCurrentUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);


  useEffect(() => {

    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?.conversation_id);
        setMessages(res.data);
      } catch (err) {
        console.log(err)
      }
    };
    getMessages();


}, [currentChat]);

  const [messages, setMessages] = useState([]);

  // {tripConversations.map((c) => (
  //   <div onClick={() => {setCurrentChat(c)}}>
  //   <Group convo={c} currentUser={currentUser} friend={friend} setFriend={setFriend}/>
  //   </div>
  //    ))}
return tripConversations === null ? <p>TEST</p> : (
  <ChatWrapper>
    <div className="messenger">
 <div className="chatMenu">
  <div className="chatMenuWrapper">
    <ChatList
      conversations={tripConversations}
      currentUser={currentUser}
      setCurrentChat={setCurrentChat}
      />
        {/* {tripConversations.map((c) => (
    <div onClick={() => {setCurrentChat(c)}}>
    <Group convo={c} currentUser={currentUser} friend={friend} setFriend={setFriend}/>
    </div>
     ))} */}
  </div>
 </div>
  <div className="chatBox">
    <div className="chatBoxWrapper">
      <div className="chatBoxTop">
      {messages.map((m) => (

        <Message message={m} own={m.sender === currentUser._id} currentUser={currentUser} currentChat={currentChat}/>

         ))}
          </div>
          <div className="chatBoxBottom">

          <Conversation currentUser={currentUser} currentChat={currentChat} setMessages={setMessages} messages={messages}/>
          </div>

        </div>

      </div>
      </div>


    </ChatWrapper>
  );
}

const ChatWrapper = styled.div`
  .messenger {
    height: calc(100vh - 70px);
    display: flex;
  }

  .chatMenu {
    flex: 3.5;
  }

  .chatMenuInput {
    width: 90%;
    padding: 10px 0;
    border: none;
    border-bottom: 1px solid gray;
  }

  .chatBox {
    flex: 5.5;
  }

  .chatBoxWrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
  }

  .chatBoxTop {
    height: 100%;
    overflow-y: scroll;
    padding-right: 10px;
  }

  .chatBoxBottom {
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .chatMessageInput {
    width: 80%;
    height: 90px;
    padding: 10px;
  }

  .chatSubmitButton {
    width: 70px;
    height: 40px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: teal;
    color: white;
  }

  .chatOnline {
    flex: 3;
  }

  .chatMenuWrapper,
  .chatBoxWrapper,
  .chatOnlineWrapper {
    padding: 10px;
    height: 100%;
  }

  .noConversationText {
    position: absolute;
    top: 10%;
    font-size: 50px;
    color: rgb(224, 220, 220);
    cursor: default;
  }

  @media screen and (max-width: 768px) {
    .chatMenu {
      flex: 1;
    }

    .chatMenuInput {
      display: none;
    }

    .chatBox {
      flex: 10;
    }

    .chatOnline {
      flex: 1px;
    }
  }
`;

//SCHEMAS
// const ConversationSchema = new mongoose.Schema(
//   {
//     members: {
//       type: Array,
//     },
//   },
//   { timestamps: true }
// );
//module.exports = mongoose.model("Conversation", ConversationSchema);

// const MessageSchema = new mongoose.Schema(
//   {
//     conversationId: {
//       type: String,
//     },
//     sender: {
//       type: String,
//     },
//     text: {
//       type: String,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Message", MessageSchema);

export default Chat;
// <div>Ian is the GOAT</div>
