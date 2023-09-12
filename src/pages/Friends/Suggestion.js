import { useState, useEffect, useRef} from "react";
import { getFriendSuggestionService } from "../../services/friendService";
import { LinkTabs } from "../../components/Tabs";
import { UserSuggestion } from "./components/UserSuggestion";

const tabs = [{ index: 1, title: 'friends', link: '/friends'}, { index: 2, title: 'request', link: '/friends/request'}];

export async function loader() {
  const userId = JSON.parse(localStorage.getItem('user'))?.user?._id;
  return getFriendSuggestionService(userId);  
}

const limit = 20;

const FriendSuggestion = () => {
  const userId = JSON.parse(localStorage.getItem('user'))?.user?._id;
  const [isLoading, setIsLoading] = useState(false);
  const rootRef = useRef(null);
  const [skip, setSkip] = useState(0);
  const [users, setUsers] = useState([]);
  const [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getFriendSuggestionService(userId, limit, skip)
      .then((result) => {
        if (skip === 0) {
          setUsers(result.users)
        } else {
          setUsers((prevUsers) => ([...prevUsers, ...result.users]))
        }
        setIsLoading(false);
      })
      .catch((err) => console.log(err))
    
  }, [skip]);

  return (
    <div className="tab-container" ref={rootRef}>
      <LinkTabs tabs={tabs} />
      <div className="tab-view">
        <UserSuggestion
          users={users}
          isLoading={isLoading}
          followingList={followingList}
          onSkip={setSkip}
          updateFollowingList={setFollowingList}
          userId={userId}
        />
      </div>
      {
        isLoading && (
          <div className="loading__container">
            <div className="loader"/>
          </div>
        )
      }
    </div>
  )  
};
  
export default FriendSuggestion;
  