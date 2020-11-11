import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader } from "semantic-ui-react";
import { loadAllDecks } from "../../utils/apis/deckApi";
import { DeckList } from "./DeckList";

export function Decks() {
  const [decks, setDecks] = useState(null);
  useEffect(() => {
    loadAllDecks().then((response) => {
      if (response.error) {
        toast.error("Error " + response.message);
      } else {
        setDecks(response.data);
      }
    });
  }, []);

  if (!decks) return <Loader active inline="centered" />;

  return (
    <div>
      <DeckList decks={decks} />
    </div>
  );
}
