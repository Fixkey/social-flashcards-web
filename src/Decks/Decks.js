import { useEffect, useState } from "react";
import { loadAllDecks } from "../utils/apis";
import { DeckList } from "./DeckList";

export function Decks() {
  const [decks, setDecks] = useState(null);
  useEffect(() => {
    loadAllDecks().then((newDecks) => {
      setDecks(newDecks);
    });
  }, []);

  return <div>{decks === null ? "Loading" : <DeckList decks={decks} />}</div>;
}
