import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import SubmitReviewsButton from './submit-reviews-button';
import ReviewCard from './review-card';

function getProfiles(trip, setListOfProfiles) {
  const { user } = useAuth0();
  const passengers = trip.passengers || [];
  const newListOfProfiles = [];

  const driverEmail = trip.driver_email;
  axios({
    url: '/userr',
    method: 'get',
    params: { email: driverEmail },
  }).then((result) => {
    const driverProfile = result.data;
    console.log('driver profile below');
    console.log(driverProfile);

    if (driverEmail !== user.email) {
      newListOfProfiles.push(driverProfile);
    }

    const promises = [];

    for (const passenger of passengers) {
      // console.log('passenger is below');
      // console.log(passenger);
      promises.push(
        axios({
          url: '/userr/',
          method: 'get',
          params: { email: passenger.email },
        })
      );
    }

    Promise.all(promises)
      .then((results) => {
        console.log('profiles are below');
        console.log(results);

        const profiles = [];

        for (const result of results) {
          if (result.data.email !== user.email) {
            profiles.push(result.data);
          }
        }
        const finalList = newListOfProfiles.concat(profiles);
        console.log(finalList);
        setListOfProfiles(finalList);
      })
      .catch((error) => console.log(error));
  });
}

function ReviewView() {
  const location = useLocation();
  const [listOfProfiles, setListOfProfiles] = useState(null);
  const trip = location.state;
  const reviewResults = [];

  if (listOfProfiles === null) {
    getProfiles(trip, setListOfProfiles);
    return null;
  }

  for (const profile of listOfProfiles) {
    const newReview = {};

    newReview.email = profile.email;
    newReview.name = profile.first_name + ' ' + profile.last_name;
    newReview.feedback = '';

    reviewResults.push(newReview);
  }

  const reviewList = [];

  for (
    let currentIndex = 0;
    currentIndex < reviewResults.length;
    currentIndex++
  ) {
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

            axios
              ({
                url: `/userr/`,
                data: reviews,
                params: { email: email },
              })
              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                console.log(error);
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
