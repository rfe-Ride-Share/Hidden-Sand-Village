import React from 'react';
import styled from 'styled-components';

import SubmitReviewsButton from './submit-reviews-button';
import ReviewCard from './review-card';

function ReviewView() {
  const profileList = [
    { name: 'Tyrion' },
    { name: 'Nymeira' },
    { name: 'Willow' },
    { name: 'Sadie' },
    { name: 'Piglet' },
    { name: 'Pancake' },
  ];

  const reviewList = [];

  for (let currentIndex = 0; currentIndex < 6; currentIndex++) {
    reviewList.push(<ReviewCard profile={profileList[currentIndex]} />);
  }
  return (
    <ReviewList>
      {reviewList}
      <SubmitReviewsButton
        onClick={() => {
          for (
            let currentIndex = 0;
            currentIndex < profileList.length;
            currentIndex++
          ) {
            console.log(JSON.stringify(profileList[currentIndex]));
          }
        }}
      />
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
