import React from 'react';
import styled from 'styled-components';

import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';

function RejectButton() {
  return(
    <Button
      variant="contained"
      size="small"
      sx={{
        borderRadius: '12px',
        backgroundColor: '#DF3062',
      }}
      onClick={() => {
        console.log('Reject rider functionality placeholder for Driver View. need to change reject-button.jsx');
      }}
    >
      <ClearIcon />
    </Button>
  );
}

export default RejectButton;
