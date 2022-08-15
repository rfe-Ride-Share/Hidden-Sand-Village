import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function AskToJoin() {
  return (
      <Button
        variant="contained"
        sx={{
          width: '250px',
          height: '50px',
          borderRadius: '15px'
        }}
      >
          Ask to Join
      </Button>
  );
}

export default AskToJoin;
