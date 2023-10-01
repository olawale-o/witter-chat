import { useQuery } from "@tanstack/react-query";
import { getFollowersService, getFollowingService } from "../services/friendService";;

export const useUserFollowersQuery = (details) => useQuery({
  queryKey: ['user-followers'],
  queryFn: async (credentials = {}) => {
    const data = await getFollowersService(details.user._id);
    return data;
  },
  enabled: !!details?.user?._id
});
export const useUserFollowingsQuery = (details) => useQuery({
  queryKey: ['user-followings'],
  queryFn: async (credentials = {}) => {
    const data = await getFollowingService(details.user._id);
    return data;
  },
  enabled: !!details?.user?._id
});
