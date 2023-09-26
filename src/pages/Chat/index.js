import ChatSideBar from "../../components/ChatSideBar/ChatSideBar";

import './Chat.css'
import ParentChat from "../../components/ParentChat";
import GlobalProvider from "../../context/global";
import { useUserFollowersQuery, useUserFollowingsQuery } from "../../queries/userUserConnectionQuery";

const Chat = () => {
  const { data: followers, isLoading: isLoadingFollowers } = useUserFollowersQuery();
  const { data: followings, isLoading: isLoadingFollowing } = useUserFollowingsQuery();
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
 