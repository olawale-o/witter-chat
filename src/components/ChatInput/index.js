import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';

import { BiPaperclip, BiSend } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';

import './style.css';
import { Modal } from '../Modal';

const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.REACT_APP_CLOUDINARY_API_KEY;

const ChatInput = ({ socket, contact, messages, setMessages, user }) => {
  const fileRef = useRef();
  let timeout  = setTimeout(function(){}, 0);
  const [message, setMessage] = useState('');
  const [caption, setCaption] = useState('');
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
    formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

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
        caption: caption ?? null,
        id: user._id,
        to: contact.userId,
        from: user._id,
        type: 'image'
      };
      socket.emit('private message', {
        message: response.secure_url,
        to: contact.userId,
        type: 'image',
        caption: caption ?? null,
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

  const onClose = () => {
    setShowModal(false);
    setPreview(null);
  };
  return (
    <div className="chat-input-container">
      {showModal && createPortal(
        (<Modal>
          <div className="flex flex-col space-between image-modal">
            <div className="close">
              <button
                onClick={onClose}
              >
                <AiOutlineClose />
              </button>
            </div>
            <div className="image-placeholder">
              <img className="modal-image" src={preview} alt="preview" />
            </div>
            <div className="flex space-between">
              <input type="text" name="caption" onChange={(e) => setCaption(e.target.value)} placeholder="Caption" />
              <button type="button" className="btn btn__default btn--green" onClick={uploadFile}>Send</button>
            </div>
          </div>
        </Modal>), document.getElementById("root"))
      }
      <div className="chat-input-content">
        <div className="user-icon">
          <img src={contact.avatar} alt="avatar" />
        </div>
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
