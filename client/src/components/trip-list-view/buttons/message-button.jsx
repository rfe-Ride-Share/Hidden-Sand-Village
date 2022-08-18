import * as React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

function MessageButton() {
  return (
      <Button
        variant="contained"
        sx={{
          width: '150px',
          height: '50px',
          borderRadius: '15px',
          backgroundColor: '#11ABC1',
        }}
        onClick={() => {
          console.log('Message functionality goes here: trip-list-view/buttons/message-button.jsx');
        }}
      >
          <Link to='/chat' style={{ textDecoration: 'none', color: 'white' }}>Message</Link>
      </Button>
  );
}

export default MessageButton;
