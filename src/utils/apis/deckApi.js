import { DECKS_URL } from "../../config";
import { fetchWrapper } from "./index";

export const loadAllDecks = async () => {
  return await fetchWrapper(DECKS_URL);
};

export const loadDeckByPermaLink = async (permaLink) => {
  return await fetchWrapper(`${DECKS_URL}/perma-link/${permaLink}`);
};

export const deleteCard = async (deckId, cardId) => {
  return await fetchWrapper(`${DECKS_URL}/${deckId}/card/${cardId}`, "delete");
  // const response = await fetch(`${DECKS_URL}/${deckId}/card/${cardId}`, {
  //   method: "delete",
  // });
  // return response.ok;
};

export const createCard = async (deckId, card) => {
  return await fetchWrapper(`${DECKS_URL}/${deckId}/card`, "post", card);
  // const response = await fetch(`${DECKS_URL}/${deckId}/card`, {
  //   method: "post",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(card),
  // });
  // if (response.ok) {
  //   return {
  //     deck: await response.json(),
  //     error: null,
  //   };
  // }
  // return { error: true };
};

export const editCard = async (deckId, card) => {
  return await fetchWrapper(`${DECKS_URL}/${deckId}/card`, "put", card);
  // const response = await fetch(`${DECKS_URL}/${deckId}/card`, {
  //   method: "put",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(card),
  // });
  // if (response.ok) {
  //   return {
  //     deck: await response.json(),
  //     error: null,
  //   };
  // }
  // const json = await response.json();
  // return { error: json.message };
};
