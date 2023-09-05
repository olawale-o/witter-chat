import { useContext, createContext, useState } from "react";

const UserConnectionContext = createContext({});

export const useUserConnectionContext = () => useContext(UserConnectionContext);


export const UserConnectionProvider = ({ children, followers, following }) => {
  const fn = () => following.map((following) => following.followeeId);
  const [followersList, setFollowersList] = useState(followers);
  const [followersListIds, setFollowersListIds] = useState(() => followers.map((follower) => follower.followerId));
  const [followingList, setFollowingList] = useState(following);
  const [followingListIds, setFollowingListIds] = useState(() => fn());
  const [unionIds, setUnionIds] = useState(() => followersListIds.filter((id) => followingListIds.includes(id)));
  return (
    <UserConnectionContext.Provider value={{
      followersList,
      followingList,
      setFollowersList,
      setFollowingList,
      setFollowingListIds,
      setFollowersListIds,
      followingListIds,
      followersListIds,
      unionIds,
      setUnionIds,
    }}>
      {children}
    </UserConnectionContext.Provider>
  );
};
