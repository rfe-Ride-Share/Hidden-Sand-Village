import React, { useEffect, useState } from 'react';
import Appbar from './appbar.jsx';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
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
  const { user, logout } = useAuth0();
  const [open, setOpen] = useState(false);
  // const [userData, setUserData] = useState({
  //   user_photo: user.picture,
  //   first_name: user.name.split(' ')[0],
  //   last_name: user.name.split(' ')[1],
  //   reviews: [],
  //   bio: '',
  //   email: user.email,
  // });

  // useEffect(() => {
  //   axios
  //     .get(`/userr?email=${user.email}`)
  //     .then((res) => {
  //       console.log('res from email is', res);
  //       setUserData(res.data);
  //     })
  //     // take care of posting on the server side?
  //     .catch((err) => {
  //       if (err.response.status === 400) {
  //         axios
  //           .post('/userr', userData)
  //           .then(() => {
  //             axios.get(`/userr?email=${user.email}`);
  //           })
  //           .catch((err) => console.error(err));
  //       } else {
  //         console.log(err);
  //       }
  //     });
  // }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const handleLogout = () => {
    setOpen(false);
    logout({
      returnTo: window.location.origin,
    });
  };
  return (
    <>
      <Appbar setOpen={setOpen}></Appbar>
      <Box>
        <Drawer open={open} onBackdropClick={() => setOpen(false)}>
          <IconButton onClick={handleClose}>
            <ChevronLeftIcon></ChevronLeftIcon>
          </IconButton>
          <IconButton>
            <Avatar
              alt={user ? user.name : 'Log in'}
              src={user ? user.picture : null}
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
            ].map((item) => (
              <ListItem key={item.text} onClick={handleClose} disablePadding>
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
                link: '/add',
              },
              { text: 'My Trips', icon: <CommuteIcon />, link: '/' },
            ].map((item, index) => (
              <ListItem key={item.text} onClick={handleClose} disablePadding>
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
                text: 'Log Out',
                icon: <LogoutIcon />,
                link: '/',
              },
            ].map((item, index) => (
              <ListItem key={item.text} onClick={handleLogout} disablePadding>
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
        </Drawer>
      </Box>
    </>
  );
};

export default DropdownMenu;
