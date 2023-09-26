import { useQuery } from "@tanstack/react-query";
import { getFollowersService, getFollowingService } from "../services/friendService";

export const useUserConnectionQuery = () => useQuery({
  queryKey: ['user-connections'],
  queryFn: async (credentials = {}) => {
    const userId = JSON.parse(localStorage.getItem('user'))?.user._id;
    const data = await Promise.all([getFollowersService(userId),getFollowingService(userId)]);
    return data;
  }
});

export const useUserFollowersQuery = () => useQuery({
  queryKey: ['user-followers'],
  queryFn: async (credentials = {}) => {
    const userId = JSON.parse(localStorage.getItem('user'))?.user._id;
    const data = await getFollowersService(userId);
    return data;
  }
});
export const useUserFollowingsQuery = () => useQuery({
  queryKey: ['user-followings'],
  queryFn: async (credentials = {}) => {
    const userId = JSON.parse(localStorage.getItem('user'))?.user._id;
    const data = await getFollowingService(userId);
    return data;
  }
});
