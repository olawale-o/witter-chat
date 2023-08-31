import React from "react";
import ChatSideBar from "../../components/ChatSideBar/ChatSideBar";

import './Chat.css'
import ParentChat from "../../components/ParentChat";


const Chat = () => {
  return (
    <div className="chat-container">
      <ChatSideBar />
      <ParentChat />
    </div>
  );
};

export default Chat;
 