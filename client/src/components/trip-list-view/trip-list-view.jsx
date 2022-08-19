import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import RiderCard from '../trip-view/rider-trip-view/rider-card';

import CancelButton from './buttons/cancel-button';
import MessageButton from './buttons/message-button';
import ReviewButton from './buttons/review-button';
import PaymentButton from './buttons/payment-button';

function getTripsFromUser(user, setListOfTrips) {
  axios.get('/tripp/').then((response) => {
    const userTrips = [];

    const responseTrips = response.data;

    for (const trip of responseTrips) {
      const now = new Date();
      const tripDate = new Date(trip.depart_time);

      const isPast = now.getTime() - tripDate.getTime() > 0;

      if (trip.driver_email === user.email) {
        trip.status = isPast ? 'past' : 'upcoming';

        const acceptedRiders = trip.passengers.filter(
          (rider) => rider.status === 'upcoming'
        );
        if (acceptedRiders.length || !isPast) {
          userTrips.push(trip);
        }
      } else {
        for (const passenger of trip.passengers) {
          if (passenger.email === user.email) {
            trip.status = isPast ? 'past' : passenger.status;
            userTrips.push(trip);
          }
        }
      }
    }

    setListOfTrips(userTrips);
  });
}

function populateLists(
  pendingTrips,
  upcomingTrips,
  pastTrips,
  tripList,
  setListOfTrips
) {
  for (let currentIndex = 0; currentIndex < tripList.length; currentIndex++) {
    const trip = tripList[currentIndex];
    if (trip.status === 'pending') {
      pendingTrips.push(
        <Box
          key={trip._id}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <RiderCard tripInfo={trip} />
          <ButtonRow>
            <CancelButton trip={trip} />
            <MessageButton />
          </ButtonRow>
        </Box>
      );
    } else if (trip.status === 'upcoming') {
      upcomingTrips.push(
        <Box
          key={trip._id}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <RiderCard tripInfo={trip} />
          <ButtonRow>
            <CancelButton trip={trip} />
            <MessageButton />
          </ButtonRow>
        </Box>
      );
    } else {
      pastTrips.push(
        <Box
          key={trip._id}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <RiderCard tripInfo={trip} />
          <ButtonRow>
            <PaymentButton trip={trip} />
            <ReviewButton trip={trip} />
          </ButtonRow>
        </Box>
      );
    }
  }
}

function TripListView() {
  const { user } = useAuth0();

  const [listOfTrips, setListOfTrips] = useState(null);

  const pendingTrips = [];
  const upcomingTrips = [];
  const pastTrips = [];

  if (listOfTrips === null) {
    getTripsFromUser(user, setListOfTrips);
    return null;
  }

  populateLists(
    pendingTrips,
    upcomingTrips,
    pastTrips,
    listOfTrips,
    setListOfTrips
  );
  let pendingHeader, upcomingHeader, pastHeader;
  if (pendingTrips.length > 0) {
    pendingHeader = (
      <Typography variant="h6" component="div" sx={{ m: 1.5, mb: 0 }}>
        Pending Trips
        <br />
      </Typography>
    );
  }
  if (upcomingTrips.length > 0) {
    upcomingHeader = (
      <Typography variant="h6" component="div" sx={{ m: 1.5 }}>
        Upcoming Trips
        <br />
      </Typography>
    );
  }
  if (pastTrips.length > 0) {
    pastHeader = (
      <Typography variant="h6" component="div" sx={{ m: 1.5, mb: 0 }}>
        Past Trips
        <br />
      </Typography>
    );
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
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {pendingHeader}
        {pendingTrips}
        <br />
        {upcomingHeader}
        {upcomingTrips}
        <br />
        {pastHeader}
        {pastTrips}
      </Box>
    </Container>
  );
}

const TripList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonRow = styled.div`
  display: flex;
  width: 90%;
  flex-direction: row;
  justify-content: space-around;
`;

export default TripListView;
// const pastTrip = {
//   title: 'Disney World 2022',
//   driver_email: 'doctormadam.ryderpoole@lol.com',
//   date: '4:00 PM August 27th, 2022',
//   startPoint: '20 W 34th St., New York, NY 10001',
//   endPoint: '3701 Osceola Pkwy, Bay Lake, FL 32830',
//   totalCost: 250,
//   riderCostLow: 25,
//   riderCostHigh: 125,
//   status: 'past',
//   passengers: [1, 2, 3, 4, 5],
// };

// const pendingTrip = {
//   title: 'Disney World 2022',
//   driver_email: 'doctormadam.ryderpoole@lol.com',
//   date: '4:00 PM August 27th, 2022',
//   startPoint: '20 W 34th St., New York, NY 10001',
//   endPoint: '3701 Osceola Pkwy, Bay Lake, FL 32830',
//   totalCost: '$250',
//   riderCostLow: 25,
//   riderCostHigh: 125,
//   status: 'pending',
//   passengers: [1, 2, 3, 4, 5],
// };

// const upcomingTrip = {
//   title: 'Disney World 2022',
//   driver_email: 'doctormadam.ryderpoole@lol.com',
//   date: '4:00 PM August 27th, 2022',
//   startPoint: '20 W 34th St., New York, NY 10001',
//   endPoint: '3701 Osceola Pkwy, Bay Lake, FL 32830',
//   totalCost: '$250',
//   riderCostLow: 25,
//   riderCostHigh: 125,
//   status: 'upcoming',
//   passengers: [1, 2, 3, 4, 5],
// };

// for (let currentIndex = 0; currentIndex < 8; currentIndex++) {
//   listOfTrips.push(pendingTrip);
// }

// for (let currentIndex = 0; currentIndex < 7; currentIndex++) {
//   listOfTrips.push(upcomingTrip);
// }

// for (let currentIndex = 0; currentIndex < 5; currentIndex++) {
//   listOfTrips.push(pastTrip);
// }
