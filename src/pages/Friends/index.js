import React from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import FriendTabs from '../../components/FriendTabs';

const Friends = () => {
  const [socket] = useOutletContext();
  return (
    <div className="friends">
      <div className="tab-container">
        <FriendTabs />
        <div className="tab-view">
          <Outlet context={[socket]} />
        </div>
      </div>
    </div>
  );
};

export default Friends;
