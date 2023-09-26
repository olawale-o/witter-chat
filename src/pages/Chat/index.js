import React from "react";
import { useLoaderData } from "react-router-dom";
import ChatSideBar from "../../components/ChatSideBar/ChatSideBar";

import { getFollowersService, getFollowingService } from "../../services/friendService";

import './Chat.css'
import ParentChat from "../../components/ParentChat";
import GlobalProvider from "../../context/global";

export async function loader() {
  const userId = JSON.parse(localStorage.getItem('user'))?.user?._id;;
  return Promise.all([getFollowersService(userId), getFollowingService(userId)]);
}

const Chat = () => {
  const data = useLoaderData();
  return (
    <GlobalProvider
      followers={data[0].followers}
      following={data[1].following}
    >
      <div className="chat-container">
        <ChatSideBar />
        <ParentChat />
      </div>
    </GlobalProvider>
  );
};

export default Chat;
 