import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getFriendRequestService } from '../../services/friendService';

const FriendRequest = () => {
  const profileId = JSON.parse(localStorage.getItem('user'))?.user.id;
  const [socket] = useOutletContext();
  const [requests, setrequests] = useState([]);
  useEffect(() => {
    const getrequests = async () => {
      const requests = await getFriendRequestService(profileId);
      setrequests(requests);
    };
    getrequests();
  }, [profileId]);

  useEffect(() => {
    socket.on('add friend', (data) => {
      console.log('friend added', data);
    });
  }, [socket]);

  const confirmFriend = async (id) => {
    console.log('confirm friend', id);
    await socket.emit('add friend', { from: profileId, to: id });
  };
  if (requests.length === 0) return null;
  return (
    <ul className="friend-list">
      {requests.map((friend) => (
        <li className="friend" key={friend.id}>
          <div className="img">
              <img src={friend.avatar} alt="avatar" />
          </div>
          <div className="summary">
              <h3 className="title">{friend.username}</h3>
              <p className="status">Online</p>
            <div className="actions">
              <button type="button" onClick={() => confirmFriend(friend.id)}>Confirm</button>
              <button type="button" onClick={() => console.log('remove')}>Remove</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )  
};
  
export default FriendRequest;
