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
};

export const createCard = async (deckId, card) => {
  return await fetchWrapper(`${DECKS_URL}/${deckId}/card`, "post", card);
};

export const editCard = async (deckId, card) => {
  return await fetchWrapper(`${DECKS_URL}/${deckId}/card`, "put", card);
};

export const createDeck = async (deck) => {
  return await fetchWrapper(`${DECKS_URL}`, "post", deck);
};

export const changeOwnershipOfDeck = async (deck) => {
  return await fetchWrapper(`${DECKS_URL}/change-ownership`, "put", deck);
};

export const deleteDeck = async (deckId) => {
  return await fetchWrapper(`${DECKS_URL}/${deckId}`, "delete");
};

export const loadDecksBySubject = async (subjectId) => {
  return await fetchWrapper(`${DECKS_URL}/subject/${subjectId}`);
};
