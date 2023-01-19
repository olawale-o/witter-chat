import { get, post } from "../api";

export const getUnfollowedUsers = async (username) => {
  console.log(username);
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

export const getFriendSuggestionService = async (query) => {
  const data = await get(`http://localhost:5000/api/v1/friends/suggestions?q=${query}`);
  return data;
};

export const getContactService = async (id) => {
  const data = await get(`http://localhost:5000/api/v1/users/${id}`);
  return data.user;
};
