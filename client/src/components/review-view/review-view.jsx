import React from 'react';
import styled from 'styled-components';

import SubmitReviewsButton from './submit-reviews-button';
import ReviewCard from './review-card';

function ReviewView() {
  const reviewList = [];

  for (let currentIndex = 0; currentIndex < 4; currentIndex++) {
    reviewList.push(<ReviewCard />);
  }
  return (
    <ReviewList>
      {reviewList}
      <SubmitReviewsButton />
    </ReviewList>
  );
}

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export default ReviewView;
