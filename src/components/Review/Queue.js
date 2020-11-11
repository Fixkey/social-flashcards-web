import assert from "assert";
import is from "is_js";
import { useEffect, useState } from "react";
import { Button, Header, Statistic } from "semantic-ui-react";

export function Queue({ queue, answerCorrect, answerIncorrect }) {
  const { backShown, setBackShown, cardsLeft, current } = useHooks(queue);

  if (cardsLeft === 0) {
    return "No more reviews!";
  }

  return (
    <div className="queue">
      <div className="queue-stats">
        <Statistic size="mini">
          <Statistic.Label>Cards left</Statistic.Label>
          <Statistic.Value>{cardsLeft}</Statistic.Value>
        </Statistic>
      </div>
      <div className="queue-card">
        <Header as="h2" dividing textAlign="center">
          {current.front}
        </Header>
        <Header
          as="h3"
          textAlign="center"
          className={backShown ? "" : "hidden"}
        >
          {backShown ? current.back : "Card back"}
        </Header>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {backShown ? (
            <div>
              <Button
                size="large"
                primary
                onClick={() => {
                  answerCorrect(current.id);
                  setBackShown(false);
                }}
              >
                CORRECT
              </Button>
              <Button
                size="large"
                secondary
                onClick={() => {
                  answerIncorrect(current.id);
                  setBackShown(false);
                }}
              >
                INCORRECT
              </Button>
            </div>
          ) : (
            <Button size="large" primary onClick={() => setBackShown(true)}>
              SHOW ANSWER
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function useHooks(queue) {
  assert(is.array(queue));
  const [backShown, setBackShown] = useState(false);
  const [randomQueue, setRandomQueue] = useState(filterAndRandomize(queue));

  useEffect(() => {
    setRandomQueue(filterAndRandomize(queue));
  }, [queue]);

  const cardsLeft = randomQueue.length;
  const current = cardsLeft > 0 ? randomQueue[0] : null; // TODO _.sample
  console.log(current);
  return { backShown, setBackShown, current, cardsLeft };
}

function filterAndRandomize(queue) {
  return queue
    .filter((card) => !card.completedThisSession)
    .sort((x, y) => Math.random() - 0.5);
}
