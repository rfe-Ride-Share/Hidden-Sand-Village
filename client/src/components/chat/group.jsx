import axios from "axios";
import { useEffect, useState } from "react";
import styled from 'styled-components'


export default function Group({ convo, currentUser }) {
  const [friend, setFriend] = useState(null);


  useEffect(() => {
    const friendId = convo.members.find((m) => m !== currentUser._id);
    console.log('friendId', friendId);

    const getUser = async () => {
      try {
        const res = await axios.get("/userr?_id=" + friendId)
        console.log('friendData', res.data)
        setFriend(res.data);
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
      <span className="conversationName">{friend.first_name + " " + friend.last_name}</span>
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