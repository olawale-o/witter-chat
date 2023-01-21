import { useState } from "react";
import { UserContext, UserDispatchContext } from "../context/userContext";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={{
      user,
    }}>
      <UserDispatchContext.Provider value={{
        setUser,
      }}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
};

export default UserProvider;
