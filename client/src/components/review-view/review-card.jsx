import * as React from 'react';
import styled from 'styled-components';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import RatingStars from './rating-stars';

export default function ReviewCard() {
  return (
    <Card
      sx={{
        minWidth: 400,
        marginTop: '25px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: '15px',
      }}
    >
      <MainCardContainer>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Typography sx={{ fontSize: 14 }} gutterBottom>
            Name
          </Typography>
          <RatingStars />
        </CardContent>
      </MainCardContainer>
    </Card>
  );
}

const MainCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
`;
