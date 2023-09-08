import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";

import { getFollowersService, getFollowingService } from '../../services/friendService';

import './styles.css';
import { UserConnectionProvider } from "../../context/userConnection";



export async function loader() {
  const userId = JSON.parse(localStorage.getItem('user'))?.user?._id;;
  return Promise.all([getFollowersService(userId), getFollowingService(userId)]);
}

const Friends = () => {
  const data = useLoaderData();
  return (
    <UserConnectionProvider
      followers={data[0].followers}
      following={data[1].following}
    >
      <div className="friends-container">
        <div className="friends">
          <Outlet />
        </div>
      </div>
    </UserConnectionProvider>
  );
};

export default Friends;
