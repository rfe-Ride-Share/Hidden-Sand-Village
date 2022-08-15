import React from 'react';
import styled from 'styled-components';

import PlaceHolderBar from '../placeholder-bar';
import TitleOfTrip from '../title-of-trip';
import RiderCard from './rider-card/rider-card';

import Paper from '@mui/material/Paper';

function RiderTripView({ status, tripInfo }) {

  return (
    <div>
      <PlaceHolderBar />
      <RiderTripViewContainer>
        <TitleOfTrip />
        <Paper
          elevation={12}
          sx={{
            height: '400px',
            width: '100%',
            borderRadius: '20px',
          }}
        />
        <RiderCard />
      </RiderTripViewContainer>
    </div>
  );
}

const RiderTripViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default RiderTripView;
