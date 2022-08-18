import * as React from 'react';
import Button from '@mui/material/Button';

function CancelButton({ onClick }) {
  return (
      <Button
        variant="contained"
        sx={{
          width: '150px',
          height: '50px',
          borderRadius: '15px',
          backgroundColor: '#DF3062',
        }}
        onClick={onClick}
      >
          Cancel
      </Button>
  );
}

export default CancelButton;
