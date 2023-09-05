import { useContext, createContext, useState } from "react";

const UserConnectionContext = createContext({});

export const useUserConnectionContext = () => useContext(UserConnectionContext);


export const UserConnectionProvider = ({ children, followers, following }) => {
  const [followersList, setFollowersList] = useState(followers);
  const [followersListIds, setFollowersListIds] = useState(() => followers.map((follower) => follower.followerId));
  const [followingList, setFollowingList] = useState(following);
  const [followingListIds, setFollowingListIds] = useState(() => following.map((following) => following.followeeId));
  const [unionIds, setUnionId] = useState(() => followersListIds.filter((id) => followingListIds.includes(id)));
  return (
    <UserConnectionContext.Provider value={{
      followersList,
      followingList,
      setFollowersList,
      setFollowingList,
      unionIds
    }}>
      {children}
    </UserConnectionContext.Provider>
  );
};
