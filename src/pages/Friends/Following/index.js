import { useSocketContext } from "../../../context/socket";

import { Following as FollowingComponent } from "../components/Following";
import { useUserConnectionContext } from "../../../context/userConnection";


export default function Following() {
  const userId = JSON.parse(localStorage.getItem('user'))?.user?._id;
  const { followingList, unionIds, setFollowingListIds, setUnionIds, followingListIds } = useUserConnectionContext();
  const { toggleFollow } = useSocketContext();
    
  const onToggleFollow = (user,) => {
    if (followingListIds.includes(user._id)) {
      toggleFollow(user, userId, 'unfollow');
      setFollowingListIds((prevState) => {
        const a = [...prevState].filter((id) => id !== user._id)
        return a
      });
      setUnionIds((prevState) => {
        const b = [...prevState].filter((id) => id !== user._id)
        return b
      })
    } else {
      toggleFollow(user, userId, 'follow',)
      setFollowingListIds((prevState) => ([...prevState, user._id]))
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