import { useState, useRef } from 'react';

import { BiPaperclip, BiSend } from 'react-icons/bi';

import './style.css';
import { ImageModal } from '../ChatArea/ImageModal';
import { createPortal } from 'react-dom';

const CLOUD_NAME = process.env.REACT_CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.REACT_CLOUDINARY_API_KEY;

const ChatInput = ({ socket, contact, messages, setMessages, user }) => {
  const fileRef = useRef();
  let timeout  = setTimeout(function(){}, 0);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState();

  const handleTyping = () => {
    clearTimeout(timeout);
    socket.emit('typing', `${JSON.parse(localStorage.getItem('user')).user.username} is typing`);
    timeout = setTimeout(() => {
      socket.emit('doneTyping', '')
    }, 5000)
  };

  const onFileClick = () => {
    fileRef.current.click();
  };

  const onChange = (e) => {
    setPreview(URL.createObjectURL(fileRef.current.files[0]));
    setShowModal(true);
  };

  const uploadFile = () => {
    const url = "https://api.cloudinary.com/v1_1/" + CLOUD_NAME + "/auto/upload";
    const file = fileRef.current.files[0];

    const formData = new FormData();

    formData.append("file", file);
    formData.append("api_key", API_KEY);
    formData.append("folder", "chats");
    formData.append("upload_preset", process.env.REACT_CLOUDINARY_UPLOAD_PRESET);

    fetch(url, {
      method: "POST",
      body: formData
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const response = data;
      const newMessage = {
        userId: user._id,
        username: user.username,
        message: response.secure_url,
        id: user._id,
        to: contact.userId,
        from: user._id,
        type: 'image'
      };
      socket.emit('private message', {
        message: response.secure_url,
        to: contact.userId,
        type: 'image'
      });
      setMessages([...messages, newMessage])
      setMessage('');
      setPreview(null);
      setShowModal((prevState) => !prevState);
    }).catch((err) => console.log(err));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessage = {
      userId: user._id,
      username: user.username,
      message,
      id: user._id,
      to: contact.userId,
      from: user._id,
      type: 'text'
    };
    socket.emit('private message', {
      message,
      to: contact.userId,
      type: 'text'
    });
    setMessages([...messages, newMessage])
    setMessage('');
  }
  return (
    <div className="chat-input-container">
      {showModal && createPortal(
        <ImageModal src={preview} action={uploadFile} />, document.getElementById("root"))
      }
      <div className="chat-input-content">
        <div className="user-icon" />
        <input
          type="text"
          className="chat-input"
          placeholder={`Write ${contact.username} a message`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input type="file" ref={fileRef} accept="image/*" onChange={onChange} hidden />
        <div className="utils">
          <button type="button" className="btn btn__square clip" onClick={onFileClick}>
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
