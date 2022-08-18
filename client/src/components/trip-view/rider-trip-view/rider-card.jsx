import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import moment from 'moment';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

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
        margin: '13px',
        backgroundColor: '#F7F7F7',
        borderRadius: '1%',
      }}
    >
      <Link
        to="/trip"
        style={{ textDecoration: 'none', color: 'black' }}
        state={tripInfo}
      >
        <CardContent sx={{ p: 0 }}>
          <MapDirections
            startPos={tripInfo.depart_coord}
            destPos={tripInfo.dest_coord}
          />
          <Typography variant="h6" component="div" sx={{ m: 1.5, mb: 0.25 }}>
            {tripInfo.title}
          </Typography>
          <Typography sx={{ ml: 1.5 }} color="text.secondary" gutterBottom>
            Date: {moment(tripInfo.depart_time).format('MMM Do YY h:mm a')}
          </Typography>
          <Typography sx={{ m: 1.5 }} color="text.secondary">
            From: {tripInfo.destination}
          </Typography>
          <Typography sx={{ m: 1.5 }} color="text.secondary">
            To: {tripInfo.departure}
          </Typography>
          <Typography variant="body2" sx={{ m: 1.5 }}>
            Total Cost: ${tripInfo.price.toFixed(2)}
            <br />
            Rider Cost $
            {(tripInfo.price / tripInfo.passenger_capacity).toFixed(2)} - $
            {(tripInfo.price / 2).toFixed(2)}
          </Typography>
          <Typography variant="body2" sx={{ m: 1.5 }}>
            Driver: {`${userData.first_name} ${userData.last_name}`}
            <br />
            <Rating name="driver rating" value={rating} readOnly />
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
}

function ProfileImage({ image }) {
  return <ProfileImageComponent image={image} />;
}

const ProfileImageComponent = styled.div`
  background-color: #ccc;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  height: 85px;
  width: 85px;
  margin: 10px;
  border-radius: 10px;
`;

// import { useAuth0 } from '@auth0/auth0-react';
// import Button from '@mui/material/Button';

// const LoginButton = () => {
//   const { loginWithRedirect } = useAuth0();
//   return (
//     <Button
//       color="inherit"
//       className="btn btn-primary btn-block"
//       onClick={() => loginWithRedirect()}
//     >
//       Log In
//     </Button>
//   );
// };
// const AuthenticationButton = () => {
//   const { isAuthenticated } = useAuth0();

//   return isAuthenticated ? <LogoutButton /> : <LoginButton />;
// };
//if is logged in to = '/trip'
//if not logged in to = ''
