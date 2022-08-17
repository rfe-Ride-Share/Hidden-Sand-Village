import React, {useState, useEffect} from 'react';
import Message from './message.jsx'
import Conversation from './conversation.jsx';
import styled from 'styled-components'

import ChatList from './chat-list/chat-list.jsx';
import Chatbox from './chatbox.jsx'


//converstion_id
//sender_id
//reciever_id


//message_id
//user_id
//text
//date/time created


function Chat() {


const [newMessage, setNewMessage] = useState('')
const [currentUser, setCurrentUser] = useState('1');
const [conversations, setConversations] = useState([]);
const [currentChat, setCurrentChat] = useState('1');


const [messages, setMessages] = useState([{
  text: "Hey, I want to join your trip! Tell me more about it.",
  photo: 'https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Fmobile%2F000%2F013%2F564%2Fdoge.jpg',
  createdAt: new Date(),
   user_id: '1',
   conversation_id: '1'
}, {
  text: "Hi! We would be taking all back roads to avoid tolls. How do you feel about that?",
  photo: 'https://res.cloudinary.com/dr8hijrgb/image/upload/v1660703247/C547C05C-D21D-47E6-9916-1C2A1C8DE2F7_1_105_c_i9v47y.jpg',
  createdAt: new Date(),
  user_id: '2',
  conversation_id: '0'
}]);

console.log(newMessage)

  const profileInfo = {
    first_name: 'Nymeria',
    user_photo: 'https://res.cloudinary.com/dr8hijrgb/image/upload/v1660703247/C547C05C-D21D-47E6-9916-1C2A1C8DE2F7_1_105_c_i9v47y.jpg',
  }


  const users = [];

  for (let currentIndex = 0; currentIndex < 1; currentIndex++) {
    users.push(profileInfo);
  }







  return (
    // <ChatWrapper>
    // <div className="chatBoxWrapper">
    //   <ChatList users={users} />
    //   <Conversation></Conversation>
  <ChatWrapper>
    <div className="messenger">
    <ChatList users={users} />
  <div className="chatBox">
    <div className="chatBoxWrapper">
      <div className="chatBoxTop">

      {messages.map((m) => (

        <Message message={m} own={m.user_id === currentUser}/>

         ))}



          </div>
          <div className="chatBoxBottom">
           <Chatbox setNewMessage={setNewMessage} newMessage={newMessage}/>
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

  .chatBox{
    flex: 10;
  }

  .chatOnline{
    flex: 1px;
  }
}

`


export default Chat;
// <div>Ian is the GOAT</div>


