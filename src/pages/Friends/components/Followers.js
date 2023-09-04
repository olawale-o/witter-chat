const Followers = ({ followers, onToggleFollow, ids, page }) => {
  return (
    <ul className="friend-list">
      {
        followers.slice(0, 20).map((user) => (
          <li className="friend-item" key={user.connection?._id}> 
            <div className="friend">
              <div className="left">
                <div className="friend-item__image-container">
                  {
                    user.connection?.avatar ? (<img className="img" src={user.connection?.avatar} alt="avatar" />) : 
                    (<span>{user.connection?.username[0].toUpperCase()}</span>)
                  }
                </div>
                <div className="summary">
                  <span className="title">{user.connection?.username}</span>
                </div>
              </div>
              <button
                type="button"
                className="cta"
                onClick={() => onToggleFollow(user.connection)}
              >
                {ids.includes(user.connection?._id) || page === 'following' ? 'Unfollow' : 'Follow'}
              </button>
            </div>
          </li>
        ))
      }
   </ul>
  )
}


export { Followers }