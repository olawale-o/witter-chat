import { Outlet } from "react-router-dom";

import './styles.css';

const Friends = () => {
  return (
    <div className="friends-container">
      <div className="friends">
        <Outlet />
      </div>
    </div>
  );
};

export default Friends;
