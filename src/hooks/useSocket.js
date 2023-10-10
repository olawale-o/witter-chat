import { useState, useCallback, useEffect, useRef } from "react";
import { useUser, useUserDispatch } from "./useUser";


const useSocket  = (socket) => {
  const [onlineUsers, setOnlineUsers] = useState({});
  const [messages, setMessages] = useState([]);
  const selectedCurrentUser = useRef({});
  const { user } = useUser();
  const { setUser } = useUserDispatch();

  const checkIfUserExist = useCallback(() => {
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
      socket.auth = {sessionId: sessionId};
      socket.connect();
    }
  }, [socket]);

  const handleNewMessageStatus = useCallback((userId, status, message) => {
    const foundUser = onlineUsers[userId];
    if (foundUser) {
      foundUser['hasNewMessage'] = status;
      foundUser['lastMessage'] = message;
      setOnlineUsers({...onlineUsers});
    }
    
  }, [onlineUsers, setOnlineUsers]);


  const handlePrivateChat = useCallback((message) => {
    if (selectedCurrentUser.current.userId) {
      if (selectedCurrentUser.current.userId === message.from) {
        const newMessage = {
          userId: message.from,
          message: message.message,
          username: message.username,
          id: message.from,
          from: message.from,
          to: message.to,
          type: 'text'
        }
        setMessages([...messages, newMessage]);
        // handleNewMessageStatus(message.from, false)
      } else {
        handleNewMessageStatus(message.from, true, message.message)
      }
    } else {
      handleNewMessageStatus(message.from, true, message.message)
    }
  }, [handleNewMessageStatus, messages, selectedCurrentUser]);

  const handleProfileUpdate = useCallback((userId, username) => {
    const user = onlineUsers[userId];
    if (user) {
      user.username = username;
      setOnlineUsers({ ...onlineUsers });
    }
  }, [onlineUsers]);

  const userMessages = useCallback(({ messages, username, userId }) => {
    const chatMessages = [];
    messages.forEach(({ message, from, to, type }) => chatMessages.push({ to, from, message, username, type, userId }))
    setMessages([...chatMessages])
  }, []);

  useEffect(() => {
    socket.on('connect', () => console.log('connected'));
    socket.on('disconnect', () => console.log('disconnected'));
    checkIfUserExist();
    socket.on('session', async({ sessionId, userId, username, avatar }) => {
      if (sessionId && userId && username) {
        socket.auth = { sessionId: sessionId };
        localStorage.setItem('sessionId', sessionId);
        setUser({ sessionId, id: userId, username, userId, avatar })
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
        // list[`${user._id}`] = user;
          list[`${user.userId}`] = user;
        }
      setOnlineUsers(list);
      }
    });
        
    socket.on('private message', (message) => {
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
    handleProfileUpdate,
    setUser,
    user.avatar,
    user.id,
  ]);
  return { user, messages, onlineUsers, selectedCurrentUser, setOnlineUsers, setMessages, handleNewMessageStatus }
};

export { useSocket };

