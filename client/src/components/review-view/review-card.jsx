import * as React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import RatingStars from './rating-stars';

export default function ReviewCard({ profile = {} }) {
  return (
    <Card
      sx={{
        minWidth: '90%',
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
            flexDirection: 'column',
            justifyContent: 'space-between',
            maxWidth: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              Rate {profile.name}
            </Typography>
            <RatingStars profile={profile} />
          </Box>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Feedback"
            multiline
            maxRows={20}
            minRows={10}
            sx={{
              margin: '20px',
              borderRadius: '20px',
              width: '80%',
            }}
            onChange={(event) => {
              profile.feedback = event.target.value;
            }}
          />
        </CardContent>
      </MainCardContainer>
    </Card>
  );
}

const MainCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
