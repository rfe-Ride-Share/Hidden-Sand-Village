import React from 'react';
import styled from 'styled-components';

function ProfileImage() {
  return (
    <ProfileImageComponent>
      Profile image goes here
    </ProfileImageComponent>
  )
}

const ProfileImageComponent = styled.div`
  background-color: #CCC;
  height: 85px;
  width: 85px;
  border-radius: 10px;
`;

export default ProfileImage;
