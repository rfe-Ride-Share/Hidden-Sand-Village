import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TextField from '@mui/material/TextField';

export default function ProfileView() {
  const { user } = useAuth0();
  const [userData, setUserData] = useState({
    user_photo: user.picture,
    first_name: user.name.split(' ')[0],
    last_name: user.name.split(' ')[1],
    reviews: [],
    bio: '',
    email: user.email,
  });

  const [updateBio, setUpdateBio] = useState(false);

  // mongodb atlas?
  useEffect(() => {
    axios
      .get(`/userr?email=${user.email}`)
      .then((res) => {
        console.log('res from email is', res);
        setUserData(res.data);
      })
      // take care of posting on the server side?
      .catch((err) => {
        if (err.response.status === 400) {
          axios
            .post('/userr', userData)
            .then(() => {
              axios.get(`/userr?email=${user.email}`);
            })
            .catch((err) => console.error(err));
        } else {
          console.log(err);
        }
      });
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const handleMessage = () => {
    console.log('message me!');
    //on click get that person's info from database
    const otherPersonEmail = 'rikkizhang08@gmail.com';
    Promise.all([
      axios.get(`/userr?email=${otherPersonEmail}`),
      axios.get(`/userr?email=${user.email}`),
    ])
      .then((res) => {
        console.log(res);
        const convo = {senderId: res[1].data._id, receiverId: res[0].data._id };
        console.log('convo', convo);

        axios
          .post(`/conversations`, convo)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });


  };
  let reviewAvg;
  if (userData.reviews.length > 0) {
    reviewAvg = userData.reviews.reduce(
      (a, b) => {
        console.log('a:', a);
        console.log('b:', b);
        return { stars: a.stars + b.stars };
      },
      { stars: 0 }
    );
    reviewAvg = reviewAvg.stars / userData.reviews.length;
    console.log('reviews are', reviewAvg);
  } else {
    reviewAvg = 0;
  }
  const handleEditBio = () => {
    axios
      .put(`/userr?email=${user.email}`, userData)
      .then(() => {
        axios.get(`/userr?email=${user.email}`);
      })
      .catch((err) => console.error(err));
    setUpdateBio(false);
  };

  return (
    <Container spacing={2}>
      <Avatar
        alt="user picture"
        src={user.picture}
        style={{ margin: '1em auto' }}
        sx={{ width: 80, height: 80 }}
      />
      <Box style={{ flexGlow: 1, textAlign: 'center' }}>
        <Stack spacing={2} justifyContent="space-between">
          <Typography>
            {/* {userData.first_name + ' ' + userData.last_name} */}
            {user.name}
          </Typography>
          <Typography>My Reviews</Typography>
          <Item>
            <Rating name="read-only" value={reviewAvg} readOnly />
            <div>{userData.reviews.length} reviews</div>
          </Item>
          <Typography>
            Bio
            <IconButton aria-label="edit">
              {!updateBio ? (
                <EditIcon onClick={() => setUpdateBio(true)} />
              ) : (
                <CheckCircleOutlineIcon onClick={handleEditBio} />
              )}
            </IconButton>
          </Typography>
          {updateBio ? (
            <TextField
              id="filled-multiline-static"
              label="Update Bio"
              multiline
              rows={4}
              defaultValue={userData.bio}
              variant="filled"
              onChange={(e) => {
                setUserData((prev) => {
                  prev.bio = e.target.value;
                  return prev;
                });
              }}
            />
          ) : (
            <Item>{userData.bio}</Item>
          )}
          <Typography>Contact</Typography>
          <Item onClick={handleMessage} style={{}} >
          <Link to='/chat' style={{ textDecoration: 'none', color: 'white' }}>Message</Link>
          </Item>

        </Stack>
      </Box>
    </Container>
  );
}
