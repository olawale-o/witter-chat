import { post } from "../api";

export const loginService = async (body) => {
  const data = await post('http://localhost:5000/api/v1/users/login', body);
  return data;
};

export const registerService = async (body) => {
  console.log('register', body)
  const data = await post('http://localhost:5000/api/v1/users/new', body);
  return data;
};

export const profileService = async (body) => {
  const data = await post('http://localhost:5000/api/v1/users/update', body);
  return data;
};
