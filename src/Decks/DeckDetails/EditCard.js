import { useEffect, useState } from "react";
import { Button, Form, Header, TextArea } from "semantic-ui-react";

export function EditCard({ deck, selectedCard, editCard }) {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  useEffect(() => {
    if (selectedCard) {
      setFront(selectedCard.front);
      setBack(selectedCard.back);
    }
  }, [selectedCard]);

  return (
    <>
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
            placeholder="Front of the card"
            className="m-05"
          />
          <TextArea
            value={back}
            onChange={(e) => setBack(e.target.value)}
            placeholder="Back of the card"
            className="m-05"
          />
          <div className="text-align-center">
            <Button onClick={() => editCard(front, back)}>
              {selectedCard ? "Edit card" : "Create card"}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
