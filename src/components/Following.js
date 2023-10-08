const Following = ({ followers, onToggleFollow, followingListIds }) => {
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
                {followingListIds.includes(user.followeeId) ? "Unfollow" : "Follow back"}
              </button>
            </div>
          </li>
        ))
      }
   </ul>
  )
}
  
  
export { Following }