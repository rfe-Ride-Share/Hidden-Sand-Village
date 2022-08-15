import React from 'react';
import styled from 'styled-components';

function ProfileImage({ image }) {
  return (
    <ProfileImageComponent image={image} />
  )
}

const ProfileImageComponent = styled.div`
  background-color: #CCC;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  height: 85px;
  width: 85px;
  margin: 10px;
  border-radius: 10px;
`;

export default ProfileImage;
