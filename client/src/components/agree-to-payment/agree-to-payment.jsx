import React, { useState } from 'react';
import styled from 'styled-components';

import { Checkbox } from '@mui/material';

import RiderCard from '../trip-view/rider-trip-view/rider-card';

function AgreeToPayment({ tripInfo = {} }) {
  const cost = tripInfo.riderCostHigh || 0;

  const [isAccepted, setIsAccepted] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);


  return (
    <div>
      <RiderCard tripInfo={tripInfo} />
      <AgreementMessage>
        By clicking {'"I Accept"'} the user fully agrees to split the cost of
        the trip up to and including the amount of ${cost} if accepted by the
        driver and not cancelled within 24 hours of departure.
      </AgreementMessage>
      <AgreementCheckbox>
        I Accept <Checkbox onChange={() => setIsAccepted(!isAccepted)} />
      </AgreementCheckbox>
    </div>
  );
}

const AgreementMessage = styled.div`
  margin: 25px;
`;

const AgreementCheckbox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-contnet: center;
  margin: 25px;
`;

export default AgreeToPayment;
