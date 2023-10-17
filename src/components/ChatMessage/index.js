import './style.css';


const Message = ({ message, isFromMe = true}) => {
  return (
    <div className={`chat-message-container ${isFromMe ? 'chat-sender': 'chat-recipient'}`}>
      <div className="avatar-container" />
      <div className="message-area">
        <div className="chat-message-content">
          <span className="chat-profile-name">You</span>
          <p className="chat-message text-sm">{message.message}</p>
        </div>
        <div className="chat-message-timestamp">
          <span className="timestamp text-sm">16:45</span>
          <div className="online-state online small-circle" />
        </div>
      </div>
    </div>
  );
};

const ChatMessage = ({
  messages,
}) => {
  return (
    <div>
      {
        messages?.map((message, i) => (
          message.from === JSON.parse(localStorage.getItem('user'))?.user._id ? (
            <Message key={i} message={message} isFromMe />
          ) : 
          (<Message key={i} message={message} isFromMe={false} />)
        ))
      }
    </div>
  )
};

export default ChatMessage;
