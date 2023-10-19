import Logo from "../../assets/logo.png";

const Text = ({ message }) => <p className="chat-message text-sm">{message}</p>;
const Image = ({ image }) => (
  <div className="image-chat">
    <img src={image.message ?? Logo}  alt="preview" />
   {image.caption && <p className="text-md">{image.caption}</p>}
  </div>
);

const Item = ({ item }) => {
  switch(item.type) {
    case 'image':
      return <Image image={item} />
    default:
      return <Text message={item.message} />
  }
};

const Message = ({ message, isFromMe = true}) => {
  return (
    <div className={`chat-message-container ${isFromMe ? 'chat-sender': 'chat-recipient'}`}>
      <div className="avatar-container" />
      <div className="message-area">
        <div className="chat-message-content">
          <span className="chat-profile-name">You</span>
          <Item item={message} />
        </div>
        <div className="chat-message-timestamp">
          <span className="text-sm timestamp">16:45</span>
          <div className="online-state online small-circle" />
        </div>
      </div>
    </div>
  );
};

export { Message };
