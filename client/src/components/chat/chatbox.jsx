import React, {useState, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styled from 'styled-components'

export default function Chatbox(props) {

  return (
    <ChatBox>



      <TextField

          id="outlined-size-small"
          placeholder="Message..."
          size="small"
          className="chat-input"
          onChange={(e)=> props.setNewMessage( e.target.value)}
        />
        <Button variant="contained" size="small" className="send" defaultValue="...." onClick={() =>{console.log(props.newMessage)}}>
          Send
        </Button>

    </ChatBox>
  )
}


const ChatBox = styled.div`
margin-left: 80px;
.send {
  margin-top: 6px;
  margin-left: 3px;
  height: 30px;
}



`