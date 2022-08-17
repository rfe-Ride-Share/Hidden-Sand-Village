import React from 'react';
import styled from 'styled-components';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

function PayPalButton() {
  return (
    <PaymentButtons>
      <PayPalScriptProvider
        options={{
          'client-id': 'test',
          components: 'buttons',
          currency: 'USD',
        }}
      >
        <PayPalButtons
          style={{
            layout: 'horizontal',
            height: 50,
          }}
          disabled={false}
        />
      </PayPalScriptProvider>
    </PaymentButtons>
  );
}

const PaymentButtons = styled.div`
  margin: 25px;
`;

export default PayPalButton;
