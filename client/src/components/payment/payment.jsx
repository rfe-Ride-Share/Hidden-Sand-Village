import React from 'react';

import PayPalButton from './paypal-button';
import PaymentCard from './payment-card';

function Payment({ trip = {} }) {
  trip = {
    date: '4:00 PM 6/2/2023',
    startPoint: 'New York, NY',
    endPoint: 'Orlando, FL',
    riderCost: 50,
  }
  return (
    <div>
      <PaymentCard tripInfo={trip} />
      <PayPalButton />
    </div>
  );
}

export default Payment;
