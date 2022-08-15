import React, { useState } from 'react';
import Appbar from './appbar.jsx';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { List as MUIList } from '@mui/material';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MessageIcon from '@mui/icons-material/Message';
import LogoutIcon from '@mui/icons-material/Logout';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import CommuteIcon from '@mui/icons-material/Commute';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const DropdownMenu = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Appbar setOpen={setOpen}></Appbar>
      <Drawer open={open}>
        <IconButton onClick={handleClose}>
          <ChevronLeftIcon></ChevronLeftIcon>
        </IconButton>
        <IconButton>
          <Avatar
            alt="user name here"
            src="https://picsum.photos/56"
            sx={{ width: 56, height: 56 }}
          />
        </IconButton>
        <MUIList>
          {[
            {
              text: 'View Profile',
              icon: <AccountCircleIcon />,
              link: '/profile',
            },
            { text: 'Home', icon: <HomeIcon />, link: '/' },
            { text: 'Messages', icon: <MessageIcon />, link: '/chat' },
          ].map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <Link
                to={item.link}
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </MUIList>
        <Divider />
        <MUIList>
          {[
            {
              text: 'Create Trips',
              icon: <TimeToLeaveIcon />,
              link: '/createtrip',
            },
            { text: 'My Trips', icon: <CommuteIcon />, link: '/mytrips' },
          ].map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
                <Link to={item.link}></Link>
              </ListItemButton>
            </ListItem>
          ))}
        </MUIList>
        <Divider />
        <MUIList>
          {[{ text: 'Log Out', icon: <LogoutIcon /> }].map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </MUIList>
      </Drawer>
    </>
  );
};

export default DropdownMenu;
