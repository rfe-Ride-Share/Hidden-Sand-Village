
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TextareaAutosize from '@mui/material/TextareaAutosize';
//import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';







function AddTripView() {

  const ButtonAppBar = (


      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
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
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>


  );
///////////////////////////////////////
  const TextBox = (
    <TextareaAutosize
    aria-label="minimum height"
    minRows={3}
    placeholder="Details about trip"
    style={{ width: 400, height: 200 }}
  />
  );

///////////////////////////////////////////
  const BasicTextFields =(

      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
        />
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <TextField id="filled-basic" label="Filled" variant="filled" />
        <TextField id="standard-basic" label="Standard" variant="standard" />
      </Box>
    );
////////////////////////////////////////////////////////

  const [seats, setSeats] = React.useState('');

  const handleChange = (event) => {
    setSeats(event.target.value);
  };

  const BasicSelect = (

      <FormControl sx={{minWidth: 200 }} size="small">
        <InputLabel id="demo-simple-select-label">Max. Passengers</InputLabel>
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




  return (
    <div>
    {ButtonAppBar}<br></br>
    <TextField id="outlined-basic" label="From*"  variant="outlined" /><br></br><br></br>
    <TextField id="outlined-basic" label="To*" variant="outlined" /><br></br><br></br>

    {BasicSelect}<br></br><br></br>

    <label for="birthday">Departure Date*</label>
          <input type="date" id="date" name="date" onChange={(e) => {console.log(e.target.value)}}></input><br></br><br></br>


    {TextBox}





    </div>
  )
}

export default AddTripView;
