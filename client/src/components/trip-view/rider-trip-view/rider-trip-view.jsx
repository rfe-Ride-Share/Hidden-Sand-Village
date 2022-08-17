import React from 'react';
import styled from 'styled-components';

import PlaceHolderBar from '../placeholder-bar';
import TitleOfTrip from '../title-of-trip';
import RiderCard from './rider-card';

import AskToJoin from './buttons/asktojoin';
import Pending from './buttons/pending';
import Confirmed from './buttons/confirmed';

import Paper from '@mui/material/Paper';

function RiderTripView({ status, tripInfo = {} }) {
  tripInfo = {
    title: 'Disney World',
    date: '8/29/2022',
    startPoint: 'New York, NY',
    endPoint: 'Orlando, FL',
    totalCost: 500,
    riderCostLow: 50,
    riderCostHigh: 250,
  }

  let displayButton = <AskToJoin tripInfo={tripInfo} />;

  if (status === 'pending') {
    displayButton = <Pending />
  } else if (status === 'confirmed') {
    displayButton = <Confirmed />
  }

  return (
    <div>
      <RiderTripViewContainer>
        <TitleOfTrip title={tripInfo.title} />
        <Paper
          elevation={12}
          sx={{
            height: '400px',
            width: '100%',
            borderRadius: '20px',
          }}
        />
        <RiderCard tripInfo={tripInfo} />
        {displayButton}
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
