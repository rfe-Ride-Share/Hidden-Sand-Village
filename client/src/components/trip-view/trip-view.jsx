import React from 'react';
import PlaceHolderBar from './placeholder-bar';
import Paper from '@mui/material/Paper';

function TripView() {
  return (
    <div>
      <PlaceHolderBar />
      <Paper
        elevation={12}
        sx={{
          height: '300px',
          width: '350px',
          margin: '5%',
        }}
      />
    </div>
  );
}

export default TripView;
