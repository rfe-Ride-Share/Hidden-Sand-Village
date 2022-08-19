import React, { useState, useEffect } from 'react';
import Message from './message.jsx';
import Conversation from './conversation.jsx';
import styled from 'styled-components';
import axios from 'axios';
import ChatList from './chat-list/chat-list.jsx';
import Chatbox from './chatbox.jsx';
import Group from './group.jsx';
import { useAuth0 } from '@auth0/auth0-react';

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

  const [tripConversations, setTripConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState('');

  console.log('current chat', currentChat)

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
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const [messages, setMessages] = useState([
    {
      message: 'Hey, I want to join your trip! Tell me more about it.',
      photo:
        'https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Fmobile%2F000%2F013%2F564%2Fdoge.jpg',
      createdAt: new Date(),
      user_id: '1',
      conversation_id: '1',
    },
    {
      message:
        'Hi! We would be taking all back roads to avoid tolls. How do you feel about that?',
      photo:
        'https://res.cloudinary.com/dr8hijrgb/image/upload/v1660703247/C547C05C-D21D-47E6-9916-1C2A1C8DE2F7_1_105_c_i9v47y.jpg',
      createdAt: new Date(),
      user_id: '62fe5eb39f6feb4f2095257b',
      conversation_id: '0',
    },
  ]);

  return (
  <ChatWrapper>
    <div className="messenger">

   {tripConversations.map((c) => (
<div onClick={() => {setCurrentChat(c)}}>
<Group convo={c} currentUser={currentUser}/>
</div>
 ))}
  <div className="chatBox">
    <div className="chatBoxWrapper">
      <div className="chatBoxTop">

      {messages.map((m) => (

        <Message message={m} own={m.user_id === currentUser._id}/>

         ))}
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
