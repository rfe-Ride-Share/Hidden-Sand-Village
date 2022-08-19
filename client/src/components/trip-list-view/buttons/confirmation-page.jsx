import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import { Checkbox } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import CancelButton from './cancel-button.jsx';
import GoBackButton from '../../agree-to-payment/buttons/go-back-button';

function ConfirmationPageDelete(props) {
  const location = useLocation();

  const tripInfo = location.state || {};
  const cost = tripInfo.price || 0;

  const [isAccepted, setIsAccepted] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (isConfirmed) {
    return null;
  }

  // if (isConfirmed) {
  //   return (
  //     <Container
  //       sx={{
  //         padding: '1px',
  //         display: 'flex',
  //         flexDirection: 'column',
  //         alignItems: 'center',
  //       }}
  //     >
  //       <Box
  //         sx={{
  //           width: '100%',
  //           display: 'flex',
  //           flexDirection: 'column',
  //           alignItems: 'center',
  //         }}
  //       >
  //         <AgreementMessage>
  //           Congratulations! If you are a driver your trip has been cancelled
  //           for all riders. If you are a rider you have removed yourself from the trip.
  //         </AgreementMessage>
  //         <AgreementButtons>
  //           <GoBackButton />
  //         </AgreementButtons>
  //       </Box>
  //     </Container>
  //   );
  // }

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
        <AgreementMessage>
          Are you sure you want to cancel?
        </AgreementMessage>
        <AgreementCheckbox>
          Yes I want to cancel <Checkbox onChange={() => setIsAccepted(!isAccepted)} />
        </AgreementCheckbox>
        <AgreementButtons>
          <CancelButton
            trip={tripInfo}
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

export default ConfirmationPageDelete;
