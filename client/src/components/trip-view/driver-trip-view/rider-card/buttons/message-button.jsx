import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import MessageIcon from '@mui/icons-material/Message';

function MessageButton() {
  return(
    <Button
      variant="contained"
      size="small"
      sx={{
        borderRadius: '12px',
        backgroundColor: '#11ABC1',
      }}
      onClick={() => {
        console.log('Message functionality placeholder for Driver View. need to change message-button.jsx');
      }}
    >
      <Link to='/chat'><MessageIcon /></Link>
    </Button>
  );
}

export default MessageButton;
