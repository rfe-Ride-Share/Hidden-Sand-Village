import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';

function changeUserStatusOnTrip(trip, user) {
  let passengers = trip.passengers;

  for (let currentIndex = 0; currentIndex < passengers.length; currentIndex++) {
    const passenger = passengers[currentIndex];
    if (user.email === passenger.email) {
      passenger.status = "upcoming";
    }
  }

  return passengers;
}

function confirmRiderToTrip(trip, user) {
  const newPassengers = changeUserStatusOnTrip(trip, user);

  axios({
    url: '/tripp',
    method: 'put',
    data: { passengers: newPassengers },
    params: { _id: trip._id },
  })
    .then((response) => {
      console.log(response);
      window.location.replace('http://localhost:3000/');
    })
    .catch((error) => {
      console.log(error);
      window.location.replace('http://localhost:3000/');
    });
}

function AcceptButton({ trip, user }) {
  return(
    <Button
      variant="contained"
      size="small"
      sx={{
        borderRadius: '12px',
        backgroundColor: '#2FDD92',
      }}
      onClick={() => {
        confirmRiderToTrip(trip, user);
      }}
    >
      <CheckIcon />
    </Button>
  );
}

export default AcceptButton;
