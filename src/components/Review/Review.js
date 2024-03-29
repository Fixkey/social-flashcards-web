import assert from "assert";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { loadDeckByPermaLink } from "../../utils/apis/deckApi";
import { UserContext } from "../user/UserContext";
import is from "is_js";
import {
  createProgressFromDeck,
  getToBeReviewedProgress,
  mapProgressToQueue,
  updateProgressFromQueue,
} from "./helpers";
import { User } from "../../models/User";
import { toast } from "react-toastify";
import { Queue } from "./Queue";
import { Button, Icon, Loader } from "semantic-ui-react";

export const Review = () => {
  const {
    queue,
    answerCorrect,
    answerIncorrect,
    permaLink,
    history,
  } = useHooks();

  if (!queue) return <Loader active inline="centered" />;
  return (
    <div>
      <Button
        onClick={() => {
          history.push(`/decks/id/${permaLink}`);
        }}
        className="back-button"
      >
        <Icon name="arrow left" />
      </Button>
      <Queue
        queue={queue}
        answerCorrect={answerCorrect}
        answerIncorrect={answerIncorrect}
      />
    </div>
  );
};

function useHooks() {
  const { permaLink } = useParams();
  const [user, setUser] = useContext(UserContext);
  const [queue, setQueue] = useState(null);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (permaLink && !queue) {
      loadDeckByPermaLink(permaLink + location.search).then((response) => {
        if (response.error) {
          toast.error("Error " + response.message);
          return;
        }
        const deck = response.data;
        assert(is.object(user.progress), "User must have progress object");
        let progress = {};
        if (user.progress[permaLink]) {
          // calculate from progress
          progress = getToBeReviewedProgress(user.progress[permaLink]);
        } else {
          // fresh start
          progress = createProgressFromDeck(deck);
          setUser(User.updateProgress(user, deck.permaLink, progress));
          // setUser(User.updateProgress(user, deck.permaLink, progress));
        }
        setQueue(mapProgressToQueue(progress, deck));
      });
    }
  }, [permaLink, setUser, setQueue, user, queue, location]);

  const answerCorrect = useCallback(
    (cardId) => {
      // TODO .map
      assert(is.array(queue), "Queue must be an array");
      const card = queue.find((e) => e.id === cardId);
      if (!card.answeredThisSession) {
        card.level++;
        card.lastAnswered = new Date().getTime();
      }
      card.completedThisSession = true;
      setQueue(queue.slice());
      setUser(
        User.replaceProgress(
          user,
          updateProgressFromQueue(user.progress, queue)
        )
      );
    },
    [queue, setQueue, user, setUser]
  );

  const answerIncorrect = useCallback(
    (cardId) => {
      assert(is.array(queue), "Queue must be an array");
      const card = queue.find((e) => e.id === cardId);
      if (!card.answeredThisSession) {
        if (card.level > 1) card.level--;
        card.lastAnswered = new Date().getTime();
      }
      card.answeredThisSession = true;
      setQueue(queue.slice());
      // update user
    },
    [queue, setQueue]
  );

  return { queue, answerCorrect, answerIncorrect, permaLink, history };
}
