import { useContext, createContext } from "react"; 

const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export default function AuthProvider({ children, socket }) {
  const startSocket = (user) => {
    const { username, _id, name } = user;
    socket.auth = { user: { username, _id, name } };
    socket.connect();
  }
  return (
    <AuthContext.Provider value={{
      startSocket,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}