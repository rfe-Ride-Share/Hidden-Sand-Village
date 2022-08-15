import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

function Appbar({ setOpen }) {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => {
            setOpen(true);
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Home
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Appbar;