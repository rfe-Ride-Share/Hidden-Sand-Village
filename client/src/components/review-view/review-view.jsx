import React from 'react';
import styled from 'styled-components';

import SubmitReviewsButton from './submit-reviews-button';
import ReviewCard from './review-card';

function ReviewView() {
  return (
    <ReviewList>
      I am Batman
      <SubmitReviewsButton />
      <ReviewCard />
    </ReviewList>
  )
}

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export default ReviewView;
