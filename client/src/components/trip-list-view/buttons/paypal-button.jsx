import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

function PayPalButton() {
  return (
    <PayPalScriptProvider options={{ 'client-id': 'test' }}>
      <PayPalButtons style={{ layout: 'horizontal' }} />
    </PayPalScriptProvider>
  );
}

export default PayPalButton;
