import * as React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function PaymentButton({ trip = {} }) {
  return (
    <Button
      variant="contained"
      sx={{
        width: '150px',
        height: '50px',
        borderRadius: '15px',
        backgroundColor: '#11ABC1',
      }}
      onClick={() => {
        console.log(
          'Payment functionality goes here: trip-list-view/buttons/payment-button.jsx'
        );
      }}
    >
      <Link
        to="/payment"
        style={{ textDecoration: 'none', color: 'white' }}
        state={trip}
      >
        Pay now
      </Link>
    </Button>
  );
}

export default PaymentButton;
