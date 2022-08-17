import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

import SubmitReviewsButton from './submit-reviews-button';
import ReviewCard from './review-card';

function ReviewView({ listOfProfiles = [] }) {
  const reviewResults = [];

  for (const profile of listOfProfiles) {
    const newReview = {};

    newReview.email = profile.email;
    newReview.name = profile.name;
    newReview.feedback = '';

    reviewResults.push(newReview);
  }

  const reviewList = [];

  for (let currentIndex = 0; currentIndex < reviewResults.length; currentIndex++) {
    reviewList.push(<ReviewCard profile={reviewResults[currentIndex]} />);
  }
  return (
    <ReviewList>
      {reviewList}
      <SubmitReviewsButton
        onClick={() => {
          for (
            let currentIndex = 0;
            currentIndex < reviewResults.length;
            currentIndex++
          ) {
            const review = {};
            review.stars = reviewResults[currentIndex].rating;
            review.review_text = reviewResults[currentIndex].feedback;

            const email = reviewResults[currentIndex].email;

            const reviews = listOfProfiles[currentIndex].reviews || [];
            reviews.push(review);

            axios.put(`/userr`, reviews, { email: email })
              .then((response) => {
                console.log(response);
              });
          }
            window.location.replace('http://localhost:3000/');
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
