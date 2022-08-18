import axios from "axios";
import { useEffect, useState } from "react";
import styled from 'styled-components'


export default function Group({ conversation, currentUser }) {
  const [user, setUser] = useState(null);


  // useEffect(() => {
  //   const friendId = conversation.members.find((m) => m !== currentUser._id);

  //   const getUser = async () => {
  //     try {
  //       const res = await axios("/users?userId=" + friendId);
  //       setUser(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getUser();
  // }, [currentUser, conversation]);

  return (
    <TripGroup>
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          'https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Fmobile%2F000%2F013%2F564%2Fdoge.jpg'
        }
        alt=""
      />
      <span className="conversationName">Disney Trip</span>
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