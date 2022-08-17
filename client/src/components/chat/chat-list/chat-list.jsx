import React from 'react';
import styled from 'styled-components';

import Paper from '@mui/material/paper';

import UserIconCard from './user-icon-card';

function ChatList({ users = {} }) {
  const listOfUserIcons = [];
  const onClick = () =>
    console.log(
      'opening this users direct message is supposed to appear here. user-icon-card.jsx'
    );

  for (const user of users) {
    listOfUserIcons.push(
      <UserIconCard
        image={user.user_photo}
        name={user.first_name}
        onClick={onClick}
      />
    );
  }
  return (
    <Paper
      elevation={0}
      sx={{
        height: '100%',
        minHeight: '400px',
        width: '20%',
        borderRadius: '20px',
        marginTop: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {listOfUserIcons}
    </Paper>
  );
}

export default ChatList;
