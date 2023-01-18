import { useOutletContext } from "react-router-dom";

const Friends = () => {
  const [socket] = useOutletContext();

  return (
    <div className="friends">
        <h1>Friends</h1>
    </div>
  );
};

export default Friends;
