import { useEffect, useState, useRef } from 'react';
import './ChatArea.css';

import ChatBody from '../ChatBody';
import ChatInput from '../ChatInput';

const ChatArea = ({
  socket,
  messages,
  setMessages,
  selectedUser,
}) => {
  const userData = JSON.parse(localStorage.getItem('user'))?.user;
  const lastMessageRef = useRef(null);
  const [typingStatus, setTypingStatus] = useState('');

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
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