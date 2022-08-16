import * as React from 'react';
import Button from '@mui/material/Button';

function ReviewButton() {
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
          Review
      </Button>
  );
}

export default ReviewButton;
