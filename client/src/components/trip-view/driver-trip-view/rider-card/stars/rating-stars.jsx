import React from 'react';

import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarHalfIcon from '@mui/icons-material/StarHalf';


function getStarsFromNumber(number) {
  let icons = [];
  for (let currentIteration = 0; currentIteration < 5; currentIteration++) {
    if (number >= 0.75) {
      icons.push(<StarIcon />);
    } else if (number >= 0.5) {
      icons.push(<StarHalfIcon />);
    } else {
      icons.push(<StarOutlineIcon />);
    }

    number--;
  }

  return icons;
}


function RatingStars({ rating = 0 }) {
  const ratingInStars = getStarsFromNumber(rating);
  return (
    <div>
      {ratingInStars}
    </div>
  );
}

export default RatingStars;
