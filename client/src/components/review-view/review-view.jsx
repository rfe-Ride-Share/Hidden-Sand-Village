import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

import SubmitReviewsButton from './submit-reviews-button';
import ReviewCard from './review-card';

function ReviewView({ listOfProfiles }) {
  listOfProfiles = [
    { id: 0, name: 'Tyrion' },
    { id: 1, name: 'Nymeira' },
    { id: 2, name: 'Willow' },
    { id: 3, name: 'Sadie' },
    { id: 4, name: 'Piglet' },
    { id: 5, name: 'Pancake' },
  ];

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
            review.stars = reviewList[currentIndex].rating;
            review.review_text = reviewList[currentIndex].feedback;

            const id = reviewList[currentIndex].id;

            const reviews = listOfProfiles[currentIndex].reviews || [];
            reviews.push(review);

            axios({
              method: 'put',
              url: `/user/${id}`,
              data: reviews,
            })
              .then((response) => {
                console.log(response);
              })
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
