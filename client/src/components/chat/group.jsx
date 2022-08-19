import axios from "axios";
import { useEffect, useState } from "react";
import styled from 'styled-components'

// import ChatList from './chat-list/chat-list';


export default function Group({ convo, currentUser, friend, setFriend }) {
//   const [friend, setFriend] = useState({first_name: '',
//   last_name: '',
//   user_photo: '',
// });

   useEffect(() => {

    console.log('convo is: ',convo)
    console.log('currentUser._id: ', currentUser._id);


    const friendId = convo.members.filter((m) => m !== currentUser._id);





    console.log('friendId', friendId);


    const getUser = async () => {
      try {
        const res = await axios.get("/userr?_id=" + friendId)
        console.log('friendData', res.data)
        if (res.data._id !== currentUser._id) {
          setFriend(res.data);
        }

      } catch (err) {
        console.log(err);
      }
    };

   getUser();

  }, [currentUser, convo, setFriend]);

  return (
    <TripGroup>
    <div className="conversation">
      <img
        className="conversationImg"
        src={
           friend.user_photo}
        alt=""
      />
      <span className="conversationName">TEST</span>
    </div>
    </TripGroup>
  );
}


const TripGroup = styled.div`

.conversation {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  margin-top: 20px;
}

.conversation:hover {
  background-color: rgb(245, 243, 243);
}

.conversationImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
}

.conversationName {
  font-weight: 500;
}

@media screen and (max-width: 718px) {
  .conversationName {
    display: none;
  }
}
`