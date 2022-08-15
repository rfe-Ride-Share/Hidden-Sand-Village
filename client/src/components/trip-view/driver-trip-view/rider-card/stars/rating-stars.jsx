import React from 'react';

import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarHalfIcon from '@mui/icons-material/StarHalf';


function getStarsFromNumber(number) {
  let icons = [];
  let key = 9001;
  for (let currentIteration = 0; currentIteration < 5; currentIteration++) {
    if (number >= 0.75) {
      icons.push(<StarIcon key={key} sx={{ color: '#F5B935' }} fontSize='small' />);
    } else if (number >= 0.5) {
      icons.push(<StarHalfIcon key={key} sx={{ color: '#F5B935' }} fontSize='small' />);
    } else {
      icons.push(<StarOutlineIcon key={key} sx={{ color: '#F5B935' }} fontSize='small' />);
    }

    number--;
    key++;
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
