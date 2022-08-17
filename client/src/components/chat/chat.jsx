import React from 'react';
import Conversation from './conversation.jsx';
import Message from './Message.jsx';

function Chat() {
  return (
    <div className="chat">
      <Conversation></Conversation>
      <Message></Message>
    </div>
  );
}

export default Chat;
