// import 'dotenv/config';
import axios from 'axios';
import * as React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import SearchBar from '../search-view/searchBar.jsx';
import { useLoadScript } from '@react-google-maps/api';
import Autocomplete from '@mui/material/Autocomplete';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import fetchDirections from '../search-view/helpers/fetchDirections.js';

import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SwapVertIcon from '@mui/icons-material/SwapVert';

const library = ['places'];

function AddTripView() {
  const [seats, setSeats] = React.useState('');
  const [value, setValue] = React.useState(new Date());

  const [tripDetails, setTripDetails] = React.useState('');
  const [from, setFrom] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tripValue, setTripValue] = React.useState('');

  const { user } = useAuth0();

  ////////////////////////////////////////////
  ////           STATE OBJ                ///
  ///////////////////////////////////////////

  ////////////////////////////////////////
  //     SEND OFF DATA                 //
  //////////////////////////////////////
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
  //   miles: 7410,
  //   passengers: [
  //     {
  //       Rider: { departure: 'place1', destination: 'place2', status: 'upcoming' },
  //     },
  //   ],
  //   seats: 5,
  //   currentPassengers: 1,
  //   price: '2.38',
  //   duration: 'one hour',
  //   duration_seconds: 3600,
  //   status: 'upcoming', // pending/done/cancelled/upcoming/full/ //is this driver status? do we need upcoming and completed?
  //   //can the database automatically update completed and upcoming based on time, like one day after trip for completed
  // };
  const handleSubmit = (event) => {
    //event.preventDefault();
    const tripPost = {
      driver_email: user.email,
      title: title,
      description: tripValue,
      date: new Date(),
      depart_time: value,
      departure: directionData.startAddress,
      depart_coord: startPos,
      destination: directionData.endAddress,
      dest_coord: destPos,
      distance: directionData.miles,
      distance_str: directionData.milesReadable,
      passenger_capacity: seats,
      price: directionData.cost,
      duration: directionData.timeReadable,
      seconds: directionData.seconds,
    };

    console.log('tripPost', tripPost);
    console.log('add trip information', tripPost);
    axios
      .post('/tripp', tripPost)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };
  ///////////////////////////////
  ///          TOP BAR        ///
  //////////////////////////////
  const ButtonAppBar = (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="top-bar">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Button color="inherit"></Button>
        </Toolbar>
      </AppBar>
    </Box>
  );

  ////////////////////////////////////////////////////////
  ///                 PASSENGERS                      ///
  ///////////////////////////////////////////////////////

  const handleChange = (event) => {
    setSeats(event.target.value);
  };
  const icon = <PersonAddAltIcon />;
  const BasicSelect = (
    <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
      <InputLabel id="demo-simple-select-label"> Passenger Seats </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={seats}
        label="Passenger Seats"
        onChange={handleChange}
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={6}>6</MenuItem>
        <MenuItem value={7}>7</MenuItem>
        <MenuItem value={8}>8</MenuItem>
        <MenuItem value={9}>9</MenuItem>
        <MenuItem value={10}>10</MenuItem>
      </Select>
    </FormControl>
  );

  //////////////////////////////////////////////////
  //             DATE  AND TIME                  //
  /////////////////////////////////////////////////

  const handleDateChange = (newValue) => {
    setValue(newValue);
  };

  const dateTime = (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DateTimePicker
        label="Depature Date and Time"
        value={value}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} fullWidth />}
        sx={{ width: 100 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <DepartureBoardIcon />
            </InputAdornment>
          ),
        }}
      />
    </LocalizationProvider>
  );

  /////////////////////////////////
  //       TRIP DETAILS         //
  ///////////////////////////////

  const handleTripChange = (event) => {
    setTripValue(event.target.value);
  };

  const trip = (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          fullWidth
          id="outlined-multiline-flexible"
          label="Trip Description"
          multiline
          maxRows={20}
          minRows={10}
          value={tripValue}
          onChange={handleTripChange}
          placeholder="Tell people about your trip!"
        />
      </div>
    </Box>
  );

  ///////////////////////////////////////////////////////////
  // search function auto complete directions from Michael //
  //////////////////////////////////////////////////////////

  const [startPos, setStartPos] = React.useState({ lat: 0, lng: 0 });
  const [destPos, setDestPos] = React.useState({ lat: 0, lng: 0 });
  const [directionData, setDirectionData] = React.useState({
    miles: 0,
    seconds: 0,
    startAddress: '',
    endAddress: '',
    cost: 0,
  });
  ///////////////////////////
  //   RENDERED STUFFF      //
  ///////////////////////////

  React.useEffect(() => {
    fetchDirections(startPos, destPos, setDirectionData);
  }, [startPos, destPos]);

  React.useEffect(() => {
    console.log(directionData);
  }, [directionData]);

  return (
    <Container
      sx={{
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* <TopBar>{ButtonAppBar}</TopBar> */}
      <br></br>
      <Stack spacing={1} sx={{ width: '80%', minWidth: '350px' }}>
        {/* <TextField id="outlined-basic" label="Leaving from..."  variant="outlined" onChange={(e) => {setFrom(e.target.value)}}/><br></br> */}
        <SearchBar
          setPos={setStartPos}
          name={'Start'}
          placeholder={'Where will you be travelling from?'}
        />
        <IconArrow>
          <SwapVertIcon fontSize="large" />
        </IconArrow>

        <SearchBar
          setPos={setDestPos}
          name={'Destination'}
          placeholder={'Where will you be travelling to?'}
        />

        <br></br>
        <TextField
          id="outlined-basic"
          label="Trip Title"
          placeholder="Give your trip a title"
          variant="outlined"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <br></br>
        <br></br>
        <br></br>
        <TextAreaCenter>{dateTime}</TextAreaCenter>
        <br></br>
        <br></br>
        {BasicSelect}
        <br></br>
        <br></br>
        {trip}
      </Stack>
      <ButtonCan className="button-container">
        <Button
          className="post-button"
          variant="contained"
          type="submit"
          sx={{ backgroundColor: '#f5b935' }}
          onClick={(e) => {
            handleSubmit();
          }}
        >
          Add Trip
        </Button>
        <Button
          className="cancel-button"
          variant="contained"
          type="submit"
          href="/"
          sx={{
            backgroundColor: '#df3062',
          }}
        >
          Cancel
        </Button>
      </ButtonCan>
    </Container>
  );
}

const ButtonCan = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 70px;
  .post-button {
  }

  .cancel-button {
    margin-left: 30px;
  }
`;

const TextAreaCenter = styled.div`
  margin-left: 8px;
`;

const IconArrow = styled.div`
  display: flex;
  justify-content: center;
`;

const TopBar = styled.div`
  .top-bar {
    background: #11abc1;
  }
`;

export default AddTripView;
