import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';

function getPassengersWithoutUser(trip, user) {
  let passengers = trip.passengers;

  for (let currentIndex = 0; currentIndex < passengers.length; currentIndex++) {
    const passenger = passengers[currentIndex];
    if (user.email === passenger.email) {
      passengers.splice(currentIndex, 1);
    }
  }

  return passengers;
}

function removeRiderFromTrip(trip, user) {
  const newPassengers = getPassengersWithoutUser(trip, user);

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

function RejectButton({ trip, user }) {
  return (
    <Button
      variant="contained"
      size="small"
      sx={{
        borderRadius: '12px',
        backgroundColor: '#DF3062',
      }}
      onClick={() => {
        removeRiderFromTrip(trip, user);
      }}
    >
      <ClearIcon />
    </Button>
  );
}

export default RejectButton;
