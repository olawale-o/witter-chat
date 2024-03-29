import { useEffect, useCallback } from "react";
import ChatSideBarHeader from "./ChatSidebarHeader";
import Contacts from "../Contacts/Contacts";
import OnlineContacts from "../Contacts/Online";
import { useSocketContext } from "../../context/socket";
import './ChatSidebar.css';
import { useUserConnectionContext } from "../../context/userConnection";

const ChatSideBar = () => {
  const { followersListIds, followingListIds } = useUserConnectionContext()
  const { socket, user, onlineUsers, setOnlineUsers, selectedUser, onUserSelected } = useSocketContext();
  const findUser = useCallback((userId) => {
    const user = onlineUsers[userId];
    return user
  }, [onlineUsers]);

  const handleConnectionStatus = useCallback((userId, status) => {
    const connectedUser = findUser(userId);
    if (connectedUser) {
      connectedUser.online = status;
      setOnlineUsers({ ...onlineUsers });
    }

  },  [setOnlineUsers, findUser, onlineUsers]);

  const onUserConnected = useCallback((userId, username) => {
    if (user.id !== userId) {
        const userExists = findUser(userId);
        if (userExists) {
          handleConnectionStatus(userId, true);
        } else {
          const newUser = { userId, username, _id: userId, online: true }
          onlineUsers[userId] = newUser
          newUser.online = true;
          setOnlineUsers({ ...onlineUsers });
        }
    }
  }, [handleConnectionStatus, findUser, onlineUsers, setOnlineUsers, user.id]);

  const userDisconnected = useCallback(({ userId }) => {
    handleConnectionStatus(userId, false)
  }, [handleConnectionStatus]);
  useEffect(() => {
    socket.on('user connected', ({ userId, username }) => {
      if (followersListIds.includes(userId) || followingListIds.includes(userId)) {
        onUserConnected(userId, username);
      }
    })

    socket.on("user disconnected", (user) => {
      userDisconnected(user)
    })
  }, [socket, onUserConnected, userDisconnected, onlineUsers]);

  return (
    <div className="chatsidebar">
      <div className="top">
        <ChatSideBarHeader user={user} />
        <OnlineContacts users={onlineUsers} />
      </div>
      <Contacts
        setSelectedUser={onUserSelected}
        user={user}
        socket={socket}
        onlineUsers={onlineUsers}
        selectedCurrentUser={selectedUser}
      />
    </div>
  )
};

export default ChatSideBar;
