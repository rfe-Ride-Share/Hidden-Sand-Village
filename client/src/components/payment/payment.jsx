import React from 'react';
import { useLocation } from 'react-router-dom';

import PayPalButton from './paypal-button';
import PaymentCard from './payment-card';

function Payment(props) {
  const location = useLocation();
  console.log('state is', location.state);
  const trip = location.state || { passengers: [] };

  return (
    <div>
      <PaymentCard tripInfo={trip} />
      <PayPalButton />
    </div>
  );
}

export default Payment;
