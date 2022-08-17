import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import axios from 'axios';

import MapDirections from '../../search-view/mapDirections';

export default function RiderCard({ tripInfo = {} }) {
  const [userData, setUserData] = React.useState({});
  const [rating, setRating] = React.useState(0);

  React.useEffect(() => {
    axios
      .get(`/userr?email=${tripInfo.driver_email}`)
      .then((response) => {
        setUserData(response.data);
        let reviews = response.data.reviews;
        let count = reviews.length;

        if (count > 0) {
          let total = 0;
          reviews.forEach((review) => {
            total += review.rating;
          });
          setRating(total / count);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Card
      sx={{
        width: '100%',
        minWidth: 350,
        margin: '25px',
        backgroundColor: '#F7F7F7',
      }}
    >
      <CardContent>
        <MapDirections
          startPos={tripInfo.depart_coord}
          destPos={tripInfo.dest_coord}
        />
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {moment(tripInfo.date).format('MMM Do YY h:mm a')}
        </Typography>
        <Typography variant="h6" component="div">
          {tripInfo.destination}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {tripInfo.departure}
        </Typography>
        <Typography variant="body2">
          Total Cost: ${tripInfo.price.toFixed(2)}
          <br />
          Rider Cost $
          {(tripInfo.price / tripInfo.passenger_capacity).toFixed(2)} - $
          {(tripInfo.price / 2).toFixed(2)}
        </Typography>
        <br></br>
        <Typography variant="body2">
          Driver: {`${userData.first_name} ${userData.last_name}`}
          <br />
          <Rating name="driver rating" value={rating} readOnly />
        </Typography>
      </CardContent>
    </Card>
  );
}
