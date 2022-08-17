import React from 'react';
import styled from 'styled-components';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

function PayPalButton({ cost = 0 }) {
  // console.log('cost is', cost);
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
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: 'USD',
                      value: cost,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
        />
      </PayPalScriptProvider>
    </PaymentButtons>
  );
}

const PaymentButtons = styled.div`
  margin: 25px;
`;

export default PayPalButton;
