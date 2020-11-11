import { Button, Header, Icon } from "semantic-ui-react";

export function DeckHeader({ name, reviewDeck }) {
  return (
    <>
      <Header as="h3" icon textAlign="center">
        <Icon name="folder" circular />
        <Header.Content>{name}</Header.Content>
      </Header>
      <div style={{ textAlign: "center" }}>
        <Button color="red">Delete Deck</Button>
        <Button color="green" onClick={reviewDeck}>
          Review Deck
        </Button>
        <Button color="blue">Share Deck</Button>
      </div>
    </>
  );
}
