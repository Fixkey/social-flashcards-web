import is from "is_js";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Header, Loader } from "semantic-ui-react";
import { enrichDecksByPermalinks } from "../../utils/apis/deckApi";
import { DeckList } from "../Decks/DeckList";
import {
  getNextReviewTimeHours,
  getToBeReviewedProgress,
  parseDate,
} from "../Review/helpers";
import { UserContext } from "../user/UserContext";

function nextReviewIn(date) {
  const parsedDate = parseDate(date);
  let string = "";
  if (parsedDate.days > 0) {
    string += `${parsedDate.days} days, `;
  }
  string += `${parsedDate.hours} hours, ${parsedDate.minutes} minutes`;
  return string;
}

export function Dashboard() {
  const { decks, nextReview } = useHooks();

  if (decks === null) return <Loader active inline="centered" />;
  if (is.empty(decks)) {
    if (nextReview === null) {
      return (
        <p>No more reviews! Go to deck and start review to add new ones!</p>
      );
    } else {
      return <p>Next review in {nextReviewIn(nextReview)}</p>;
    }
  }
  return (
    <div>
      <Header>Decks to review:</Header>
      <DeckList decks={decks} reviews />
    </div>
  );
}

function useHooks() {
  const [user] = useContext(UserContext);
  const [decks, setDecks] = useState(null);
  const [nextReview, setNextReview] = useState(null);

  useEffect(() => {
    const decksToReview = [];
    let earliestNextReview = null;
    Object.keys(user.progress).forEach((deck) => {
      const reviews = getToBeReviewedProgress(user.progress[deck]);
      if (!is.empty(reviews))
        decksToReview.push({
          permaLink: deck,
          reviews: Object.keys(reviews).length,
        });
      const nxtReview = getNextReviewTimeHours(user.progress[deck]);
      if (earliestNextReview === null || nxtReview < earliestNextReview) {
        earliestNextReview = nxtReview;
      }
    });
    setNextReview(earliestNextReview);
    if (!is.empty(decksToReview)) {
      enrichDecksByPermalinks(decksToReview.map((e) => e.permaLink)).then(
        (response) => {
          if (response.error) {
            toast.error("Error " + response.message);
          } else {
            setDecks(
              response.data.map((deck) => {
                const reviews = decksToReview.find(
                  (e) => e.permaLink === deck.permaLink
                ).reviews;
                return {
                  ...deck,
                  name: `${deck.name} (${reviews} review${
                    reviews > 1 ? "s" : ""
                  })`,
                };
              })
            );
          }
        }
      );
    } else {
      setDecks([]);
    }
  }, [user]);

  return { decks, nextReview };
}
