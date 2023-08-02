import { useState } from "react";
import { UserContext, UserDispatchContext } from "../context/userContext";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [followers, setFollowers] = useState({});
  return (
    <UserContext.Provider value={{
      user,
      followers,
    }}>
      <UserDispatchContext.Provider value={{
        setUser,
        setFollowers
      }}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
};

export default UserProvider;
