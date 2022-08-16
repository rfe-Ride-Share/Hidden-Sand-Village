import React from 'react';
import styled from 'styled-components';

import RiderCard from '../trip-view/rider-trip-view/rider-card';

import CancelButton from './buttons/cancel-button';
import MessageButton from './buttons/message-button';
import ReviewButton from './buttons/review-button';

function populateLists(pendingTrips, upcomingTrips, pastTrips, tripList) {
  for (const trip of tripList) {
    console.log(trip.status);
    if (trip.status === 'pending') {
      pendingTrips.push(
        <div>
          <RiderCard tripInfo={trip} />
          <ButtonRow>
            <CancelButton />
            <MessageButton />
          </ButtonRow>
        </div>
      );
    } else if (trip.status === 'upcoming') {
      upcomingTrips.push(
        <div>
          <RiderCard tripInfo={trip} />
          <ButtonRow>
            <CancelButton />
            <MessageButton />
          </ButtonRow>
        </div>
      );
    } else {
      pastTrips.push(
        <div>
          <RiderCard tripInfo={trip} />
          <ButtonRow>
            <ReviewButton />
          </ButtonRow>
        </div>
      );
    }
  }
}

function TripListView() {
  const listOfTrips = [];
  const pastTrip = {
    date: '4:00 PM August 27th, 2022',
    startPoint: '20 W 34th St., New York, NY 10001',
    endPoint: '3701 Osceola Pkwy, Bay Lake, FL 32830',
    totalCost: '$250',
    riderCostLow: 25,
    riderCostHigh: 125,
    status: 'past',
  };

  const pendingTrip = {
    date: '4:00 PM August 27th, 2022',
    startPoint: '20 W 34th St., New York, NY 10001',
    endPoint: '3701 Osceola Pkwy, Bay Lake, FL 32830',
    totalCost: '$250',
    riderCostLow: 25,
    riderCostHigh: 125,
    status: 'pending',
  };

  const upcomingTrip = {
    date: '4:00 PM August 27th, 2022',
    startPoint: '20 W 34th St., New York, NY 10001',
    endPoint: '3701 Osceola Pkwy, Bay Lake, FL 32830',
    totalCost: '$250',
    riderCostLow: 25,
    riderCostHigh: 125,
    status: 'upcoming',
  };

  for (let currentIndex = 0; currentIndex < 8; currentIndex++) {
    listOfTrips.push(pendingTrip);
  }

  for (let currentIndex = 0; currentIndex < 7; currentIndex++) {
    listOfTrips.push(upcomingTrip);
  }

  for (let currentIndex = 0; currentIndex < 5; currentIndex++) {
    listOfTrips.push(pastTrip);
  }

  const pendingTrips = [];
  const upcomingTrips = [];
  const pastTrips = [];

  populateLists(pendingTrips, upcomingTrips, pastTrips, listOfTrips);

  return (
    <TripList>
      Pending Trips
      {pendingTrips}
      Upcoming Trips
      {upcomingTrips}
      Past Trips
      {pastTrips}
    </TripList>
  );
}

const TripList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export default TripListView;