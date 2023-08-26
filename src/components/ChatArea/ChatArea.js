import React from 'react';

import ChatBody from '../ChatBody';
import ChatInput from '../ChatInput'
import './ChatArea.css';



const ChatArea = ({
  socket,
  messages,
  setMessages,
  selectedUser,
}) => {
  const userData = JSON.parse(localStorage.getItem('user')).user;
  const lastMessageRef = React.useRef(null);
  const [typingStatus, setTypingStatus] = React.useState('');

  React.useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  React.useEffect(() => {
    socket.on('typingResponse' , (data) => setTypingStatus(data));
    socket.on('doneTypingResponse' , (data) => setTypingStatus(data));
  }, [socket]);
  return (
    <div className="chat-content">
      <div className="chat-with">
        <span className="text-gray text-sm">Chat with</span>
        <span className="text-black text-xl">{selectedUser?.username}</span>
      </div>
      <ChatBody
        messages={messages}
        lastMessageRef={lastMessageRef}
        typingStatus={typingStatus}
        contact={selectedUser}
      />
      <ChatInput
        socket={socket}
        contact={selectedUser}
        messages={messages}
        setMessages={setMessages}
        user={userData}
      />
    </div>
  )
};

export default ChatArea;