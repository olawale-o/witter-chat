import React from "react";
import { Outlet } from "react-router-dom";

import './styles.css';
import { UserConnectionProvider } from "../../context/userConnection";
import { useUserFollowersQuery, useUserFollowingsQuery } from "../../queries/userUserConnectionQuery";

const Friends = () => {
  const { data: followers, isLoading: isLoadingFollowers } = useUserFollowersQuery();
  const { data: followings, isLoading: isLoadingFollowing } = useUserFollowingsQuery();
  if (isLoadingFollowers || isLoadingFollowing) return <div>Loading connection......</div>
  return (
    <UserConnectionProvider
      followers={followers.followers}
      following={followings.following}
    >
      <div className="friends-container">
        <div className="friends">
          <Outlet />
        </div>
      </div>
    </UserConnectionProvider>
  );
};

export default Friends;
