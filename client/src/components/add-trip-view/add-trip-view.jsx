// import 'dotenv/config';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
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
import  {AdapterMoment}  from '@mui/x-date-pickers/AdapterMoment';
import  {LocalizationProvider}  from '@mui/x-date-pickers/LocalizationProvider';
import  {DateTimePicker}  from '@mui/x-date-pickers/DateTimePicker';
import SearchBar from '../search-view/searchBar.jsx';

import Autocomplete from '@mui/material/Autocomplete';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';




import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SwapVertIcon from '@mui/icons-material/SwapVert';





function AddTripView() {

  const [seats, setSeats] = React.useState('');
  const [value, setValue] = React.useState(
    new Date('2014-08-18T21:11:54')
  );

  const [tripDetails, setTripDetails] = React.useState('');
  const [from, setFrom] = React.useState('');
  const [to, setTo] = React.useState('');
  const [tripValue, setTripValue] = React.useState('');

  ////////////////////////////////////////////
////           STATE OBJ                ///
///////////////////////////////////////////

const tripPost = {
  from: from,
  to: to,
  seats: seats,
  dateTime: value,
  tripDetails: tripValue

}

console.log('tripPost', tripPost)

////////////////////////////////////////
//     SEND OFF DATA                 //
//////////////////////////////////////


const handleSubmit = (event) => {

//event.preventDefault();
console.log('add trip information', tripPost)

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
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

            </Typography>
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
  const icon =  <PersonAddAltIcon/>
  const BasicSelect = (

      <FormControl sx={{m:1, minWidth: 200 }} size="small">
        <InputLabel id="demo-simple-select-label">{icon}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={seats}
          label="Seats"
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
    setValue(newValue)
  };



  const dateTime = (

    <LocalizationProvider dateAdapter={AdapterMoment}>

        <DateTimePicker
          label="Depature Date and Time"
          value={value}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <DepartureBoardIcon />
              </InputAdornment>  ),
        }}/>


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
          '& .MuiTextField-root': { m: 1, width: '60ch'},
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField fullWidth
            id="outlined-multiline-flexible"
            label="Trip Details"
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







///////////////////////////
//   RENDERED STUFFF      //
///////////////////////////


  return (

    <div>
      <TopBar>
      {ButtonAppBar}
      </TopBar>
      <br></br>
    <Stack spacing={3} sx={{m:1, width: 450}}>

    {/* <TextField id="outlined-basic" label="Leaving from..."  variant="outlined" onChange={(e) => {setFrom(e.target.value)}}/><br></br> */}
    <SearchBar setPos={setStartPos}
        name={'Start'}
        placeholder={'Where will you be travelling from?'} />
     <IconArrow>
     <SwapVertIcon fontSize="large"/>
     </IconArrow>

    <SearchBar setPos={setDestPos}
        name={'Destination'}
        placeholder={'Where will you be travelling to?'}/>

    <br></br>
    {/* <TextField id="outlined-basic" label="Going to..." variant="outlined" onChange={(e) => {setTo(e.target.value)}}/><br></br><br></br> */}
     </Stack><br></br>
    <TextAreaCenter>
    {dateTime}
    </TextAreaCenter><br></br><br></br>
    {BasicSelect}<br></br><br></br>
    {trip}
    <ButtonCan className="button-container">
      <Button className="post-button" variant="contained" type="submit" onClick={(e) => {handleSubmit()}}>Add Trip</Button>
      <Button className="cancel-button" variant="contained" type="submit" onClick={(e) => {console.log('CANCEL')}}>Cancel</Button>
    </ButtonCan>
    </div>
  )
}

const ButtonCan = styled.div`


  display: flex;
  justify-content: center;
  margin-top: 70px;
  .post-button{
    background:#F5B935;

  }

  .cancel-button{
    background: #DF3062;
    margin-left: 30px;

  }

`

const TextAreaCenter = styled.div`
margin-left: 8px;

`

const IconArrow = styled.div`
display: flex;
justify-content: center;
`

const TopBar = styled.div`
.top-bar{
  background: #11ABC1;
}
`

export default AddTripView;
