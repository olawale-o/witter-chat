import { useContext, createContext, useEffect } from "react"; 
import { useNavigate, useLocation, useLoaderData } from "react-router-dom";

const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export async function loader() {
  return JSON.parse(localStorage.getItem("user"));
}

export default function AuthProvider({ children }) {
  const data = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (data !== undefined && location.pathname !== '/') {
      navigate('/chat', { replace: true });
    } else {
      navigate(location.pathname);
    }
  }, []);
  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  );
}