import { useContext, createContext, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import { useUserQuery } from "../queries/useUserQuery";

const DataContext = createContext({});

export const useDataContext = () => useContext(DataContext);

export default function DataProvider({ children }) {
  const naviagte = useNavigate();
  const { data, isError } = useUserQuery();

  useEffect(() => {
    if (isError) {
      naviagte('/login')
    }
  }, [isError]);

  if (data) {
    return (
      <DataContext.Provider
        value={{
          user: data?.data,
        }}
      >
        {children}
      </DataContext.Provider>
    );
  }
  return <div>Loading</div>
}