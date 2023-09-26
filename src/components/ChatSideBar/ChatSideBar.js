import { useEffect, useCallback } from "react";
import ChatSideBarHeader from "./ChatSidebarHeader";
import Contacts from "../Contacts/Contacts";
import OnlineContacts from "../Contacts/Online";
import { useSocketContext } from "../../context/socket";
import './ChatSidebar.css';

const ChatSideBar = () => {
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
    console.log('on user connected');
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
      // console.log('user connected', userId, username)
      onUserConnected(userId, username)
    })

    socket.on("user disconnected", (user) => {
      // console.log(user, 'disconnected')
      userDisconnected(user)
    })
  }, [socket, onUserConnected, userDisconnected, onlineUsers])

  return (
    <div className="chatsidebar">
      <ChatSideBarHeader user={user} />
      <div className="divider" />
      <OnlineContacts users={onlineUsers} />
      <div className="divider" />
      <Contacts
        setSelectedUser={onUserSelected}
        user={user}
        socket={socket}
        onlineUsers={onlineUsers}
        setOnlineUsers={setOnlineUsers}
        selectedCurrentUser={selectedUser}
      />
    </div>
  )
};

export default ChatSideBar;
