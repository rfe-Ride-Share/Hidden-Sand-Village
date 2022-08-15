import React from 'react';
import styled from 'styled-components';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

function RemoveRiderButton() {
  return(
    <Button
      variant="contained"
      size="small"
      sx={{
        borderRadius: '12px',
        minHeight: 33,
        backgroundColor: '#DF3062',
      }}
      onClick={() => {
        console.log('Remove rider functionality placeholder for Driver View. need to change remove-rider-button.jsx');
      }}
    >
      <DeleteIcon />
    </Button>
  );
}

export default RemoveRiderButton;
