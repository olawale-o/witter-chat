import { post, put } from "../api";

export const loginService = async (body) => {
  const data = await post('/users/login', body);
  if (!data?.data) {
    throw new Error(data.message);
  }
  return data.data;
};

export const registerService = async (body) => {
  const data = await post('/users', body);
  if (!data?.data) {
    throw new Error(data.message);
  }
  return data.data;
};

export const profileService = async (body) => {
  const data = await put('/users', body);
  return data;
};
