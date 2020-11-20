import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "semantic-ui-react";
import { loadDecksBySubject } from "../../utils/apis/deckApi";
import { DeckList } from "../Decks/DeckList";

export function SubjectDecks() {
  const { subjectId } = useParams();
  const [decks, setDecks] = useState(null);

  useEffect(() => {
    loadDecksBySubject(subjectId).then((response) => {
      if (response.error) {
        toast.error("Error " + response.message);
      } else {
        setDecks(response.data);
      }
    });
  }, [subjectId]);

  if (!decks) return <Loader active inline="centered" />;

  return <DeckList decks={decks} />;
}
