import React from 'react';
import styled from 'styled-components';
import Message from './message.jsx'

function Conversation() {
  return (
    <Scroll className="conversation">
      {/* <div>Conversation div</div> */}
      <Message/>
    </Scroll>
  );
}


const Scroll = styled.div`


overflow:scroll;
height:700px;
width:400px;

`

export default Conversation;
