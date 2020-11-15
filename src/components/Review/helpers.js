import assert from "assert";
import is from "is_js";
import { LEVELS_TIME } from "./config";

export function createProgressFromDeck(deck) {
  assert(is.object(deck));
  assert(is.array(deck.cards));
  const obj = {};
  deck.cards.forEach((card) => {
    obj[card.id] = {
      level: 1,
      lastAnswered: null,
    };
  });
  return obj;
}

export function mapProgressToQueue(progress, deck) {
  const arr = [];
  Object.keys(progress).forEach((key) => {
    if (!progress[key].completed) {
      const deckCard = deck.cards.find((card) => card.id === +key);
      const card = {
        ...progress[key],
        // id: +key,
        ...deckCard,
        deck: deck.permaLink,
        answeredThisSession: false,
        completedThisSession: false,
      };
      arr.push(card);
    }
  });
  return arr;
}

export function updateProgressFromQueue(progress, queue) {
  queue.forEach((card) => {
    const userCard = progress[card.deck][card.id];
    assert(is.object(userCard), "Progress must contain card from queue");
    if (userCard.lastAnswered < card.lastAnswered) {
      userCard.lastAnswered = card.lastAnswered;
      userCard.level = card.level;
    }
  });
  return progress;
}

export function getToBeReviewedProgress(progress) {
  assert(is.object(progress), "Must be object");
  const levels = Object.keys(LEVELS_TIME);
  const result = {};
  Object.keys(progress).forEach((cardId) => {
    const level = progress[cardId].level;
    const lastAnswered = progress[cardId].lastAnswered;
    if (!lastAnswered) {
      result[cardId] = { ...progress[cardId] };
    } else if (level === levels[levels.length - 1]) {
      // nothing
    } else {
      const levelTime = LEVELS_TIME[level];
      const now = new Date();
      if (now.setHours(now.getHours() - levelTime) > lastAnswered) {
        result[cardId] = { ...progress[cardId] };
      }
    }
  });
  return result;
}

export function progressLastUpdatedDate(progress) {
  let lastAnswered = 0;
  Object.keys(progress).forEach((key) => {
    Object.keys(progress[key]).forEach((deckKey) => {
      if (progress[key][deckKey].lastAnswered > lastAnswered) {
        lastAnswered = progress[key][deckKey].lastAnswered;
      }
    });
  });
  if (lastAnswered > 0) {
    return new Date(lastAnswered);
  } else {
    return null;
  }
}
