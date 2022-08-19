import axios from 'axios';

function getFriendFromConversation(convo, setFriend, currentUser) {
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
}
