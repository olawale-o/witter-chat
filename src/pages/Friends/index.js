import React from "react";
import { Outlet } from "react-router-dom";
import FriendTabs from '../../components/FriendTabs';

import './styles.css'

const Friends = () => {
  return (
    <div className="friends-container">
      <div className="friends">
        <div className="tab-container">
          <FriendTabs />
          <div className="tab-view">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
