import axios from "axios";
import { useEffect, useState } from "react";
import styled from 'styled-components'


export default function Group({ convo, currentUser }) {
  const [friend, setFriend] = useState({first_name: '',
  last_name: '',
  user_photo: '',
});


  useEffect(() => {

    console.log('convo is: ',convo)
    console.log('currentUser._id: ', currentUser._id);

    // const friendId = convo.members.find((m) => m !== currentUser._id);
    // const friendId = convo.members.filter((m) => m !== currentUser._id);

    const friendId = [];

    for (const member of convo.members) {
      console.log('member is', member);
      console.log('current user id is', currentUser._id);

      if (member !== currentUser._id) {
        console.log('member is passing the test check');
        friendId.push(member);
      }
    }

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

  }, [currentUser, convo]);

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

@media screen and (max-width: 768px) {
  .conversationName {
    display: none;
  }
}
`