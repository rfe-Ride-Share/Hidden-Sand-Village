import React from 'react';
import { useLocation } from 'react-router-dom';

import PayPalButton from './paypal-button';
import PaymentCard from './payment-card';

function Payment(props) {
  const location = useLocation();
  // console.log('state is', location.state);
  const trip = location.state || { passengers: [] };

  const unformattedRiderCost = trip.totalCost / (trip.passengers.length + 1);
  const riderCost = (Math.ceil(unformattedRiderCost * 100)) / 100;

  trip.riderCost = riderCost;

  return (
    <div>
      <PaymentCard tripInfo={trip} />
      <PayPalButton cost={riderCost} />
    </div>
  );
}

export default Payment;
