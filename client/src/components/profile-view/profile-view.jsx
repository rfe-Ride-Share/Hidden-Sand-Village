import React from 'react';

import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

function ProfileView() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <Container spacing={2}>
      <Avatar
        alt="user picture"
        src="https://picsum.photos/200"
        style={{ margin: '1em auto' }}
      />
      <Box style={{ flexGlow: 1, textAlign: 'center' }}>
        <Stack spacing={2} justifyContent="space-between">
          <Typography>Carl Poole</Typography>
          <Typography>My Reviews</Typography>
          <Item>
            <Rating name="read-only" value={5} readOnly />
            <div>100 reviews</div>
          </Item>
          <Typography>Bio</Typography>
          <Item>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Item>
          <Typography>Contact</Typography>
          <Item>Message Me</Item>
        </Stack>
      </Box>
    </Container>
  );
}

export default ProfileView;
