import { useState, useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import { useSocketContext } from "../../../context/socket";
import { getFollowersService } from "../../../services/friendService";

import { Followers as FollowersComponent } from "../components/Followers";

const userId = JSON.parse(localStorage.getItem('user')).user?._id;

export async function loader() {
  return getFollowersService(userId);  
}
export default function Followers() {
  const data = useLoaderData();
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
      followers={data.followers}
      ids={ids}
      page="follower"
    /> 
  );
}