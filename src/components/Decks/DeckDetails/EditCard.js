import { useEffect, useRef, useState } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { Button, Form, Header, Icon, TextArea } from "semantic-ui-react";

export function EditCard({ deck, selectedCard, editCard }) {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const history = useHistory();
  const { url } = useRouteMatch();

  const ref = useRef();

  useEffect(() => {
    if (selectedCard) {
      setFront(selectedCard.front);
      setBack(selectedCard.back);
    } else {
      setFront("");
      setBack("");
    }
    if (ref.current) {
      const cur = ref.current;
      if (cur.ref.current) {
        cur.ref.current.focus();
      }
    }
  }, [selectedCard]);

  return (
    <>
      <Button
        onClick={() => {
          history.push(url.split("/edit")[0]);
        }}
        className="back-button"
      >
        <Icon name="arrow left" />
      </Button>
      <Header as="h3" icon textAlign="center">
        <Header.Content>{deck.name}</Header.Content>
      </Header>
      <div className="edit-card">
        <Form>
          <Header as="h4" icon textAlign="center">
            <Header.Content>
              {selectedCard
                ? `You are editing card ${selectedCard.front}`
                : "New card"}
            </Header.Content>
          </Header>
          <TextArea
            value={front}
            onChange={(e) => setFront(e.target.value)}
            placeholder="Front of the card (question)"
            className="m-05"
            ref={ref}
          />
          <TextArea
            value={back}
            onChange={(e) => setBack(e.target.value)}
            placeholder="Back of the card (answer)"
            className="m-05"
          />
          <div className="text-align-center">
            <Button primary onClick={() => editCard(front, back)}>
              {selectedCard ? "Edit card" : "Create card"}
            </Button>
            <Button
              onClick={() => {
                setFront(back);
                setBack(front);
              }}
              className="reverse-card"
            >
              <Icon name="retweet" />
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
