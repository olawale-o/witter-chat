import { HiOutlineUserGroup } from "react-icons/hi";
import { AiOutlineLogout } from 'react-icons/ai';

import './style.css';

export default function ChatSideNav() {
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
          <button type="button">
            <span className="icon icon--white">
              <AiOutlineLogout fill="white" />
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
}