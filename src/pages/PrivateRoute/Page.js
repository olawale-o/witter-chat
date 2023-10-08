import { useEffect } from "react";
import { useUserConnectionContext } from "../../context/userConnection";

const PrivatePage = ({ children, socket }) => {
  const {
    setIntersectionIds,
    setUnionIds,
    setFollowersList,
    followersListIds,
    setFollowersListIds,
    followingListIds,
  } = useUserConnectionContext();
  useEffect(() => {
    socket.on('follow', ({ follower }) => {
      setFollowersListIds((prevState) => ([...prevState, follower._id]));
      setFollowersList((prevState) => ([...prevState, {  ...follower } ]));
      if (followingListIds.includes(follower._id)) {
        setIntersectionIds((prevState) => ([...prevState, follower._id]));
      } else {
        setUnionIds((prevState) => new Set([...prevState, follower._id]));
      }
    });

    socket.on('unfollow', ({ follower }) => {
      if (followersListIds.includes(follower._id)) {
        setIntersectionIds((prevState) => {
          const a = [...prevState].filter((id) => id !== follower._id);
          return a;
        });
      }
      setFollowersListIds((prevState) => {
        const a = [...prevState].filter((id) => id !== follower._id);
        return a
      });
      setFollowersList((prevState) => {
        const a = [...prevState].filter((user) => user._id !== follower._id);
        return a
      });
    });

    return () => {
      socket.off('follow');
      socket.off('unfollow');
    }
  }, [socket]);
  return children
}



export { PrivatePage };
