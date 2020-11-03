import { API_URL } from "../config";

export const loadAllDecks = async () => {
  const decks = await fetch(API_URL + "/deck").then((e) => e.json());
  console.log(decks);
  return decks;
};

export const loadDeckByPermaLink = async (permaLink) => {
  const deck = await fetch(
    `${API_URL}/deck/perma-link/${permaLink}`
  ).then((e) => e.json());
  console.log(deck);
  return deck;
};

export const deleteCard = async (deckId, cardId) => {
  const response = await fetch(`${API_URL}/deck/${deckId}/card/${cardId}`, {
    method: "delete",
  });
  return response.ok;
};

export const createCard = async (deckId, card) => {
  const response = await fetch(`${API_URL}/deck/${deckId}/card`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  });
  if (response.ok) {
    return {
      deck: await response.json(),
      error: null,
    };
  }
  return { error: true };
};

export const editCard = async (deckId, card) => {
  console.log(deckId);
  console.log(card);
  const response = await fetch(`${API_URL}/deck/${deckId}/card`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  });
  if (response.ok) {
    return {
      deck: await response.json(),
      error: null,
    };
  }
  const json = await response.json();
  return { error: json.message };
};
