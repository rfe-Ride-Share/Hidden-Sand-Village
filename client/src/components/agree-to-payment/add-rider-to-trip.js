const axios = require('axios');
const { useAuth0 } = require('@auth0/auth0-react');

function userIsInTrip(user, listOfPassengers) {
  for (const passenger of listOfPassengers) {
    if (user.email === passenger.email) {
      return true;
    }
  }

  return false;
}

function addRiderToTrip(tripInfo) {
  const { user } = useAuth0();
  const newPassenger = { email: user.email, departure: tripInfo.departure, destination: tripInfo.destination, status: 'pending' }

  if (!userIsInTrip(user, tripInfo.passengers)) {
    tripInfo.passengers.push(newPassenger);
    axios({
      url: '/tripp',
      method: 'put',
      data: { passengers: tripInfo.passengers },
      params: { _id: tripInfo._id },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
  }
}

module.exports = addRiderToTrip;
