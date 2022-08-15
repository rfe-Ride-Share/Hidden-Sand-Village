import React from 'react';
import styled from 'styled-components';

function TitleOfTrip() {
  return (
    <TitleOfTripComponent>
      New York, NY -> Orlando, FL
    </TitleOfTripComponent>
  )
}

const TitleOfTripComponent = styled.div`
  font-size: 32px;
  margin: 25px;
`;

export default TitleOfTrip;
