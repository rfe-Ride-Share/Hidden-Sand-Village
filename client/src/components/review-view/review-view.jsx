import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

import SubmitReviewsButton from './submit-reviews-button';
import ReviewCard from './review-card';

function ReviewView({ listOfProfiles = [] }) {
  const reviewResults = [];

  for (const profile of listOfProfiles) {
    const newReview = {};

    newReview.id = profile.id;
    newReview.name = profile.name;
    newReview.feedback = '';

    reviewResults.push(newReview);
  }

  const reviewList = [];

  for (let currentIndex = 0; currentIndex < 6; currentIndex++) {
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

            const id = reviewResults[currentIndex].id;

            const reviews = listOfProfiles[currentIndex].reviews || [];
            reviews.push(review);

            axios.put(`/users/${id}`, reviews)
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
