import { USERS_URL } from "../../config";
import { fetchWrapper } from "./index";

export const loginUser = async (username, password) => {
  return await fetchWrapper(`${USERS_URL}/login`, "post", {
    username,
    password,
  });
};

export const registerUser = async (username, password) => {
  return await fetchWrapper(`${USERS_URL}/sign-up`, "post", {
    username,
    password,
  });
};

export const fetchUsers = async (search) => {
  return await fetchWrapper(
    `${USERS_URL}/${search ? `?search=${search}` : ""}`
  );
};

export const fetchUserProgress = async () => {
  return await fetchWrapper(`${USERS_URL}/progress`);
};

export const updateUserProgress = async (progress) => {
  return await fetchWrapper(`${USERS_URL}/progress`, "put", {
    progress: JSON.stringify(progress),
  });
};
