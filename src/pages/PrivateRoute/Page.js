import { Outlet } from "react-router-dom";

import ChatSideNav from "../../components/ChatSideNav";
import { useDataContext } from "../../context/data";
import { useUserFollowersQuery, useUserFollowingsQuery } from "../../queries/userUserConnectionQuery";
import { UserConnectionProvider } from "../../context/userConnection";

const PrivatePage = ({ socket, }) => {
  console.log('private page');
  const { user } = useDataContext();
  const { data: followers, isLoading: isLoadingFollowers } = useUserFollowersQuery({ user });
  const { data: followings, isLoading: isLoadingFollowing } = useUserFollowingsQuery({ user });
  if (isLoadingFollowers || isLoadingFollowing) return <div>Loading connections for......</div>
  return (
    <UserConnectionProvider
      followers={followers.followers}
      following={followings.following}
    >
      <div className="private">
        <ChatSideNav />
        <Outlet context={[socket]} />
      </div>
    </UserConnectionProvider>
  );
};

export { PrivatePage };
