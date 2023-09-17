import { get, post } from "../api";

export const getUnfollowedUsers = async (username) => {
  const data = await get(`http://localhost:5000/api/v1/users?q=${username}`);
  return data.users;
};

export const getPendingFriendRequest = async (userId) => {
  const data = await get(`http://localhost:5000/api/v1/users/pending?q=${userId}`);
  return data.friends;
};


export const addFriendRequestService = async (body) => {
  const data = await post('http://localhost:5000/api/v1/users/friends', body);
  return data;
};

export const acceptFriendRequestService = async (body) => {
  const data = await post('http://localhost:5000/api/v1/users/friends/accept', body);
  return data;
};

export const getFriendSuggestionService = async (id, limit = 20, skip = 0) => {
  const data = await get(`http://localhost:5000/api/v1/users/${id}/suggestion?limit=${limit}&skip=${skip}`);
  return data;
};

export const getFollowersService = async (id) => {
  const data = await get(`http://localhost:5000/api/v1/users/${id}/followers`);
  return data;
};

export const getFollowingService = async (id) => {
  const data = await get(`http://localhost:5000/api/v1/users/${id}/following`);
  return data;
};

export const getFriendsList = async (id) => {
  const data = await get(`http://localhost:5000/api/v1/users/${id}`);
  return data;
};

export const getContactService = async (id) => {
  const data = await get(`http://localhost:5000/api/v1/users/${id}`);
  return data.user;
};

export const getFriendRequestService = async (query) => {
  const data = await get(`http://localhost:5000/api/v1/friends/requests?q=${query}`);
  return data;
};
