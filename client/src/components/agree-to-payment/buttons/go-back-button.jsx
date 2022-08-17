import * as React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function GoBackButton({ trip = {}, text = 'Go Back' }) {
  return (
      <Button
        variant="contained"
        sx={{
          width: '150px',
          height: '50px',
          borderRadius: '15px',
          backgroundColor: '#F5B935',
        }}
        onClick={() => {
          console.log('Go Back functionality goes here: agree-to-payment/buttons/go-back-button.jsx');
        }}
      >
          <Link to='/' >{text}</Link>
      </Button>
  );
}

export default GoBackButton;
