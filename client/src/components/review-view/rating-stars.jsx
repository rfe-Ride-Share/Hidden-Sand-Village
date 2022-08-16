import React, { useState } from 'react';
import styled from 'styled-components';

import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

function getStarsFromNumber(number, setRating, profile) {
  let icons = [];
  let key = 10001;
  for (let currentIteration = 0; currentIteration < 5; currentIteration++) {
    if (number >= 0.5) {
      icons.push(
        <StarIcon
          key={key}
          sx={{ color: '#F5B935' }}
          fontSize="small"
          onClick={() => {
            profile.rating = currentIteration + 1;
            setRating(currentIteration + 1);
          }}
        />
      );
    } else {
      icons.push(
        <StarOutlineIcon
          key={key}
          sx={{ color: '#F5B935' }}
          fontSize="small"
          onClick={() => {
            profile.rating = currentIteration + 1;
            setRating(currentIteration + 1);
          }}
        />
      );
    }

    number--;
    key++;
  }

  return icons;
}

function RatingStars({ profile = {} }) {
  const [rating, setRating] = useState(3);
  profile.rating = rating;
  const ratingInStars = getStarsFromNumber(rating, setRating, profile);
  return <RatingStarsComponent>{ratingInStars}</RatingStarsComponent>;
}

const RatingStarsComponent = styled.div`
  height: 20px;
`;

export default RatingStars;
