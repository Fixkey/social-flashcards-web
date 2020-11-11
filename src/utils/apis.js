// import { API_URL } from "../config";
// import { User } from "../models/User";

// const USERS_URL = `${API_URL}/users`;
// const DECKS_URL = `${API_URL}/decks`;

// async function fetchWrapper(url, method, body) {
//   const token = User.loadUserFromLocalStorage().token;
//   const config = {
//     method: method ? method : "get",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token ? `Bearer ${token}` : undefined,
//     },
//     body: body ? JSON.stringify(body) : undefined,
//   };
//   const response = await fetch(url, config);
//   if (response.ok) {
//     const json = await response.json();
//     return { error: false, data: json };
//   } else {
//     try {
//       const json = await response.json();
//       return { error: true, data: json, message: json.message };
//     } catch (err) {
//       return { error: true };
//     }
//   }
// }

// export const loadAllDecks = async () => {
//   const decks = await fetch(DECKS_URL).then((e) => e.json());
//   return decks;
// };

// export const loadDeckByPermaLink = async (permaLink) => {
//   return await fetchWrapper(`${DECKS_URL}/perma-link/${permaLink}`);
// };

// export const deleteCard = async (deckId, cardId) => {
//   const response = await fetch(`${DECKS_URL}/${deckId}/card/${cardId}`, {
//     method: "delete",
//   });
//   return response.ok;
// };

// export const createCard = async (deckId, card) => {
//   const response = await fetch(`${DECKS_URL}/${deckId}/card`, {
//     method: "post",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(card),
//   });
//   if (response.ok) {
//     return {
//       deck: await response.json(),
//       error: null,
//     };
//   }
//   return { error: true };
// };

// export const editCard = async (deckId, card) => {
//   const response = await fetch(`${DECKS_URL}/${deckId}/card`, {
//     method: "put",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(card),
//   });
//   if (response.ok) {
//     return {
//       deck: await response.json(),
//       error: null,
//     };
//   }
//   const json = await response.json();
//   return { error: json.message };
// };

// export const loginUser = async (username, password) => {
//   return await fetchWrapper(`${USERS_URL}/login`, "post", {
//     username,
//     password,
//   });
// };

// export const registerUser = async (username, password) => {
//   return await fetchWrapper(`${USERS_URL}/sign-up`, "post", {
//     username,
//     password,
//   });
// };
