import React from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'
import { useOutletContext } from "react-router";
import ChatSideBar from "../../components/ChatSideBar/ChatSideBar";
import ChatArea from "../../components/ChatArea/ChatArea";
import { useUser, useUserDispatch } from "../../hooks/useUser";

import './Chat.css'
import ChatSideNav from "../../components/ChatSideNav";
import Profile from "../../components/Profile";


export async function loader() {
  return JSON.parse(localStorage.getItem('user'));
}

const Chat = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  localStorage.removeItem('profile');
  const { user } = useUser();
  const { setUser } = useUserDispatch();
  const [socket] = useOutletContext();
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
    if (data === null || data === undefined) {
      navigate('/');
    } 
  }, [data]);

  React.useEffect(() => {
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

    socket.on('disconnect', (data) => {
      console.log('disconnect', data)
    })
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
 
  return (
    <div className="chat-container">
      <ChatSideNav socket={socket} />
      <ChatSideBar
        socket={socket}
        user={user}
        setSelectedUser={onUserSelected}
        selectedCurrentUser={selectedUser}
        onlineUsers={onlineUsers}
        setOnlineUsers={setOnlineUsers}
      />
      <div className="chat-area">
        {
          selectedUser._id ? (
            <div className="chat-area__content">     
              <nav className="chat-area__nav">
                  <div className="chat-area__nav--left">
                    <input type="text" className="input input--bg-grey" placeholder="Search for a message" />
                    <div className="theme-buttons">
                      <button type="button" className="btn btn__square btn--green btn--light">
                        <span className="icon icon--white">
                          <MdOutlineLightMode />
                        </span>
                      </button>
                      <button type="button" className="btn btn__square btn--dark">
                        <span className="icon icon--green">
                          <MdOutlineDarkMode />
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="chat-area__nav--right">
                    <span className="text-gray text-lg f-600">21, October 2023</span>
                  </div>
              </nav>    
              <div className="box">
                <ChatArea
                  socket={socket}
                  selectedUser={selectedUser}
                  messages={messages}
                  setMessages={setMessages}
                  lastMessageRef={lastMessageRef}
                />
                <Profile user={selectedUser} />
              </div>
            </div>
          ) :
          (<div className="no-chat">Please select a user to chat with</div>)
        }
      </div>
    </div>
  );
};

export default Chat;
 