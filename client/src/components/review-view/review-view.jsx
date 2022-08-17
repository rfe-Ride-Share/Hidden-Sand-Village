import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import SubmitReviewsButton from './submit-reviews-button';
import ReviewCard from './review-card';

function ReviewView() {
  const location = useLocation();
  const [listOfProfiles, setListOfProfiles] = useState(null);
  const trip = location.state();

  axios.get('/tripp', { _id: trip._id })
    .then((result) => {
      const data = result.data;
      const newListOfProfiles = data.passengers;

      const email = data.driver_email;
      axios.get('/userr', { email: email })
        .then((result) => {
          const driverProfile = result.data;
          newListOfProfiles.push(driverProfile);
          setListOfProfiles(newListOfProfiles);
        })
    })
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

  if (listOfProfiles === null) {
    return null;
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
