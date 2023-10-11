import { Link } from "react-router-dom";
import { BiCog, BiChevronLeftSquare } from "react-icons/bi";
import './ChatSidebarHeader.css';

export default function ChatSideBarHeader({ user }) {
    if (!user) {
      return null;
    }
    return (
      <div className="chat-sidebar__header">
        {/* <Link to="/profile"> */}
          <span className="icon">
            <BiChevronLeftSquare />
          </span>
        {/* </Link> */}
        <div className="chat-sidebar__detail">
          <div className="chat-sidebar__detail-img">
            {user?.avatar ? (<img
              src={user.avatar}
              alt="avatar"
              className="chat-sidebar__detail__img"
              />
            ): (
              <span className="placeholder">{user?.username[0]}</span>
            )}
          </div>
          <span className="chat-sidebar__detail__name">{user?.username}</span>
          <span className="text-sm text-gray">My account</span>
        </div>
        {/* <Link to="/friends"> */}
          <span className="icon">
            <BiCog />
          </span>
        {/* </Link> */}
      </div>
    );
  };