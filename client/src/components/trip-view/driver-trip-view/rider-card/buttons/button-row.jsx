import * as React from 'react';
import styled from 'styled-components';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import MessageButton from './message-button';
import RejectButton from './reject-button';
import AcceptButton from './accept-button';
import RemoveRiderButton from './remove-rider-button';

function ButtonRow({ trip, status, user }) {
  if (status === 'confirmed') {
    return (
      <CardButtonContainer>
        <CardActions>
          <MessageButton />
          <RemoveRiderButton />
        </CardActions>
      </CardButtonContainer>
    );
  } else {
    return (
      <CardButtonContainer>
        <CardActions>
          <MessageButton />
          <RejectButton user={user} trip={trip} />
          <AcceptButton user={user} trip={trip} />
        </CardActions>
      </CardButtonContainer>
    );
  }
}

const CardButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export default ButtonRow;
