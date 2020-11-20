import is from "is_js";
import { useHistory } from "react-router-dom";
import { List } from "semantic-ui-react";

export function DeckList({ decks }) {
  const history = useHistory();

  if (is.empty(decks)) return "No decks matching criteria";

  return (
    <List divided relaxed>
      {decks.map((deck) => (
        <List.Item key={deck.id}>
          <List.Icon name="folder" size="large" verticalAlign="middle" />
          <List.Content
            onClick={() => history.push(`/decks/id/${deck.permaLink}`)}
          >
            <List.Header as="a">{deck.name}</List.Header>
            <List.Description as="a">
              Card count: {deck.cardsLength || deck.cards.length}
            </List.Description>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
}
