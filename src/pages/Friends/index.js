import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getFriendSuggestionService } from '../../services/friendService';

const profileId = JSON.parse(localStorage.getItem('user'))?.user.id;
const Friends = () => {
  const [socket] = useOutletContext();
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const profileId = JSON.parse(localStorage.getItem('user'))?.user.id;
    const getSuggestions = async () => {
      const suggestions = await getFriendSuggestionService(profileId);
      setSuggestions(suggestions);
    };
    getSuggestions();
  }, []);

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
    <div className="friends">
      <ul className="friend-list">
        {suggestions.map((suggestion) => (
          <li className="friend" key={suggestion.id}>
            <div className="img">
                <img src={suggestion.avatar} alt="avatar" />
            </div>
            <div className="summary">
                <h3 className="title">{suggestion.username}</h3>
                <p className="status">Online</p>
                <div className="actions">
                <button type="button" onClick={() => addFriend(suggestion.id)}>Add Friend</button>
                <button type="button" onClick={() => console.log('remove')}>Remove</button>
                </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;
