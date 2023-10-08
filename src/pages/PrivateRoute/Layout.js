import { Outlet  } from "react-router-dom";
import { useDataContext } from "../../context/data";
import { UserConnectionProvider } from "../../context/userConnection";

import { PrivatePage } from "./Page";

import { useUserFollowingsQuery, useUserFollowersQuery } from "../../queries/userUserConnectionQuery";

import ChatSideNav from "../../components/ChatSideNav";

const PrivatePageLayout = ({ socket, }) => {
  const { user } = useDataContext();
  const { data: followers, isLoading: isLoadingFollowers } = useUserFollowersQuery({ user });
  const { data: followings, isLoading: isLoadingFollowing } = useUserFollowingsQuery({ user });
  if (followers && followings) {
    return (
      <UserConnectionProvider
        followers={followers.followers}
        following={followings.following}
      >
        <div className="private">
          <PrivatePage socket={socket}>
            <ChatSideNav />
            <Outlet context={[socket]} />
          </PrivatePage>
        </div>
      </UserConnectionProvider>
    );
  }
  return <div>Loading connections for......</div>
};

export { PrivatePageLayout };
