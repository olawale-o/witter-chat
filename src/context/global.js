import { useState, createContext, useContext } from "react";
const GlobalContext = createContext({});

export const useGlobal = () => useContext(GlobalContext);

const GlobalProvider = ({ children, followers, following }) => {
  const getUserFollowingIds = () => following.map((following) => following.followeeId);
  const getUserFollowerIds = () => followers.map((follower) => follower.followerId);
  const [followersListIds, setFollowersListIds] = useState(() => getUserFollowerIds());
  const [followingListIds, setFollowingListIds] = useState(() => getUserFollowingIds());
  const [unionIds, setUnionIds] = useState(() => followersListIds.filter((id) => followingListIds.includes(id)));
  const connections = new Set([...followersListIds, ...followingListIds]);
  return (
    <GlobalContext.Provider value={{
      unionIds,
      setUnionIds,
      followersListIds,
      followingListIds,
      connections,
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
