import React from "react";

import { useOutletContext } from "react-router";
import ChatSideBar from "../../components/ChatSideBar/ChatSideBar";

import './Chat.css'
import ChatSideNav from "../../components/ChatSideNav";
import SocketProvider from "../../context/socket";
import ParentChat from "../../components/ParentChat";


const Chat = () => {
  const [socket] = useOutletContext();
  return (
    <SocketProvider socket={socket}>
      <div className="chat-container">
        <ChatSideNav />
        <ChatSideBar />
        <ParentChat />
      </div>
    </SocketProvider>
  );
};

export default Chat;
 