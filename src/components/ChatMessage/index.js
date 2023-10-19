import './style.css';

import { Message } from './Message';

const ChatMessage = ({
  messages,
}) => {
  return (
    <div>
      {
        messages?.map((message, i) => (
          message.from === JSON.parse(localStorage.getItem('user'))?.user._id ? (
            <Message key={i} message={message} isFromMe />
          ) : (<Message key={i} message={message} isFromMe={false} />)
        ))
      }
    </div>
  )
};

export default ChatMessage;
