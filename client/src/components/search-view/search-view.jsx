// import 'dotenv/config';
import { useEffect, useMemo, useState } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  DirectionsRenderer,
} from '@react-google-maps/api';
import axios from 'axios';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import SearchBar from './searchBar';
// import MapDirections from './MapDirections';
import RiderCard from '../trip-view/rider-trip-view/rider-card';

import getDistance from './helpers/getDistance';

export default function SearchView() {
  //Longitude & latitude setters
  const [startPos, setStartPos] = useState({ lat: 0, lng: 0 });
  const [destPos, setDestPos] = useState({ lat: 0, lng: 0 });
  const [trips, setTrips] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get('/trips')
  //     .then((response) => {
  //       console.log({ response });
  //       setTrips(response);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // useEffect(() => {
  //   console.log(startPos, destPos);
  //   fetchDirections(startPos, destPos);
  //   //Sort trips by distance to input locations assuming tripsResults is array of trip objects
  //   let tripsCopy = tripResults.slice();
  //   tripsCopy.sort((a, b) => {
  //     if (totalDistance(a) < totalDistance(b)) {
  //       return 1;
  //     }
  //     if (totalDistance(a) > totalDistance(b)) {
  //       return -1;
  //     }
  //     return 0;
  //   });
  // }, [startPos, destPos]);

  //function to calculate total distance between searched positions and trip positions card values are placeholders use

  const totalDistance = (card) => {
    let total = 0;
    if (startPos.lat !== 0 && startPos.lng !== 0) {
      total += getDistance(startPos, card.startPos);
    }
    if (destPos.lat !== 0 && destPos.lng !== 0) {
      total += getDistance(destPos, card.destPos);
    }
    return total;
  };

  return (
    <Container
      sx={{
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Stack sx={{ width: '80%', minWidth: '350px' }}>
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
      </Stack>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <br> </br>
        {/* <MapDirections startPos={startPos} destPos={destPos} /> */}
        <RiderCard />
        <RiderCard />
        <RiderCard />
      </Box>
    </Container>
  );
}
