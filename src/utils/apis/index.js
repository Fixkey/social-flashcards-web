import { User } from "../../models/User";

export async function fetchWrapper(url, method, body) {
  const token = User.loadUserFromLocalStorage().token;
  const config = {
    method: method ? method : "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    body: body ? JSON.stringify(body) : undefined,
  };
  const response = await fetch(url, config);
  if (response.ok) {
    try {
      const json = await response.json();
      return { error: false, data: json };
    } catch (err) {
      return { error: false };
    }
  } else {
    try {
      const json = await response.json();
      return { error: true, data: json, message: json.message };
    } catch (err) {
      return { error: true };
    }
  }
}
