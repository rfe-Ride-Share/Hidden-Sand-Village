import React from 'react';
import styled from 'styled-components';

import PlaceHolderBar from '../placeholder-bar';
import TitleOfTrip from '../title-of-trip';
import RiderCard from './card';

import AskToJoin from './buttons/asktojoin';
import Pending from './buttons/pending';
import Confirmed from './buttons/confirmed';

import Paper from '@mui/material/Paper';

function TripView({ status }) {
  let displayButton = <AskToJoin />;

  if (status === 'pending') {
    displayButton = <Pending />
  } else if (status === 'confirmed') {
    displayButton = <Confirmed />
  }

  return (
    <div>
      <PlaceHolderBar />
      <TripViewContainer>
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
        {displayButton}
      </TripViewContainer>
    </div>
  );
}

const TripViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default TripView;
