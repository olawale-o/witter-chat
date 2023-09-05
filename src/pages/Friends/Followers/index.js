import { useState, useMemo } from "react";
import { useSocketContext } from "../../../context/socket";

import { Followers as FollowersComponent } from "../components/Followers";
import { useUserConnectionContext } from "../../../context/userConnection";

const userId = JSON.parse(localStorage.getItem('user')).user?._id;

export default function Followers() {
  const { followersList, unionIds } = useUserConnectionContext();
  const { toggleFollow } = useSocketContext();
  const [followers, setFollowers] = useState([]);
  const ids = useMemo(() => followers, [followers]);
    
  const onToggleFollow = (user,) => {
    if (ids.includes(user._id)) {
      toggleFollow(user, userId, 'unfollow')
      const newList = followers.filter((id) => id !== user?._id);
      setFollowers(newList);
    } else {
      toggleFollow(user, userId, 'follow',)
      setFollowers((prevState) => ([...prevState, user._id]))
    }
  };
  return (
    <FollowersComponent
      onToggleFollow={onToggleFollow}
      followers={followersList}
      ids={ids}
      page="follower"
      unionIds = {unionIds}
    /> 
  );
}