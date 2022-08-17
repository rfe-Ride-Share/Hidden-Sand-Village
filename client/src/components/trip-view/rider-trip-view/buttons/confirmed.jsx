import * as React from 'react';
import axios from 'axios';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function addPendingUserToTrip() {
  // get user email
  // grab user data by email

  // build rider object
  // add rider to the end of passengers of trip

  // update trip with the new rider
}

function Confirmed({ tripInfo }) {
  return (
      <Button
        variant="contained"
        sx={{
          width: '250px',
          height: '50px',
          borderRadius: '15px',
          backgroundColor: '#11ABC1',
        }}
      >
          Confirmed
      </Button>
  );
}

export default Confirmed;
