import React from 'react';
import styled from 'styled-components';
import { format, render, cancel, register } from 'timeago.js';


export default function Message({ message, own }) {
  return (
    <Messages>
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://res.cloudinary.com/dr8hijrgb/image/upload/v1660703247/C547C05C-D21D-47E6-9916-1C2A1C8DE2F7_1_105_c_i9v47y.jpg"
          alt=""
        />
        <p className="messageText">Hey Nymeria! Wanna ride together to the dog park??</p>
      </div>
      <div className="messageBottom">{format(Date.now())}</div>
    </div>
    </Messages>
  );
}
//"https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
//https://res.cloudinary.com/dr8hijrgb/image/upload/v1660703247/C547C05C-D21D-47E6-9916-1C2A1C8DE2F7_1_105_c_i9v47y.jpg
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