import React from 'react';
import PlaceHolderBar from './placeholder-bar';
import TitleOfTrip from './title-of-trip';
import Paper from '@mui/material/Paper';

function TripView() {
  return (
    <div>
      <PlaceHolderBar />
      <Paper
        elevation={12}
        sx={{
          height: '300px',
          width: '100%',
        }}
      />
    </div>
  );
}

export default TripView;
