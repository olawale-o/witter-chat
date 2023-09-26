import { useContext, createContext } from "react"; 
import { useUserQuery } from "../queries/useUserQuery";

const DataContext = createContext({});

export const useDataContext = () => useContext(DataContext);

export default function DataProvider({ children }) {
  const { data, isLoading } = useUserQuery();
  if (isLoading) return <div>Loading</div>
  return (
    <DataContext.Provider
      value={{
        user: data,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}