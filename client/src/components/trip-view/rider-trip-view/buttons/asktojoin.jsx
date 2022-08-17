import * as React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function AskToJoin({ tripInfo = {} }) {
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
          <Link to='/confirm' state={tripInfo}>Ask to Join</Link>
      </Button>
  );
}

export default AskToJoin;
