import { useContext, createContext, useState } from "react";

const UserConnectionContext = createContext({});

export const useUserConnectionContext = () => useContext(UserConnectionContext);


export const UserConnectionProvider = ({ children, followers, following }) => {
  const getUserFollowingIds = () => following.map((following) => following.followeeId);
  const getUserFollowerIds = () => followers.map((follower) => follower.followerId);
  
  const [followersList, setFollowersList] = useState(followers);
  const [followersListIds, setFollowersListIds] = useState(() => getUserFollowerIds());
  const [followingList, setFollowingList] = useState(following);
  const [followingListIds, setFollowingListIds] = useState(() => getUserFollowingIds());
  
  const [unionIds, setUnionIds] = useState(new Set([...followersListIds, ...followingListIds]));
  const [intersectionIds, setIntersectionIds] = useState(() => followersListIds.filter((id) => followingListIds.includes(id)));
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
      intersectionIds,
      setIntersectionIds
    }}>
      {children}
    </UserConnectionContext.Provider>
  );
};
