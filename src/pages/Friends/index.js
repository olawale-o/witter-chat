import { Outlet, useOutletContext, } from "react-router-dom";
import './styles.css';

const Friends = () => {
  const [socket] = useOutletContext();

  return (
    <div className="friends-container">
      <div className="friends">
        <Outlet context={[socket]} />
      </div>
    </div>
  );
};

export default Friends;
