import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
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
import AuthenticationButton from '../auth/authentication-button';
import VroomIcon from './LogoSample_ByTailorBrands (7).png';
function Appbar({ setOpen }) {
  return (
    <AppBar position="sticky" sx={{ overflow: 'hidden', maxHeight: '55px' }}>
      <Toolbar sx={{ backgroundColor: '#11ABC1' }}>
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
          <LogoWrapper>
            <img
              className="logo"
              src={VroomIcon}
              alt="vROOm"
              // style={{
              //   height: '6em',
              //   position: 'relative',
              //   right: '60%',
              //   left: '30%',
              //   top: '5px',
              // }}
            />
          </LogoWrapper>
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          ></Link>
        </Typography>
        <AuthenticationButton />
      </Toolbar>
    </AppBar>
  );
}
export default Appbar;
const LogoWrapper = styled.div`
  .logo {
    height: 6em;
    position: relative;
    right: 60%;
    left: 45%;
    top: 5px;
  }
  @media screen and (max-width: 500px) {
    .logo {
      height: 6em;
      position: relative;
      right: 60%;
      left: 30%;
      top: 5px;
    }
  }
`;