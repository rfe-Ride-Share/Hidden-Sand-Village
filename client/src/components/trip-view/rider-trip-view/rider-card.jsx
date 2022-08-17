import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import axios from 'axios';

export default function RiderCard({ tripInfo = {} }) {
  const [userData, setUserData] = React.useState({});

  React.useEffect(() => {
    axios
      .get(`/userr?email=${tripInfo.driver_email}`)
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Card sx={{ width: '100%', minWidth: 350, margin: '25px' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {moment(tripInfo.date).format('MMM Do YY h:mm a')}
        </Typography>
        <Typography variant="h5" component="div">
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
        <Typography variant="body2">
          Driver Name: {`${userData.first_name} ${userData.last_name}`}
          <br />
          Rating
          {(tripInfo.price / tripInfo.passenger_capacity).toFixed(2)} - $
          {(tripInfo.price / 2).toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  );
}
