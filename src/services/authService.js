import { post, put } from "../api";

export const loginService = async (body) => {
  const data = await post('/users/login', body);
  return data;
};

export const registerService = async (body) => {
  console.log('register', body)
  const data = await post('/users/new', body);
  return data;
};

export const profileService = async (body) => {
  const data = await put('/users', body);
  return data;
};
