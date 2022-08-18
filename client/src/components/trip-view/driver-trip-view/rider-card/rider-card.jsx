import * as React from 'react';
import styled from 'styled-components';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import ButtonRow from './buttons/button-row';
import ProfileImage from './profile-image';
import RatingStars from './stars/rating-stars';

export default function RiderCard({ profile = {}, status }) {
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
      <ProfileImage image={profile.image} />
      <MainCardContainer>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Typography sx={{ fontSize: 14 }} gutterBottom>
            {profile.name}
          </Typography>
          <RatingStars rating={5} />
        </CardContent>
        <ButtonRow status={status} />
      </MainCardContainer>
    </Card>
  );
}

const MainCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
`;
