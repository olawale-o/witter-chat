import './style.css';
import { useState } from "react";
import { Link } from "react-router-dom";
import { createPortal } from 'react-dom';
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaUserFriends, FaUsers } from 'react-icons/fa';
import { AiOutlineLogout } from 'react-icons/ai';
import { IoChatbubblesOutline } from 'react-icons/io5';
import { useSocketContext } from "../../context/socket";

import { Modal } from "../Modal";

export default function ChatSideNav() {
  const { onDisconnect } = useSocketContext();
  const [showModal, setShowModal] = useState(false);

  const showLogoutPrompt = () => setShowModal(true);

  const confirm = async (cancel = true) => {
    if (cancel) {
      setShowModal(false);
    } else {
      await onDisconnect();
      setShowModal((prevState) => !prevState);
    }
  };
  return (
    <nav className="nav">
      {showModal && createPortal(
        (<Modal>
          <div className="logout-modal">
            <p className="text-lg text-center mb-4">Are you sure you want to logout</p>
            <div className="btn-group">
              <button onClick={confirm} className="btn btn__default btn--grey">Cancel</button>
              <button onClick={() => confirm(false)} className="btn btn__default btn--green">Log out</button>
            </div>
          </div>
        </Modal>), document.getElementById("root"))
      }
      <ul className="nav-list">
        <li className="nav-list__item">
          <Link to="/">
            <span className="icon icon--white">
              <HiOutlineUserGroup fill='white' />
            </span>
          </Link>
        </li>
        <li className="nav-list__item">
          <Link to="/chat">
            <span className="icon icon--white">
              <IoChatbubblesOutline fill='white' />
            </span>
          </Link>
        </li>
        <li className="nav-list__item">
          <Link to="/friends">
            <span className="icon icon--white">
              <FaUsers fill='white' />
            </span>
          </Link>
        </li>
        <li className="nav-list__item">
          <Link to="/friends/request">
            <span className="icon icon--white">
              <FaUserFriends fill='white' />
            </span>
          </Link>
        </li>
        <li className="nav-list__item">
          <button
            type="button"
            onClick={showLogoutPrompt}
          >
            <span className="icon icon--white">
              <AiOutlineLogout fill="white" />
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
}