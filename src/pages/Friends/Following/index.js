import { useState, useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import { useSocketContext } from "../../../context/socket";
import { getFollowingService } from "../../../services/friendService";

import { Followers as FollowersComponent } from "../components/Followers";

const userId = JSON.parse(localStorage.getItem('user')).user?._id;

export async function loader() {
  return getFollowingService(userId);  
}
export default function Following() {
  const data = useLoaderData();
  const { toggleFollow } = useSocketContext();
  const [followingList, setFollowingList] = useState([]);
  const ids = useMemo(() => followingList, [followingList]);
    
  const onToggleFollow = (user,) => {
    if (ids.includes(user._id)) {
      toggleFollow(user, userId, 'unfollow')
      const newList = followingList.filter((id) => id !== user?._id);
      setFollowingList(newList);
    } else {
      toggleFollow(user, userId, 'follow',)
      setFollowingList((prevState) => ([...prevState, user._id]))
    }
  };
  return (
    <FollowersComponent
      onToggleFollow={onToggleFollow}
      followers={data.following}
      ids={ids}
      page="following"
    /> 
  );
}