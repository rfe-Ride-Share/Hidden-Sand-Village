import * as React from 'react';
import styled from 'styled-components';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import ButtonRow from './buttons/button-row';

export default function RiderCard() {
  return (
    <Card
      sx={{
        minWidth: 400,
        margin: '25px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '15px',
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          Rider Name
        </Typography>
      </CardContent>
      <ButtonRow status='confirmed' />
    </Card>
  );
}
