import * as React from 'react';
import Button from '@mui/material/Button';

function ReviewButton() {
  return (
      <Button
        variant="contained"
        sx={{
          width: '250px',
          height: '50px',
          borderRadius: '15px',
          backgroundColor: '#DF3062',
        }}
        onClick={() => {
          console.log('Review functionality goes here: trip-list-view/buttons/review-button.jsx');
        }}
      >
          Ask to Join
      </Button>
  );
}

export default ReviewButton;
