import { get, post } from "../api";

export const getUnfollowedUsers = async (username) => {
  const data = await get(`http://localhost:4000/api/v1/users?q=${username}`);
  return data.users;
};

export const getPendingFriendRequest = async (userId) => {
  const data = await get(`http://localhost:4000/api/v1/users/pending?q=${userId}`);
  return data.friends;
};


export const addFriendRequestService = async (body) => {
  const data = await post('http://localhost:4000/api/v1/users/friends', body);
  return data;
};

export const acceptFriendRequestService = async (body) => {
  const data = await post('http://localhost:4000/api/v1/users/friends/accept', body);
  return data;
};

export const getFriendSuggestionService = async (query) => {
  const data = await get(`http://localhost:4000/api/v1/users/suggestion?q=${query}`);
  return data.suggestions;
};

export const getContactService = async (id) => {
  const data = await get(`http://localhost:4000/api/v1/users/${id}`);
  return data.user;
};
