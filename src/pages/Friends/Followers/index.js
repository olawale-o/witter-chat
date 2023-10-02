import { useState, useMemo } from "react";
import { useSocketContext } from "../../../context/socket";

import { Followers as FollowersComponent } from "../components/Followers";
import { useUserConnectionContext } from "../../../context/userConnection";

export default function Followers() {
  const userId = JSON.parse(localStorage.getItem('user'))?.user?._id;
  const { setIntersectionIds, intersectionIds, setFollowingListIds, followingListIds, followersListIds, followersList } = useUserConnectionContext();
  const { toggleFollow } = useSocketContext();

  // users followers each other
  // current followed selected user 
  
  const onToggleFollow = (user,) => {
    if (followingListIds.includes(user._id) && followersListIds.includes(user._id)) {
      toggleFollow(user, userId, 'unfollow');
      setFollowingListIds((prevState) => {
        const a = [...prevState].filter((id) => id !== user._id)
        return a;
      });
      setIntersectionIds((prevState) => {
        const a = [...prevState].filter((id) => id !== user._id)
        return a;
      });
    } else {
      toggleFollow(user, userId, 'follow');
      setFollowingListIds((prevState) => {
        const a = [...prevState, user._id];
        return a
      });
      setIntersectionIds((prevState) => {
        const a = [...prevState, user._id];
        return a
      });
    }
  };
  return (
    <FollowersComponent
      onToggleFollow={onToggleFollow}
      followers={followersList}
      page="follower"
      intersectionIds = {intersectionIds}
    /> 
  );
}