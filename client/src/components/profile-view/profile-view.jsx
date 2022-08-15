import React from 'react';

import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

function Chat() {
  return (
    <Container>
      <Box>
        <Avatar alt="Remy Sharp" src="https://picsum.photos/200" />
        <div>Name Name</div>
        <div>Reviews</div>
        <div>Bio</div>
        <div>Contact Name</div>
      </Box>
    </Container>
  );
}

export default Chat;
