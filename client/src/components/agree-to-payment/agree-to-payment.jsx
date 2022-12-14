import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import { Checkbox } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import RiderCard from '../trip-view/rider-trip-view/rider-card';
import ConfirmRequestButton from './buttons/confirm-request-button';
import GoBackButton from './buttons/go-back-button';
import addRiderToTrip from './add-rider-to-trip';

function AgreeToPayment(props) {
  const location = useLocation();

  const tripInfo = location.state || {};
  const cost = tripInfo.price || 0;

  const [isAccepted, setIsAccepted] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (isConfirmed) {
    addRiderToTrip(tripInfo);
    return (
      <Container
        sx={{
          padding: '1px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <RiderCard tripInfo={tripInfo} />
          <AgreementMessage>
            <Typography variant="body1">
              Congratulations! Your request to join the ride has been sent to
              the driver. The driver will message you with furher details.
            </Typography>
          </AgreementMessage>
          <AgreementButtons>
            <GoBackButton />
          </AgreementButtons>
        </Box>
      </Container>
    );
  }

  return (
    <Container
      sx={{
        padding: '1px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <RiderCard tripInfo={tripInfo} />
        <AgreementMessage>
          <Typography variant="body1">
            By clicking {'"I Accept"'} the user fully agrees to split the cost
            of the trip up to and including the amount of ${cost} if accepted by
            the driver and not cancelled within 24 hours of departure.
          </Typography>
        </AgreementMessage>
        <AgreementCheckbox>
          <Typography variant="body1">
            I Accept <Checkbox onChange={() => setIsAccepted(!isAccepted)} />
          </Typography>
        </AgreementCheckbox>
        <AgreementButtons>
          <ConfirmRequestButton
            isAccepted={isAccepted}
            setIsConfirmed={setIsConfirmed}
          />
        </AgreementButtons>
      </Box>
    </Container>
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
