import { useOutletContext } from "react-router-dom";

const Friends = () => {
  const [socket] = useOutletContext();

  return (
    <div className="friends">
      <ul className="friend-list">
        <li className="friend">
          <div className="img">
            <img src="https://i.pravatar.cc/150?img=1" alt="avatar" />
          </div>
          <div className="summary">
            <h3 className="title">John Doe</h3>
            <p className="status">Online</p>
            <div className="actions">
              <button>Add Friend</button>
              <button>Remove</button>
            </div>
          </div>
        </li>
        <li className="friend">
          <div className="img">
            <img src="https://i.pravatar.cc/150?img=1" alt="avatar" />
          </div>
          <div className="summary">
            <h3 className="title">John Doe</h3>
            <p className="status">Online</p>
            <div className="actions">
              <button>Add Friend</button>
              <button>Remove</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Friends;
