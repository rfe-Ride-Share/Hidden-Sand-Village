import * as React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react';


function MessageButton() {

  const { user } = useAuth0();

  const handleMessage = () => {
    console.log('message me!');
    //on click get that person's info from database
    const otherPersonEmail = 'meinkappa@gmail.com';
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
    }


  return (
      <Button
        variant="contained"
        sx={{
          width: '150px',
          height: '50px',
          borderRadius: '15px',
          backgroundColor: '#11ABC1',
        }}
        onClick={() => {
          handleMessage()
        }}
      >

          <Link to='/chat' style={{ textDecoration: 'none', color: 'white' }}>Message</Link>
      </Button>
  );
}

export default MessageButton;
