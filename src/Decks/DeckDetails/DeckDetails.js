import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header, Icon, Loader } from "semantic-ui-react";
import { loadDeckByPermaLink } from "../../utils/apis";
import { CardTable } from "./CardTable";

export function DeckDetails() {
  const [deck, setDeck] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    loadDeckByPermaLink(id).then((newDeck) => {
      setDeck(newDeck);
    });
  }, [id]);

  return (
    <>
      {deck === null ? (
        <Loader active inline="centered" />
      ) : (
        <div>
          <Header as="h3" icon textAlign="center">
            <Icon name="folder" circular />
            <Header.Content>{deck.name}</Header.Content>
          </Header>{" "}
          <CardTable cards={deck.cards} />
        </div>
      )}
    </>
  );
}
