import React from 'react';
import styled from 'styled-components';

import Card from '@mui/material/Card';

function UserIconCard({ name, image, onClick }) {
  return (
    <Card
      sx={{
        width: 60,
        margin: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '15pm',
        padding: '5px',
        fontSize: '12px',
      }}
      onClick={onClick}
    >
      <UserImage image={image} />
      {name}
    </Card>
  );
}

const UserImage = styled.div`
  background-image: url(${(props) => props.image});
  height: 35px;
  width: 35px;
  border-radius: 50%;
  background-size: cover;
  background-repeat: no-repeat;
`;

export default UserIconCard;
