import { useNavigate } from "react-router-dom";
import { HiOutlineUserGroup } from "react-icons/hi";
import { AiOutlineLogout } from 'react-icons/ai';

import './style.css';

export default function ChatSideNav({ socket }) {
  const navigate = useNavigate();
  const onDisconnect = async () => {
    localStorage.removeItem('sessionId')
    localStorage.removeItem('user');
    await socket.disconnect();
   navigate('/', { replace: true });
  }
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