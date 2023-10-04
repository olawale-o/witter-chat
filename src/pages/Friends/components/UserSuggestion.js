import { useCallback, useRef } from "react";
import { useSocketContext } from "../../../context/socket";
import { useUserConnectionContext } from "../../../context/userConnection";

const UserSuggestion = ({ users, isLoading, onSkip, currentUser }) => {
  const { setFollowingList, setFollowingListIds, followingListIds, setUnionIds } = useUserConnectionContext();
  const { toggleFollow } = useSocketContext();
  const observer = useRef();

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
    if (followingListIds.includes(user._id)) {
      toggleFollow(user, currentUser, 'unfollow')
      setFollowingList((prevState) => {
        const a = [...prevState].filter((user) => user.connection._id !== user._id);
        return a
      });
      setFollowingListIds((prevState) => {
        const a = [...prevState].filter((id) => id !== user._id);
        return a
      });
    } else {
      toggleFollow(user, currentUser, 'follow',)
      setFollowingList((prevState) => ([...prevState, { connection: { ...user } } ]));
      setFollowingListIds((prevState) => ([...prevState, user._id]));
      setUnionIds((prevState) => new Set([...prevState, user._id]));
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
                  {followingListIds.includes(user._id) ? 'Unfollow' : 'Follow'}
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
                  {followingListIds.includes(user._id) ? 'Unfollow' : 'Follow'}
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