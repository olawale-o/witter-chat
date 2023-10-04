import { Outlet, } from "react-router-dom";

import { LinkTabs } from "../../components/Tabs";;

const tabs = [{ index: 1, title: 'followers', link: '/friends/request/followers'}, { index: 2, title: 'following', link: '/friends/request/following'}];

const FriendRequest = () => {
  return (
    <div className="tab-container">
      <LinkTabs tabs={tabs} />
      <div className="tab-view">
        <Outlet />
      </div>
    </div>
  )  
};
  
export default FriendRequest;
