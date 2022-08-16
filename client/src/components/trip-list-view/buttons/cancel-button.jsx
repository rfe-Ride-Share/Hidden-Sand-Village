import * as React from 'react';
import Button from '@mui/material/Button';

function CancelButton() {
  return (
      <Button
        variant="contained"
        sx={{
          width: '150px',
          height: '50px',
          borderRadius: '15px',
          backgroundColor: '#DF3062',
        }}
        onClick={() => {
          console.log('Cancel functionality goes here: trip-list-view/buttons/cancel-button.jsx');
        }}
      >
          Cancel
      </Button>
  );
}

export default CancelButton;
