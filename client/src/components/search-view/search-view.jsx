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
import Button from '@mui/material/Button';

import SearchBar from './searchBar';
import RiderCard from '../trip-view/rider-trip-view/rider-card';

import getDistance from './helpers/getDistance';
import SwipeableEdgeDrawer from './helpers/SwipeableEdgeDrawer';

export default function SearchView() {
  //Longitude & latitude setters
  const [startPos, setStartPos] = useState({ lat: 0, lng: 0 });
  const [destPos, setDestPos] = useState({ lat: 0, lng: 0 });
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    axios
      .get('/tripp')
      .then((response) => {
        console.log(response.data);
        setTrips(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //function to calculate total distance between searched positions and trip positions card values are placeholders use

  useEffect(() => {
    console.log(startPos, destPos);
    // fetchDirections(startPos, destPos);
    //Sort trips by distance to input locations assuming tripsResults is array of trip objects
    const totalDistance = (trip) => {
      let total = 0;
      if (startPos.lat !== 0 && startPos.lng !== 0) {
        total += getDistance(startPos, trip.depart_coord);
      }
      if (destPos.lat !== 0 && destPos.lng !== 0) {
        total += getDistance(destPos, trip.dest_coord);
      }
      return total;
    };

    let tripsCopy = trips.slice();
    tripsCopy.sort((a, b) => {
      if (totalDistance(a) > totalDistance(b)) {
        return 1;
      }
      if (totalDistance(a) < totalDistance(b)) {
        return -1;
      }
      return 0;
    });
    setTrips(tripsCopy);
  }, [startPos, destPos]);

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
      <Button
        variant="contained"
        size="small"
        sx={{
          borderRadius: '12px',
          backgroundColor: '#F5B935',
        }}
        onClick={() => {
          console.log(
            'Accept rider functionality placeholder for Driver View. need to change accept-button.jsx'
          );
        }}
      >
        Filter Button
      </Button>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {trips.map((trip) => (
          <RiderCard key={trip._id} tripInfo={trip} />
        ))}
      </Box>
      <SwipeableEdgeDrawer />
    </Container>
  );
}
