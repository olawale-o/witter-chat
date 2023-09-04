import { useState, useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import { getFriendSuggestionService } from "../../services/friendService";
import { useSocketContext } from "../../context/socket";
import { LinkTabs } from "../../components/Tabs";

const userId = JSON.parse(localStorage.getItem('user')).user?._id;

export async function loader() {
  return getFriendSuggestionService(userId);  
}

const tabs = [{ index: 1, title: 'friends', link: '/friends'}, { index: 2, title: 'request', link: '/friends/request'}];
const FriendSuggestion = () => {
  const data = useLoaderData();
  const { toggleFollow } = useSocketContext();
  const [followingList, setFollowingList] = useState([]);

  const ids = useMemo(() => followingList, [followingList]);
  
  const onToggleFollow = (user,) => {
    if (ids.includes(user._id)) {
      toggleFollow(user, userId, 'unfollow')
      const newList = followingList.filter((id) => id !== user?._id);
      setFollowingList(newList);
    } else {
      toggleFollow(user, userId, 'follow',)
      setFollowingList((prevState) => ([...prevState, user._id]))
    }
  };
  return (
    <div className="tab-container">
      <LinkTabs tabs={tabs} />
      <div className="tab-view">
        <ul className="friend-list">
          {
            data.users.slice(0, 20).map((user) => (
              <li className="friend-item" key={user._id}> 
                <div className="friend">
                  <div className="left">
                    <div className="friend-item__image-container">
                      {
                        user?.avatar ? (<img className="img" src={user.avatar} alt="avatar" />) : 
                        (<span>{user.username[0].toUpperCase()}</span>)
                      }
                    </div>
                    <div className="summary">
                      <span className="title">{user.username}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="cta"
                    onClick={() => onToggleFollow(user)}
                  >
                    {ids.includes(user._id) ? 'Unfollow' : 'Follow'}
                  </button>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )  
};
  
export default FriendSuggestion;
  