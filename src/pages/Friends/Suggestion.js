import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getFriendSuggestionService } from '../../services/friendService';

// const profileId = JSON.parse(localStorage.getItem('user'))?.user.id;
const FriendSuggestion = () => {
  const profileId = JSON.parse(localStorage.getItem('user'))?.user.id;
  const [socket] = useOutletContext();
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const getSuggestions = async () => {
      const suggestions = await getFriendSuggestionService(profileId);
      setSuggestions(suggestions);
    };
    getSuggestions();
  }, [profileId]);

  useEffect(() => {
    socket.on('add friend', (data) => {
      console.log('friend added', data);
    });
  }, [socket]);

  const addFriend = async (id) => {
    console.log('add friend', id);
    await socket.emit('add friend', { from: profileId, to: id });
  };
  if (suggestions.length === 0) return null;
  return (
    <ul className="friend-list">
      {suggestions.map((friend) => (
        <li className="friend" key={friend.id}>
          <div className="img">
              <img src={friend.avatar} alt="avatar" />
          </div>
          <div className="summary">
              <h3 className="title">{friend.username}</h3>
              <p className="status">Online</p>
            <div className="actions">
              <button type="button" onClick={() => addFriend(friend.id)}>Add Friend</button>
              <button type="button" onClick={() => console.log('remove')}>Remove</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )  
};
  
export default FriendSuggestion;
  