import { useContext, createContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../hooks/useSocket";

const SocketContext = createContext({});

export const useSocketContext = () => useContext(SocketContext);

export default function SocketProvider({ children, socket }) {
  const navigate = useNavigate();
  const {
    user,
    messages,
    setMessages,
    onlineUsers,
    setOnlineUsers,
    selectedCurrentUser,
    handleNewMessageStatus,
  } = useSocket(socket);
  const [selectedUser, setSelectedUser] = useState({});
  const lastMessageRef = useRef(null);

  const onUserSelected = async (user) => {
    if (user === null) {
      setSelectedUser({});
      selectedCurrentUser.current = null;
    } else {
      setSelectedUser(user);
      selectedCurrentUser.current = user;
      await socket.emit('user messages', user);
      handleNewMessageStatus(user.userId, false, '')
    }
  };
  const onDisconnect = async () => {
    await socket.disconnect();
    localStorage.removeItem('sessionId')
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  }

  const toggleFollow = async (user, currentUser, action) => {
    await socket.emit(action, user, currentUser);
  }
  return (
    <SocketContext.Provider value={{
      socket,
      user,
      setMessages,
      messages,
      selectedUser,
      lastMessageRef,
      onlineUsers,
      setOnlineUsers,
      onUserSelected,
      onDisconnect,
      toggleFollow,
    }}
    >
      {children}
    </SocketContext.Provider>
  )
}