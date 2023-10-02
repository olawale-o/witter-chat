import { useSocketContext } from "../../../context/socket";

import { Following as FollowingComponent } from "../components/Following";
import { useUserConnectionContext } from "../../../context/userConnection";


export default function Following() {
  const userId = JSON.parse(localStorage.getItem('user'))?.user?._id;
  const { followingList, unionIds, setFollowingListIds, followingListIds, followersListIds } = useUserConnectionContext();
  const { toggleFollow, onlineUsers, setOnlineUsers} = useSocketContext();
  // const onToggleFollow = (user,) => {
  //   if (followingListIds.includes(user._id)) {
  //     toggleFollow(user, userId, 'unfollow');
  //     setFollowingListIds((prevState) => {
  //       const a = [...prevState].filter((id) => id !== user._id)
  //       return a
  //     });
  //     setUnionIds((prevState) => {
  //       const b = [...prevState].filter((id) => id !== user._id)
  //       return b
  //     });
  //     const userExists = onlineUsers[user._id];
  //     if (userExists) {
  //       delete onlineUsers[user._id];
  //       setOnlineUsers({ ...onlineUsers });
  //     }
  //   } else {
  //     toggleFollow(user, userId, 'follow',)
  //     setFollowingListIds((prevState) => ([...prevState, user._id]));
  //     setUnionIds((prevState) => ([...prevState, user._id]));
  //     onlineUsers[user._id] = user;
  //     setOnlineUsers({ ...onlineUsers });
  //   }
  // };
  const onToggleFollow = (user,) => {
    // both user follows each other
    if (followingListIds.includes(user._id) && followersListIds.includes(user._id)) {
      toggleFollow(user, userId, 'unfollow');
      setFollowingListIds((prevState) => {
        const a = [...prevState].filter((id) => id !== user._id)
        return a
      });
      return ;
    }
    // current user only followers selected user
    if (followingListIds.includes(user._id)) {
      toggleFollow(user, userId, 'unfollow');
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
      toggleFollow(user, userId, 'follow',);
      setFollowingListIds((prevState) => ([...prevState, user._id]));
      onlineUsers[user._id] = user;
      setOnlineUsers({ ...onlineUsers });
    }
  };
  return (
    <FollowingComponent
      onToggleFollow={onToggleFollow}
      followers={followingList}
      unionIds={unionIds}
      followingListIds={followingListIds}
    /> 
  );
}