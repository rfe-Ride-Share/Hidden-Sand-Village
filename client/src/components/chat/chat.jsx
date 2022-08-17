import React from 'react';
import Message from './Message.jsx'
import Conversation from './conversation.jsx';


import ChatList from './chat-list/chat-list.jsx';

function Chat() {
  const profileInfo = {
    first_name: 'Nymeria',
    user_photo: 'https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Fmobile%2F000%2F013%2F564%2Fdoge.jpg',
  }

  const users = [];

  for (let currentIndex = 0; currentIndex < 5; currentIndex++) {
    users.push(profileInfo);
  }

  return (
    <div className="chat">
       {/* <ChatList users={users} /> */}
      {/* <Conversation></Conversation> */}
      <Message users={users}></Message>

    </div>
  );
}

export default Chat;
// <div>Ian is the GOAT</div>