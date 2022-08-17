import * as React from 'react';
import Button from '@mui/material/Button';

function ConfirmRequestButton({ isAccepted, setIsConfirmed }) {
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
          console.log('notifying the driver of a request goes here in confirm-request-button.jsx');
          if (isAccepted) {
            setIsConfirmed(true);
          }
        }}
      >
          Confirm Request
      </Button>
  );
}

export default ConfirmRequestButton;
