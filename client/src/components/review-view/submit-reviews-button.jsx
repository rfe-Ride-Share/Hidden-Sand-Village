import * as React from 'react';
import Button from '@mui/material/Button';

function SubmitReviewsButton({ onClick }) {
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
        onClick={onClick}
      >
          Submit Reviews
      </Button>
  );
}

export default SubmitReviewsButton;
