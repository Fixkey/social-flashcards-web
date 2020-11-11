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
