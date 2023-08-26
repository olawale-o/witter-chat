import ChatMessage from "../ChatMessage";

import './style.css';

const ChatBody = ({ messages, lastMessageRef }) => {
  return (
    <div className="chat-body">
      <ChatMessage messages={messages} />
      <div ref={lastMessageRef} />
    </div>
  )
};

export default ChatBody;
