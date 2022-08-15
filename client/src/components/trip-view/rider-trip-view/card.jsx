import * as React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function RiderCard() {
  return (
      <Card sx={{ minWidth: 350, margin: '25px' }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            4:00 PM August 26, 2022
          </Typography>
          <Typography variant="h5" component="div">
            123 Here St. Heresville, There
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            789 Over There St, Somewhere, Else
          </Typography>
          <Typography variant="body2">
            Total Cost: $30
            <br />
            Rider Cost $5 - $15
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
  );
}
