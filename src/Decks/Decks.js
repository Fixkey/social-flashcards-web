import { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import { loadAllDecks } from "../utils/apis";
import { DeckList } from "./DeckList";

export function Decks() {
  const [decks, setDecks] = useState(null);
  useEffect(() => {
    loadAllDecks().then((newDecks) => {
      setDecks(newDecks);
    });
  }, []);

  if (!decks) return <Loader active inline="centered" />;

  return (
    <div>
      <DeckList decks={decks} />
    </div>
  );
}
