import * as React from 'react';
import Button from '@mui/material/Button';

function AskToJoin() {
  return (
      <Button
        variant="contained"
        sx={{
          width: '250px',
          height: '50px',
          borderRadius: '15px',
          backgroundColor: '#DF3062',
        }}
        onClick={() => {
          console.log('Ask to Join functionality goes here: asktojoin.jsx');
        }}
      >
          Ask to Join
      </Button>
  );
}

export default AskToJoin;
