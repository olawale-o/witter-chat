import { useContext, createContext, useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUserDispatch, useUser } from "../hooks/useUser";

const SocketContext = createContext({});

export const useSocketContext = () => useContext(SocketContext);

export default function SocketProvider({ children, socket }) {
  const navigate = useNavigate();
  const { user } = useUser();
  const { setUser } = useUserDispatch();
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const selectedCurrentUser = useRef({});
  const [onlineUsers, setOnlineUsers] = useState({});
  const lastMessageRef = useRef(null);
  const checkIfUserExist = useCallback(() => {
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
      socket.auth = {sessionId: sessionId};
      socket.connect();
    }
  }, [socket]);
  const handleNewMessageStatus = useCallback((userId, status, message) => {
    const user = onlineUsers[userId];
    if (user) {
      user['hasNewMessage'] = status;
      user['lastMessage'] = message;
      setOnlineUsers({...onlineUsers});
    }
    
  }, [onlineUsers, setOnlineUsers]);

  const handlePrivateChat = useCallback((message) => {
    if (selectedCurrentUser.current._id) {
      if (selectedCurrentUser.current._id === message.from) {
        const newMessage = {
          userId: message.from,
          text: message.text,
          username: message.username,
          id: message.from,
          from: message.from,
          to: message.to
        }
        setMessages([...messages, newMessage]);
        // handleNewMessageStatus(message.from, false)
      } else {
        handleNewMessageStatus(message.from, true, message.text)
      }
    } else {
      handleNewMessageStatus(message.from, true, message.text)
    }
  }, [handleNewMessageStatus, messages, selectedCurrentUser]);

  const handleProfileUpdate = useCallback((userId, username) => {
    const user = onlineUsers[userId];
    if (user) {
      user.username = username;
      setOnlineUsers({ ...onlineUsers });
    }
  }, [onlineUsers]);
  const userMessages = useCallback(({ messages }) => {
    const chatMessages = [];
    messages.forEach(({ text, from, to, username }) => chatMessages.push({ to, from, text, username }))
    setMessages([...chatMessages])
  }, []);

  useEffect(() => {
    socket.on('connect', () => console.log('connected'));
    checkIfUserExist();
    socket.on('session', async({ sessionId, userId, username }) => {
      if (sessionId && userId && username) {
        socket.auth = { sessionId: sessionId };
        localStorage.setItem('sessionId', sessionId);
        setUser({ sessionId, id: userId, username, userId, avatar: user.avatar })
      }
    });
    
    socket.on('profile change', ({ sessionId, userId, username }) => {
      if (sessionId && userId && username) {
        socket.auth = { sessionId: sessionId };
        localStorage.setItem('sessionId', sessionId);
        handleProfileUpdate(userId, username);
        if (user.id === userId) {
            setUser({ sessionId, id: userId, username, userId, avatar: user.avatar });
        }
      }
    })
    
    socket.on("users", (data) => {
    // indicate/show users that are online to loggedin user 
      if (data.length > 0) {
        const list = {};
        for (let user of data) {
          list[`${user._id}`] = user;
        }
        setOnlineUsers(list);
      }
    });
    
    socket.on('private message', (message) => {
      console.log(message);
      handlePrivateChat(message);
    });
    socket.on('user messages', (messages) => userMessages(messages));
    return () => {
      socket.off('connect');
      socket.off('session');
      socket.off('users');
      socket.off('private message');
      socket.off('user messages');
    }
  }, [socket,
      checkIfUserExist,
      userMessages,
      handlePrivateChat,
      user.username,
      user.username,
      handleProfileUpdate,
      setUser,
      user.avatar,
      user.id,
  ]);

  const onUserSelected = async (user) => {
    if (user === null) {
      setSelectedUser({});
      selectedCurrentUser.current = null;
    } else {
      setSelectedUser(user);
      selectedCurrentUser.current = user;
      await socket.emit('user messages', user);
      handleNewMessageStatus(user._id, false, '')
    }
  };
  const onDisconnect = async () => {
    await socket.disconnect();
    localStorage.removeItem('sessionId')
    localStorage.removeItem('user');
    navigate('/', { replace: true });
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
      onDisconnect
    }}
    >
      {children}
    </SocketContext.Provider>
  )
}