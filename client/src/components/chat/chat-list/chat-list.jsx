import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Paper from '@mui/material/Paper';

import UserIconCard from './user-icon-card';

function getFriends(conversations, setFriends, currentUser) {
  console.log('friends function being entered');
  const friendsAlreadyAdded = {};
  const conversationIds = {};
  const promises = [];

  for (const conversation of conversations) {
    for (const memberId of conversation.members) {
      if (memberId !== currentUser._id && !friendsAlreadyAdded[memberId]) {
        conversationIds[memberId] = conversation._id;

        // comment this line out to allow duplicates
        friendsAlreadyAdded[memberId] = true;

        console.log('member id is', memberId);
        promises.push(
          axios({
            url: '/userr/',
            method: 'get',
            params: { _id: memberId }
          })
        );
      }
    }
  }

  Promise.all(promises)
    .then((results) => {
      console.log('results in chat list below');
      console.log(results);
      const newFriends = [];
      for (const result of results) {
        const newFriend = result.data;
        newFriend.conversation_id = conversationIds[newFriend._id];
        console.log('new conversation id is', newFriend.conversation_id);
        newFriends.push(result.data);
      }

      setFriends(newFriends);
    })
    .catch((error) => {
      console.log("you're an idiot, webpack knows better");
    })
}

function ChatList({ conversations, currentUser, setCurrentChat }) {
  console.log('chat list being rendered conversations being passed in are', conversations);
  const listOfUserIcons = [];

  const [friends, setFriends] = useState(null);


  const friendsIsNotSetYet = friends === null || (friends.length === 0 && conversations.length > 0);

  if (friendsIsNotSetYet) {
    console.log('webpack doesnt entirely hate you');
    getFriends(conversations, setFriends, currentUser);
    return null;
  }


  for (const friend of friends) {
    listOfUserIcons.push(
      <UserIconCard
        image={friend.user_photo}
        name={friend.first_name}
        onClick={() => setCurrentChat(friend)}

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
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      {listOfUserIcons}
    </Paper>
  );
}

export default ChatList;
