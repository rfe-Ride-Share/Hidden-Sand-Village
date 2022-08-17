import React from 'react';
import styled from 'styled-components';
import {format} from 'timeago.js';

//import Moment from 'react-moment';
// import moment from 'moment';

//pass in message obj and owner. classname/css changes based on sender or reciever.
//time will be formatted based on details sent in message obj. Comment out if you want to see a preview of what the Messages will look like.
//We need users profile photo in message obj
export default function Message({ message, own }) {
  return (
    <Messages>
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={message.photo}
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>

      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
    </Messages>
  );
}
// {format(message.createdAt)}
const Messages = styled.div`
.message{
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.messageTop{
    display: flex;
}

.messageImg {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
}

.messageText{
    padding: 10px;
    border-radius: 20px;
    background-color: #1877f2;
    color: white;
    max-width: 300px;
}

.messageBottom{
    font-size: 12px;
    margin-top: 10px;
}

.message.own{
    align-items: flex-end;
}

.message.own .messageText{
    background-color: rgb(245, 241, 241);
    color: black;
}
`