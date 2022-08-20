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
import { useLocation, Link } from 'react-router-dom';

import MapDirections from '../search-view/mapDirections';
import RiderEntry from './rider-entry';

export default function TripView({ tripInfo = {} }) {
  const location = useLocation();
  tripInfo = location.state;
  const [userData, setUserData] = React.useState({});
  const [rating, setRating] = React.useState(0);
  const [status, setStatus] = React.useState('nope');

  const now = new Date();
  const tripDate = new Date(tripInfo.depart_time);
  const isPast = now.getTime() - tripDate.getTime() > 0;

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
            total += review.stars;
          });
          setRating(total / count);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const acceptedRiders = tripInfo.passengers.filter(
    (rider) => rider.status === 'upcoming'
  );
  const pendingRiders = tripInfo.passengers.filter(
    (rider) => rider.status === 'pending'
  );

  let riderList;
  let riderButtons;
  if (user.email) {
    let isDriver = user.email === tripInfo.driver_email;
    if (isDriver) {
      if (!isPast) {
        riderList = (
          <RiderList
            acceptedRiders={acceptedRiders}
            pendingRiders={pendingRiders}
            isPast={isPast}
            tripInfo={tripInfo}
          />
        );
        riderButtons = (
          <Button
            sx={{ backgroundColor: '#DF3062', borderRadius: 2 }}
            variant="contained"
            onClick={() => removeRiderFromTrip(tripInfo, user)}
          >
            Cancel Trip
          </Button>
        );
      } else {
        riderButtons = (
          <Link
            to="/review"
            style={{ textDecoration: 'none', color: 'white' }}
            state={tripInfo}
          >
            <Button
              sx={{ backgroundColor: '#F5B935', borderRadius: 2 }}
              variant="contained"
            >
              Review
            </Button>
          </Link>
        );
      }
    } else {
      React.useEffect(() => {
        tripInfo.passengers.forEach((rider) => {
          if (rider.email === user.email) {
            setStatus(rider.status);
          }
        });
      }, []);

      if (isPast) {
        if (status !== 'nope') {
          riderButtons = (
            <Link
              to="/review"
              style={{ textDecoration: 'none', color: 'white' }}
              state={tripInfo}
            >
              <Button
                sx={{ backgroundColor: '#F5B935', borderRadius: 2 }}
                variant="contained"
              >
                Review
              </Button>
            </Link>
          );
        }
      } else {
        if (status === 'nope') {
          riderButtons = (
            <Link
              to="/confirm"
              state={tripInfo}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <Button
                sx={{ backgroundColor: '#F5B935', borderRadius: 2 }}
                variant="contained"
              >
                Ask to Join
              </Button>
            </Link>
          );
        } else if (status === 'pending') {
          riderButtons = (
            <Link
              to="/confirm-cancel"
              state={tripInfo}
              style={{ 'text-decoration': 'none', color: 'white' }}
            >
              <Button
                sx={{ backgroundColor: '#DF3062', borderRadius: 2 }}
                variant="contained"
              >
                Cancel Request
              </Button>
            </Link>
          );
        } else if (status === 'upcoming') {
          riderButtons = (
            <Button
              sx={{ backgroundColor: '#DF3062', borderRadius: 2 }}
              variant="contained"
              onClick={() => removeRiderFromTrip(tripInfo, user)}
            >
              Leave Trip
            </Button>
          );
        }
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
            Date: {moment(tripInfo.depart_time).format('MMM Do YYYY h:mm a')}
          </Typography>
          <Typography sx={{ m: 1.5 }} color="text.secondary">
            From: {tripInfo.departure}
          </Typography>
          <Typography sx={{ m: 1.5 }} color="text.secondary">
            To: {tripInfo.destination}
          </Typography>
          <Typography variant="body2" sx={{ ml: 1.5 }}>
            Total Cost: ${tripInfo.price.toFixed(2)}
            <br />
            Rider Cost $
            {(tripInfo.price / (tripInfo.passenger_capacity + 1)).toFixed(2)} -
            ${(tripInfo.price / 2).toFixed(2)}
            <br />
            Remaining Seats:{' '}
            {tripInfo.passenger_capacity - acceptedRiders.length}
          </Typography>
          <br />
          <Typography variant="body2" sx={{ ml: 1.5 }}>
            Driver: {`${userData.first_name} ${userData.last_name}`}
            <br />
            <Rating name="driver rating" value={rating} readOnly />
          </Typography>
        </CardContent>
      </Card>
      {riderButtons}
      {riderList}
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
    accepted = (
      <Typography variant="h6" component="div" sx={{ m: 1.5 }}>
        Accepted Riders
      </Typography>
    );
  }
  return (
    <>
      {pending}
      {pendingRiders.map((rider) => {
        return <RiderEntry key={rider._id} rider={rider} tripInfo={tripInfo} />;
      })}
      {accepted}
      {acceptedRiders.map((rider) => {
        return <RiderEntry key={rider._id} rider={rider} tripInfo={tripInfo} />;
      })}
    </>
  );
}
//still might want to add seats (seats remaining) 👍👍
//also need to do conditional stuff for the link on the trip card in search view if you are not logged in
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
