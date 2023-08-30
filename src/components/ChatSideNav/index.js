import { useNavigate } from "react-router-dom";
import { HiOutlineUserGroup } from "react-icons/hi";
import { AiOutlineLogout } from 'react-icons/ai';
import { useSocketContext } from "../../context/socket";

import './style.css';

export default function ChatSideNav() {
  const { onDisconnect } = useSocketContext();
  const navigate = useNavigate();

  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-list__item">
          <button type="button">
            <span className="icon icon--white">
              <HiOutlineUserGroup fill='white' />
            </span>
          </button>
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