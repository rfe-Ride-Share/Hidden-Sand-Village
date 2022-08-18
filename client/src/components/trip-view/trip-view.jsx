import * as React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useAuth0 } from '@auth0/auth0-react';
import moment from 'moment';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import MapDirections from '../search-view/mapDirections';
import RiderEntry from './rider-entry';

export default function TripView({ tripInfo = {} }) {
  const location = useLocation();
  tripInfo = location.state;
  const [userData, setUserData] = React.useState({});
  const [rating, setRating] = React.useState(0);
  const [status, setStatus] = React.useState('nope');

  const { user } = useAuth0();

  React.useEffect(() => {
    axios
      .get(`/userr?email=${tripInfo.driver_email}`)
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

  const acceptedRiders = tripInfo.passengers.filter(
    (rider) => rider.status === 'accepted'
  );
  const pendingRiders = tripInfo.passengers.filter(
    (rider) => rider.status === 'pending'
  );

  let riderList;
  let riderButtons;
  if (user.email) {
    let isDriver = user.email === tripInfo.driver_email;
    if (isDriver) {
      riderList = (
        <RiderList
          tripInfo={tripInfo}
          acceptedRiders={acceptedRiders}
          pendingRiders={pendingRiders}
        />
      );
    } else {
      tripInfo.passengers.forEach((rider) => {
        if (rider.email === user.email) {
          setStatus(rider.status);
        }
      });

      if (status === 'nope') {
        riderButtons = (
          <Button
            sx={{ backgroundColor: '#F5B935', borderRadius: 2 }}
            variant="contained"
          >
            Ask to Join
          </Button>
        );
      } else if (status === 'pending') {
        riderButtons = (
          <Button
            sx={{ backgroundColor: '#DF3062', borderRadius: 2 }}
            variant="contained"
          >
            Cancel Request
          </Button>
        );
      } else if (status === 'upcoming') {
        riderButtons = (
          <Button
            sx={{ backgroundColor: '#DF3062', borderRadius: 2 }}
            variant="contained"
          >
            Leave Trip
          </Button>
        );
      }
    }
  }

  return (
    <Container
      sx={{
        padding: '1px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{
          width: '100%',
          minWidth: 350,
          margin: '13px',
          backgroundColor: '#F7F7F7',
          borderRadius: '1%',
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <MapDirections
            startPos={tripInfo.depart_coord}
            destPos={tripInfo.dest_coord}
          />
          <Typography variant="h6" component="div" sx={{ m: 1.5 }}>
            {tripInfo.title}
          </Typography>
          <Typography sx={{ m: 1.5 }} color="text.secondary">
            {tripInfo.description}
          </Typography>
          <Typography
            sx={{ fontSize: 14, ml: 1.5 }}
            color="text.secondary"
            gutterBottom
          >
            Date: {moment(tripInfo.date).format('MMM Do YY h:mm a')}
          </Typography>
          <Typography sx={{ m: 1.5 }} color="text.secondary">
            From: {tripInfo.destination}
          </Typography>
          <Typography sx={{ m: 1.5 }} color="text.secondary">
            To: {tripInfo.departure}
          </Typography>
          <Typography variant="body2" sx={{ ml: 1.5 }}>
            Total Cost: ${tripInfo.price.toFixed(2)}
            <br />
            Rider Cost $
            {(tripInfo.price / tripInfo.passenger_capacity).toFixed(2)} - $
            {(tripInfo.price / 2).toFixed(2)}
          </Typography>
          <Typography variant="body2" sx={{ ml: 1.5 }}>
            Driver: {`${userData.first_name} ${userData.last_name}`}
            <br />
            <Rating name="driver rating" value={rating} readOnly />
          </Typography>
        </CardContent>
      </Card>
      {riderList}
      {riderButtons}
    </Container>
  );
}

function RiderList({ pendingRiders, acceptedRiders, tripInfo }) {
  let pending;
  if (pendingRiders.length > 0) {
    pending = (
      <Typography variant="h6" component="div" sx={{ m: 1.5 }}>
        Pending Riders
      </Typography>
    );
  }

  let accepted;
  if (acceptedRiders.length > 0) {
    console.log(acceptedRiders);
    accepted = (
      <Typography variant="h6" component="div" sx={{ m: 1.5 }}>
        Accepted Riders
      </Typography>
    );
  }
  return (
    <>
      {pending}
      {tripInfo.passengers.map((rider) => {
        return <RiderEntry key={rider._id} rider={rider} />;
      })}
      {accepted}
      {tripInfo.passengers.map((rider) => {
        <RiderEntry key={rider._id} rider={rider} />;
      })}
    </>
  );
}
//we need total seats
//current riders
//we need to change the ask to join button when riders >= seats
//const acceptedRiders = tripInfo.passengers.filter(rider.status === 'accepted')
//const pendingRiders = tripInfo.passengers.filter(rider.status === 'pending')

// const now = new Date();
//         const tripDate = new Date(trip.date);

//         const isPast = (now.getTime() - tripDate.getTime()) > 0;