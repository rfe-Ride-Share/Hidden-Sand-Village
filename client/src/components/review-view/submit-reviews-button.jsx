import * as React from 'react';
import Button from '@mui/material/Button';

function SubmitReviewsButton() {
  return (
      <Button
        variant="contained"
        sx={{
          width: '250px',
          height: '50px',
          borderRadius: '15px',
          backgroundColor: '#DF3062',
          margin: '25px',
        }}
        onClick={() => {
          console.log('Submit Reviews functionality goes here: submit-reviews-button.jsx');
        }}
      >
          Submit Reviews
      </Button>
  );
}

export default SubmitReviewsButton;
