// import 'dotenv/config';
import { useEffect, useMemo, useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

import Box from '@mui/material/Box';

import SearchBar from './searchBar';
import MapDirections from './mapDirections';

import getDistance from './helpers/getDistance';

const library = ['places'];

export default function SearchView() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GMAPS_API_KEY,
    libraries: library,
  });

  //Longitude & latitude setters
  const [startPos, setStartPos] = useState({ lat: 0, lng: 0 });
  const [destPos, setDestPos] = useState({ lat: 0, lng: 0 });
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    setDistance(getDistance(startPos, destPos));
  }, [startPos, destPos]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <p>Distance of {distance} miles between points.</p>
      <SearchBar
        setPos={setStartPos}
        name={'Start'}
        placeholder={'Where will you be travelling from?'}
      />
      <br></br>
      <SearchBar
        setPos={setDestPos}
        name={'Destination'}
        placeholder={'Where will you be travelling to?'}
      />
      <MapDirections startPos={startPos} destPos={destPos} />
    </>
  );
}
// const testUser = {
//   user_id: 1000,
//   user_photo: 'fakeUrl.picture',
//   first_name: 'IAN',
//   last_name: 'ZUBER',
//   reviews: [
//     { stars: 1, review_text: 'So wack' },
//     { stars: 5, review_text: 'wonderful' },
//   ],
//   bio: 'Just a small town girl, livin in a lonely world',
// };

// Trip Data
// sampleTrip = {
//   date: '1660576677204',
//   depart_time: '1660576677205',
//   origin_address: '89 E 42nd St, New York, NY 10017, USA',
//   origin_position: { lat: 35.3444, lng: 35.344455566 },
//   destination_address: '349-399 US-11, Syracuse, NY 13202, USA',
//   destination_position: { lat: 40.7527262, lng: -73.9772294 },
//   driver: 'Carl Poole',
//   driver_email: 'carl.poole@gmail.com',
//   details: 'This is going to be the best trip EVER!!!!', //from notes
//   distance: '3.9 miles',
//   total_meters: 7410,
//   passengers: [
//     {
//       Rider: { departure: 'place1', destination: 'place2', status: 'upcoming' },
//     },
//   ],
//   totalPassengers: 5,
//   currentPassengers: 1,
//   price: '2.38',
//   duration: 'one hour',
//   duration_seconds: 3600,
//   status: 'upcoming', // pending/done/cancelled/upcoming/full/ //is this driver status? do we need upcoming and completed?
//   //can the database automatically update completed and upcoming based on time, like one day after trip for completed
// };
