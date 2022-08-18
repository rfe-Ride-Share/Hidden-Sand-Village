import * as React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function ReviewButton({ trip = {} }) {
  return (
      <Button
        variant="contained"
        sx={{
          width: '150px',
          height: '50px',
          borderRadius: '15px',
          backgroundColor: '#F5B935',
        }}
        onClick={() => {
          console.log('Review functionality goes here: trip-list-view/buttons/review-button.jsx');
        }}
      >
          <Link to='/review' style={{ textDecoration: 'none', color: 'white' }} state={trip}>Review</Link>
      </Button>
  );
}

export default ReviewButton;
