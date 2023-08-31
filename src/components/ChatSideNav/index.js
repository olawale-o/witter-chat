import { useNavigate, Link } from "react-router-dom";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaUserFriends } from 'react-icons/fa';
import { AiOutlineLogout } from 'react-icons/ai';
import { IoChatbubblesOutline } from 'react-icons/io5';
import { useSocketContext } from "../../context/socket";

import './style.css';

export default function ChatSideNav() {
  const { onDisconnect } = useSocketContext();
  const navigate = useNavigate();

  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-list__item">
          <Link to={"/"}>
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
              <FaUserFriends fill='white' />
            </span>
          </Link>
        </li>
        <li className="nav-list__item">
          <button
            type="button"
            onClick={onDisconnect}
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