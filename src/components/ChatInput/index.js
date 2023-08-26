import React from 'react';

import { BiPaperclip, BiSend } from 'react-icons/bi';

import './style.css';

const ChatInput = ({ socket, contact, messages, setMessages, user }) => {
  let timeout  = setTimeout(function(){}, 0);
  const [message, setMessage] = React.useState('');
  const handleTyping = () => {
    clearTimeout(timeout);
    socket.emit('typing', `${JSON.parse(localStorage.getItem('user')).user.username} is typing`);
    timeout = setTimeout(() => {
      socket.emit('doneTyping', '')
    }, 5000)
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessage = {
      userId: user._id,
      username: user.username,
      text: message,
      id: user._id,
      to: contact._id,
      from: user._id,
    }
    socket.emit('private message', {
      text: message,
      to: contact._id
    });
    setMessages([...messages, newMessage])
    setMessage('');
  }
  return (
    <div className="chat-input-container">
      <div className="chat-input-content">
        <div className="user-icon" />
        <input
          type="text"
          className="chat-input"
          placeholder={`Write ${contact.username} a message`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="utils">
          <button type="button" className="btn btn__square clip">
            <BiPaperclip />
          </button>
          <button
            type="button"
            className="btn btn__square btn--green"
            onClick={handleSubmit}
          >
            <BiSend />
          </button>
        </div>
      </div>
    </div>
  )
};

export default ChatInput;
