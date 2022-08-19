import * as React from 'react';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import MessageIcon from '@mui/icons-material/Message';

import moment from 'moment';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

export default function RiderEntry({
  rider = {
    email: 'anthony.cella242@gmail.com',
    departure: '100 S Pine St, Abilene, TX 79601, USA',
    destination:
      'Stephen C. Beachy Central Park, 1000 Krenek Tap Rd, College Station, TX 77840, USA',
    status: 'pending',
    _id: '62fe5f8996b965d3df1e58db',
  },
  tripInfo,
}) {
  const [userData, setUserData] = React.useState({});
  const [rating, setRating] = React.useState(0);

  React.useEffect(() => {
    axios
      .get(`/userr?email=${rider.email}`)
      .then((response) => {
        setUserData(response.data);
        let reviews = response.data.reviews;
        let count = reviews.length;

        if (count > 0) {
          let total = 0;
          reviews.forEach((review) => {
            total += review.rating;
          });
          setRating(total / count);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  let acceptedButton;
  if (rider.status !== 'upcoming') {
    acceptedButton = (
      <Button
        onClick={() => confirmRiderToTrip(tripInfo, rider)}
        sx={{ backgroundColor: '#11ABC1' }}
      >
        <CheckIcon sx={{ color: 'white' }} />
      </Button>
    );
  }

  return (
    <Card
      sx={{
        width: '100%',
        minWidth: 350,
        margin: '13px',
        backgroundColor: '#F7F7F7',
        borderRadius: '1%',
      }}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ width: '40%' }}>
          <ProfileImage image={userData.user_photo} />
          <Rating
            sx={{ maxWidth: '100%' }}
            name="rating"
            value={rating}
            readOnly
          />
        </Box>
        <Box sx={{ ml: 1.5, width: '60%' }}>
          <Box
            sx={{
              height: '50%',
              display: 'flex',
            }}
          >
            <Typography variant="body1">
              {`${userData.first_name} ${userData.last_name}`}
              <br />
            </Typography>
          </Box>
          <Box
            sx={{
              height: '48%',
              display: 'flex',
              alignItems: 'flex-end',
            }}
          >
            <Button href="/chat" sx={{ backgroundColor: '#F5B935' }}>
              <MessageIcon sx={{ color: 'white' }} />
            </Button>
            <Button
              onClick={() => removeRiderFromTrip(tripInfo, rider)}
              sx={{ backgroundColor: '#DF3062' }}
            >
              <ClearIcon sx={{ color: 'white' }} />
            </Button>
            {acceptedButton}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function ProfileImage({ image }) {
  return <ProfileImageComponent image={image} />;
}

const ProfileImageComponent = styled.div`
  background-color: #ccc;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  height: 85px;
  width: 85px;
  margin: 10px;
  border-radius: 10px;
`;

function removeRiderFromTrip(trip, user) {
  if (trip.driver_email === user.email) {
    axios({
      url: '/tripp',
      method: 'delete',
      params: { _id: trip._id },
    })
      .then((response) => {
        window.location.replace('http://localhost:3000/');
        console.log(response);
      })
      .catch((error) => {
        window.location.replace('http://localhost:3000/');
        console.log(error);
      });
  } else {
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
}
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

function changeUserStatusOnTrip(trip, user) {
  let passengers = trip.passengers;

  for (let currentIndex = 0; currentIndex < passengers.length; currentIndex++) {
    const passenger = passengers[currentIndex];
    if (user.email === passenger.email) {
      passenger.status = 'upcoming';
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
