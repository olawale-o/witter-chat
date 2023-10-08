import { useSocketContext } from "../../../context/socket";

import { Following as FollowingComponent } from "../../../components/Following";
import { useUserConnectionContext } from "../../../context/userConnection";


export default function Following() {
  const currentUser = JSON.parse(localStorage.getItem('user'))?.user;
  const { followingList, setFollowingListIds, followingListIds, followersListIds } = useUserConnectionContext();
  const { toggleFollow, onlineUsers, setOnlineUsers} = useSocketContext();
  const onToggleFollow = (user,) => {
    // both user follows each other
    if (followingListIds.includes(user._id) && followersListIds.includes(user._id)) {
      toggleFollow(user, currentUser, 'unfollow');
      setFollowingListIds((prevState) => {
        const a = [...prevState].filter((id) => id !== user._id)
        return a
      });
      return ;
    }
    // current user only followers selected user
    if (followingListIds.includes(user._id)) {
      toggleFollow(user, currentUser, 'unfollow');
      setFollowingListIds((prevState) => {
        const a = [...prevState].filter((id) => id !== user._id)
        return a
      });
      const userExists = onlineUsers[user._id];
      if (userExists) {
        delete onlineUsers[user._id];
        setOnlineUsers({ ...onlineUsers });
      }
    } else {
      toggleFollow(user, currentUser, 'follow',);
      setFollowingListIds((prevState) => ([...prevState, user._id]));
      onlineUsers[user._id] = user;
      setOnlineUsers({ ...onlineUsers });
    }
  };
  return (
    <FollowingComponent
      onToggleFollow={onToggleFollow}
      followers={followingList}
      followingListIds={followingListIds}
    /> 
  );
}