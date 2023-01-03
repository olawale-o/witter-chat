import React from 'react';
import { BiPaperclip, BiSend } from 'react-icons/bi'

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
      userId: user.id,
      username: user.username,
      text: message,
      id: user.id,
      to: contact._id,
      from: user.id,
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
        <input
          type="text"
          className="chat-input"
          placeholder={`Write ${contact.username} a message`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="utils">
          <button className="clip">
            <BiPaperclip />
          </button>
          <button
            className="send"
            onClick={handleSubmit}
          >
            <BiSend />
          </button>
        </div>
      </div>
    </div>
  )
};

const ChatMessage = ({
  messages
}) => {
  return (
    <div>
      {
        messages?.map((message, i) => (
          message.from === JSON.parse(localStorage.getItem('user')).user.id ? (
            <div className="chat-message-container chat-sender" key={i}>
              <div className="avatar-container" />
              <div className="message-area">
                <div className="chat-message-content">
                  <span className="chat-profile-name">You</span>
                  <p className="chat-message text-sm">{message.text}</p>
                </div>
                <div className="chat-message-timestamp">
                  <span className="timestamp text-sm">16:45</span>
                  <div className="online-state online small-circle" />
                </div>
              </div>
            </div>) : (
              <div className="chat-message-container chat-recipient" key={i}>
                <div className="avatar-container" />
                  <div className="message-area">
                    <div className="chat-message-content">
                      <span className="chat-profile-name">{message.username}</span>
                      <p className="chat-message text-sm">{message.text}</p>
                    </div>
                  <div className="chat-message-timestamp">
                    <span className="timestamp text-sm">16:45</span>
                    <div className="online-state online small-circle" />
                  </div>
                </div>
              </div>
            )
        ))
      }
    </div>
  )
};

const ChatBody = ({ messages }) => {
 return (
    <div className="chat-body">
      <ChatMessage messages={messages} />
    </div>
 )
};

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
    <div>
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