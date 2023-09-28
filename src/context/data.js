import { useContext, createContext, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import { useUserQuery } from "../queries/useUserQuery";

const DataContext = createContext({});

export const useDataContext = () => useContext(DataContext);

export default function DataProvider({ children }) {
  const naviagte = useNavigate();
  const { data, isLoading, isError } = useUserQuery();

  useEffect(() => {
    if (isError) {
      naviagte('/login')
    }
  }, [isError]);

  if (isLoading) {
    return <div>Loading</div>
  }

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