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
