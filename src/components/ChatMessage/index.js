import './style.css';

const ChatMessage = ({
  messages,
}) => {
  return (
    <div>
      {
        messages?.map((message, i) => (
          message.from === JSON.parse(localStorage.getItem('user'))?.user._id ? (
            <div className="chat-message-container chat-sender" key={i}>
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
          ) : 
          (
            <div className="chat-message-container chat-recipient" key={i}>
              <div className="avatar-container" />
                <div className="message-area">
                  <div className="chat-message-content">
                    <span className="chat-profile-name">{message.username}</span>
                    <p className="chat-message text-sm">{message.message}</p>
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

export default ChatMessage;
