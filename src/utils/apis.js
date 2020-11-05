import { API_URL } from "../config";

const USERS_URL = `${API_URL}/users`;
const DECKS_URL = `${API_URL}/decks`;

export const loadAllDecks = async () => {
  const decks = await fetch(DECKS_URL).then((e) => e.json());
  console.log(decks);
  return decks;
};

export const loadDeckByPermaLink = async (permaLink) => {
  const deck = await fetch(`${DECKS_URL}/perma-link/${permaLink}`).then((e) =>
    e.json()
  );
  console.log(deck);
  return deck;
};

export const deleteCard = async (deckId, cardId) => {
  const response = await fetch(`${DECKS_URL}/${deckId}/card/${cardId}`, {
    method: "delete",
  });
  return response.ok;
};

export const createCard = async (deckId, card) => {
  const response = await fetch(`${DECKS_URL}/${deckId}/card`, {
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
  const response = await fetch(`${DECKS_URL}/${deckId}/card`, {
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

export const loginUser = async (username, password) => {
  const response = await fetch(`${USERS_URL}/login`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const json = await response.json();

  return json;
  // console.log(await response.json());
  return { error: true };
};
