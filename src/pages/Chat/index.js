import React from "react";
import { useOutletContext } from "react-router";
import ChatSideBar from "../../components/ChatSideBar";
import ChatArea from "../../components/ChatArea";
import { getUnfollowedUsers } from '../../services/friendService';
import { useUser, useUserDispatch } from "../../hooks/useUser";

const Chat = () => {
  localStorage.removeItem('profile');
  const { user } = useUser();
  const { setUser } = useUserDispatch();
  const savedUser = JSON.parse(localStorage.getItem('user')).user;
  const [socket] = useOutletContext();
  // const [user, setUser] = React.useState({});
  const [messages, setMessages] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState({});
  const selectedCurrentUser = React.useRef({});
  const [onlineUsers, setOnlineUsers] = React.useState({});
  const lastMessageRef = React.useRef(null);

  const handleNewMessageStatus = React.useCallback((userId, status, message) => {
    const user = onlineUsers[userId];
    if (user) {
      user['hasNewMessage'] = status;
      user['lastMessage'] = message;
      setOnlineUsers({...onlineUsers});
    }
    
  }, [onlineUsers, setOnlineUsers]);

  const handlePrivateChat = React.useCallback((message) => {
    if (selectedCurrentUser.current._id) {
      if (selectedCurrentUser.current._id === message.from) {
        console.log('c')
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
  }, [handleNewMessageStatus, messages, selectedCurrentUser])

  const checkIfUserExist = React.useCallback(() => {
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
      socket.auth = {sessionId: sessionId};
      socket.connect();
    }
  }, [socket])
  
  const handleProfileUpdate = React.useCallback((userId, username) => {
    const user = onlineUsers[userId];
    if (user) {
      user.username = username;
      setOnlineUsers({ ...onlineUsers });
    }
  }, [onlineUsers]);
  const userMessages = React.useCallback(({ messages }) => {
    const chatMessages = [];
    messages.forEach(({ text, from, to, username }) => chatMessages.push({ to, from, text, username }))
    setMessages([...chatMessages])
  }, []);

  React.useEffect(() => {
    async function getUsers() {
      try {
        const users = await getUnfollowedUsers(savedUser.username);
        const list = {};
        for (let user of users) {
          list[`${user._id}`] = user;
        }
        setOnlineUsers(list);
      } catch (error) {
        console.log(error);
      }
    }
    getUsers();
  }, [savedUser.username]);

  React.useEffect(() => {
    socket.on('connect', () => console.log('connected'));
    checkIfUserExist();

    async function getUsers() {
      try {
        const users = await getUnfollowedUsers(user.username);
        const list = {};
        for (let user of users) {
          list[`${user.id}`] = user;
        }
        setOnlineUsers(list);
      } catch (error) {
        console.log(error);
      }
    }
    // getUsers();

    socket.on('session', async({ sessionId, userId, username }) => {
      if (sessionId && userId && username) {
        socket.auth = { sessionId: sessionId };
        localStorage.setItem('sessionId', sessionId);
        setUser({ sessionId, id: userId, username, userId, avatar: savedUser.avatar })
      }
    });

    socket.on('profile change', ({ sessionId, userId, username }) => {
      if (sessionId && userId && username) {
        socket.auth = { sessionId: sessionId };
        localStorage.setItem('sessionId', sessionId);
        handleProfileUpdate(userId, username);
        if (savedUser.id === userId) {
          setUser({ sessionId, id: userId, username, userId, avatar: savedUser.avatar });
        }
      }
    })

    socket.on("users", (data) => {
      // console.log(data);
      const list = {};
      for (let user of data) {
        list[`${user._id}`] = user;
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
      savedUser,
      handleProfileUpdate,
      setUser
   ]);

  const onUserSelected = async (user) => {
    setSelectedUser(user);
    selectedCurrentUser.current = user;
    await socket.emit('user messages', user);
    handleNewMessageStatus(user._id, false, '')
  };

  return (
    <div className="chat">
      <ChatSideBar
        socket={socket}
        user={user}
        setSelectedUser={onUserSelected}
        selectedCurrentUser={selectedCurrentUser}
        onlineUsers={onlineUsers}
        setOnlineUsers={setOnlineUsers}
      />
      <div className="chat-area">
        {
          selectedUser._id ?
          (<ChatArea
            socket={socket}
            selectedUser={selectedUser}
            messages={messages}
            setMessages={setMessages}
            lastMessageRef={lastMessageRef}
          />)
           :
          (<div>Please select a user to chat with</div>)
        }
      </div>
    </div>
  );
};

export default Chat;
