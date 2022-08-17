import * as React from 'react';
import Button from '@mui/material/Button';

function ConfirmRequest({ isAccepted, setIsConfirmed }) {
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
          if (isAccepted) {
            setIsConfirmed(true);
          }
        }}
      >
          Confirm Request
      </Button>
  );
}

export default ConfirmRequest;
