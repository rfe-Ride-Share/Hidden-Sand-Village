import * as React from 'react';
import Button from '@mui/material/Button';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

function removeRiderFromTrip(trip) {
  const { user } = useAuth0();

  const newPassengers = getPassengersWithoutUser(trip, user);

  axios({
    url: '/tripp',
    method: 'put',
    data: { passengers: newPassengers },
    params: { _id: trip._id },
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

function CancelButton({ trip }) {
  return (
    <Button
      variant="contained"
      sx={{
        width: '150px',
        height: '50px',
        borderRadius: '15px',
        backgroundColor: '#DF3062',
      }}
      onClick={() => removeRiderFromTrip(trip)}
    >
      <Link to='/trips' style={{ textDecoration: 'none', color: 'white' }} >Cancel</Link>
    </Button>
  );
}

export default CancelButton;
