import { useState, useMemo } from "react";
import { useSocketContext } from "../../../context/socket";

import { Following as FollowingComponent } from "../components/Following";
import { useUserConnectionContext } from "../../../context/userConnection";

const userId = JSON.parse(localStorage.getItem('user')).user?._id;

export default function Following() {
  const { followingList: list, unionIds } = useUserConnectionContext();
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
    <FollowingComponent
      onToggleFollow={onToggleFollow}
      followers={list}
      ids={ids}
      unionIds={unionIds}
    /> 
  );
}