import React from 'react';
import styled from 'styled-components'


export default function Message({ message, own }) {
  return (
    <Messages>
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <p className="messageText">This is a test to see if the css works</p>
      </div>
      {/* <div className="messageBottom">{format(message.createdAt)}</div> */}

    </div>
    </Messages>
  );
}


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
}`