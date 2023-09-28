import ChatSideBar from "../../components/ChatSideBar/ChatSideBar";

import './Chat.css'
import ParentChat from "../../components/ParentChat";
import GlobalProvider from "../../context/global";
import { useUserFollowersQuery, useUserFollowingsQuery } from "../../queries/userUserConnectionQuery";
import { useDataContext } from "../../context/data";

const Chat = () => {
  const { user } = useDataContext();
  const { data: followers, isLoading: isLoadingFollowers } = useUserFollowersQuery({ user });
  const { data: followings, isLoading: isLoadingFollowing } = useUserFollowingsQuery({ user });
  if (isLoadingFollowers || isLoadingFollowing) return <div>Loading connection......</div>
  return (
    <GlobalProvider
      followers={followers.followers}
      following={followings.following}
    >
      <div className="chat-container">
        <ChatSideBar />
        <ParentChat />
      </div>
    </GlobalProvider>
  );
};

export default Chat;
 