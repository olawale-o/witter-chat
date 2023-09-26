import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/friendService";

export const useUserQuery = () => useQuery({
  queryKey: ['users'],
  queryFn: async (credentials = {}) => {
    const userId = JSON.parse(localStorage.getItem('user'))?.user._id;
    if (!userId) {
        throw new Error('Network response was not ok')
    }
    const data = await getUser(userId);
    return data;
  }
});