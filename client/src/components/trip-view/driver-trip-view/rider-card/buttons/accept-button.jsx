import React from 'react';
import styled from 'styled-components';

import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';

function AcceptButton() {
  return(
    <Button
      variant="contained"
      size="small"
      sx={{
        borderRadius: '12px',
        backgroundColor: '#2FDD92',
      }}
      onClick={() => {
        console.log('Accept rider functionality placeholder for Driver View. need to change accept-button.jsx');
      }}
    >
      <CheckIcon />
    </Button>
  );
}

export default AcceptButton;
