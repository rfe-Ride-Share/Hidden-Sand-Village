import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import { Checkbox } from '@mui/material';

import RiderCard from '../trip-view/rider-trip-view/rider-card';
import ConfirmRequestButton from './buttons/confirm-request-button';
import GoBackButton from './buttons/go-back-button';
import addRiderToTrip from './add-rider-to-trip';

function AgreeToPayment(props) {
  const location = useLocation();

  const tripInfo = location.state || {};
  console.log(tripInfo);
  const cost = tripInfo.price || 0;

  const [isAccepted, setIsAccepted] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (isConfirmed) {
    addRiderToTrip(tripInfo);
    return (
      <div>
        <RiderCard tripInfo={tripInfo} />
        <AgreementMessage>
          Congratulations! Your request to join the ride has been sent to the
          driver. The driver will message you with furher details.
        </AgreementMessage>
        <AgreementButtons>
          <GoBackButton />
        </AgreementButtons>
      </div>
    );
  }

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
      <AgreementButtons>
        <ConfirmRequestButton
          isAccepted={isAccepted}
          setIsConfirmed={setIsConfirmed}
        />
      </AgreementButtons>
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

const AgreementButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export default AgreeToPayment;
