import { useMemo, useCallback, useRef } from "react";
import { useSocketContext } from "../../../context/socket";

const UserSuggestion = ({ users, followingList, isLoading, onSkip, updateFollowingList, userId }) => {
  const observer = useRef();
  const { toggleFollow } = useSocketContext()
  const ids = useMemo(() => followingList, [followingList]);

  const lastBookElementRef = useCallback((node) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        onSkip((prevState) => prevState + 20)
      }
    });

    if (node) observer.current.observe(node)

  }, []);

  const onToggleFollow = (user,) => {
    if (ids.includes(user._id)) {
      toggleFollow(user, userId, 'unfollow')
      const newList = followingList.filter((id) => id !== user?._id);
      updateFollowingList(newList);
    } else {
      toggleFollow(user, userId, 'follow',)
      updateFollowingList((prevState) => ([...prevState, user._id]))
    }
  };
  return (
    <ul className="friend-list">
    {
      users.map((user, i) => {
        if (users.length === i + 1) {
          return (
            <li className="friend-item" key={user._id} ref={lastBookElementRef}> 
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
          )
        } else {
          return (
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
          )
        }
      })
    }
    </ul>
  );
};

export { UserSuggestion }