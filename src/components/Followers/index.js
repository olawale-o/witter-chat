const Followers = ({ followers, onToggleFollow, intersectionIds = [] }) => {
  return (
    <ul className="friend-list">
      {
        followers.slice(0, 20).map((user) => (
          <li className="friend-item" key={user?._id}> 
            <div className="friend">
              <div className="left">
                <div className="friend-item__image-container">
                  {
                    user?.avatar ? (<img className="img" src={user?.avatar} alt="avatar" />) : 
                    (<span>{user?.username[0].toUpperCase()}</span>)
                  }
                </div>
                <div className="summary">
                  <span className="title">{user?.username}</span>
                </div>
              </div>
              <button
                type="button"
                className="cta"
                onClick={() => onToggleFollow(user)}
              >
                {intersectionIds.includes(user._id) ? 'Following' : 'Follow back' }
              </button>
            </div>
          </li>
        ))
      }
   </ul>
  )
}


export { Followers }