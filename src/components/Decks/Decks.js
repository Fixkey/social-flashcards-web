import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Loader } from "semantic-ui-react";
import { loadAllDecks } from "../../utils/apis/deckApi";
import { UserContext } from "../user/UserContext";
import { DeckList } from "./DeckList";

export function Decks() {
  const [decks, setDecks] = useState(null);
  const [user, setUser] = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    loadAllDecks().then((response) => {
      if (response.error) {
        toast.error("Error " + response.message);
      } else {
        setDecks(response.data);
      }
    });
  }, [user]);

  if (!decks) return <Loader active inline="centered" />;

  return (
    <div>
      {user.token && (
        <Button primary onClick={() => history.push("/decks/create")}>
          Create a new deck
        </Button>
      )}
      <DeckList decks={decks} />
    </div>
  );
}
