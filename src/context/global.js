import { useState, createContext, useContext } from "react";
const GlobalContext = createContext({});

export const useGlobal = () => useContext(GlobalContext);

const GlobalProvider = ({ children, followers, following }) => {
  const fn = () => following.map((following) => following.followeeId);
  const [followersListIds, setFollowersListIds] = useState(() => followers.map((follower) => follower.followerId));
  const [followingListIds, setFollowingListIds] = useState(() => fn());
  const [unionIds, setUnionIds] = useState(() => followersListIds.filter((id) => followingListIds.includes(id)));
  return (
    <GlobalContext.Provider value={{
      unionIds,
      setUnionIds,
      followersListIds,
      followingListIds
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
