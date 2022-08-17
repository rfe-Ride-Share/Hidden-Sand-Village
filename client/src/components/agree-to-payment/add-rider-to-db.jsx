import React from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

function userIsInDatabase(user, listOfPassengers) {
  for (const passenger of listOfPassengers) {
    if (JSON.stringify(user) === JSON.stringify(passenger)) {
      return true;
    }
  }

  return false;
}

function addRiderToDatabase(tripInfo) {
  // get user's name

  const { user } = useAuth0();
  // get trip departure and destination strings
   const newPassenger = { email: user.email, departure: tripInfo.departure, destination: tripInfo.destination, }

  // add passenger to the end of the trip's list of passengers

  // update the trip with the new list of passengers
    // query should be { _id: tripInfo._id }
    // body should be { passengers: newPassengers }
}

export default addRiderToDatabase;
